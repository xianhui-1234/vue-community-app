<template>
  <scroll-view class="page" scroll-y>
    <view class="section__title">我的接单</view>
    <view v-if="orders.length" class="orders__list">
      <view v-for="order in orders" :key="order.id" class="orders__item">
        <view class="orders__header">
          <text class="orders__job">{{ order.jobTitle }}</text>
          <text class="orders__status">{{ order.statusLabel }}</text>
        </view>
        <view class="orders__meta">金额 ¥{{ order.amount }} · 发布方 {{ order.publisherId }}</view>
        <view class="orders__actions">
          <button size="mini" @tap="updateProgress(order)">更新进度</button>
          <button size="mini" plain @tap="contact(order)">联系雇主</button>
        </view>
      </view>
    </view>
    <view v-else class="section__empty">近期还没有接单</view>
  </scroll-view>
</template>

<script>
import { computed } from 'vue';
import { useOrders } from './useOrders';

export default {
  name: 'OrdersAcceptedPage',
  setup() {
    const statusMap = {
      PENDING: '待托管',
      ESCROWED: '托管中',
      IN_PROGRESS: '进行中',
      COMPLETED: '已完成',
      CANCELLED: '已取消'
    };
    const { orders: rawOrders, contact } = useOrders('taker');

    const orders = computed(() =>
      rawOrders.value.map((item) => ({
        ...item,
        statusLabel: statusMap[item.status] || item.status
      }))
    );

    const updateProgress = () => {
      uni.showToast({ title: '进度更新开发中', icon: 'none' });
    };

    return {
      orders,
      contact,
      updateProgress
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

.orders__list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.orders__item {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
}

.orders__header {
  display: flex;
  justify-content: space-between;
  color: #333;
  font-size: 30rpx;
}

.orders__status {
  color: #27ae60;
}

.orders__meta {
  margin: 12rpx 0;
  font-size: 26rpx;
  color: #777;
}

.orders__actions {
  display: flex;
  gap: 16rpx;
}

.section__empty {
  margin-top: 160rpx;
  text-align: center;
  color: #999;
}
</style>
