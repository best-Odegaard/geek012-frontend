<template>
  <view class="page">
    <CustomNavbar title="注册" show-back />

    <view class="form card">
      <view class="form-item">
        <text class="label">昵称</text>
        <input v-model="form.nickname" class="input" placeholder="请输入昵称" />
      </view>
      <view class="form-item">
        <text class="label">手机号</text>
        <input v-model="form.phone" class="input" type="number" maxlength="11" placeholder="请输入手机号" />
      </view>
      <view class="form-item">
        <text class="label">密码</text>
        <input v-model="form.password" class="input" password placeholder="请输入密码（6位以上）" />
      </view>
    </view>

    <button class="btn-primary" :loading="loading" @tap="submit">注册</button>

    <view class="footer">
      <text class="link" @tap="goLogin">已有账号？去登录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  nickname: '',
  phone: '',
  password: ''
})

async function submit() {
  if (!form.nickname) {
    uni.showToast({ title: '请输入昵称', icon: 'none' })
    return
  }
  if (!form.phone || form.phone.length !== 11) {
    uni.showToast({ title: '请输入正确手机号', icon: 'none' })
    return
  }
  if (form.password.length < 6) {
    uni.showToast({ title: '密码至少6位', icon: 'none' })
    return
  }

  loading.value = true
  try {
    await userStore.register(form)
    uni.showToast({ title: '注册成功', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1000)
  } catch {
    // handled by request interceptor
  } finally {
    loading.value = false
  }
}

function goLogin() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg-color;
  padding: 180rpx 48rpx 48rpx;
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

.footer {
  text-align: center;
  margin-top: 32rpx;
}

.link {
  font-size: 26rpx;
  color: $primary-color;
}
</style>
