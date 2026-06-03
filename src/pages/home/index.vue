<template>
  <view class="page page-with-tabbar">
    <view class="top-gradient" />

    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="header-inner">
        <text class="brand-name">旅行计划</text>
        <view class="search-wrap">
          <text class="search-icon">🔍</text>
          <input
            class="search-input"
            placeholder="搜索目的地..."
            placeholder-class="search-placeholder"
            confirm-type="search"
            @confirm="onSearch"
          />
        </view>
        <text class="notify-btn" @tap="onNotify">🔔</text>
      </view>
    </view>

    <scroll-view scroll-y class="scroll-body" :style="{ paddingTop: headerHeight + 'px' }">
      <swiper class="banner-swiper" circular autoplay :interval="4000" @change="onBannerChange">
        <swiper-item v-for="item in HOME_BANNERS" :key="item.id">
          <view class="banner-card">
            <view class="banner-text">
              <text class="banner-title">{{ item.title }}</text>
              <text class="banner-sub">{{ item.subtitle }}</text>
              <view class="banner-btn" @tap="goDiscover">立即探索</view>
            </view>
            <text class="banner-deco">{{ item.emoji }}</text>
          </view>
        </swiper-item>
      </swiper>
      <view class="banner-dots">
        <view v-for="(_, i) in HOME_BANNERS" :key="i" class="dot" :class="{ active: bannerIndex === i }" />
      </view>

      <view class="section">
        <text class="section-title">推荐城市</text>
        <scroll-view scroll-x class="city-scroll" :show-scrollbar="false">
          <view class="city-list">
            <view
              v-for="city in HOME_CITY_PILLS"
              :key="city"
              class="city-pill"
              :class="{ active: selectedCity === city }"
              @tap="onCityTap(city)"
            >{{ city }}</view>
          </view>
        </scroll-view>
      </view>

      <view class="section">
        <view class="section-head">
          <text class="section-title">热门景点推荐</text>
          <text class="section-link" @tap="goDiscover">查看全部</text>
        </view>
        <view class="attraction-grid">
          <view
            v-for="item in HOME_ATTRACTIONS"
            :key="item.id"
            class="attraction-card soft-shadow"
            @tap="goScenic(item.id)"
          >
            <image class="attraction-cover" :src="item.cover" mode="aspectFill" />
            <text class="attraction-name">{{ item.name }}</text>
            <view class="attraction-meta">
              <text class="attraction-city">{{ item.city }}</text>
              <text class="attraction-rating">🌟 {{ item.rating }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="my-trip-card soft-shadow" @tap="goMyTrip">
        <view>
          <text class="my-trip-title">我的行程</text>
          <text class="my-trip-desc">{{ myTripSummary }}</text>
        </view>
        <text class="arrow">›</text>
      </view>

      <view style="height: 160rpx" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { HOME_BANNERS, HOME_CITY_PILLS, HOME_ATTRACTIONS } from '@/utils/constant'
import { useAppStore } from '@/store/app'
import { useTripStore } from '@/store/trip'
import type { TripPlan } from '@/api/trip'

const appStore = useAppStore()
const tripStore = useTripStore()

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const headerHeight = statusBarHeight + 56

const bannerIndex = ref(0)
const selectedCity = ref<string>(HOME_CITY_PILLS[0])
const latestTrip = ref<TripPlan | null>(null)

const myTripSummary = computed(() => {
  if (!latestTrip.value) return '暂无行程，点击 + 新建'
  return `[${latestTrip.value.title}] ${latestTrip.value.createdAt || '2026-05-01'}`
})

onShow(() => {
  appStore.setTabbarIndex(0)
  appStore.closeCreateMenu()
})

onMounted(() => loadLatestTrip())

function onBannerChange(e: { detail: { current: number } }) {
  bannerIndex.value = e.detail.current
}

function onCityTap(city: string) {
  if (city === '更多…') {
    goDiscover()
    return
  }
  selectedCity.value = city
  uni.navigateTo({ url: `/pages/plan/survey?city=${encodeURIComponent(city)}` })
}

async function loadLatestTrip() {
  const list = await tripStore.loadHistory()
  latestTrip.value = list[0] || null
}

function onSearch(e: { detail: { value: string } }) {
  const q = e.detail.value?.trim()
  uni.navigateTo({
    url: q ? `/pages/scenic/list?keyword=${encodeURIComponent(q)}` : '/pages/scenic/list'
  })
}

function onNotify() {
  uni.showToast({ title: '暂无新消息', icon: 'none' })
}

function goDiscover() {
  appStore.setTabbarIndex(2)
  uni.switchTab({ url: '/pages/discover/index' })
}

function goMyTrip() {
  const id = latestTrip.value?.id ?? 'mock-1'
  uni.navigateTo({ url: `/pages/trip/detail?id=${id}` })
}

function goScenic(id: number) {
  uni.navigateTo({ url: `/pages/scenic/detail?id=${id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $mint-page;
  position: relative;
}

.top-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 320rpx;
  background: linear-gradient(180deg, rgba(168, 230, 207, 0.3), transparent);
  pointer-events: none;
  z-index: 1;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 16rpx;
  height: 112rpx;
  padding: 0 32rpx 16rpx;
}

.brand-name {
  font-size: 32rpx;
  font-weight: 700;
  color: $mint-text;
  flex-shrink: 0;
  max-width: 140rpx;
}

.search-wrap {
  flex: 1;
  position: relative;
  height: 72rpx;
  background: $mint-input;
  border: 1rpx solid $accent-border;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  padding: 0 24rpx 0 64rpx;
}

.search-icon {
  position: absolute;
  left: 24rpx;
  font-size: 28rpx;
}

.search-input {
  flex: 1;
  font-size: 26rpx;
  color: $mint-text;
  height: 72rpx;
}

:deep(.search-placeholder) {
  color: $text-placeholder;
}

.notify-btn {
  font-size: 40rpx;
  flex-shrink: 0;
}

.scroll-body {
  height: 100vh;
  box-sizing: border-box;
  padding: 0 32rpx;
  position: relative;
  z-index: 2;
}

.banner-swiper {
  height: 320rpx;
  margin-top: 16rpx;
}

.banner-card {
  height: 320rpx;
  background: linear-gradient(135deg, $mint-primary, $mint-light);
  border-radius: $card-radius-lg;
  padding: 48rpx;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #fff;
  display: block;
}

.banner-sub {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 8rpx;
  display: block;
}

.banner-btn {
  margin-top: 24rpx;
  display: inline-block;
  padding: 12rpx 32rpx;
  background: rgba(255, 255, 255, 0.2);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #fff;
  align-self: flex-start;
}

.banner-deco {
  position: absolute;
  right: 32rpx;
  bottom: 16rpx;
  font-size: 120rpx;
  opacity: 0.25;
}

.banner-dots {
  display: flex;
  justify-content: center;
  gap: 12rpx;
  margin: 20rpx 0 8rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: $mint-input;

  &.active {
    width: 32rpx;
    background: $mint-primary;
  }
}

.section {
  margin-top: 40rpx;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: $mint-text;
  display: block;
  margin-bottom: 20rpx;
}

.section-head .section-title {
  margin-bottom: 0;
}

.section-link {
  font-size: 24rpx;
  color: $mint-primary;
}

.city-scroll {
  white-space: nowrap;
  width: 100%;
}

.city-list {
  display: inline-flex;
  gap: 16rpx;
}

.city-pill {
  padding: 16rpx 40rpx;
  background: $mint-secondary;
  color: $mint-text;
  border-radius: 999rpx;
  font-size: 24rpx;
  white-space: nowrap;

  &.active {
    background: $mint-primary;
    color: #fff;
  }
}

.attraction-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.attraction-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 12rpx;
  border: 1rpx solid rgba(168, 230, 207, 0.2);
}

.attraction-cover {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12rpx;
  background: $mint-input;
}

.attraction-name {
  font-size: 24rpx;
  font-weight: 700;
  color: $mint-text;
  display: block;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attraction-meta {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
  margin-top: 4rpx;
}

.attraction-city {
  font-size: 18rpx;
  color: $text-secondary;
}

.attraction-rating {
  font-size: 18rpx;
  color: $mint-primary;
}

.my-trip-card {
  margin-top: 48rpx;
  background: $mint-light;
  border-radius: $card-radius-lg;
  padding: 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.my-trip-title {
  font-size: 28rpx;
  font-weight: 700;
  color: $mint-text;
  display: block;
}

.my-trip-desc {
  font-size: 24rpx;
  color: $text-secondary;
  margin-top: 8rpx;
  display: block;
}

.arrow {
  font-size: 40rpx;
  color: $mint-text;
}
</style>
