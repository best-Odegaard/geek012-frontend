<template>
  <view class="page">
    <view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-inner">
        <text class="back" @tap="goBack">‹</text>
        <text class="nav-title">新建行程</text>
      </view>
    </view>

    <view class="progress-wrap" :style="{ marginTop: navHeight + 'px' }">
      <text class="step-label">{{ stepLabels[currentStep - 1] }}</text>
      <view class="progress-track">
        <view class="progress-fill" :style="{ width: progressPercent + '%' }" />
      </view>
    </view>

    <scroll-view scroll-y class="form-scroll">
      <view class="form-card soft-shadow">
        <!-- 1/3 基础信息 -->
        <view v-show="currentStep === 1" class="step">
          <view class="field">
            <text class="label">目的地城市</text>
            <picker :range="destOptions" @change="onDestChange">
              <view class="picker-box">{{ form.destination }} ▼</view>
            </picker>
          </view>
          <view class="field">
            <text class="label">出行天数</text>
            <picker :range="dayOptions" @change="onDayChange">
              <view class="picker-box">{{ form.days }} ▼</view>
            </picker>
          </view>
          <view class="field">
            <text class="label">出行人数</text>
            <picker :range="peopleOptions" @change="onPeopleChange">
              <view class="picker-box">{{ form.people }} ▼</view>
            </picker>
          </view>
          <view class="field">
            <text class="label">出行时段</text>
            <picker mode="date" :value="form.startDate" @change="onDateChange">
              <view class="picker-box">{{ form.startDate }} ▼</view>
            </picker>
          </view>
        </view>

        <!-- 2/3 偏好设置 -->
        <view v-show="currentStep === 2" class="step">
          <view class="tag-group">
            <text class="label">旅行预算</text>
            <view class="tags">
              <text
                v-for="t in budgetOptions"
                :key="t"
                class="tag"
                :class="{ selected: form.budget === t }"
                @tap="form.budget = t"
              >{{ t }}</text>
            </view>
          </view>
          <view class="tag-group">
            <text class="label">游玩偏好</text>
            <view class="tags">
              <text
                v-for="t in prefOptions"
                :key="t"
                class="tag"
                :class="{ selected: form.prefs.includes(t) }"
                @tap="toggleTag(form.prefs, t)"
              >{{ t }}</text>
            </view>
          </view>
          <view class="tag-group">
            <text class="label">节奏模式</text>
            <view class="tags">
              <text
                v-for="t in paceOptions"
                :key="t"
                class="tag"
                :class="{ selected: form.pace === t }"
                @tap="form.pace = t"
              >{{ t }}</text>
            </view>
          </view>
        </view>

        <!-- 3/3 附加需求 -->
        <view v-show="currentStep === 3" class="step">
          <view class="tag-group">
            <text class="label">交通方式</text>
            <view class="tags">
              <text
                v-for="t in transportOptions"
                :key="t"
                class="tag"
                :class="{ selected: form.transport === t }"
                @tap="form.transport = t"
              >{{ t }}</text>
            </view>
          </view>
          <view class="tag-group">
            <text class="label">住宿偏好</text>
            <view class="tags">
              <text
                v-for="t in stayOptions"
                :key="t"
                class="tag"
                :class="{ selected: form.stay === t }"
                @tap="form.stay = t"
              >{{ t }}</text>
            </view>
          </view>
          <view class="field">
            <text class="label">特殊需求</text>
            <textarea
              v-model="form.specialNeeds"
              class="textarea"
              placeholder="如：避开人多景点、带老人小孩等"
              placeholder-class="input-placeholder"
            />
          </view>
        </view>
      </view>
      <view style="height: 200rpx" />
    </scroll-view>

    <view class="footer safe-bottom">
      <button v-if="currentStep > 1" class="btn-prev" @tap="prevStep">上一步</button>
      <button class="btn-black footer-next" @tap="nextStep">
        {{ currentStep === totalSteps ? '提交' : '下一步' }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useTripStore } from '@/store/trip'

const tripStore = useTripStore()
const totalSteps = 3
const stepLabels = ['1/3 基础信息', '2/3 偏好设置', '3/3 附加需求']

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const navHeight = statusBarHeight + 48

const currentStep = ref(1)
const progressPercent = computed(() => (currentStep.value / totalSteps) * 100)

