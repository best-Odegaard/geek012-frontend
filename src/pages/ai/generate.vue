<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

/** 旧 AI 规划页重定向到新版 wizard */
onLoad(() => {
  uni.redirectTo({ url: '/pages/plan/wizard' })
})
</script>

<template>
  <view />
</template>
