<template>
  <view class="page">
    <view class="section__title">客服中心</view>
    <view class="support__card">
      <view class="support__row">
        <text class="support__label">客服微信</text>
        <text class="support__value">helper-001</text>
      </view>
      <view class="support__row">
        <text class="support__label">服务时间</text>
        <text class="support__value">09:00 - 21:00</text>
      </view>
      <view class="support__row">
        <text class="support__label">常见问题</text>
        <view class="support__faq">
          <view v-for="item in faqs" :key="item.q" class="support__faq-item">
            <text class="support__question">Q: {{ item.q }}</text>
            <text class="support__answer">A: {{ item.a }}</text>
          </view>
        </view>
      </view>
    </view>
    <button class="support__contact" type="primary" @tap="talk">在线客服</button>
  </view>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SupportPage',
  setup() {
    const faqs = ref([
      {
        q: '如何发起任务托管？',
        a: '发布任务后选择托管支付，平台会在双方确认后放款。'
      },
      {
        q: '如何查看接单进度？',
        a: '在“我的接单”中可以查看任务状态，并与发布方沟通。'
      }
    ]);

    const talk = () => {
      uni.switchTab({ url: '/pages/messages/messages' });
    };

    return {
      faqs,
      talk
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

.support__card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
}

.support__row {
  margin-bottom: 24rpx;
}

.support__label {
  font-size: 26rpx;
  color: #999;
}

.support__value {
  font-size: 28rpx;
  color: #333;
}

.support__faq-item {
  margin-top: 16rpx;
  background: #f5f8ff;
  border-radius: 12rpx;
  padding: 16rpx;
}

.support__question {
  font-size: 26rpx;
  color: #1e9fff;
}

.support__answer {
  font-size: 26rpx;
  color: #555;
  margin-top: 8rpx;
}

.support__contact {
  margin-top: 32rpx;
  background: linear-gradient(135deg, #1e9fff, #5b8bf7);
}
</style>
