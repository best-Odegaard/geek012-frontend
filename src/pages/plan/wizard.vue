<template>
  <view class="page">
    <!-- 顶栏 -->
    <view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="back" @tap="goBack">‹</text>
      <view class="nav-btn" @tap="createEmpty">创建空计划</view>
    </view>

    <scroll-view scroll-y class="body" :style="{ paddingTop: navHeight + 'px' }">
      <!-- 目的地 -->
      <view class="block">
        <text class="block-title font-hand">你想去哪里？</text>
        <view class="input-box">
          <view v-if="destinations.length" class="tags">
            <view v-for="(city, i) in destinations" :key="city" class="city-tag">
              <text>{{ city }}</text>
              <text class="remove" @tap="removeCity(i)">×</text>
            </view>
          </view>
          <view class="input-row">
            <text class="ai-icon">✦</text>
            <input
              v-model="destinationInput"
              class="input"
              placeholder="输入目的地或告诉我你的想法"
              placeholder-class="placeholder"
              @confirm="addCityFromInput"
            />
          </view>
        </view>
      </view>

      <!-- 天数 -->
      <view class="block">
        <text class="block-title font-hand">你想去多久？</text>
        <picker mode="selector" :range="dayLabels" @change="onDayChange">
          <view class="picker-row">
            <text class="picker-icon">📅</text>
            <text class="picker-value">{{ form.days }}天</text>
            <text class="picker-arrow">›</text>
          </view>
        </picker>
      </view>

      <!-- 旅行偏好 -->
      <view class="block">
        <text class="block-title font-hand">旅行偏好</text>
        <view class="pref-grid">
          <view
            v-for="pref in TRAVEL_PREFERENCES"
            :key="pref.id"
            class="pref-chip"
            :class="{ active: selectedPrefs.includes(pref.id) }"
            @tap="togglePref(pref.id)"
          >
            <text>{{ pref.emoji }} {{ pref.label }}</text>
          </view>
        </view>
      </view>

      <!-- 人数与预算（折叠区域） -->
      <view class="block extra">
        <view class="extra-row">
          <text class="extra-label">人数</text>
          <picker :range="peopleLabels" @change="onPeopleChange">
            <text class="extra-value">{{ form.people }}人 ›</text>
          </picker>
        </view>
        <view class="extra-row">
          <text class="extra-label">预算</text>
          <input v-model.number="form.budget" class="extra-input" type="number" placeholder="元" />
        </view>
        <view class="extra-row">
          <text class="extra-label">出发地</text>
          <input v-model="form.fromCity" class="extra-input" placeholder="选填" />
        </view>
      </view>

      <view style="height: 180rpx" />
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="footer safe-bottom">
      <button class="btn-black" :loading="generating" @tap="handleGenerate">
        <text class="font-hand">智能规划</text>
      </button>
    </view>

    <!-- 结果浮层 -->
    <view v-if="showResult" class="result-mask" @tap="showResult = false">
      <view class="result-panel" @tap.stop>
        <text class="result-title font-hand">{{ currentTrip?.title }}</text>
        <scroll-view scroll-y class="result-scroll">
          <view v-for="day in currentTrip?.dayPlans" :key="day.day" class="day-block">
            <text class="day-label">DAY {{ day.day }} · {{ day.title }}</text>
            <view v-for="(s, i) in day.schedules" :key="i" class="schedule">
              <text class="time">{{ s.time }}</text>
              <text class="name">{{ s.title }}</text>
            </view>
          </view>
        </scroll-view>
        <view class="result-actions">
          <button class="btn-outline" @tap="showResult = false">继续编辑</button>
          <button class="btn-black sm" @tap="handleSave">保存计划</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { TRAVEL_PREFERENCES, DAY_OPTIONS } from '@/utils/constant'
import { useTripStore } from '@/store/trip'
import { useLogin } from '@/hooks/useLogin'
import { mockTrip } from '@/utils/mock'
import type { GenerateTripParams } from '@/api/trip'

const tripStore = useTripStore()
const { currentTrip, generating } = storeToRefs(tripStore)
const { checkLogin } = useLogin()

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const navHeight = statusBarHeight + 48

const destinationInput = ref('')
const destinations = ref<string[]>([])
const selectedPrefs = ref<string[]>(['classic', 'food'])
const showResult = ref(false)

const dayLabels = DAY_OPTIONS.map((d) => `${d}天`)
const peopleLabels = Array.from({ length: 10 }, (_, i) => `${i + 1}人`)

const form = reactive<GenerateTripParams>({
  fromCity: '',
  toCity: '',
  days: 2,
  budget: 3000,
  people: 2,
  tags: []
})

onMounted(() => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] as { options?: { city?: string } }
  if (page.options?.city) {
    const city = decodeURIComponent(page.options.city)
    if (city && !destinations.value.includes(city)) {
      destinations.value.push(city.replace(/之旅|漫步|经典.*/, '').slice(0, 6) || city)
    }
  }
})

function prefIdToTag(id: string): string {
  const map: Record<string, string> = {
    classic: '经典必玩',
    food: '美食',
    photo: '摄影',
    nature: '自然风光',
    history: '历史文化',
    shop: '购物娱乐',
    walk: 'CityWalk',
    art: '文艺展览',
    niche: '小众探索'
  }
  return map[id] || id
}

