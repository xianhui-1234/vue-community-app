<template>
  <scroll-view class="messages" scroll-y>
    <view class="page-padding">
      <view class="messages__section">
        <view class="section-title">提醒</view>
        <view
          v-for="item in notificationGroups"
          :key="item.type"
          class="messages__card"
          @tap="openGroup(item.type)"
        >
          <view class="messages__card-header">
            <text class="messages__card-icon">{{ item.icon }}</text>
            <text class="messages__card-title">{{ item.title }}</text>
            <text class="messages__card-count" v-if="item.unread">{{ item.unread }}</text>
          </view>
          <view class="messages__card-desc">{{ item.description }}</view>
        </view>
      </view>

      <view class="messages__section">
        <view class="section-title">会话</view>
        <view v-for="conversation in conversations" :key="conversation.id" class="messages__conversation">
          <image :src="conversation.avatar" class="messages__avatar" />
          <view class="messages__conversation-body">
            <view class="messages__conversation-header">
              <text class="messages__name">{{ conversation.name }}</text>
              <text class="messages__time">{{ conversation.updatedAt }}</text>
            </view>
            <view class="messages__preview">{{ conversation.preview }}</view>
          </view>
          <view class="messages__status" v-if="conversation.unread">{{ conversation.unread }}</view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { onMounted } from 'vue';
import { useJobsStore } from '../../store/useJobsStore';

export default {
  name: 'MessagesPage',
  setup() {
    const jobsStore = useJobsStore();

    const notificationGroups = [
      {
        type: 'likes',
        title: '赞与收藏',
        description: '有人点赞或收藏了你的帖子',
        icon: '❤️',
        unread: 2
      },
      {
        type: 'replies',
        title: '评论与@我',
        description: '新的评论、回复、提及通知',
        icon: '💬',
        unread: 1
      },
      {
        type: 'followers',
        title: '新增粉丝',
        description: '新的关注提醒',
        icon: '⭐',
        unread: 0
      }
    ];

    const conversations = [
      {
        id: 'conv-1',
        name: '乐乐妈（托管任务）',
        avatar: 'https://dummyimage.com/100x100/ffe0e0/ff6b6b&text=L',
        preview: '好的，我这边会准时到达，孩子喜欢画画嘛？',
        updatedAt: '下午 14:32',
        unread: 1
      },
      {
        id: 'conv-2',
        name: '平台客服小帮手',
        avatar: 'https://dummyimage.com/100x100/e0f3ff/1e9fff&text=K',
        preview: '您提交的实名认证正在审核中，请耐心等待。',
        updatedAt: '上午 09:20',
        unread: 0
      }
    ];

    const openGroup = (type) => {
      uni.showToast({ title: `${type} 功能开发中`, icon: 'none' });
    };

    const fetchMessages = () => {
      if (!jobsStore.messages.length) {
        jobsStore.setMessages(conversations);
      }
    };

    onMounted(() => {
      fetchMessages();
    });

    return {
      notificationGroups,
      conversations,
      openGroup
    };
  }
};
</script>

<style lang="scss" scoped>
.messages {
  min-height: 100vh;

  &__section {
    margin-top: 24rpx;
  }

  &__card {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 16rpx;
    box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  &__card-header {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }

  &__card-icon {
    font-size: 36rpx;
  }

  &__card-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
  }

  &__card-count {
    margin-left: auto;
    background: #ff6b6b;
    color: #fff;
    font-size: 22rpx;
    padding: 4rpx 14rpx;
    border-radius: 24rpx;
  }

  &__card-desc {
    margin-top: 12rpx;
    color: #777;
    font-size: 24rpx;
  }

  &__conversation {
    display: flex;
    gap: 20rpx;
    align-items: center;
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 16rpx;
  }

  &__avatar {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
  }

  &__conversation-body {
    flex: 1;
  }

  &__conversation-header {
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;
    color: #333;
  }

  &__preview {
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #777;
  }

  &__status {
    background: #ff6b6b;
    color: #fff;
    font-size: 22rpx;
    padding: 4rpx 14rpx;
    border-radius: 24rpx;
  }
}
</style>
