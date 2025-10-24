<template>
  <scroll-view class="page" scroll-y>
    <view class="section__title">评价管理</view>
    <view v-if="reviews.length" class="reviews__list">
      <view v-for="item in reviews" :key="item.id" class="reviews__item">
        <view class="reviews__header">
          <text class="reviews__name">{{ item.author }}</text>
          <text class="reviews__score">{{ item.score }} 分</text>
        </view>
        <view class="reviews__job">任务：{{ item.jobTitle }}</view>
        <view class="reviews__content">{{ item.content }}</view>
        <view class="reviews__time">{{ item.time }}</view>
      </view>
    </view>
    <view v-else class="section__empty">暂无评价记录</view>
  </scroll-view>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ReviewsPage',
  setup() {
    const reviews = ref([
      {
        id: 'r1',
        author: '暖阳',
        jobTitle: '周末半日托管',
        score: 4.8,
        content: '沟通顺畅，孩子照顾得很好，准时完成任务。',
        time: '2025-10-22'
      }
    ]);

    return {
      reviews
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

.reviews__list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.reviews__item {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
}

.reviews__header {
  display: flex;
  justify-content: space-between;
  font-size: 30rpx;
  color: #333;
}

.reviews__job {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: #777;
}

.reviews__content {
  margin: 16rpx 0;
  font-size: 28rpx;
  color: #444;
  line-height: 1.5;
}

.reviews__time {
  font-size: 24rpx;
  color: #999;
}

.section__empty {
  margin-top: 160rpx;
  text-align: center;
  color: #999;
}
</style>
