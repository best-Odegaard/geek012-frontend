<template>
  <view class="page">
    <LoadingView v-if="loading" />
    <EmptyState v-else-if="trips.length === 0" title="暂无行程" description="去 AI 规划生成你的第一份行程吧" button-text="去规划" @action="goGenerate" />

    <scroll-view v-else scroll-y class="list">
      <TourCard v-for="trip in trips" :key="trip.id" :trip="trip" />
      <view v-for="trip in trips" :key="'action-' + trip.id" class="actions">
        <text class="action" @tap="viewTrip(trip)">查看</text>
        <text class="action" @tap="editTrip(trip)">编辑</text>
        <text class="action" @tap="copyTrip(trip)">复制</text>
        <text class="action danger" @tap="deleteTrip(trip)">删除</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TourCard from '@/components/TourCard/TourCard.vue'
import LoadingView from '@/components/LoadingView/LoadingView.vue'
import EmptyState from '@/components/EmptyState/EmptyState.vue'
import { useTripStore } from '@/store/trip'
import type { TripPlan } from '@/api/trip'

const tripStore = useTripStore()
const trips = ref<TripPlan[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    trips.value = await tripStore.loadHistory()
  } catch {
    trips.value = []
  }
  loading.value = false
})

function goGenerate() {
  uni.navigateTo({ url: '/pages/plan/survey' })
}

function viewTrip(trip: TripPlan) {
  uni.navigateTo({ url: `/pages/trip/detail?id=${trip.id}` })
}

function editTrip(trip: TripPlan) {
  uni.navigateTo({ url: `/pages/trip/edit?id=${trip.id}` })
}

async function copyTrip(trip: TripPlan) {
  uni.showToast({ title: '复制成功', icon: 'success' })
}

function deleteTrip(trip: TripPlan) {
  uni.showModal({
    title: '确认删除',
    content: '删除后不可恢复',
    success: async (res) => {
      if (res.confirm && trip.id) {
        await tripStore.deleteTrip(trip.id)
        trips.value = trips.value.filter((t) => t.id !== trip.id)
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg-color;
  padding: 24rpx 32rpx;
}

.list { height: 100vh; }

.actions {
  display: flex;
  gap: 24rpx;
  padding: 0 24rpx 24rpx;
  margin-top: -12rpx;
  margin-bottom: 24rpx;
}

.action {
  font-size: 24rpx;
  color: $primary-color;

  &.danger { color: $error-color; }
}
</style>
