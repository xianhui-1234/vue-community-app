import { defineStore } from 'pinia';

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function formatRelativeTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const diff = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) {
    return '刚刚';
  }
  if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`;
  }
  if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`;
  }
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  return `${month}月${dayOfMonth}日`;
}

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    filter: {
      city: '',
      distance: 5,
      keyword: '',
      tags: []
    },
    jobs: [],
    favorites: [],
    discussions: [],
    messages: []
  }),
  actions: {
    setJobs(jobs) {
      const data = Array.isArray(jobs) ? jobs : [];
      this.jobs = data.map((job) => {
        const tags = normalizeArray(job.tags);
        const images = normalizeArray(job.images);
        const publisher = job.publisher
          ? job.publisher
          : job.contactName
          ? {
              nickname: job.contactName,
              verified: Boolean(job.requireEscrow)
            }
          : null;
        return {
          ...job,
          tags,
          images,
          publisher
        };
      });
    },
    setDiscussions(posts) {
      const data = Array.isArray(posts) ? posts : [];
      this.discussions = data.map((post) => ({
        ...post,
        images: normalizeArray(post.images),
        likes: typeof post.likes === 'number' ? post.likes : 0,
        favorites: typeof post.favorites === 'number' ? post.favorites : 0,
        comments: typeof post.comments === 'number' ? post.comments : 0,
        createdAtLabel: formatRelativeTime(post.createdAt)
      }));
    },
    setMessages(messages) {
      this.messages = Array.isArray(messages) ? messages : [];
    },
    toggleFavorite(jobId) {
      if (this.favorites.includes(jobId)) {
        this.favorites = this.favorites.filter((id) => id !== jobId);
      } else {
        this.favorites.push(jobId);
      }
    },
    updateFilter(filter) {
      this.filter = { ...this.filter, ...filter };
    }
  }
});
