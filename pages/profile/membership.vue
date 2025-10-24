<template>
  <view class="membership">
    <view class="membership__hero">
      <text class="membership__title">会员服务筹备中</text>
      <text class="membership__subtitle">即将提供更高收益、更快接单、专属保障</text>
    </view>
    <view class="membership__content">
      <view class="membership__card" v-for="tier in tiers" :key="tier.name">
        <view class="membership__card-header">
          <text class="membership__card-name">{{ tier.name }}</text>
          <text class="membership__card-price">{{ tier.price }}</text>
        </view>
        <view class="membership__card-benefits">
          <view v-for="benefit in tier.benefits" :key="benefit" class="membership__benefit">
            ✔️ {{ benefit }}
          </view>
        </view>
      </view>
      <view class="membership__notice">
        会员功能即将上线，敬请期待。
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MembershipPage',
  setup() {
    const tiers = [
      {
        name: '基础会员',
        price: '¥19/月',
        benefits: ['托管费折扣', '优先审核', '信用特权']
      },
      {
        name: '专业会员',
        price: '¥39/月',
        benefits: ['客服优先', '任务优先推荐', '交易保障升级']
      }
    ];

    return {
      tiers
    };
  }
};
</script>

<style lang="scss" scoped>
.membership {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f8ff 0%, #ffffff 60%);
  padding: 40rpx 32rpx;

  &__hero {
    text-align: center;
    margin-bottom: 40rpx;
  }

  &__title {
    font-size: 36rpx;
    font-weight: 600;
    color: #1e9fff;
  }

  &__subtitle {
    display: block;
    margin-top: 12rpx;
    color: #666;
    font-size: 26rpx;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
  }

  &__card {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    box-shadow: 0 8rpx 16rpx rgba(30, 159, 255, 0.1);
  }

  &__card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &__card-name {
    font-size: 32rpx;
    font-weight: 600;
  }

  &__card-price {
    font-size: 28rpx;
    color: #ff6b6b;
  }

  &__card-benefits {
    margin-top: 24rpx;
    font-size: 26rpx;
    color: #555;
    display: flex;
    flex-direction: column;
    gap: 12rpx;
  }

  &__notice {
    text-align: center;
    font-size: 24rpx;
    color: #888;
  }
}
</style>
