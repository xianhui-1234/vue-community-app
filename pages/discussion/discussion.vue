<template>
  <scroll-view class="discussion" scroll-y>
    <view class="page-padding">
      <view class="discussion__tabs">
        <view
          v-for="tab in tabs"
          :key="tab.value"
          :class="['discussion__tab', currentTab === tab.value ? 'is-active' : '']"
          @tap="switchTab(tab.value)"
        >
          {{ tab.label }}
        </view>
        <view class="discussion__publish" @tap="goPublishPost">＋ 发帖</view>
      </view>

      <post-card
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        @like="likePost"
        @comment="openComments"
        @favorite="favoritePost"
        @share="sharePost"
      />
    </view>
  </scroll-view>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import PostCard from '../../components/PostCard.vue';
import { useJobsStore } from '../../store/useJobsStore';

export default {
  name: 'DiscussionPage',
  components: {
    PostCard
  },
  setup() {
    const jobsStore = useJobsStore();
    const currentTab = ref('recommend');
    const tabs = [
      { label: '推荐', value: 'recommend' },
      { label: '同城', value: 'local' },
      { label: '托育经验', value: 'care' },
      { label: '闲置互换', value: 'resale' }
    ];

    const filteredPosts = computed(() => {
      const list = jobsStore.discussions || [];
      if (currentTab.value === 'recommend') {
        return list;
      }
      return list.filter((post) => post.category === currentTab.value);
    });

    const switchTab = (value) => {
      currentTab.value = value;
    };

    const goPublishPost = () => {
      uni.navigateTo({ url: '/pages/discussion/post-editor' });
    };

    const likePost = (postId) => {
      uni.showToast({ title: `已点赞 ${postId}`, icon: 'none' });
    };

    const favoritePost = (postId) => {
      uni.showToast({ title: `已收藏 ${postId}`, icon: 'none' });
    };

    const sharePost = (postId) => {
      uni.showToast({ title: `分享 ${postId}`, icon: 'none' });
    };

    const openComments = (postId) => {
      uni.navigateTo({ url: `/pages/discussion/comments?postId=${postId}` });
    };

    const getFallbackPosts = () => [
      {
        id: 'post-1',
        nickname: '诺诺妈妈',
        city: '锦江区',
        createdAt: '1小时前',
        category: 'recommend',
        content: '分享一个临时托管的靠谱姐姐，孩子很喜欢，地址在牛市口附近。',
        images: [],
        likes: 12,
        comments: 4,
        favorites: 6
      },
      {
        id: 'post-2',
        nickname: '自由的风',
        city: '天府新区',
        createdAt: '2小时前',
        category: 'resale',
        content: '闲置绘本一套（适合4-6岁），九成新，有需要的姐妹可换纸尿裤或托管体验券。',
        images: [],
        likes: 8,
        comments: 3,
        favorites: 10
      }
    ];

    const fetchPosts = () => {
      uni.request({
        url: 'http://localhost:8080/api/posts',
        method: 'GET',
        success: (res) => {
          const responseData = res.data && res.data.data ? res.data.data : [];
          jobsStore.setDiscussions(responseData);
        },
        fail: () => {
          jobsStore.setDiscussions(getFallbackPosts());
        }
      });
    };

    onMounted(() => {
      fetchPosts();
    });

    return {
      tabs,
      currentTab,
      filteredPosts,
      switchTab,
      goPublishPost,
      likePost,
      favoritePost,
      sharePost,
      openComments
    };
  }
};
</script>

<style lang="scss" scoped>
.discussion {
  min-height: 100vh;

  &__tabs {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin: 24rpx 0;
    flex-wrap: wrap;
  }

  &__tab {
    padding: 16rpx 28rpx;
    border-radius: 32rpx;
    background: #f0f4ff;
    color: #666;
    font-size: 26rpx;

    &.is-active {
      background: #1e9fff;
      color: #fff;
    }
  }

  &__publish {
    margin-left: auto;
    padding: 16rpx 24rpx;
    border-radius: 32rpx;
    background: linear-gradient(135deg, #1e9fff, #5b8bf7);
    color: #fff;
    font-size: 26rpx;
  }
}
</style>
