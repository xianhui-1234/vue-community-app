<template>
  <view class="comments">
    <view class="comments__header">
      <text class="comments__title">帖子评论</text>
      <text class="comments__count">共 {{ comments.length }} 条</text>
    </view>

    <view class="comments__list" v-if="comments.length">
      <view v-for="item in comments" :key="item.id" class="comments__item">
        <view class="comments__meta">
          <text class="comments__author">{{ item.author }}</text>
          <text class="comments__time">{{ item.time }}</text>
        </view>
        <view class="comments__content">{{ item.content }}</view>
        <view class="comments__actions">
          <text @tap="reply(item)">回复</text>
          <text @tap="like(item.id)">赞 {{ item.likes }}</text>
          <text @tap="report(item.id)">举报</text>
        </view>
      </view>
    </view>

    <view class="comments__empty" v-else>暂无评论，快来抢沙发！</view>

    <view class="comments__editor">
      <textarea
        v-model="content"
        class="comments__textarea"
        placeholder="说点什么..."
        auto-height
      />
      <button type="primary" class="comments__submit" @tap="submit">发布</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CommentsPage',
  setup() {
    const content = ref('');
    const comments = ref([{
      id: 'c1',
      author: '暖阳',
      time: '2分钟前',
      content: '这位阿姨带孩子很细心，之前合作过，强烈推荐。',
      likes: 3
    }]);

    const submit = () => {
      const text = content.value.trim();
      if (!text) {
        uni.showToast({ title: '请输入评论内容', icon: 'none' });
        return;
      }
      comments.value = [
        {
          id: `local-${Date.now()}`,
          author: '我',
          time: '刚刚',
          content: text,
          likes: 0
        },
        ...comments.value
      ];
      content.value = '';
      uni.showToast({ title: '评论成功', icon: 'success' });
    };

    const reply = (item) => {
      content.value = `@${item.author} `;
    };

    const like = () => {
      uni.showToast({ title: '点赞成功', icon: 'none' });
    };

    const report = () => {
      uni.showModal({
        title: '举报评论',
        content: '确认举报该评论？',
        success: ({ confirm }) => {
          if (confirm) {
            uni.showToast({ title: '已提交审核', icon: 'none' });
          }
        }
      });
    };

    return {
      comments,
      content,
      submit,
      reply,
      like,
      report
    };
  }
};
</script>

<style lang="scss" scoped>
.comments {
  padding: 32rpx;
  min-height: 100vh;
  background: #f5f6fa;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
  }

  &__title {
    font-size: 34rpx;
    font-weight: 600;
  }

  &__count {
    font-size: 26rpx;
    color: #999;
  }

  &__list {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
  }

  &__item {
    padding-bottom: 24rpx;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;
    color: #666;
  }

  &__author {
    font-weight: 600;
    color: #333;
  }

  &__content {
    margin: 12rpx 0;
    font-size: 28rpx;
    line-height: 1.5;
    color: #444;
  }

  &__actions {
    display: flex;
    gap: 24rpx;
    font-size: 24rpx;
    color: #1e9fff;
  }

  &__empty {
    margin: 120rpx 0;
    text-align: center;
    font-size: 26rpx;
    color: #999;
  }

  &__editor {
    margin-top: 32rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
  }

  &__textarea {
    width: 100%;
    min-height: 168rpx;
    background: #f5f6fa;
    border-radius: 12rpx;
    padding: 20rpx;
    font-size: 28rpx;
  }

  &__submit {
    margin-top: 24rpx;
    background: linear-gradient(135deg, #1e9fff, #5b8bf7);
  }
}
</style>
