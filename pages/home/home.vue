<template>
  <scroll-view class="home" scroll-y>
    <view class="page-padding">
      <view class="home__header">
        <view class="home__location">
          <text class="home__city">{{ currentCity }}</text>
          <text class="home__distance">附近 {{ jobsStore.filter.distance }}km</text>
        </view>
        <view class="home__search" @tap="goSearch">
          <text class="home__search-icon">🔍</text>
          <input
            class="home__search-input"
            type="text"
            placeholder="搜索托管、接送、活动等"
            v-model="keyword"
            @confirm="applyKeyword"
          />
        </view>
      </view>

      <filter-bar :filter="filterData" @update:filter="updateFilter" @openTags="openTagFilter" />

      <view class="section-title">首页推荐</view>
      <scroll-view class="home__quick" scroll-x enable-flex="true">
        <view
          v-for="category in categories"
          :key="category.label"
          class="home__quick-item"
          @tap="selectCategory(category)"
        >
          <text class="home__quick-icon">{{ category.icon }}</text>
          <text class="home__quick-label">{{ category.label }}</text>
        </view>
      </scroll-view>

      <view class="section-title">最新任务</view>
      <job-card
        v-for="job in filteredJobs"
        :key="job.id"
        :job="job"
        :favorites="favoritesSet"
        @favorite="toggleFavorite"
        @apply="applyJob"
        @contact="openContact"
      />
    </view>
  </scroll-view>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import FilterBar from '../../components/FilterBar.vue';
import JobCard from '../../components/JobCard.vue';
import { useJobsStore } from '../../store/useJobsStore';

