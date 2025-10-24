<template>
  <scroll-view class="page" scroll-y>
    <view class="section">
      <view class="section__title">我的收藏</view>
      <view v-if="favorites.length" class="section__list">
        <job-card
          v-for="item in favorites"
          :key="item.id"
          :job="item"
          :favorites="favoritesSet"
          @favorite="toggleFavorite"
          @apply="applyJob"
          @contact="openContact"
        />
      </view>
      <view v-else class="section__empty">收藏夹空空如也，去首页发现更多任务吧～</view>
    </view>
  </scroll-view>
</template>

<script>
import { computed } from 'vue';
import JobCard from '../../components/JobCard.vue';
import { useJobsStore } from '../../store/useJobsStore';

export default {
  name: 'FavoritesPage',
  components: { JobCard },
  setup() {
    const jobsStore = useJobsStore();
    const favorites = computed(() => jobsStore.jobs.filter((job) => jobsStore.favorites.includes(job.id)));
    const favoritesSet = computed(() => new Set(jobsStore.favorites));

    const toggleFavorite = (jobId) => {
      jobsStore.toggleFavorite(jobId);
    };

    const applyJob = (job) => {
      uni.navigateTo({ url: `/pages/publish/publish?jobId=${job.id}&mode=apply` });
    };

    const openContact = (job) => {
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
    };

    return {
      favorites,
      favoritesSet,
      toggleFavorite,
      applyJob,
      openContact
    };
  }
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f5f6fa;
  padding: 32rpx;
}

.section {
  &__title {
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 24rpx;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__empty {
    margin-top: 160rpx;
    text-align: center;
    font-size: 26rpx;
    color: #999;
  }
}
</style>
