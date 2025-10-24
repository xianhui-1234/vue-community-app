<template>
  <scroll-view class="publish" scroll-y>
    <view class="page-padding">
      <view class="publish__section">
        <view class="section-title">{{ isApplyMode ? '报名任务' : '发布任务' }}</view>
        <picker :range="categories" range-key="label" @change="selectCategory">
          <view class="publish__input">
            <text>{{ categoryLabel }}</text>
            <text class="publish__icon">⌄</text>
          </view>
        </picker>
        <textarea
          class="publish__textarea"
          v-model="form.description"
          placeholder="描述任务内容、时间、需求人群、要求及注意事项"
          maxlength="500"
          auto-height
        />
        <view class="publish__group">
          <view class="publish__group-item">
            <text class="publish__label">预算/价格</text>
            <input type="number" v-model.number="form.price" placeholder="请输入金额" />
          </view>
          <view class="publish__group-item">
            <text class="publish__label">计费单位</text>
            <picker mode="selector" :range="units" @change="selectUnit">
              <text>{{ form.unit || '次' }}</text>
            </picker>
          </view>
        </view>
        <view class="publish__field">
          <text class="publish__label">时间安排</text>
          <input v-model="form.schedule" placeholder="例如：每周二、四 16:30" />
        </view>
        <view class="publish__field">
          <text class="publish__label">服务地址</text>
          <input v-model="form.location" placeholder="请输入服务地址" />
        </view>
        <view class="publish__field">
          <text class="publish__label">联系人</text>
          <input v-model="form.contact" placeholder="联系人姓名" />
        </view>
        <view class="publish__field">
          <text class="publish__label">联系电话</text>
          <input v-model="form.contactPhone" placeholder="联系电话" />
        </view>
      </view>

      <view class="publish__section">
        <view class="section-title">图片上传</view>
        <view class="publish__images">
          <image
            v-for="image in form.images"
            :key="image"
            :src="image"
            mode="aspectFill"
            class="publish__image"
          />
          <view class="publish__upload" @tap="chooseImage">＋</view>
        </view>
      </view>

      <view class="publish__section">
        <view class="section-title">托管与验收</view>
        <switch :checked="form.requireEscrow" @change="onEscrowChange" />
        <view class="publish__tip">
          平台将托管费用，任务完成后双方确认再放款，保障资金安全。
        </view>
      </view>

      <button class="publish__submit" type="primary" @tap="submit">
        {{ isApplyMode ? '确认报名' : '提交发布' }}
      </button>
    </view>
  </scroll-view>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

