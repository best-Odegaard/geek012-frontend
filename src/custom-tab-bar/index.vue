<template>
  <view class="tab-bar-wrap">
    <view class="tab-bar safe-bottom">
      <view
        v-for="(tab, index) in tabs"
        :key="tab.path"
        class="tab-item"
        :class="{ active: selected === index }"
        @tap="switchTab(index)"
      >
        <text class="tab-icon">{{ selected === index ? tab.activeIcon : tab.icon }}</text>
        <text class="tab-text">{{ tab.text }}</text>
      </view>
    </view>

    <view class="fab soft-shadow" @tap="goSurvey">
      <text class="fab-icon">+</text>
      <text class="fab-label">新增行程</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const { tabbarIndex: selected } = storeToRefs(appStore)

const tabs = [
  { path: '/pages/home/index', text: '首页', icon: '🏠', activeIcon: '🏠' },
  { path: '/pages/trip/index', text: '行程', icon: '📅', activeIcon: '📅' },
  { path: '/pages/discover/index', text: '探索', icon: '🧭', activeIcon: '🧭' },
  { path: '/pages/profile/index', text: '我的', icon: '👤', activeIcon: '👤' }
]

function switchTab(index: number) {
  if (selected.value === index) return
  appStore.closeCreateMenu()
  appStore.setTabbarIndex(index)
  uni.switchTab({ url: tabs[index].path })
}

/** 预设：右下角 + 直接跳转问卷 */
function goSurvey() {
  appStore.closeCreateMenu()
  uni.navigateTo({ url: '/pages/plan/survey' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.tab-bar-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  pointer-events: none;
}

.tab-bar {
  pointer-events: auto;
  height: 120rpx;
  background: #fff;
  display: flex;
  align-items: center;
  border-top: 1rpx solid $mint-input;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.04);
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 8rpx;

  &.active .tab-text {
    color: $mint-primary;
    font-weight: 600;
  }

  &.active .tab-icon {
    transform: scale(1.05);
  }
}

.tab-icon {
  font-size: 40rpx;
  line-height: 1;
  transition: transform 0.15s;
}

.tab-text {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.fab {
  pointer-events: auto;
  position: absolute;
  right: 32rpx;
  bottom: calc(140rpx + env(safe-area-inset-bottom));
  width: 112rpx;
  height: 112rpx;
  background: linear-gradient(135deg, $mint-primary, $mint-secondary);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fab-icon {
  font-size: 52rpx;
  color: #fff;
  font-weight: 300;
  line-height: 1;
}

.fab-label {
  font-size: 16rpx;
  color: rgba(255, 255, 255, 0.95);
  margin-top: 2rpx;
}
</style>
