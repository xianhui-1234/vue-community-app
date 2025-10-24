<template>
  <view class="page">
    <view class="section__title">地址管理</view>
    <view v-if="addresses.length" class="address__list">
      <view v-for="item in addresses" :key="item.id" class="address__item">
        <view class="address__info">
          <view class="address__name">{{ item.name }} {{ item.phone }}</view>
          <view class="address__detail">{{ item.full }}</view>
        </view>
        <view class="address__actions">
          <text @tap="markDefault(item)" :class="item.default ? 'is-active' : ''">默认</text>
          <text @tap="edit(item)">编辑</text>
          <text @tap="remove(item.id)">删除</text>
        </view>
      </view>
    </view>
    <view v-else class="section__empty">暂无地址，点击下方按钮添加</view>
    <button class="address__add" type="primary" @tap="add">新增地址</button>
  </view>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'AddressesPage',
  setup() {
    const addresses = reactive([
      {
        id: 'addr-1',
        name: '乐乐妈',
        phone: '138****1111',
        full: '天府新区 · 华阳街道 · 青云路 88 号',
        default: true
      }
    ]);

    const markDefault = (item) => {
      addresses.forEach((addr) => {
        addr.default = addr.id === item.id;
      });
    };

    const edit = () => {
      uni.showToast({ title: '编辑功能开发中', icon: 'none' });
    };

    const remove = (id) => {
      const index = addresses.findIndex((addr) => addr.id === id);
      if (index !== -1) {
        addresses.splice(index, 1);
      }
    };

    const add = () => {
      uni.showToast({ title: '新增地址开发中', icon: 'none' });
    };

    return {
      addresses,
      markDefault,
      edit,
      remove,
      add
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

.address__list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.address__item {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
}

.address__name {
  font-size: 30rpx;
  color: #333;
}

.address__detail {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: #777;
}

.address__actions {
  display: flex;
  gap: 24rpx;
  font-size: 24rpx;
  margin-top: 16rpx;
  color: #1e9fff;
}

.address__actions text.is-active {
  color: #27ae60;
}

.section__empty {
  margin: 160rpx 0 32rpx;
  text-align: center;
  color: #999;
}

.address__add {
  background: linear-gradient(135deg, #1e9fff, #5b8bf7);
}
</style>