export default {
  name: 'PublishPage',
  setup() {
    const form = reactive({
      category: null,
      description: '',
      price: null,
      unit: '次',
      schedule: '',
      location: '',
      contact: '',
      contactPhone: '',
      images: [],
      requireEscrow: true
    });

    const categories = [
      { label: '托管', value: 'CARE' },
      { label: '接送', value: 'SHUTTLE' },
      { label: '闲置交易', value: 'RESALE' },
      { label: '户外活动', value: 'OUTDOOR' },
      { label: '作业辅导', value: 'HOMEWORK' },
      { label: '兴趣学习', value: 'LEARNING' }
    ];

    const units = ['次', '小时', '天', '件'];
    const routeOptions = ref({});
    const isApplyMode = computed(() => routeOptions.value.mode === 'apply');
    const jobId = computed(() => routeOptions.value.jobId || '');
    const publisherId = computed(() => routeOptions.value.publisherId || 'demo-user');
    const submitting = ref(false);

    const categoryLabel = computed(() =>
      form.category && form.category.label ? form.category.label : '选择任务类型'
    );

    const selectCategory = (event) => {
      const index = event.detail.value;
      form.category = categories[index];
    };

    const selectUnit = (event) => {
      const index = event.detail.value;
      form.unit = units[index];
    };

    const chooseImage = () => {
      uni.chooseImage({
        count: 4,
        success: (res) => {
          const files = res.tempFilePaths || [];
          form.images = form.images.concat(files).slice(0, 4);
        }
      });
    };

    const onEscrowChange = (event) => {
      form.requireEscrow = event.detail.value;
    };

    const validateForm = () => {
      if (!form.category) return '请选择任务类型';
      if (!form.description) return '请填写任务描述';
      if (!form.price) return '请填写预算金额';
      if (!form.location) return '请输入服务地址';
      if (!form.contact || !form.contactPhone) return '请填写联系人信息';
      return '';
    };

    const submit = () => {
      if (submitting.value) {
        return;
      }
      submitting.value = true;

      if (isApplyMode.value) {
        if (!jobId.value) {
          uni.showToast({ title: '任务信息缺失', icon: 'none' });
          submitting.value = false;
          return;
        }
        const orderPayload = {
          jobId: jobId.value,
          takerId: 'demo-applicant',
          publisherId: publisherId.value,
          amount: Number(form.price || 0),
          escrowed: form.requireEscrow
        };
        uni.request({
          url: 'http://localhost:8080/api/orders',
          method: 'POST',
          data: orderPayload,
          success: () => {
            uni.showToast({ title: '报名成功', icon: 'success' });
            setTimeout(() => {
              uni.switchTab({ url: '/pages/messages/messages' });
            }, 500);
          },
          fail: () => {
            uni.showToast({ title: '网络异常，请稍后再试', icon: 'none' });
          },
          complete: () => {
            submitting.value = false;
          }
        });
        return;
      }

      const error = validateForm();
      if (error) {
        uni.showToast({ title: error, icon: 'none' });
        submitting.value = false;
        return;
      }

      const jobPayload = {
        title: `${form.category.label} · ${form.schedule || '灵活时间'}`,
        description: form.description,
        category: form.category.value,
        price: Number(form.price),
        unit: form.unit,
        schedule: form.schedule,
        location: form.location,
        city: routeOptions.value.city || '',
        tags: form.category ? [form.category.label] : [],
        images: form.images,
        requireEscrow: form.requireEscrow,
        publisherId: publisherId.value,
        contactName: form.contact,
        contactPhone: form.contactPhone
      };

      uni.request({
        url: 'http://localhost:8080/api/jobs',
        method: 'POST',
        data: jobPayload,
        success: () => {
          uni.showToast({ title: '发布成功', icon: 'success' });
          setTimeout(() => {
            uni.switchTab({ url: '/pages/home/home' });
          }, 500);
        },
        fail: () => {
          uni.showToast({ title: '网络异常，已存草稿', icon: 'none' });
        },
        complete: () => {
          submitting.value = false;
        }
      });
    };

    onLoad((options) => {
      routeOptions.value = options || {};
    });

    return {
      form,
      categories,
      units,
      categoryLabel,
      selectCategory,
      selectUnit,
      chooseImage,
      submit,
      onEscrowChange,
      isApplyMode
    };
  }
};
</script>

<style lang="scss" scoped>
.publish {
  min-height: 100vh;

  &__section {
    background: #fff;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
  }

  &__input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    padding: 20rpx 24rpx;
    border: 1px solid #eee;
    border-radius: 12rpx;
  }

  &__icon {
    color: #999;
  }

  &__textarea {
    margin-top: 20rpx;
    min-height: 180rpx;
    padding: 20rpx;
    border-radius: 12rpx;
    background: #f8f9fb;
    font-size: 28rpx;
  }

  &__group {
    display: flex;
    justify-content: space-between;
    margin-top: 24rpx;
    gap: 24rpx;

    &-item {
      flex: 1;
      font-size: 28rpx;
      display: flex;
      flex-direction: column;
      gap: 12rpx;
    }
  }

  &__field {
    margin-top: 24rpx;
    font-size: 28rpx;
    display: flex;
    flex-direction: column;
    gap: 12rpx;

    input {
      padding: 20rpx 24rpx;
      border: 1px solid #eee;
      border-radius: 12rpx;
    }
  }

  &__label {
    font-size: 26rpx;
    color: #666;
  }

  &__images {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }

  &__image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
  }

  &__upload {
    width: 200rpx;
    height: 200rpx;
    border: 1px dashed #ccc;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
    color: #bbb;
  }

  &__tip {
    margin-top: 16rpx;
    font-size: 24rpx;
    color: #888;
  }

  &__submit {
    margin-top: 16rpx;
    background: linear-gradient(135deg, #1e9fff, #5b8bf7);
    border: none;
  }
}
</style>
