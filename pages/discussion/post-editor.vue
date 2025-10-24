<template>
  <view class="post-editor">
    <view class="post-editor__field">
      <picker mode="selector" :range="categories" @change="updateCategory">
        <view class="post-editor__picker">{{ selectedCategory.label }}</view>
      </picker>
    </view>
    <textarea
      class="post-editor__textarea"
      v-model="form.content"
      placeholder="分享心得、提问或发布活动信息"
      auto-height
      maxlength="500"
    />
    <view class="post-editor__images">
      <image
        v-for="image in form.images"
        :key="image"
        :src="image"
        mode="aspectFill"
        class="post-editor__image"
      />
      <view class="post-editor__upload" @tap="addImage">＋</view>
    </view>
    <button class="post-editor__submit" type="primary" @tap="submit">发布</button>
    <view class="post-editor__tips">内容将经过平台审核，请勿发布广告或不实信息。</view>
  </view>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  name: 'PostEditorPage',
  setup() {
    const categories = ['推荐', '同城', '托育经验', '闲置互换'];
    const form = reactive({
      content: '',
      images: []
    });
    const selectedCategory = ref({ label: '推荐', value: 'recommend' });

    const updateCategory = (event) => {
      const index = event.detail.value;
      const options = [
        { label: '推荐', value: 'recommend' },
        { label: '同城', value: 'local' },
        { label: '托育经验', value: 'care' },
        { label: '闲置互换', value: 'resale' }
      ];
      selectedCategory.value = options[index];
    };

    const addImage = () => {
      uni.chooseImage({
        count: 3,
        success: ({ tempFilePaths }) => {
          form.images = [...form.images, ...tempFilePaths].slice(0, 3);
        }
      });
    };

    const submit = () => {
      if (!form.content.trim()) {
        uni.showToast({ title: '请输入内容', icon: 'none' });
        return;
      }
      uni.showToast({ title: '已提交审核', icon: 'success' });
      setTimeout(() => {
        uni.navigateBack();
      }, 600);
    };

    return {
      categories,
      form,
      selectedCategory,
      updateCategory,
      addImage,
      submit
    };
  }
};
</script>

<style lang="scss" scoped>
.post-editor {
  min-height: 100vh;
  background: #f5f6fa;
  padding: 32rpx;

  &__field {
    margin-bottom: 24rpx;
  }

  &__picker {
    background: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    font-size: 28rpx;
    color: #333;
  }

  &__textarea {
    background: #fff;
    border-radius: 12rpx;
    padding: 24rpx;
    font-size: 28rpx;
    min-height: 200rpx;
  }

  &__images {
    display: flex;
    gap: 16rpx;
    margin-top: 24rpx;
  }

  &__image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
  }

  &__upload {
    width: 200rpx;
    height: 200rpx;
    background: #fff;
    border: 1px dashed #ccc;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
    color: #bbb;
  }

  &__submit {
    margin-top: 32rpx;
    background: linear-gradient(135deg, #1e9fff, #5b8bf7);
  }

  &__tips {
    margin-top: 16rpx;
    font-size: 24rpx;
    color: #999;
  }
}
</style>
