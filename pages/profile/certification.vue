<template>
  <scroll-view class="certification" scroll-y>
    <view class="certification__section">
      <view class="section-title">实名认证</view>
      <view class="certification__tip">
        完成认证后可获得更多发布额度与交易保障，请准备好身份证与家庭证明等材料。
      </view>
      <view class="certification__field">
        <text class="certification__label">真实姓名</text>
        <input placeholder="请输入您的真实姓名" />
      </view>
      <view class="certification__field">
        <text class="certification__label">身份证号</text>
        <input placeholder="请输入您的身份证号码" />
      </view>
      <view class="certification__field">
        <text class="certification__label">家庭状况说明</text>
        <textarea placeholder="说明家庭成员、孩子年龄等" auto-height />
      </view>
      <view class="certification__field">
        <text class="certification__label">身份证正反面</text>
        <view class="certification__upload" @tap="chooseImage">上传图片</view>
      </view>
      <view class="certification__field">
        <text class="certification__label">育儿证明材料</text>
        <view class="certification__upload" @tap="chooseImage">上传图片</view>
      </view>
    </view>
    <button class="certification__submit" type="primary" @tap="submit">提交审核</button>
  </scroll-view>
</template>

<script>
export default {
  name: 'CertificationPage',
  setup() {
    const chooseImage = () => {
      uni.chooseImage({ count: 1 });
    };

    const submit = () => {
      uni.showToast({ title: '已提交审核', icon: 'success' });
      setTimeout(() => {
        uni.navigateBack();
      }, 600);
    };

    return {
      chooseImage,
      submit
    };
  }
};
</script>

<style lang="scss" scoped>
.certification {
  min-height: 100vh;
  background: #f5f6fa;
  padding: 32rpx;

  &__section {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 32rpx;
  }

  &__tip {
    color: #777;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }

  &__field {
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    gap: 12rpx;
  }

  &__label {
    font-size: 26rpx;
    color: #555;
  }

  input,
  textarea {
    padding: 20rpx;
    border-radius: 12rpx;
    border: 1px solid #eee;
    font-size: 28rpx;
  }

  &__upload {
    padding: 40rpx 0;
    border: 1px dashed #bbb;
    border-radius: 12rpx;
    text-align: center;
    color: #999;
    font-size: 24rpx;
  }

  &__submit {
    background: linear-gradient(135deg, #1e9fff, #5b8bf7);
  }
}
</style>
