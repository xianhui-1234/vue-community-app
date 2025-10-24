<template>
  <view class="search">
    <view class="search__header">
      <view class="search__input-wrapper">
        <text class="search__icon">🔍</text>
        <input
          class="search__input"
          v-model="keyword"
          placeholder="输入关键词，例如 托管 / 接送"
          confirm-type="search"
          @confirm="onSearch"
        />
        <text class="search__clear" v-if="keyword" @tap="clear">✕</text>
      </view>
      <text class="search__action" @tap="onSearch">搜索</text>
    </view>

    <view class="search__history" v-if="history.length">
      <view class="section-title">历史记录</view>
      <view class="search__chips">
        <view v-for="item in history" :key="item" class="search__chip" @tap="applyHistory(item)">
          {{ item }}
        </view>
      </view>
      <view class="search__clear-history" @tap="clearHistory">清除历史</view>
    </view>

    <view class="section-title">搜索结果</view>
    <view v-if="!results.length" class="search__empty">暂无匹配任务，试试其他关键词～</view>
    <job-card
      v-for="job in results"
      :key="job.id"
      :job="job"
      :favorites="favoritesSet"
      @favorite="toggleFavorite"
      @apply="applyJob"
      @contact="openContact"
    />
  </view>
</template>

<script>
import { computed, reactive, ref, toRefs } from 'vue';
import JobCard from '../../components/JobCard.vue';
import { useJobsStore } from '../../store/useJobsStore';

export default {
  name: 'SearchPage',
  components: { JobCard },
  setup() {
    const jobsStore = useJobsStore();
    const keyword = ref('');
    const state = reactive({
      results: [],
      history: getHistory()
    });

    const favoritesSet = computed(() => new Set(jobsStore.favorites || []));
    const { results, history } = toRefs(state);

    function onSearch() {
      const text = keyword.value.trim();
      if (!text) {
        uni.showToast({ title: '请输入关键词', icon: 'none' });
        return;
      }
      state.results = filterJobs(text);
      updateHistory(text);
    }

    function filterJobs(text) {
      const lower = text.toLowerCase();
      return (jobsStore.jobs || []).filter((job) => {
        const title = (job.title || '').toLowerCase();
        const desc = (job.description || '').toLowerCase();
        const tags = (job.tags || []).join(',').toLowerCase();
        return title.includes(lower) || desc.includes(lower) || tags.includes(lower);
      });
    }

    function updateHistory(text) {
      const next = [text, ...state.history.filter((item) => item !== text)].slice(0, 8);
      state.history = next;
      uni.setStorage({ key: 'search_history', data: next });
    }

    function getHistory() {
      try {
        const value = uni.getStorageSync('search_history');
        return Array.isArray(value) ? value : [];
      } catch (e) {
        return [];
      }
    }

    function applyHistory(text) {
      keyword.value = text;
      state.results = filterJobs(text);
    }

    function clear() {
      keyword.value = '';
    }

    function clearHistory() {
      state.history = [];
      uni.removeStorage({ key: 'search_history' });
    }

    function toggleFavorite(jobId) {
      jobsStore.toggleFavorite(jobId);
    }

    function openContact(job) {
      const nickname =
        (job.publisher && job.publisher.nickname) || job.contactName || '匿名用户';
      uni.showModal({
        title: '联系发布者',
        content: `请通过平台消息联系：${nickname}`,
        confirmText: '前往消息',
        success: ({ confirm }) => {
          if (confirm) {
            uni.switchTab({ url: '/pages/messages/messages' });
          }
        }
      });
    }

    function applyJob(job) {
      uni.navigateTo({ url: `/pages/publish/publish?jobId=${job.id}&mode=apply` });
    }

    return {
      keyword,
      results,
      history,
      favoritesSet,
      onSearch,
      toggleFavorite,
      openContact,
      applyJob,
      applyHistory,
      clear,
      clearHistory
    };
  }
};
</script>

<style lang="scss" scoped>
.search {
  min-height: 100vh;
  padding: 32rpx;

  &__header {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 32rpx;
  }

  &__input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    background: #f5f6f8;
    border-radius: 32rpx;
    padding: 12rpx 20rpx;
  }

  &__icon {
    font-size: 28rpx;
    color: #999;
    margin-right: 12rpx;
  }

  &__input {
    flex: 1;
    font-size: 28rpx;
  }

  &__clear {
    font-size: 26rpx;
    color: #bbb;
    padding-left: 12rpx;
  }

  &__action {
    font-size: 28rpx;
    color: #1e9fff;
  }

  &__history {
    margin-bottom: 24rpx;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }

  &__chip {
    padding: 12rpx 24rpx;
    background: #f0f4ff;
    border-radius: 24rpx;
    font-size: 26rpx;
    color: #444;
  }

  &__clear-history {
    margin-top: 12rpx;
    font-size: 24rpx;
    color: #999;
  }

  &__empty {
    color: #999;
    font-size: 26rpx;
    margin: 32rpx 0;
    text-align: center;
  }
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  margin: 24rpx 0;
}
</style>
