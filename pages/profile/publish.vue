<template>
  <scroll-view class="page" scroll-y>
    <view class="section__title">我的发布</view>
    <view v-if="published.length" class="section__list">
      <job-card
        v-for="job in published"
        :key="job.id"
        :job="job"
        :favorites="favoritesSet"
        @favorite="toggleFavorite"
        @apply="previewApplicants"
        @contact="openContact"
      />
    </view>
    <view v-else class="section__empty">暂未发布任务，去首页发布吧～</view>
  </scroll-view>
</template>

<script>
import { computed } from 'vue';
import JobCard from '../../components/JobCard.vue';
import { useJobsStore } from '../../store/useJobsStore';

export default {
  name: 'MyPublishPage',
  components: { JobCard },
  setup() {
    const jobsStore = useJobsStore();
    const currentUserId = 'demo-user';

    const published = computed(() =>
      jobsStore.jobs.filter((job) => job.publisherId === currentUserId || job.publisher?.id === currentUserId)
    );

    const favoritesSet = computed(() => new Set(jobsStore.favorites));

    const toggleFavorite = (jobId) => {
      jobsStore.toggleFavorite(jobId);
    };

    const previewApplicants = () => {
      uni.showToast({ title: '报名列表开发中', icon: 'none' });
    };

    const openContact = () => {
      uni.showToast({ title: '请在消息列表查看应答', icon: 'none' });
    };

    return {
      published,
      favoritesSet,
      toggleFavorite,
      previewApplicants,
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

.section__title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
}

.section__empty {
  margin-top: 160rpx;
  text-align: center;
  color: #999;
}
</style>