const destOptions = ['肇庆', '广州', '桂林', '成都', '杭州']
const dayOptions = ['1天', '2天', '3天', '4天', '5天及以上']
const peopleOptions = ['1人', '2人', '3-4人', '5人及以上']
const budgetOptions = ['经济', '适中', '高档']
const prefOptions = ['自然风光', '人文古迹', '美食探店', '主题乐园']
const paceOptions = ['悠闲', '常规', '暴走']
const transportOptions = ['自驾', '公共交通', '打车']
const stayOptions = ['酒店', '民宿', '无要求']

const form = reactive({
  destination: '肇庆',
  days: '1天',
  people: '2人',
  startDate: '2026-05-01',
  budget: '适中',
  prefs: [] as string[],
  pace: '常规',
  transport: '自驾',
  stay: '酒店',
  specialNeeds: ''
})

onLoad((query) => {
  if (query?.city) {
    const city = decodeURIComponent(String(query.city))
    if (destOptions.includes(city)) form.destination = city
  }
})

function toggleTag(list: string[], tag: string) {
  const idx = list.indexOf(tag)
  if (idx >= 0) list.splice(idx, 1)
  else list.push(tag)
}

function onDestChange(e: { detail: { value: number } }) {
  form.destination = destOptions[e.detail.value]
}

function onDayChange(e: { detail: { value: number } }) {
  form.days = dayOptions[e.detail.value]
}

function onPeopleChange(e: { detail: { value: number } }) {
  form.people = peopleOptions[e.detail.value]
}

function onDateChange(e: { detail: { value: string } }) {
  form.startDate = e.detail.value
}

function goBack() {
  uni.navigateBack()
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
    return
  }
  tripStore.currentTrip = {
    title: `${form.destination}${form.days.replace('天', '')}日游`,
    fromCity: '当前城市',
    toCity: form.destination,
    days: parseInt(form.days, 10) || 1,
    budget: form.budget === '高档' ? 8000 : form.budget === '经济' ? 1500 : 4000,
    people: form.people.startsWith('1') ? 1 : form.people.startsWith('2') ? 2 : 4,
    tags: [...form.prefs, form.pace],
    dayPlans: []
  }
  uni.navigateTo({ url: '/pages/ai/chat' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $mint-page;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $mint-page;
}

.nav-inner {
  display: flex;
  align-items: center;
  height: 96rpx;
  padding: 0 32rpx;
}

.back {
  font-size: 56rpx;
  color: $mint-text;
  margin-right: 16rpx;
}

.nav-title {
  font-size: 34rpx;
  font-weight: 700;
  color: $mint-text;
}

.progress-wrap {
  padding: 24rpx 48rpx;
}

.step-label {
  font-size: 24rpx;
  color: $mint-text;
  font-weight: 500;
  display: block;
  margin-bottom: 12rpx;
}

.progress-track {
  height: 8rpx;
  background: $mint-input;
  border-radius: 999rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: $mint-primary;
  border-radius: 999rpx;
  transition: width 0.3s ease;
}

.form-scroll {
  height: calc(100vh - 280rpx);
  padding: 0 32rpx;
  box-sizing: border-box;
}

.form-card {
  background: #fff;
  border-radius: $card-radius-lg;
  padding: 40rpx 32rpx;
  min-height: 520rpx;
}

.field {
  margin-bottom: 32rpx;
}

.label {
  font-size: 24rpx;
  font-weight: 700;
  color: $mint-text;
  display: block;
  margin-bottom: 16rpx;
}

.picker-box {
  height: 88rpx;
  line-height: 88rpx;
  background: $mint-input;
  border-radius: 20rpx;
  padding: 0 28rpx;
  font-size: 28rpx;
  color: $mint-text;
}

.textarea {
  width: 100%;
  height: 200rpx;
  background: $mint-input;
  border-radius: 20rpx;
  padding: 24rpx;
  font-size: 28rpx;
  color: $mint-text;
  box-sizing: border-box;
}

:deep(.input-placeholder) {
  color: $text-placeholder;
}

.tag-group {
  margin-bottom: 36rpx;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag {
  padding: 16rpx 32rpx;
  background: $mint-input;
  color: $mint-text;
  border-radius: 999rpx;
  font-size: 24rpx;

  &.selected {
    background: $mint-primary;
    color: #fff;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 24rpx;
  padding: 20rpx 32rpx;
  background: #fff;
  border-top: 1rpx solid $mint-input;
}

.btn-prev {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  background: #fff;
  border: 2rpx solid $mint-input;
  color: $mint-text;
  border-radius: 999rpx;
  font-size: 28rpx;

  &::after {
    border: none;
  }
}

.footer-next {
  flex: 2;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 28rpx;
}
</style>
