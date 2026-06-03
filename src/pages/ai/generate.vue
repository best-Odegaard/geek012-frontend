<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

/** 旧 AI 规划页重定向到 AI 对话 */
onLoad(() => {
  uni.redirectTo({ url: '/pages/ai/chat' })
})
</script>

<template>
  <view />
</template>
