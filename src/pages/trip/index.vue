<template>
  <view class="page page-with-tabbar">
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="title">我的行程</text>
    </view>

    <scroll-view scroll-y class="scroll-body" :style="{ paddingTop: headerHeight + 'px' }">
      <LoadingView v-if="loading" />

      <view v-else-if="trips.length === 0" class="empty soft-shadow" @tap="goSurvey">
        <text class="empty-icon">📅</text>
        <text class="empty-title">还没有行程</text>
        <text class="empty-hint">点击右下角 + 新建行程</text>
      </view>

      <view v-else class="trip-list">
        <view
          v-for="trip in trips"
          :key="String(trip.id)"
          class="trip-card soft-shadow"
          @tap="viewTrip(trip)"
        >
          <view class="trip-head">
            <text class="trip-title">{{ trip.title }}</text>
            <text class="trip-arrow">›</text>
          </view>
          <text class="trip-meta">{{ trip.toCity }} · {{ trip.days }}天 · {{ trip.people }}人</text>
          <text class="trip-date">{{ trip.createdAt || '2026-05-01' }}</text>
        </view>
      </view>

      <view style="height: 160rpx" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import LoadingView from '@/components/LoadingView/LoadingView.vue'
import { useAppStore } from '@/store/app'
import { useTripStore } from '@/store/trip'
import type { TripPlan } from '@/api/trip'

const appStore = useAppStore()
const tripStore = useTripStore()

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const headerHeight = statusBarHeight + 88

const trips = ref<TripPlan[]>([])
const loading = ref(true)

onShow(() => {
  appStore.setTabbarIndex(1)
  appStore.closeCreateMenu()
  loadTrips()
})

onMounted(() => loadTrips())

async function loadTrips() {
  loading.value = true
  trips.value = await tripStore.loadHistory()
  loading.value = false
}

function viewTrip(trip: TripPlan) {
  uni.navigateTo({ url: `/pages/trip/detail?id=${trip.id}` })
}

function goSurvey() {
  uni.navigateTo({ url: '/pages/plan/survey' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $mint-page;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $mint-page;
  padding: 0 32rpx 24rpx;
}

.title {
  font-size: 44rpx;
  font-weight: 700;
  color: $mint-text;
  line-height: 88rpx;
}

.scroll-body {
  height: 100vh;
  padding: 0 32rpx;
  box-sizing: border-box;
}

.empty {
  margin-top: 80rpx;
  padding: 80rpx 40rpx;
  background: #fff;
  border-radius: $card-radius-lg;
  text-align: center;
}

.empty-icon {
  font-size: 80rpx;
  display: block;
}

.empty-title {
  font-size: 32rpx;
  font-weight: 600;
  color: $mint-text;
  margin-top: 24rpx;
  display: block;
}

.empty-hint {
  font-size: 26rpx;
  color: $text-secondary;
  margin-top: 12rpx;
  display: block;
}

.trip-list {
  padding-top: 16rpx;
}

.trip-card {
  background: #fff;
  border-radius: $card-radius-lg;
  padding: 32rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(168, 230, 207, 0.15);
}

.trip-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trip-title {
  font-size: 32rpx;
  font-weight: 700;
  color: $mint-text;
}

.trip-arrow {
  font-size: 36rpx;
  color: $mint-text;
}

.trip-meta {
  font-size: 26rpx;
  color: $text-secondary;
  margin-top: 12rpx;
  display: block;
}

.trip-date {
  font-size: 24rpx;
  color: $mint-primary;
  margin-top: 8rpx;
  display: block;
}
</style>
