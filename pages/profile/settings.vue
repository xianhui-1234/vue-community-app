<template>
  <view class="settings">
    <view class="settings__section">
      <view class="section-title">账号安全</view>
      <view class="settings__cell" @tap="changePhone">修改手机号</view>
      <view class="settings__cell" @tap="changePassword">修改密码</view>
    </view>
    <view class="settings__section">
      <view class="section-title">隐私</view>
      <view class="settings__cell" @tap="toggleSwitch('location')">
        显示定位
        <switch
          class="settings__switch"
          :checked="settings.location"
          @change="onSwitchChange('location', $event)"
        />
      </view>
      <view class="settings__cell" @tap="toggleSwitch('recommendation')">
        接收推荐任务
        <switch
          class="settings__switch"
          :checked="settings.recommendation"
          @change="onSwitchChange('recommendation', $event)"
        />
      </view>
    </view>
    <view class="settings__section">
      <view class="section-title">关于</view>
      <view class="settings__cell" @tap="showVersion">版本信息</view>
      <view class="settings__cell" @tap="feedback">反馈与帮助</view>
    </view>
  </view>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'SettingsPage',
  setup() {
    const settings = reactive({
      location: true,
      recommendation: true
    });

    const changePhone = () => {
      uni.showToast({ title: '暂未开放', icon: 'none' });
    };

    const changePassword = () => {
      uni.showToast({ title: '暂未开放', icon: 'none' });
    };

    const toggleSwitch = (key) => {
      settings[key] = !settings[key];
    };

    const onSwitchChange = (key, event) => {
      settings[key] = event.detail.value;
    };

    const showVersion = () => {
      uni.showToast({ title: '当前版本 0.1.0', icon: 'none' });
    };

    const feedback = () => {
      uni.showToast({ title: '反馈通道建设中', icon: 'none' });
    };

    return {
      settings,
      changePhone,
      changePassword,
      toggleSwitch,
      onSwitchChange,
      showVersion,
      feedback
    };
  }
};
</script>

<style lang="scss" scoped>
.settings {
  min-height: 100vh;
  background: #f5f6fa;
  padding: 32rpx;

  &__section {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
  }

  &__cell {
    margin-top: 16rpx;
    padding: 24rpx;
    border-radius: 12rpx;
    background: #f9f9fb;
    font-size: 28rpx;
    color: #444;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__switch {
    transform: scale(0.8);
  }
}
</style>
