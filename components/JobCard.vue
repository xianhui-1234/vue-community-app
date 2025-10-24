<template>
  <view class="job-card" @tap="$emit('select', job)">
    <view class="job-card__header">
      <view class="job-card__title">{{ job.title }}</view>
      <view class="job-card__price">¥{{ job.price }}/{{ job.unit || '次' }}</view>
    </view>
    <view class="job-card__subtitle">{{ job.location }} · {{ job.schedule }}</view>
    <view class="job-card__tags">
      <view v-for="tag in job.tags" :key="tag" class="job-card__tag">{{ tag }}</view>
    </view>
    <view class="job-card__footer">
      <view class="job-card__publisher">
        <image
          v-if="job.publisher && job.publisher.avatar"
          :src="job.publisher.avatar"
          class="job-card__avatar"
        />
        <text>{{ publisherName }}</text>
        <text class="job-card__badges" v-if="isVerified">已认证</text>
      </view>
      <view class="job-card__actions">
        <view class="job-card__button job-card__button--primary" @tap.stop="$emit('apply', job)">报名</view>
        <view class="job-card__button job-card__button--plain" @tap.stop="$emit('contact', job)">联系</view>
        <view
          :class="[
            'job-card__favorite',
            favorites && favorites.has && favorites.has(job.id) ? 'is-active' : ''
          ]"
          @tap.stop="$emit('favorite', job.id)"
        >
          ❤
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true
    },
    favorites: {
      type: Object,
      default: null
    }
  },
  computed: {
    publisherName() {
      if (this.job && this.job.publisher && this.job.publisher.nickname) {
        return this.job.publisher.nickname;
      }
      if (this.job && this.job.contactName) {
        return this.job.contactName;
      }
      return '匿名用户';
    },
    isVerified() {
      if (this.job && this.job.publisher && typeof this.job.publisher.verified === 'boolean') {
        return this.job.publisher.verified;
      }
      return Boolean(this.job && this.job.requireEscrow);
    }
  }
};
</script>

<style lang="scss" scoped>
.job-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 34rpx;
    font-weight: 600;
    color: #333;
  }

  &__price {
    font-size: 30rpx;
    color: #ff6b6b;
    font-weight: 600;
  }

  &__subtitle {
    margin-top: 12rpx;
    font-size: 26rpx;
    color: #888;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16rpx;
  }

  &__tag {
    font-size: 24rpx;
    color: #1e9fff;
    background: rgba(30, 159, 255, 0.1);
    padding: 8rpx 16rpx;
    border-radius: 24rpx;
    margin-right: 12rpx;
    margin-bottom: 12rpx;
  }

  &__footer {
    margin-top: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__publisher {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #555;
  }

  &__avatar {
    width: 52rpx;
    height: 52rpx;
    border-radius: 50%;
    margin-right: 12rpx;
  }

  &__badges {
    font-size: 22rpx;
    color: #27ae60;
    margin-left: 12rpx;
    padding: 4rpx 14rpx;
    background: rgba(39, 174, 96, 0.12);
    border-radius: 32rpx;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12rpx;
  }

  &__favorite {
    font-size: 30rpx;
    line-height: 1;
    color: #bbb;

    &.is-active {
      color: #ff6b6b;
    }
  }

  &__button {
    padding: 16rpx 36rpx;
    font-size: 26rpx;
    border-radius: 32rpx;
    text-align: center;
  }

  &__button--primary {
    background-color: #1e9fff;
    color: #fff;
  }

  &__button--plain {
    background-color: rgba(30, 159, 255, 0.08);
    color: #1e9fff;
  }
}
</style>
