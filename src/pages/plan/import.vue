<template>
  <view class="page">
    <view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="back" @tap="goBack">‹</text>
      <text class="nav-title font-hand">智能导入</text>
      <view style="width: 80rpx" />
    </view>

    <view class="content">
      <text class="hint font-hand">粘贴链接或行程文本</text>
      <textarea
        v-model="text"
        class="textarea"
        placeholder="支持小红书笔记链接、行程文本、酒店地址列表..."
        maxlength="5000"
      />
      <view class="upload-area" @tap="chooseImage">
        <text class="upload-icon">📷</text>
        <text class="upload-text">或上传截图识别</text>
      </view>
      <button class="btn-black" :loading="loading" @tap="handleImport">开始识别</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const systemInfo = uni.getSystemInfoSync()
const statusBarHeight = systemInfo.statusBarHeight || 20
const text = ref('')
const loading = ref(false)

function goBack() {
  uni.navigateBack()
}

function chooseImage() {
  uni.chooseImage({
    count: 3,
    success: () => {
      uni.showToast({ title: '图片已选择，识别开发中', icon: 'none' })
    }
  })
}

async function handleImport() {
  if (!text.value.trim()) {
    uni.showToast({ title: '请输入内容', icon: 'none' })
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    uni.showToast({ title: '识别完成，跳转规划', icon: 'success' })
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/plan/wizard' })
    }, 600)
  }, 1200)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $page-bg;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx 24rpx;
}

.back {
  font-size: 56rpx;
  width: 80rpx;
}

.nav-title {
  font-size: 36rpx;
}

.content {
  padding: 32rpx;
}

.hint {
  font-size: 40rpx;
  display: block;
  margin-bottom: 32rpx;
}

.textarea {
  width: 100%;
  min-height: 320rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  border: 2rpx solid $accent-border;
}

.upload-area {
  margin: 32rpx 0;
  padding: 48rpx;
  background: #fff;
  border-radius: 24rpx;
  border: 2rpx dashed #ccc;
  text-align: center;
}

.upload-icon {
  font-size: 48rpx;
  display: block;
}

.upload-text {
  font-size: 26rpx;
  color: #666;
  margin-top: 12rpx;
  display: block;
}

.btn-black {
  width: 100%;
  margin-top: 24rpx;
}
</style>
