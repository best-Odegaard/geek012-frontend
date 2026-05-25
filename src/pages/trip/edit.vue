<template>
  <view class="page">
    <view class="form card">
      <view class="form-item">
        <text class="label">行程标题</text>
        <input v-model="form.title" class="input" />
      </view>
      <view class="form-row">
        <view class="form-item half">
          <text class="label">出发地</text>
          <input v-model="form.fromCity" class="input" />
        </view>
        <view class="form-item half">
          <text class="label">目的地</text>
          <input v-model="form.toCity" class="input" />
        </view>
      </view>
      <view class="form-row">
        <view class="form-item half">
          <text class="label">天数</text>
          <input v-model.number="form.days" class="input" type="number" />
        </view>
        <view class="form-item half">
          <text class="label">人数</text>
          <input v-model.number="form.people" class="input" type="number" />
        </view>
      </view>
      <view class="form-item">
        <text class="label">预算</text>
        <input v-model.number="form.budget" class="input" type="number" />
      </view>
    </view>

    <button class="btn-primary" :loading="saving" @tap="handleSave">保存修改</button>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useTripStore } from '@/store/trip'
import { mockTrip } from '@/utils/mock'
import type { TripPlan } from '@/api/trip'

const tripStore = useTripStore()
const saving = ref(false)
const tripId = ref<string | number>('')

const form = reactive<Partial<TripPlan>>({
  title: '',
  fromCity: '',
  toCity: '',
  days: 3,
  people: 2,
  budget: 3000
})

onMounted(async () => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] as { options?: { id?: string } }
  tripId.value = page.options?.id || ''
  try {
    const trip = tripId.value ? await tripStore.getTripDetail(tripId.value) : mockTrip
    Object.assign(form, trip)
  } catch {
    Object.assign(form, mockTrip)
  }
})

async function handleSave() {
  saving.value = true
  try {
    if (tripId.value) {
      await tripStore.saveTrip(form as TripPlan)
    }
    uni.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1000)
  } catch {
    uni.showToast({ title: '保存成功（演示）', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1000)
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg-color;
  padding: 24rpx 32rpx;
}

.form-item {
  margin-bottom: 24rpx;
  &.half { flex: 1; }
}

.form-row {
  display: flex;
  gap: 20rpx;
}

.label {
  font-size: 26rpx;
  color: $text-secondary;
  margin-bottom: 8rpx;
  display: block;
}

.input {
  height: 80rpx;
  padding: 0 20rpx;
  background: $bg-color;
  border-radius: 12rpx;
  font-size: 28rpx;
}
</style>
