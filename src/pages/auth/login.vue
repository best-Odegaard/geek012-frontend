<template>
  <view class="page">
    <view class="header">
      <text class="logo">🗺️</text>
      <text class="title">TourLing 途灵</text>
      <text class="subtitle">智能文旅行程规划平台</text>
    </view>

    <view class="form card">
      <view class="form-item">
        <text class="label">手机号</text>
        <input v-model="phone" class="input" type="number" maxlength="11" placeholder="请输入手机号" />
      </view>
      <view class="form-item">
        <text class="label">密码</text>
        <input v-model="password" class="input" password placeholder="请输入密码" />
      </view>
    </view>

    <button class="btn-primary login-btn" :loading="loading" @tap="submit">登录</button>

    <view class="footer">
      <text class="link" @tap="goRegister">还没有账号？立即注册</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLogin } from '@/hooks/useLogin'

const { loading, handleLogin } = useLogin()
const phone = ref('')
const password = ref('')

async function submit() {
  if (!phone.value || phone.value.length !== 11) {
    uni.showToast({ title: '请输入正确手机号', icon: 'none' })
    return
  }
  if (!password.value) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }
  await handleLogin(phone.value, password.value)
}

function goRegister() {
  uni.navigateTo({ url: '/pages/auth/register' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba($primary-color, 0.08) 0%, $bg-color 40%);
  padding: 120rpx 48rpx 48rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
}

.logo {
  font-size: 80rpx;
  display: block;
}

.title {
  font-size: 44rpx;
  font-weight: 700;
  color: $text-color;
  margin-top: 16rpx;
  display: block;
}

.subtitle {
  font-size: 26rpx;
  color: $text-secondary;
  margin-top: 8rpx;
  display: block;
}

.form {
  margin-bottom: 40rpx;
}

.form-item {
  margin-bottom: 28rpx;
}

.label {
  font-size: 26rpx;
  color: $text-secondary;
  margin-bottom: 12rpx;
  display: block;
}

.input {
  height: 88rpx;
  padding: 0 24rpx;
  background: $bg-color;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.login-btn {
  margin-bottom: 32rpx;
}

.footer {
  text-align: center;
}

.link {
  font-size: 26rpx;
  color: $primary-color;
}
</style>
