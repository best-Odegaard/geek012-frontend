<template>
  <view class="tab-bar safe-bottom">
    <view class="tab-item" :class="{ active: selected === 0 }" @tap="switchTab(0)">
      <text class="tab-icon">{{ selected === 0 ? '🧳' : '🧳' }}</text>
      <text class="tab-text">行程</text>
    </view>

    <view class="fab-wrap">
      <view class="fab" :class="{ open: showCreateMenu }" @tap="onFabTap">
        <text class="fab-icon">{{ showCreateMenu ? '×' : '+' }}</text>
      </view>
    </view>

    <view class="tab-item" :class="{ active: selected === 1 }" @tap="switchTab(1)">
      <text class="tab-icon">📍</text>
      <text class="tab-text">探索</text>
    </view>

    <CreatePlanMenu />
  </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import CreatePlanMenu from '@/components/CreatePlanMenu/CreatePlanMenu.vue'

const appStore = useAppStore()
const { showCreateMenu, tabbarIndex: selected } = storeToRefs(appStore)

const tabList = [
  '/pages/home/index',
  '/pages/discover/index'
]

function switchTab(index: number) {
  if (selected.value === index) return
  appStore.closeCreateMenu()
  appStore.setTabbarIndex(index)
  uni.switchTab({ url: tabList[index] })
}

function onFabTap() {
  appStore.toggleCreateMenu()
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2rpx 16rpx rgba(0, 0, 0, 0.06);
  z-index: 999;
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
    color: #000;
    font-weight: 600;
  }
}

.tab-icon {
  font-size: 40rpx;
  line-height: 1;
}

.tab-text {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.fab-wrap {
  width: 160rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -48rpx;
}

.fab {
  width: 112rpx;
  height: 112rpx;
  background: #333;
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background 0.2s ease;

  &.open {
    transform: rotate(90deg);
    background: #000;
  }

  &:active {
    transform: scale(0.92);
  }

  &.open:active {
    transform: rotate(90deg) scale(0.92);
  }
}

.fab-icon {
  font-size: 56rpx;
  color: #fff;
  font-weight: 300;
  line-height: 1;
}
</style>
