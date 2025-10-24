import { computed, reactive } from 'vue';
export function useOrders(mode) {
  const state = reactive({
    orders: sampleOrders()
  });

  const filtered = computed(() => {
    if (mode === 'publisher') {
      return state.orders.filter((order) => order.publisherId === 'demo-user');
    }
    if (mode === 'taker') {
      return state.orders.filter((order) => order.takerId === 'demo-applicant');
    }
    return state.orders;
  });

  const track = () => {
    uni.showToast({ title: '订单详情开发中', icon: 'none' });
  };

  const contact = () => {
    uni.switchTab({ url: '/pages/messages/messages' });
  };

  return {
    orders: filtered,
    track,
    contact
  };
}

function sampleOrders() {
  return [
    {
      id: 'order-1',
      jobId: 'job-1',
      jobTitle: '周末半日托管',
      publisherId: 'demo-user',
      takerId: 'helper-1',
      status: 'IN_PROGRESS',
      amount: 120
    },
    {
      id: 'order-2',
      jobId: 'job-2',
      jobTitle: '小学放学接送',
      publisherId: 'demo-user',
      takerId: '',
      status: 'ESCROWED',
      amount: 40
    },
    {
      id: 'order-3',
      jobId: 'job-3',
      jobTitle: '旧婴儿推车转让',
      publisherId: 'other-user',
      takerId: 'demo-applicant',
      status: 'COMPLETED',
      amount: 200
    }
  ];
}