export default {
  name: 'HomePage',
  components: {
    FilterBar,
    JobCard
  },
  setup() {
    const jobsStore = useJobsStore();
    const keyword = ref('');
    const currentCity = ref('定位中');
    const categories = [
      { label: '托育托管', icon: '👶' },
      { label: '接送跑腿', icon: '🚗' },
      { label: '亲子活动', icon: '🎈' },
      { label: '兴趣学习', icon: '📚' },
      { label: '家庭服务', icon: '🏠' },
      { label: '同城闲置', icon: '🛒' }
    ];

    const favoritesSet = computed(() => new Set(jobsStore.favorites || []));
    const defaultFilter = {
      city: '',
      distance: 5,
      keyword: '',
      tags: []
    };
    const filterData = computed(() => {
      if (!jobsStore.filter || typeof jobsStore.filter !== 'object') {
        return defaultFilter;
      }
      return Object.assign({}, defaultFilter, jobsStore.filter);
    });

    const filteredJobs = computed(() => {
      const city = jobsStore.filter.city;
      const tags = jobsStore.filter.tags || [];
      const keywordValue = jobsStore.filter.keyword || '';
      return (jobsStore.jobs || []).filter((job) => {
        const jobTags = job.tags || [];
        const matchCity = !city || job.city === city;
        const matchTags = tags.length === 0 || tags.some((tag) => jobTags.indexOf(tag) !== -1);
        const title = job.title || '';
        const matchKeyword = !keywordValue || title.indexOf(keywordValue) !== -1;
        return matchCity && matchTags && matchKeyword;
      });
    });

    const updateFilter = (filter) => {
      jobsStore.updateFilter(filter);
    };

    const openTagFilter = () => {
      uni.showToast({
        title: '标签筛选开发中',
        icon: 'none'
      });
    };

    const selectCategory = (category) => {
      const nextFilter = Object.assign({}, jobsStore.filter, { tags: [category.label] });
      jobsStore.updateFilter(nextFilter);
    };

    const toggleFavorite = (jobId) => {
      jobsStore.toggleFavorite(jobId);
    };

    const recordHistory = (job) => {
      const historyEntry = { id: job.id, title: job.title, city: job.city, schedule: job.schedule };
      let list = [];
      try {
        const existing = uni.getStorageSync('view_history');
        list = Array.isArray(existing) ? existing : [];
      } catch (e) {
        list = [];
      }
      const filtered = list.filter((item) => item.id !== historyEntry.id);
      filtered.unshift(historyEntry);
      uni.setStorageSync('view_history', filtered.slice(0, 15));
    };

    const viewJob = (job) => {
      recordHistory(job);
      uni.showModal({
        title: job.title,
        content: job.description || '任务详情，请前往报名了解更多',
        confirmText: '去报名',
        success: ({ confirm }) => {
          if (confirm) {
            applyJob(job);
          }
        }
      });
    };

    const applyJob = (job) => {
      recordHistory(job);
      uni.navigateTo({
        url: `/pages/publish/publish?jobId=${job.id}&mode=apply`
      });
    };

    const openContact = (job) => {
      const nickname =
        (job.publisher && job.publisher.nickname) || job.contactName || '匿名用户';
      uni.showModal({
        title: '联系发布者',
        content: `请通过平台消息联系：${nickname}`,
        confirmText: '前往消息',
        success: (res) => {
          if (res.confirm) {
            uni.switchTab({ url: '/pages/messages/messages' });
          }
        }
      });
    };

    const goSearch = () => {
      uni.navigateTo({ url: '/pages/search/search' });
    };

    const applyKeyword = () => {
      const nextFilter = Object.assign({}, jobsStore.filter, { keyword: keyword.value });
      jobsStore.updateFilter(nextFilter);
    };

    const fetchLocation = () => {
      uni.getLocation({
        type: 'wgs84',
        success: (res) => {
          const longitude = res.longitude || 0;
          const latitude = res.latitude || 0;
          currentCity.value = `${longitude.toFixed(2)},${latitude.toFixed(2)}`;
        },
        fail: () => {
          currentCity.value = '定位失败';
        }
      });
    };

    const fetchJobs = () => {
      uni.request({
        url: 'http://localhost:8080/api/jobs',
        method: 'GET',
        success: (response) => {
          const data = response.data && response.data.data ? response.data.data : [];
          jobsStore.setJobs(data);
        },
        fail: () => {
          jobsStore.setJobs(getFallbackJobs());
        }
      });
    };

    const getFallbackJobs = () => [
      {
        id: 'job-1',
        title: '周末半日托管（双语）',
        price: 120,
        unit: '次',
        location: '天府新区华阳街道',
        city: '天府新区',
        schedule: '本周六 9:00-13:00',
        tags: ['托管', '短期', '双语'],
        publisherId: 'demo-user',
        contactName: '乐乐妈',
        publisher: {
          nickname: '乐乐妈',
          verified: true
        }
      },
      {
        id: 'job-2',
        title: '晚高峰接送小学',
        price: 40,
        unit: '次',
        location: '锦江区万达广场',
        city: '锦江区',
        schedule: '工作日 17:30-18:30',
        tags: ['接送', '长期', '放学后'],
        publisherId: 'helper-2',
        contactName: '晴天',
        publisher: {
          nickname: '晴天',
          verified: true
        }
      },
      {
        id: 'job-3',
        title: '旧婴儿推车转让',
        price: 200,
        unit: '件',
        location: '成华区万象城',
        city: '成华区',
        schedule: '随时可约',
        tags: ['闲置', '同城自提'],
        publisherId: 'seller-1',
        contactName: '瑶瑶妈',
        publisher: {
          nickname: '瑶瑶妈'
        }
      }
    ];

    onMounted(() => {
      fetchLocation();
      fetchJobs();
    });

    return {
      jobsStore,
      keyword,
      currentCity,
      categories,
      favoritesSet,
      filteredJobs,
      filterData,
      updateFilter,
      openTagFilter,
      selectCategory,
      toggleFavorite,
      viewJob,
      applyJob,
      openContact,
      goSearch,
      applyKeyword
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;

  &__header {
    margin: 24rpx 0;
  }

  &__location {
    display: flex;
    align-items: baseline;
    gap: 16rpx;
  }

  &__city {
    font-size: 40rpx;
    font-weight: 700;
  }

  &__distance {
    font-size: 26rpx;
    color: #999;
  }

  &__search {
    margin-top: 20rpx;
    display: flex;
    align-items: center;
    gap: 12rpx;
    background: #fff;
    padding: 16rpx 24rpx;
    border-radius: 32rpx;
  }

  &__search-icon {
    font-size: 28rpx;
    color: #999;
  }

  &__search-input {
    flex: 1;
    font-size: 28rpx;
  }

  &__quick {
    display: flex;
    margin-bottom: 24rpx;

    .home__quick-item {
      min-width: 150rpx;
      background: #fff;
      border-radius: 16rpx;
      padding: 20rpx;
      margin-right: 16rpx;
      text-align: center;
      box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
    }
  }

  &__quick-icon {
    font-size: 40rpx;
    display: block;
  }

  &__quick-label {
    margin-top: 12rpx;
    font-size: 26rpx;
  }
}
</style>
