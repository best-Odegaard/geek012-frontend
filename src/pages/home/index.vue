<template>
  <view class="page page-with-tabbar">
    <!-- 顶部导航 -->
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="header-inner">
        <view class="brand">
          <view class="logo">⛰</view>
          <text class="brand-name">TourLing 途灵</text>
        </view>
        <view class="header-actions">
          <text class="action-icon" @tap="goSearch">🔍</text>
          <view class="avatar-wrap" @tap="goProfile">
            <view class="avatar-circle" />
          </view>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="scroll-body" :style="{ paddingTop: headerHeight + 'px' }">
      <!-- 精选专题 -->
      <view class="section">
        <view class="section-head">
          <text class="section-title font-hand">精选专题</text>
          <text class="section-more" @tap="goDiscover">更多 ›</text>
        </view>
        <scroll-view scroll-x class="topic-scroll" :show-scrollbar="false" enable-flex>
          <view class="topic-list">
            <TopicCard
              v-for="topic in FEATURED_TOPICS"
              :key="topic.id"
              :topic="topic"
              @tap="onTopicTap(topic)"
            />
          </view>
        </scroll-view>
      </view>

      <!-- 我的计划 -->
      <view class="section">
        <view class="section-head">
          <text class="section-title font-hand">我的计划</text>
          <view class="filter-btn" @tap="goAllPlans">
            <text>☰ 全部</text>
          </view>
        </view>

        <view v-if="plans.length === 0" class="empty-plan" @tap="openCreate">
          <text class="empty-icon">✈️</text>
          <text class="empty-text font-hand">还没有计划</text>
          <text class="empty-hint">点击底部 + 创建你的第一份行程</text>
        </view>

        <MyPlanCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          @tap="goPlanDetail(plan)"
        />
      </view>

      <view style="height: 40rpx" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import TopicCard from '@/components/TopicCard/TopicCard.vue'
import MyPlanCard from '@/components/MyPlanCard/MyPlanCard.vue'
import type { MyPlanItem } from '@/components/MyPlanCard/MyPlanCard.vue'
import { FEATURED_TOPICS } from '@/utils/constant'
import { useAppStore } from '@/store/app'
import { useTripStore } from '@/store/trip'
import { mockTrip } from '@/utils/mock'
import type { TripPlan } from '@/api/trip'

const appStore = useAppStore()
const tripStore = useTripStore()

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const headerHeight = statusBarHeight + 52

const plans = ref<MyPlanItem[]>([])

const defaultPlans: MyPlanItem[] = [
  {
    id: 1,
    title: '广州三日美食行',
    days: 3,
    nights: 2,
    placeCount: 19,
    cover: 'https://picsum.photos/seed/gz-food/300/300',
    status: 'active'
  },
  {
    id: 2,
    title: '杭州西湖漫步',
    days: 2,
    nights: 1,
    placeCount: 12,
    cover: 'https://picsum.photos/seed/hz-lake/300/300',
    status: 'active'
  },
  {
    id: 3,
    title: '伦敦经典三日游',
    days: 3,
    nights: 2,
    placeCount: 19,
    cover: 'https://picsum.photos/seed/london-plan/300/300',
    status: 'ended'
  }
]

onShow(() => {
  appStore.setTabbarIndex(0)
  appStore.closeCreateMenu()
})

onMounted(() => {
  loadPlans()
})

function tripToPlan(trip: TripPlan, index: number): MyPlanItem {
  const placeCount = trip.dayPlans?.reduce((sum, d) => sum + (d.schedules?.length || 0), 0) || 0
  return {
    id: trip.id || `trip-${index}`,
    title: trip.title,
    days: trip.days,
    nights: Math.max(trip.days - 1, 1),
    placeCount,
    cover: 'https://picsum.photos/seed/plan' + index + '/300/300',
    status: 'active'
  }
}

async function loadPlans() {
  try {
    const list = await tripStore.loadHistory()
    if (list.length > 0) {
      plans.value = list.map((t, i) => tripToPlan(t, i))
    } else {
      plans.value = [
        tripToPlan({ ...mockTrip, id: 'mock-1' }, 0),
        ...defaultPlans.slice(1)
      ]
    }
  } catch {
    plans.value = [
      tripToPlan({ ...mockTrip, id: 'mock-1' }, 0),
      ...defaultPlans.slice(1)
    ]
  }
}

function onTopicTap(topic: (typeof FEATURED_TOPICS)[number]) {
  uni.navigateTo({ url: `/pages/plan/wizard?city=${encodeURIComponent(topic.title)}` })
}

function goDiscover() {
  uni.switchTab({ url: '/pages/discover/index' })
}

function goSearch() {
  uni.navigateTo({ url: '/pages/scenic/list' })
}

function goProfile() {
  uni.navigateTo({ url: '/pages/profile/index' })
}

function goAllPlans() {
  uni.navigateTo({ url: '/pages/trip/myTrip' })
}

function goPlanDetail(plan: MyPlanItem) {
  uni.navigateTo({ url: `/pages/trip/detail?id=${plan.id}` })
}

function openCreate() {
  appStore.openCreateMenu()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $page-bg;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $page-bg;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 104rpx;
  padding: 0 32rpx;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.logo {
  width: 56rpx;
  height: 56rpx;
  background: linear-gradient(135deg, #3B82F6, #14B8A6);
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.brand-name {
  font-size: 34rpx;
  font-weight: 700;
  color: $text-color;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.action-icon {
  font-size: 40rpx;
}

.avatar-circle {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  border: 3rpx solid #ccc;
  background: #fff;
}

.scroll-body {
  height: 100vh;
  box-sizing: border-box;
}

.section {
  padding: 24rpx 0 8rpx;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx 20rpx;
}

.section-title {
  font-size: 44rpx;
}

.section-more {
  font-size: 28rpx;
  color: $text-secondary;
}

.filter-btn {
  background: #fff;
  border-radius: 24rpx;
  padding: 12rpx 24rpx;
  font-size: 26rpx;
  color: $text-secondary;
  border: 1rpx solid $border-color;
}

.topic-scroll {
  white-space: nowrap;
  width: 100%;
}

.topic-list {
  display: inline-flex;
  padding: 0 32rpx 8rpx;
}

.empty-plan {
  margin: 0 32rpx;
  padding: 60rpx;
  background: $accent-blue;
  border-radius: $card-radius-lg;
  text-align: center;
}

.empty-icon {
  font-size: 64rpx;
  display: block;
}

.empty-text {
  font-size: 36rpx;
  margin-top: 16rpx;
  display: block;
}

.empty-hint {
  font-size: 26rpx;
  color: $text-secondary;
  margin-top: 8rpx;
  display: block;
}

.section :deep(.plan-card) {
  margin-left: 32rpx;
  margin-right: 32rpx;
}
</style>
