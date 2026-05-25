<template>
  <view class="page">
    <CustomNavbar title="我的" />

    <scroll-view scroll-y class="scroll-content" :style="{ paddingTop: navHeight + 'px' }">
      <!-- 用户信息 -->
      <view class="user-card" @tap="handleUserTap">
        <image class="avatar" :src="userInfo?.avatar || defaultAvatar" mode="aspectFill" />
        <view class="user-info">
          <text class="nickname">{{ userInfo?.nickname || '点击登录' }}</text>
          <text class="bio">{{ userInfo?.bio || '探索世界，记录美好' }}</text>
        </view>
        <text class="arrow">›</text>
      </view>

      <!-- 数据统计 -->
      <view class="stats card">
        <view class="stat-item" @tap="goPage('/pages/trip/myTrip')">
          <text class="stat-num">{{ tripCount }}</text>
          <text class="stat-label">行程</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">0</text>
          <text class="stat-label">收藏</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">0</text>
          <text class="stat-label">游记</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">0</text>
          <text class="stat-label">关注</text>
        </view>
      </view>

      <!-- 功能菜单 -->
      <view class="menu card">
        <view v-for="item in menuItems" :key="item.label" class="menu-item" @tap="goPage(item.path)">
          <text class="menu-icon">{{ item.icon }}</text>
          <text class="menu-label">{{ item.label }}</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>

      <button v-if="isLogin" class="logout-btn" @tap="handleLogout">退出登录</button>

      <view class="safe-bottom" style="height: 40rpx" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar.vue'
import { useUserStore } from '@/store/user'
import { useTripStore } from '@/store/trip'
import { isLoggedIn } from '@/utils/auth'

const userStore = useUserStore()
const tripStore = useTripStore()
const { userInfo } = storeToRefs(userStore)

const systemInfo = uni.getSystemInfoSync()
const navHeight = (systemInfo.statusBarHeight || 20) + 44
const defaultAvatar = 'https://picsum.photos/seed/default/200/200'
const tripCount = ref(0)

const isLogin = computed(() => isLoggedIn())

const menuItems = [
  { icon: '⭐', label: '我的收藏', path: '' },
  { icon: '📝', label: '我的游记', path: '' },
  { icon: '🗺️', label: '我的行程', path: '/pages/trip/myTrip' },
  { icon: '👁️', label: '浏览历史', path: '' },
  { icon: '💬', label: '意见反馈', path: '' },
  { icon: 'ℹ️', label: '关于我们', path: '' },
  { icon: '⚙️', label: '设置中心', path: '/pages/profile/setting' }
]

onMounted(async () => {
  if (isLogin.value) {
    try {
      const list = await tripStore.loadHistory()
      tripCount.value = list.length
    } catch {
      tripCount.value = 0
    }
  }
})

function handleUserTap() {
  if (isLogin.value) {
    uni.navigateTo({ url: '/pages/profile/edit' })
  } else {
    uni.navigateTo({ url: '/pages/auth/login' })
  }
}

function goPage(path: string) {
  if (!path) {
    uni.showToast({ title: '功能开发中', icon: 'none' })
    return
  }
  if (path.includes('trip') && !isLogin.value) {
    uni.navigateTo({ url: '/pages/auth/login' })
    return
  }
  uni.navigateTo({ url: path })
}

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定退出登录？',
    success: (res) => {
      if (res.confirm) userStore.logout()
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg-color;
}

.scroll-content {
  height: 100vh;
  padding: 0 32rpx;
  box-sizing: border-box;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 40rpx 0;
  gap: 24rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.user-info {
  flex: 1;
}

.nickname {
  font-size: 36rpx;
  font-weight: 600;
  color: $text-color;
  display: block;
}

.bio {
  font-size: 26rpx;
  color: $text-secondary;
  margin-top: 8rpx;
  display: block;
}

.arrow {
  font-size: 40rpx;
  color: $text-placeholder;
}

.stats {
  display: flex;
  margin-bottom: 24rpx;
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 16rpx 0;
}

.stat-num {
  font-size: 36rpx;
  font-weight: 600;
  color: $text-color;
  display: block;
}

.stat-label {
  font-size: 24rpx;
  color: $text-secondary;
  margin-top: 4rpx;
  display: block;
}

.menu {
  margin-bottom: 32rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 1rpx solid $border-color;

  &:last-child { border-bottom: none; }
}

.menu-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}

.menu-label {
  flex: 1;
  font-size: 30rpx;
  color: $text-color;
}

.menu-arrow {
  font-size: 32rpx;
  color: $text-placeholder;
}

.logout-btn {
  background: #fff;
  color: $error-color;
  font-size: 30rpx;
  border-radius: $card-radius;
  height: 88rpx;
  line-height: 88rpx;
  border: none;

  &::after { border: none; }
}
</style>
