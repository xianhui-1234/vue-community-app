<template>
  <view class="filter-bar">
    <picker mode="selector" :range="cityOptions" @change="updateCity">
      <view class="filter-bar__item">
        <text>{{ currentFilter.city || '全城' }}</text>
        <text class="filter-bar__icon">⌄</text>
      </view>
    </picker>
    <picker mode="selector" :range="distanceOptions" @change="updateDistance">
      <view class="filter-bar__item">
        <text>{{ currentFilter.distance }}km</text>
        <text class="filter-bar__icon">⌄</text>
      </view>
    </picker>
    <view class="filter-bar__item" @tap="$emit('openTags')">
      <text>筛选</text>
      <text class="filter-bar__icon">🎯</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    filter: {
      type: Object,
      default() {
        return {
          city: '',
          distance: 5,
          keyword: '',
          tags: []
        };
      }
    }
  },
  emits: ['update:filter', 'openTags'],
  data() {
    return {
      cityOptions: ['全城', '天府新区', '锦江区', '成华区', '高新区'],
      distanceOptions: [3, 5, 10, 15, 30]
    };
  },
  computed: {
    currentFilter() {
      const defaultFilter = {
        city: '',
        distance: 5,
        keyword: '',
        tags: []
      };
      if (!this.filter || typeof this.filter !== 'object') {
        return defaultFilter;
      }
      return Object.assign({}, defaultFilter, this.filter);
    }
  },
  methods: {
    updateCity(event) {
      const index = event.detail.value;
      const city = index === 0 ? '' : this.cityOptions[index];
      this.$emit('update:filter', Object.assign({}, this.currentFilter, { city }));
    },
    updateDistance(event) {
      const index = event.detail.value;
      const distance = this.distanceOptions[index];
      this.$emit('update:filter', Object.assign({}, this.currentFilter, { distance }));
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 16rpx 24rpx;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.04);

  &__item {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 28rpx;
    color: #444;
  }

  &__icon {
    font-size: 26rpx;
    color: #999;
  }
}
</style>
