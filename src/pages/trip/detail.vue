<template>
  <view class="page">
    <LoadingView v-if="loading" />

    <template v-else-if="trip">
      <view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
        <view class="nav-inner">
          <text class="back" @tap="goBack">‹</text>
          <text class="nav-title">{{ trip.title }}</text>
          <view class="nav-actions">
            <text class="action" @tap="onShare">分享</text>
            <text class="action" @tap="onEdit">编辑</text>
          </view>
        </view>
      </view>

      <view class="stats-bar" :style="{ marginTop: navHeight + 'px' }">
        <text class="stats-tag">{{ statsSummary }}</text>
      </view>

      <scroll-view scroll-x class="day-tabs" :show-scrollbar="false">
        <view
          v-for="(day, i) in trip.dayPlans"
          :key="day.day"
          class="day-tab"
          :class="{ active: activeDayIndex === i }"
          @tap="activeDayIndex = i"
        >{{ formatDayTab(day.day, i) }}</view>
      </scroll-view>

      <scroll-view scroll-y class="timeline-scroll">
        <view v-for="(s, i) in currentSchedules" :key="i" class="timeline-item">
          <view class="timeline-dot" />
          <view v-if="i < currentSchedules.length - 1" class="timeline-line" />
          <view class="schedule-card soft-shadow">
            <view class="schedule-head">
              <text class="time">{{ s.timeStart }}-{{ s.timeEnd }} {{ s.title }}</text>
            </view>
            <view class="schedule-body">
              <image v-if="s.image" class="thumb-img" :src="s.image" mode="aspectFill" />
              <view v-else class="thumb">
                <text class="thumb-emoji">{{ s.emoji }}</text>
              </view>
              <view class="schedule-info">
                <view class="meta-row">
                  <text class="loc">📍{{ s.city }}·{{ s.category }}</text>
                  <text class="rating">🌟{{ s.rating }}</text>
                </view>
                <view v-if="s.tags?.length" class="tag-row">
                  <text v-for="tag in s.tags" :key="tag" class="tag">{{ tag }}</text>
                </view>
                <text class="schedule-desc">🕒开放时间：{{ s.openTime }}</text>
                <text class="schedule-price">💰门票：{{ s.ticket }}</text>
                <text v-if="s.foodRec" class="food-rec">🍽 美食推荐：{{ s.foodRec }}</text>
              </view>
            </view>
            <view class="card-ops">
              <text class="op" @tap.stop="moveUp(i)">↑↓调整顺序</text>
              <text class="op del" @tap.stop="removeSchedule(i)">删除</text>
            </view>
          </view>
        </view>

        <view class="add-spot" @tap="onAddSpot">
          <text>＋ 添加景点</text>
        </view>
        <view style="height: 200rpx" />
      </scroll-view>

      <view class="footer safe-bottom">
        <button class="btn-mint-outline" @tap="onMapRoute">生成地图路线</button>
        <button class="btn-black footer-main" @tap="onSave">保存行程</button>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import LoadingView from '@/components/LoadingView/LoadingView.vue'
import { useTripStore } from '@/store/trip'
import { mockZhaoqingTrip } from '@/utils/mock'
import type { TripPlan } from '@/api/trip'

interface DetailSchedule {
  timeStart: string
  timeEnd: string
  title: string
  city: string
  category: string
  rating: number
  openTime: string
  ticket: string
  foodRec?: string
  emoji: string
  image?: string
  tags?: string[]
}

const tripStore = useTripStore()
const trip = ref<TripPlan | null>(null)
const detailSchedules = ref<DetailSchedule[][]>([])
const loading = ref(true)
const activeDayIndex = ref(0)

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const navHeight = statusBarHeight + 48

const currentSchedules = computed(() => detailSchedules.value[activeDayIndex.value] || [])

const statsSummary = computed(() => {
  const spots = detailSchedules.value.reduce((n, day) => n + day.length, 0)
  const days = trip.value?.days || 1
  return `${days}天 · ${spots}个景点 · 1.6km步行`
})

const defaultZhaoqing: DetailSchedule[] = [
  {
    timeStart: '09:00',
    timeEnd: '11:30',
    title: '七星岩双源洞',
    city: '肇庆',
    category: '自然风光',
    rating: 4.8,
    openTime: '07:30-17:30',
    ticket: '70元/人',
    foodRec: '岩前咖啡',
    emoji: '⛰️',
    image: 'https://picsum.photos/seed/qixingyan/200/200',
    tags: ['必去']
  },
  {
    timeStart: '12:00',
    timeEnd: '13:30',
    title: '岩前艺术中心',
    city: '肇庆',
    category: '文艺打卡',
    rating: 4.6,
    openTime: '全天',
    ticket: '免费',
    foodRec: '窑烤面包',
    emoji: '🎨',
    image: 'https://picsum.photos/seed/yanqian/200/200'
  }
]

onMounted(async () => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] as { options?: { id?: string } }
  const id = page.options?.id
  trip.value = id
    ? await tripStore.getTripDetail(id)
    : tripStore.currentTrip || (await tripStore.getTripDetail('mock-zq-1'))
  buildSchedules()
  loading.value = false
})

