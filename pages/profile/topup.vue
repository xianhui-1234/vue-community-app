<template>
  <view class="page">
    <view class="section__title">充值中心</view>
    <view class="balance">余额：¥{{ balance.toFixed(2) }}</view>
    <view class="packages">
      <view
        v-for="pkg in packages"
        :key="pkg.id"
        :class="['package', selected === pkg.id ? 'is-active' : '']"
        @tap="() => (selected = pkg.id)"
      >
        <text class="package__amount">¥{{ pkg.amount }}</text>
        <text class="package__bonus">赠送 ¥{{ pkg.bonus }}</text>
      </view>
    </view>
    <button class="action" type="primary" @tap="recharge">立即充值</button>
    <view class="tips">充值完成后可用于托管、下单支付等，余额支持随时提现。</view>
  </view>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  name: 'TopupPage',
  setup() {
    const balance = ref(86.5);
    const selected = ref('pkg-2');
    const packages = reactive([
      { id: 'pkg-1', amount: 100, bonus: 5 },
      { id: 'pkg-2', amount: 200, bonus: 15 },
      { id: 'pkg-3', amount: 500, bonus: 50 }
    ]);

    const recharge = () => {
      uni.showToast({ title: '支付接入中', icon: 'none' });
    };

    return {
      balance,
      packages,
      selected,
      recharge
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
}

.balance {
  margin: 24rpx 0;
  font-size: 30rpx;
  color: #333;
}

.packages {
  display: flex;
  gap: 20rpx;
  margin-bottom: 32rpx;
}

.package {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  text-align: center;
  border: 2rpx solid transparent;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.04);
}

.package.is-active {
  border-color: #1e9fff;
}

.package__amount {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}

.package__bonus {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #1e9fff;
}

.action {
  background: linear-gradient(135deg, #1e9fff, #5b8bf7);
}

.tips {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: #999;
}
</style>
