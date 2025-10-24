<template>
  <view class="page">
    <view class="section__title">浏览记录</view>
    <view v-if="history.length" class="history__list">
      <view v-for="item in history" :key="item.id" class="history__item" @tap="openJob(item)">
        <view class="history__title">{{ item.title }}</view>
        <view class="history__meta">{{ item.city }} · {{ item.schedule }}</view>
      </view>
      <view class="history__clear" @tap="clearHistory">清空记录</view>
    </view>
    <view v-else class="section__empty">暂无浏览记录</view>
  </view>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'HistoryPage',
  setup() {
    const history = ref([]);

    onMounted(() => {
      try {
        const value = uni.getStorageSync('view_history');
        history.value = Array.isArray(value) ? value : [];
      } catch (e) {
        history.value = [];
      }
    });

    const openJob = (item) => {
      uni.navigateTo({ url: `/pages/publish/publish?jobId=${item.id}&mode=apply` });
    };

    const clearHistory = () => {
      history.value = [];
      uni.removeStorage({ key: 'view_history' });
    };

    return {
      history,
      openJob,
      clearHistory
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

.history__list {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
}

.history__item {
  padding: 20rpx 0;
  border-bottom: 1px solid #f2f2f2;
}

.history__item:last-child {
  border-bottom: none;
}

.history__title {
  font-size: 30rpx;
  color: #333;
}

.history__meta {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #888;
}

.history__clear {
  text-align: center;
  padding: 20rpx 0 8rpx;
  font-size: 26rpx;
  color: #1e9fff;
}

.section__empty {
  margin-top: 160rpx;
  text-align: center;
  color: #999;
  font-size: 26rpx;
}
</style>
