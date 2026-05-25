<template>
  <view class="page">
    <LoadingView v-if="loading" />
    <view v-else-if="trip">
      <view class="header card">
        <text class="title">{{ trip.title }}</text>
        <text class="route">{{ trip.fromCity }} → {{ trip.toCity }}</text>
        <view class="meta">
          <text>{{ trip.days }}天</text>
          <text>{{ trip.people }}人</text>
          <text>预算 {{ formatPrice(trip.budget) }}</text>
        </view>
      </view>

      <BudgetChart v-if="budgetItems.length" :items="budgetItems" class="budget" />

      <view v-for="day in trip.dayPlans" :key="day.day" class="timeline card">
        <view class="day-header">
          <text class="day-badge">DAY {{ day.day }}</text>
          <text class="day-title">{{ day.title }}</text>
        </view>
        <view v-for="(s, i) in day.schedules" :key="i" class="schedule">
          <text class="time">{{ s.time }}</text>
          <view class="info">
            <text class="name">{{ s.title }}</text>
            <text v-if="s.description" class="desc">{{ s.description }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import LoadingView from '@/components/LoadingView/LoadingView.vue'
import BudgetChart from '@/components/BudgetChart/BudgetChart.vue'
import { useTripStore } from '@/store/trip'
import { formatPrice } from '@/utils/format'
import { mockTrip } from '@/utils/mock'
import type { TripPlan } from '@/api/trip'

const tripStore = useTripStore()
const trip = ref<TripPlan | null>(null)
const loading = ref(true)

const budgetItems = computed(() => {
  if (!trip.value) return []
  const total = trip.value.estimatedCost || trip.value.budget
  return [
    { label: '住宿', value: Math.round(total * 0.35), color: '#3B82F6' },
    { label: '餐饮', value: Math.round(total * 0.25), color: '#14B8A6' },
    { label: '门票', value: Math.round(total * 0.2), color: '#F59E0B' },
    { label: '交通', value: Math.round(total * 0.2), color: '#8B5CF6' }
  ]
})

onMounted(async () => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] as { options?: { id?: string } }
  const id = page.options?.id
  try {
    trip.value = id ? await tripStore.getTripDetail(id) : tripStore.currentTrip
  } catch {
    trip.value = { ...mockTrip, id }
  }
  loading.value = false
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg-color;
  padding: 24rpx 32rpx;
}

.header { margin-bottom: 24rpx; }

.title {
  font-size: 36rpx;
  font-weight: 600;
  display: block;
}

.route {
  font-size: 26rpx;
  color: $text-secondary;
  margin-top: 8rpx;
  display: block;
}

.meta {
  display: flex;
  gap: 20rpx;
  margin-top: 16rpx;
  font-size: 24rpx;
  color: $primary-color;
}

.budget { margin-bottom: 24rpx; }

.timeline { margin-bottom: 24rpx; }

.day-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.day-badge {
  background: $primary-color;
  color: #fff;
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
}

.day-title { font-size: 28rpx; font-weight: 500; }

.schedule {
  display: flex;
  gap: 16rpx;
  padding: 12rpx 0;
  border-bottom: 1rpx solid $border-color;
  &:last-child { border-bottom: none; }
}

.time {
  font-size: 24rpx;
  color: $primary-color;
  width: 100rpx;
  flex-shrink: 0;
}

.name { font-size: 28rpx; font-weight: 500; display: block; }
.desc { font-size: 24rpx; color: $text-secondary; margin-top: 4rpx; display: block; }
</style>
