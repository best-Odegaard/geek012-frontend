<template>
  <view v-if="visible" class="menu-root" @tap="close">
    <view class="menu-mask" />
    <view class="menu-panel" @tap.stop>
      <view class="menu-item menu-item-primary" @tap="onSurvey">
        <text class="menu-title font-hand">旅行问卷</text>
        <text class="menu-icon">📋</text>
      </view>
      <view class="menu-item" @tap="onCreateNew">
        <view class="menu-text">
          <text class="menu-title font-hand">智能规划行程</text>
          <text class="menu-desc">填写目的地、天数与偏好，AI 生成计划</text>
        </view>
        <text class="menu-icon secondary">✦</text>
      </view>
      <view class="menu-item" @tap="onSmartImport">
        <view class="menu-text">
          <text class="menu-title font-hand">智能导入地点/行程</text>
          <text class="menu-desc">粘贴笔记链接、行程文本，或上传图片进行识别</text>
        </view>
        <text class="menu-icon secondary">🔗</text>
      </view>
      <view class="menu-item" @tap="onCollect">
        <view class="menu-text">
          <text class="menu-title font-hand">采集识别</text>
          <text class="menu-desc">识别同时收藏你的生活</text>
        </view>
        <text class="menu-icon secondary">📷</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const { showCreateMenu: visible } = storeToRefs(appStore)

function close() {
  appStore.closeCreateMenu()
}

function onSurvey() {
  close()
  uni.navigateTo({ url: '/pages/plan/survey' })
}

function onCreateNew() {
  close()
  uni.navigateTo({ url: '/pages/plan/wizard' })
}

function onSmartImport() {
  close()
  uni.navigateTo({ url: '/pages/plan/import' })
}

function onCollect() {
  close()
  uni.chooseImage({
    count: 9,
    success: () => {
      uni.showToast({ title: '识别功能开发中', icon: 'none' })
    }
  })
}
</script>

<style lang="scss" scoped>
.menu-root {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.menu-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.menu-panel {
  position: relative;
  padding: 24rpx 32rpx calc(180rpx + env(safe-area-inset-bottom));
  z-index: 1;
  animation: slideUp 0.28s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 28rpx;
  padding: 36rpx 32rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
}

.menu-item-primary {
  background: linear-gradient(135deg, #a8e6cf, #b5ead7);

  .menu-title {
    color: #5a7b74;
  }

  .menu-icon {
    color: #5a7b74;
    border-color: rgba(90, 123, 116, 0.2);
  }
}

.menu-text {
  flex: 1;
  min-width: 0;
  padding-right: 24rpx;
}

.menu-title {
  font-size: 34rpx;
  display: block;
  color: #000;
}

.menu-desc {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
  display: block;
  line-height: 1.5;
}

.menu-icon {
  font-size: 40rpx;
  width: 64rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  border: 2rpx solid #eee;
  border-radius: 16rpx;
  flex-shrink: 0;

  &.secondary {
    font-size: 32rpx;
    border: none;
  }
}
</style>
