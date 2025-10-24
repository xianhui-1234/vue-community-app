<template>
  <view class="page">
    <view class="section__title">关注列表</view>
    <view v-if="following.length" class="list">
      <view v-for="item in following" :key="item.id" class="list__item" @tap="openProfile(item)">
        <view class="list__avatar">{{ item.initial }}</view>
        <view class="list__info">
          <view class="list__name">{{ item.name }}</view>
          <view class="list__meta">{{ item.city }} · {{ item.tags.join(' / ') }}</view>
        </view>
        <view class="list__action" @tap.stop="toggleFollow(item.id)">
          {{ item.following ? '已关注' : '关注' }}
        </view>
      </view>
    </view>
    <view v-else class="section__empty">还没有关注的宝妈，去讨论区多交流吧～</view>
  </view>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'FollowingPage',
  setup() {
    const following = reactive([
      {
        id: 'f1',
        name: '乐乐妈',
        initial: '乐',
        city: '天府新区',
        tags: ['托管', '亲子活动'],
        following: true
      }
    ]);

    const toggleFollow = (id) => {
      const target = following.find((item) => item.id === id);
      if (target) {
        target.following = !target.following;
      }
    };

    const openProfile = () => {
      uni.showToast({ title: '个人主页开发中', icon: 'none' });
    };

    return {
      following,
      toggleFollow,
      openProfile
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

.list {
  background: #fff;
  border-radius: 16rpx;
  padding: 16rpx;
}

.list__item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f0f0;
}

.list__item:last-child {
  border-bottom: none;
}

.list__avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: #1e9fff;
  color: #fff;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.list__info {
  flex: 1;
}

.list__name {
  font-size: 30rpx;
  color: #333;
}

.list__meta {
  font-size: 24rpx;
  color: #888;
  margin-top: 6rpx;
}

.list__action {
  font-size: 26rpx;
  color: #1e9fff;
  padding: 8rpx 20rpx;
  border: 1px solid #1e9fff;
  border-radius: 32rpx;
}

.section__empty {
  margin-top: 180rpx;
  text-align: center;
  color: #999;
}
</style>
