<template>
  <scroll-view class="profile" scroll-y>
    <view class="profile__header">
      <image class="profile__avatar" src="https://dummyimage.com/200x200/f5a9a9/ffffff&text=U" />
      <view class="profile__info">
        <view class="profile__name">
          乐乐妈
          <text class="profile__badge">实名认证</text>
        </view>
        <view class="profile__meta">成都 · 宝妈 | 宝宝3岁</view>
        <view class="profile__stats">
          <view class="profile__stat">
            <text class="profile__stat-number">12</text>
            <text class="profile__stat-label">发布</text>
          </view>
          <view class="profile__stat">
            <text class="profile__stat-number">28</text>
            <text class="profile__stat-label">接单</text>
          </view>
          <view class="profile__stat">
            <text class="profile__stat-number">4.9</text>
            <text class="profile__stat-label">评分</text>
          </view>
        </view>
      </view>
    </view>

    <view class="profile__section">
      <view class="section-title">我的交易</view>
      <view class="profile__grid">
        <view class="profile__grid-item" v-for="item in tradeShortcuts" :key="item.title" @tap="navigate(item.path)">
          <text class="profile__grid-icon">{{ item.icon }}</text>
          <text>{{ item.title }}</text>
        </view>
      </view>
    </view>

    <view class="profile__section">
      <view class="section-title">权益中心</view>
      <view class="profile__card" @tap="openMembership">
        <view>
          <view class="profile__card-title">会员中心</view>
          <view class="profile__card-desc">解锁专属保障、优先审核、专属客服</view>
        </view>
        <text class="profile__card-action">开通</text>
      </view>
      <view class="profile__card" @tap="openCertification">
        <view>
          <view class="profile__card-title">实名认证</view>
          <view class="profile__card-desc">完善身份信息，提高接单可信度</view>
        </view>
        <text class="profile__card-action">去认证</text>
      </view>
    </view>

    <view class="profile__section">
      <view class="section-title">常用功能</view>
      <view v-for="item in shortcuts" :key="item.title" class="profile__cell" @tap="navigate(item.path)">
        <text>{{ item.title }}</text>
        <text class="profile__cell-icon">〉</text>
      </view>
    </view>

    <view class="profile__section">
      <view class="section-title">客服与设置</view>
      <view class="profile__cell" @tap="contactService">在线客服</view>
      <view class="profile__cell" @tap="openSettings">设置</view>
      <view class="profile__cell profile__cell--danger" @tap="logout">退出登录</view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'ProfilePage',
  setup() {
    const tradeShortcuts = [
      { title: '我的发布', icon: '📝', path: '/pages/profile/publish' },
      { title: '我发出的', icon: '🧾', path: '/pages/profile/orders' },
      { title: '我的接单', icon: '🤝', path: '/pages/profile/accept' },
      { title: '评价管理', icon: '⭐', path: '/pages/profile/reviews' }
    ];

    const shortcuts = [
      { title: '收藏', path: '/pages/profile/favorites' },
      { title: '浏览历史', path: '/pages/profile/history' },
      { title: '关注', path: '/pages/profile/following' },
      { title: '充值中心', path: '/pages/profile/topup' },
      { title: '地址管理', path: '/pages/profile/addresses' }
    ];

    const navigate = (path) => {
      uni.navigateTo({ url: path });
    };

    const openMembership = () => {
      uni.navigateTo({ url: '/pages/profile/membership' });
    };

    const openCertification = () => {
      uni.navigateTo({ url: '/pages/profile/certification' });
    };

    const contactService = () => {
      uni.navigateTo({ url: '/pages/profile/support' });
    };

    const openSettings = () => {
      uni.navigateTo({ url: '/pages/profile/settings' });
    };

    const logout = () => {
      uni.showModal({
        title: '退出登录',
        content: '确定退出当前账号吗？',
        success: (res) => {
          if (res.confirm) {
            uni.reLaunch({ url: '/pages/home/home' });
          }
        }
      });
    };

    return {
      tradeShortcuts,
      shortcuts,
      navigate,
      openMembership,
      openCertification,
      contactService,
      openSettings,
      logout
    };
  }
};
</script>

<style lang="scss" scoped>
.profile {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffe9f0 0%, #f5f6fb 40%);

  &__header {
    display: flex;
    padding: 60rpx 32rpx 40rpx;
    align-items: center;
    gap: 24rpx;
  }

  &__avatar {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    border: 6rpx solid #fff;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
  }

  &__info {
    flex: 1;
    color: #333;
  }

  &__name {
    font-size: 36rpx;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 12rpx;
  }

  &__badge {
    font-size: 22rpx;
    color: #1e9fff;
    background: rgba(30, 159, 255, 0.12);
    padding: 6rpx 18rpx;
    border-radius: 24rpx;
  }

  &__meta {
    margin-top: 8rpx;
    color: #666;
    font-size: 26rpx;
  }

  &__stats {
    margin-top: 20rpx;
    display: flex;
    gap: 24rpx;
  }

  &__stat {
    text-align: center;
  }

  &__stat-number {
    font-size: 32rpx;
    font-weight: 600;
  }

  &__stat-label {
    display: block;
    font-size: 24rpx;
    color: #777;
  }

  &__section {
    margin-top: 16rpx;
    padding: 0 32rpx 24rpx;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20rpx;
    margin-top: 16rpx;
  }

  &__grid-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    text-align: center;
    font-size: 24rpx;
    color: #444;
    box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  &__grid-icon {
    display: block;
    font-size: 40rpx;
    margin-bottom: 12rpx;
  }

  &__card {
    margin-top: 16rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  &__card-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
  }

  &__card-desc {
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #777;
  }

  &__card-action {
    font-size: 26rpx;
    color: #1e9fff;
  }

  &__cell {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    font-size: 28rpx;
    color: #444;
    margin-top: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);

    &--danger {
      color: #ff6b6b;
    }
  }

  &__cell-icon {
    color: #999;
  }
}
</style>
