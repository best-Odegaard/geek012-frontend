<template>
  <view class="page">
    <view class="menu card">
      <view class="menu-item">
        <text>消息通知</text>
        <switch :checked="notify" @change="notify = !notify" color="#3B82F6" />
      </view>
      <view class="menu-item">
        <text>深色模式</text>
        <switch :checked="darkMode" @change="toggleDark" color="#3B82F6" />
      </view>
      <view class="menu-item" @tap="clearCache">
        <text>清除缓存</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item">
        <text>版本号</text>
        <text class="value">v1.0.0</text>
      </view>
    </view>

    <view class="about card">
      <text class="about-title">关于 TourLing AI</text>
      <text class="about-desc">基于大语言模型的智能文旅行程规划平台，为年轻用户提供 AI 行程规划、景点推荐、活动发现与社区分享服务。</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const notify = ref(true)
const darkMode = ref(false)

function toggleDark() {
  darkMode.value = !darkMode.value
  appStore.changeTheme(darkMode.value ? 'dark' : 'light')
}

function clearCache() {
  uni.showModal({
    title: '清除缓存',
    content: '确定清除本地缓存？',
    success: (res) => {
      if (res.confirm) {
        uni.clearStorageSync()
        uni.showToast({ title: '已清除', icon: 'none' })
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

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 1rpx solid $border-color;
  font-size: 30rpx;
  color: $text-color;

  &:last-child { border-bottom: none; }
}

.arrow, .value {
  color: $text-secondary;
  font-size: 28rpx;
}

.about {
  margin-top: 24rpx;
}

.about-title {
  font-size: 32rpx;
  font-weight: 600;
  display: block;
  margin-bottom: 12rpx;
}

.about-desc {
  font-size: 26rpx;
  color: $text-secondary;
  line-height: 1.8;
}
</style>
