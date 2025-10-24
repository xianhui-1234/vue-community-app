<template>
  <view class="post-card" @tap="$emit('select', post)">
    <view class="post-card__header">
      <image v-if="post.avatar" :src="post.avatar" class="post-card__avatar" />
      <view>
        <view class="post-card__nickname">{{ post.nickname }}</view>
        <view class="post-card__meta">{{ post.city }} · {{ post.createdAtLabel || post.createdAt }}</view>
      </view>
    </view>
    <view class="post-card__content">{{ post.content }}</view>
    <view v-if="post.images && post.images.length" class="post-card__images">
      <image
        v-for="image in post.images"
        :key="image"
        :src="image"
        mode="aspectFill"
        class="post-card__image"
      />
    </view>
    <view class="post-card__footer">
      <view class="post-card__action" @tap.stop="$emit('like', post.id)">
        👍 {{ post.likes }}
      </view>
      <view class="post-card__action" @tap.stop="$emit('comment', post.id)">
        💬 {{ post.comments }}
      </view>
      <view class="post-card__action" @tap.stop="$emit('favorite', post.id)">
        ⭐ {{ post.favorites }}
      </view>
      <view class="post-card__action" @tap.stop="$emit('share', post.id)">
        🔁 分享
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.post-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);

  &__header {
    display: flex;
    align-items: center;
  }

  &__avatar {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    margin-right: 16rpx;
  }

  &__nickname {
    font-size: 30rpx;
    font-weight: 600;
    color: #333;
  }

  &__meta {
    font-size: 24rpx;
    color: #888;
  }

  &__content {
    margin: 20rpx 0;
    font-size: 28rpx;
    line-height: 1.5;
    color: #444;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
  }

  &__image {
    width: 100%;
    height: 180rpx;
    border-radius: 12rpx;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    font-size: 24rpx;
    color: #666;
  }

  &__action {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }
}
</style>