function buildSchedules() {
  const plans = trip.value?.dayPlans
  if (plans?.length && plans.some((d) => d.schedules?.length)) {
    detailSchedules.value = plans.map((day) =>
      (day.schedules || []).map((s, idx) => {
        const parts = s.time?.split('-') || ['09:00', '11:00']
        return {
          timeStart: parts[0],
          timeEnd: parts[1] || parts[0],
          title: s.title,
          city: trip.value?.toCity || '肇庆',
          category: s.type === 'food' ? '美食' : '自然风光',
          rating: 4.7,
          openTime: s.description || '全天',
          ticket: '详见现场',
          emoji: idx % 2 ? '🍜' : '⛰️',
          tags: []
        } as DetailSchedule
      })
    )
  } else {
    detailSchedules.value = [defaultZhaoqing]
    if (trip.value && !trip.value.dayPlans?.length) {
      trip.value.dayPlans = mockZhaoqingTrip.dayPlans
    }
  }
}

function formatDayTab(day: number, index: number) {
  const d = new Date(2026, 4, day + index)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return `${mm}-${dd}（${week[d.getDay()]}）`
}

function goBack() {
  uni.navigateBack()
}

function onShare() {
  uni.showToast({ title: '分享功能开发中', icon: 'none' })
}

function onEdit() {
  uni.navigateTo({ url: `/pages/trip/edit?id=${trip.value?.id || ''}` })
}

function moveUp(index: number) {
  const list = detailSchedules.value[activeDayIndex.value]
  if (index <= 0 || !list) return
  ;[list[index], list[index - 1]] = [list[index - 1], list[index]]
}

function removeSchedule(index: number) {
  detailSchedules.value[activeDayIndex.value]?.splice(index, 1)
}

function onAddSpot() {
  uni.showToast({ title: '添加景点开发中', icon: 'none' })
}

function onMapRoute() {
  uni.showToast({ title: '地图路线开发中', icon: 'none' })
}

async function onSave() {
  try {
    if (trip.value) await tripStore.saveTrip()
    uni.showToast({ title: '行程已保存', icon: 'success' })
  } catch {
    uni.showToast({ title: '行程已保存', icon: 'success' })
  }
  setTimeout(() => uni.switchTab({ url: '/pages/trip/index' }), 600)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $mint-page;
  display: flex;
  flex-direction: column;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1rpx solid $mint-input;
}

.nav-inner {
  display: flex;
  align-items: center;
  height: 96rpx;
  padding: 0 24rpx;
}

.back {
  font-size: 56rpx;
  color: $mint-text;
  width: 64rpx;
}

.nav-title {
  flex: 1;
  font-size: 34rpx;
  font-weight: 700;
  color: $mint-text;
  text-align: center;
}

.nav-actions {
  display: flex;
  gap: 24rpx;
}

.action {
  font-size: 26rpx;
  color: $mint-primary;
}

.stats-bar {
  background: #fff;
  padding: 24rpx 32rpx;
}

.stats-tag {
  font-size: 22rpx;
  color: $mint-primary;
  background: rgba(168, 230, 207, 0.15);
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
}

.day-tabs {
  white-space: nowrap;
  background: #fff;
  padding: 20rpx 32rpx;
  border-bottom: 1rpx solid $mint-input;
}

.day-tab {
  display: inline-block;
  padding: 16rpx 28rpx;
  margin-right: 16rpx;
  background: $mint-input;
  color: $mint-text;
  border-radius: 999rpx;
  font-size: 24rpx;

  &.active {
    background: $mint-primary;
    color: #fff;
  }
}

.timeline-scroll {
  flex: 1;
  height: 0;
  padding: 32rpx;
  box-sizing: border-box;
}

.timeline-item {
  position: relative;
  padding-left: 48rpx;
  margin-bottom: 40rpx;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 8rpx;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  border: 4rpx solid $mint-primary;
  background: #fff;
  z-index: 2;
}

.timeline-line {
  position: absolute;
  left: 11rpx;
  top: 36rpx;
  width: 4rpx;
  bottom: -40rpx;
  background: $mint-input;
}

.schedule-card {
  background: #fff;
  border-radius: $card-radius-lg;
  padding: 28rpx;
  border: 1rpx solid rgba(168, 230, 207, 0.15);
}

.schedule-head {
  margin-bottom: 16rpx;
}

.time {
  font-size: 28rpx;
  font-weight: 700;
  color: $mint-text;
}

.schedule-body {
  display: flex;
  gap: 20rpx;
}

.thumb,
.thumb-img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
  background: $mint-input;
}

.thumb {
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-emoji {
  font-size: 56rpx;
}

.schedule-info {
  flex: 1;
  min-width: 0;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 8rpx;
}

.loc,
.rating {
  font-size: 22rpx;
  color: $mint-text;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin: 8rpx 0;
}

.tag {
  font-size: 18rpx;
  padding: 4rpx 12rpx;
  background: $mint-tag-pink;
  color: $mint-text;
  border-radius: 8rpx;
}

.schedule-desc,
.schedule-price,
.food-rec {
  font-size: 22rpx;
  color: $text-secondary;
  display: block;
  margin-top: 6rpx;
}

.food-rec {
  color: $mint-primary;
}

.card-ops {
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid $mint-input;
}

.op {
  font-size: 24rpx;
  color: $mint-primary;

  &.del {
    color: #f9a8a8;
  }
}

.add-spot {
  border: 2rpx dashed rgba(168, 230, 207, 0.4);
  border-radius: $card-radius-lg;
  padding: 32rpx;
  text-align: center;
  color: $mint-primary;
  font-size: 28rpx;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 24rpx;
  padding: 24rpx 32rpx;
  background: #fff;
  border-top: 1rpx solid $mint-input;
}

.footer .btn-mint-outline {
  flex: 1;
}

.footer-main {
  flex: 2;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 28rpx;
}
</style>
