<template>
  <view class="page">
    <view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-inner">
        <text class="back" @tap="goBack">‹</text>
        <text class="nav-title">AI行程助手</text>
        <text class="draft-btn" @tap="onDraft">保存草稿</text>
      </view>
    </view>

    <scroll-view
      scroll-y
      class="chat-scroll"
      :style="{ paddingTop: navHeight + 'px' }"
      :scroll-into-view="scrollIntoView"
      scroll-with-animation
    >
      <view
        v-for="(msg, i) in messages"
        :key="i"
        :id="'msg-' + i"
        class="msg-row"
        :class="msg.role"
      >
        <view v-if="msg.role === 'assistant'" class="avatar">🤖</view>
        <view class="bubble" :class="msg.role">
          <text v-if="msg.role === 'assistant'" class="role-tag">AI</text>
          <text v-else class="role-tag user-tag">我</text>
          <text class="msg-text">{{ msg.content }}</text>
        </view>
      </view>
      <view :id="'msg-' + messages.length" />
      <view style="height: 300rpx" />
    </scroll-view>

    <view class="footer safe-bottom">
      <view class="input-row">
        <view class="input-wrap">
          <input
            v-model="inputText"
            class="chat-input"
            placeholder="输入你的补充需求..."
            placeholder-class="input-placeholder"
            confirm-type="send"
            @confirm="sendMessage"
          />
          <text class="mic-btn" @tap="onVoice">🎤</text>
        </view>
        <view class="send-btn" @tap="sendMessage">
          <text>➤</text>
        </view>
      </view>
      <button class="btn-black gen-btn" @tap="goItinerary">生成行程计划</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/store/trip'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const tripStore = useTripStore()
const { currentTrip } = storeToRefs(tripStore)

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const navHeight = statusBarHeight + 48

const inputText = ref('')
const scrollIntoView = ref('')

const intro = computedIntro()
const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    content: `已收到你的需求：目的地${intro.city}、${intro.days}、${intro.people}、${intro.pace}节奏、偏好${intro.prefs}，请问还有补充吗？`
  }
])

function computedIntro() {
  const t = currentTrip.value
  return {
    city: t?.toCity || '肇庆',
    days: t?.days ? `${t.days}天` : '1天',
    people: t?.people ? `${t.people}人` : '2人',
    pace: t?.tags?.find((x) => ['悠闲', '常规', '暴走'].includes(x)) || '常规',
    prefs: t?.tags?.filter((x) => !['悠闲', '常规', '暴走'].includes(x)).join('、') || '自然风光'
  }
}

function scrollToBottom() {
  nextTick(() => {
    scrollIntoView.value = 'msg-' + messages.value.length
  })
}

function sendMessage() {
  const text = inputText.value.trim()
  if (!text) return
  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  scrollToBottom()
  setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: '收到！我可以按你的要求优化，现在直接生成行程，还是继续补充？'
    })
    scrollToBottom()
  }, 600)
}

function goBack() {
  uni.navigateBack()
}

function onDraft() {
  uni.showToast({ title: '草稿已保存', icon: 'success' })
}

function onVoice() {
  uni.showToast({ title: '语音输入开发中', icon: 'none' })
}

function goItinerary() {
  uni.navigateTo({ url: '/pages/trip/detail?id=mock-zq-1' })
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
  padding: 0 32rpx;
}

.back {
  font-size: 56rpx;
  color: $mint-text;
  margin-right: 16rpx;
}

.nav-title {
  flex: 1;
  font-size: 34rpx;
  font-weight: 700;
  color: $mint-text;
}

.draft-btn {
  font-size: 26rpx;
  color: $mint-primary;
  font-weight: 500;
}

.chat-scroll {
  flex: 1;
  height: 100vh;
  padding: 24rpx 32rpx;
  box-sizing: border-box;
}

.msg-row {
  display: flex;
  margin-bottom: 32rpx;
  gap: 16rpx;

  &.user {
    justify-content: flex-end;
  }
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: $mint-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  flex-shrink: 0;
}

.bubble {
  max-width: 82%;
  padding: 20rpx 28rpx;
  border-radius: 32rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.06);

  &.assistant {
    background: $mint-light;
    color: $mint-text;
    border-top-left-radius: 8rpx;
  }

  &.user {
    background: $mint-primary;
    color: #fff;
    border-top-right-radius: 8rpx;
  }
}

.role-tag {
  font-size: 20rpx;
  font-weight: 700;
  display: block;
  margin-bottom: 8rpx;
  opacity: 0.7;

  &.user-tag {
    text-align: right;
    opacity: 0.9;
  }
}

.msg-text {
  font-size: 28rpx;
  line-height: 1.55;
  display: block;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1rpx solid $mint-input;
  padding: 24rpx 32rpx;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.input-wrap {
  flex: 1;
  height: 88rpx;
  background: $mint-input;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  padding: 0 32rpx;
}

.chat-input {
  flex: 1;
  font-size: 28rpx;
  color: $mint-text;
}

:deep(.input-placeholder) {
  color: $text-placeholder;
}

.mic-btn {
  font-size: 36rpx;
  margin-left: 12rpx;
}

.send-btn {
  width: 88rpx;
  height: 88rpx;
  background: $mint-primary;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 36rpx;
  box-shadow: 0 8rpx 24rpx rgba(168, 230, 207, 0.4);
}

.gen-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 28rpx;
}
</style>
