<template>
  <view class="page page-with-tabbar">
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="header-inner">
        <view class="brand">
          <view class="logo">⛰</view>
          <text class="brand-name">探索</text>
        </view>
        <text class="search-btn" @tap="goSearch">🔍 搜索</text>
      </view>
    </view>

    <scroll-view scroll-y class="scroll-body" :style="{ paddingTop: headerHeight + 'px' }">
      <view class="tabs">
        <text
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item font-hand"
          :class="{ active: activeTab === tab.key }"
          @tap="activeTab = tab.key"
        >{{ tab.label }}</text>
      </view>

      <view v-if="activeTab === 'scenic'" class="content">
        <scroll-view scroll-x class="filter-scroll">
          <text
            v-for="cat in SCENIC_CATEGORIES"
            :key="cat"
            class="filter-tag"
            :class="{ active: scenicCategory === cat }"
            @tap="scenicCategory = cat"
          >{{ cat }}</text>
        </scroll-view>
        <view class="card-list">
          <view
            v-for="item in scenics"
            :key="item.id"
            class="explore-card"
            @tap="goScenic(item.id)"
          >
            <image class="cover" :src="item.cover" mode="aspectFill" />
            <view class="info">
              <text class="name">{{ item.name }}</text>
              <text class="meta">⭐ {{ formatRating(item.rating) }} · {{ item.city }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-if="activeTab === 'activity'" class="content">
        <scroll-view scroll-x class="filter-scroll">
          <text
            v-for="cat in ACTIVITY_CATEGORIES"
            :key="cat"
            class="filter-tag"
            :class="{ active: activityCategory === cat }"
            @tap="activityCategory = cat"
          >{{ cat }}</text>
        </scroll-view>
        <view
          v-for="item in activities"
          :key="item.id"
          class="explore-card horizontal"
          @tap="goActivity(item.id)"
        >
          <image class="cover-sm" :src="item.cover" mode="aspectFill" />
          <view class="info">
            <text class="name">{{ item.title }}</text>
            <text class="meta">📅 {{ formatDate(item.startTime, 'MM-DD') }} · {{ item.location }}</text>
          </view>
        </view>
      </view>

      <view v-if="activeTab === 'topic'" class="content">
        <view class="topic-grid">
          <TopicCard
            v-for="topic in FEATURED_TOPICS"
            :key="topic.id"
            :topic="topic"
            class="topic-grid-item"
            @tap="goWizard(topic.title)"
          />
        </view>
      </view>

      <LoadingView v-if="loading" />
      <EmptyState v-if="!loading && isEmpty" />

      <view style="height: 40rpx" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import TopicCard from '@/components/TopicCard/TopicCard.vue'
import LoadingView from '@/components/LoadingView/LoadingView.vue'
import EmptyState from '@/components/EmptyState/EmptyState.vue'
import { SCENIC_CATEGORIES, ACTIVITY_CATEGORIES, FEATURED_TOPICS } from '@/utils/constant'
import { formatRating, formatDate } from '@/utils/format'
import { getScenicList } from '@/api/scenic'
import { getActivityList } from '@/api/activity'
import { mockScenics, mockActivities, withFallback } from '@/utils/mock'
import { useAppStore } from '@/store/app'
import type { ScenicItem } from '@/api/scenic'
import type { ActivityItem } from '@/api/activity'

const appStore = useAppStore()
const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const headerHeight = statusBarHeight + 52

const tabs = [
  { key: 'scenic', label: '景点' },
  { key: 'activity', label: '活动' },
  { key: 'topic', label: '专题' }
] as const

type TabKey = (typeof tabs)[number]['key']

const activeTab = ref<TabKey>('scenic')
const loading = ref(false)
const scenics = ref<ScenicItem[]>([])
const activities = ref<ActivityItem[]>([])
const scenicCategory = ref('全部')
const activityCategory = ref('全部')

const isEmpty = computed(() => {
  if (activeTab.value === 'topic') return false
  return activeTab.value === 'scenic' ? scenics.value.length === 0 : activities.value.length === 0
})

onShow(() => {
  appStore.setTabbarIndex(1)
  appStore.closeCreateMenu()
})

async function loadScenics() {
  loading.value = true
  const category = scenicCategory.value === '全部' ? undefined : scenicCategory.value
  const res = await withFallback(
    () => getScenicList({ category, page: 1, pageSize: 20 }),
    { records: mockScenics, total: mockScenics.length, page: 1, pageSize: 20 }
  )
  scenics.value = res.records
  loading.value = false
}

async function loadActivities() {
  loading.value = true
  const category = activityCategory.value === '全部' ? undefined : activityCategory.value
  const res = await withFallback(
    () => getActivityList({ category, page: 1, pageSize: 20 }),
    { records: mockActivities, total: mockActivities.length }
  )
  activities.value = res.records
  loading.value = false
}

watch([activeTab, scenicCategory], () => {
  if (activeTab.value === 'scenic') loadScenics()
})

watch(activityCategory, () => {
  if (activeTab.value === 'activity') loadActivities()
})

onMounted(() => loadScenics())

function goSearch() {
  uni.navigateTo({ url: '/pages/scenic/list' })
}

function goScenic(id: number) {
  uni.navigateTo({ url: `/pages/scenic/detail?id=${id}` })
}

function goActivity(id: number) {
  uni.navigateTo({ url: `/pages/activity/detail?id=${id}` })
}

function goWizard(city: string) {
  uni.navigateTo({ url: `/pages/plan/wizard?city=${encodeURIComponent(city)}` })
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
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-name {
  font-size: 40rpx;
  font-weight: 700;
  font-family: 'STKaiti', 'KaiTi', serif;
}

.search-btn {
  font-size: 28rpx;
  color: $text-secondary;
  background: #fff;
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
}

.scroll-body {
  height: 100vh;
  box-sizing: border-box;
}

.tabs {
  display: flex;
  gap: 40rpx;
  padding: 16rpx 32rpx 24rpx;
}

.tab-item {
  font-size: 36rpx;
  color: $text-secondary;
  padding-bottom: 8rpx;
  border-bottom: 4rpx solid transparent;

  &.active {
    color: #000;
    border-bottom-color: #000;
  }
}

.content {
  padding: 0 32rpx;
}

.filter-scroll {
  white-space: nowrap;
  margin-bottom: 24rpx;
}

.filter-tag {
  display: inline-block;
  padding: 12rpx 28rpx;
  margin-right: 16rpx;
  font-size: 26rpx;
  background: #fff;
  border-radius: 32rpx;
  color: $text-secondary;

  &.active {
    background: #000;
    color: #fff;
  }
}

.explore-card {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 20rpx;

  &:active {
    transform: scale(0.99);
  }

  &.horizontal {
    display: flex;
    gap: 20rpx;
    padding: 16rpx;
  }
}

.cover {
  width: 100%;
  height: 280rpx;
}

.cover-sm {
  width: 180rpx;
  height: 140rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
}

.info {
  padding: 20rpx;

  .horizontal & {
    padding: 0;
    flex: 1;
  }
}

.name {
  font-size: 30rpx;
  font-weight: 500;
  display: block;
}

.meta {
  font-size: 24rpx;
  color: $text-secondary;
  margin-top: 8rpx;
  display: block;
}

.topic-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.topic-grid :deep(.topic-card) {
  width: calc(50% - 10rpx);
  height: 320rpx;
  margin-right: 0;
}
</style>