function syncFormTags() {
  form.tags = selectedPrefs.value.map(prefIdToTag)
}

function addCityFromInput() {
  const val = destinationInput.value.trim()
  if (!val) return
  if (!destinations.value.includes(val)) {
    destinations.value.push(val)
  }
  destinationInput.value = ''
}

function removeCity(index: number) {
  destinations.value.splice(index, 1)
}

function togglePref(id: string) {
  const idx = selectedPrefs.value.indexOf(id)
  if (idx >= 0) selectedPrefs.value.splice(idx, 1)
  else selectedPrefs.value.push(id)
}

function onDayChange(e: { detail: { value: number } }) {
  form.days = DAY_OPTIONS[e.detail.value]
}

function onPeopleChange(e: { detail: { value: number } }) {
  form.people = e.detail.value + 1
}

function goBack() {
  uni.navigateBack()
}

function createEmpty() {
  uni.navigateTo({ url: '/pages/trip/edit' })
}

async function handleGenerate() {
  if (destinations.value.length === 0) {
    addCityFromInput()
  }
  if (destinations.value.length === 0) {
    uni.showToast({ title: '请添加至少一个目的地', icon: 'none' })
    return
  }

  form.toCity = destinations.value[0]
  if (!form.fromCity) form.fromCity = '当前城市'
  syncFormTags()

  try {
    await tripStore.generateTrip({ ...form })
    showResult.value = true
  } catch {
    tripStore.currentTrip = {
      ...mockTrip,
      ...form,
      title: `${form.toCity}${form.days}日之旅`
    } as typeof mockTrip
    showResult.value = true
  }
}

async function handleSave() {
  if (!checkLogin()) return
  try {
    await tripStore.saveTrip()
    uni.showToast({ title: '已保存到我的计划', icon: 'success' })
    setTimeout(() => {
      showResult.value = false
      uni.switchTab({ url: '/pages/home/index' })
    }, 800)
  } catch {
    uni.showToast({ title: '已保存（演示）', icon: 'success' })
    setTimeout(() => uni.switchTab({ url: '/pages/home/index' }), 800)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $page-bg;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx 16rpx;
  background: $page-bg;
}

.back {
  font-size: 56rpx;
  font-weight: 300;
  color: #000;
  width: 80rpx;
}

.nav-btn {
  background: #000;
  color: #fff;
  font-size: 24rpx;
  padding: 14rpx 28rpx;
  border-radius: 999rpx;
}

.body {
  height: 100vh;
  padding: 0 32rpx;
  box-sizing: border-box;
}

.block {
  margin-bottom: 48rpx;
}

.block-title {
  font-size: 44rpx;
  display: block;
  margin-bottom: 24rpx;
}

.input-box {
  background: #fff;
  border-radius: 28rpx;
  border: 2rpx solid $accent-border;
  padding: 24rpx;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.city-tag {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: #f0f0f0;
  padding: 10rpx 20rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.remove {
  color: #999;
  font-size: 32rpx;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.ai-icon {
  font-size: 36rpx;
  color: #7c3aed;
}

.input {
  flex: 1;
  font-size: 28rpx;
  height: 64rpx;
}

.placeholder {
  color: #999;
}

.picker-row {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 28rpx;
  padding: 28rpx 32rpx;
}

.picker-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
}

.picker-value {
  flex: 1;
  font-size: 30rpx;
}

.picker-arrow {
  color: #999;
  font-size: 32rpx;
}

.pref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.pref-chip {
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx 12rpx;
  text-align: center;
  font-size: 24rpx;
  border: 3rpx solid transparent;
  transition: border-color 0.15s;

  &.active {
    border-color: #000;
  }

  &:active {
    transform: scale(0.97);
  }
}

.block.extra {
  background: #fff;
  border-radius: 24rpx;
  padding: 8rpx 24rpx;
}

.extra-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.extra-label {
  font-size: 28rpx;
  color: #666;
}

.extra-value,
.extra-input {
  font-size: 28rpx;
  text-align: right;
}

.extra-input {
  width: 240rpx;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 32rpx;
  background: $page-bg;
}

.btn-black {
  width: 100%;
  font-size: 36rpx;

  .font-hand {
    font-size: 36rpx;
  }
}

.result-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: flex-end;
}

.result-panel {
  width: 100%;
  max-height: 75vh;
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 32rpx;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.result-title {
  font-size: 36rpx;
  display: block;
  margin-bottom: 20rpx;
}

.result-scroll {
  max-height: 50vh;
}

.day-block {
  margin-bottom: 24rpx;
}

.day-label {
  font-size: 28rpx;
  font-weight: 600;
  display: block;
  margin-bottom: 12rpx;
}

.schedule {
  display: flex;
  gap: 16rpx;
  padding: 8rpx 0;
}

.time {
  color: #666;
  font-size: 24rpx;
  width: 100rpx;
}

.name {
  font-size: 28rpx;
}

.result-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 24rpx;
}

.btn-outline {
  flex: 1;
  background: #f5f5f5;
  border-radius: 999rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  border: none;
  &::after { border: none; }
}

.btn-black.sm {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
}
</style>
