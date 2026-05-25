<template>
  <view class="empty-state">
    <text class="empty-icon">{{ icon }}</text>
    <text class="empty-title">{{ title }}</text>
    <text v-if="description" class="empty-desc">{{ description }}</text>
    <button v-if="buttonText" class="empty-btn" @tap="$emit('action')">{{ buttonText }}</button>
  </view>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title?: string
  description?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  icon: '🗺️',
  title: '暂无数据',
  description: '',
  buttonText: ''
})

defineEmits<{ action: [] }>()
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 48rpx;
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 24rpx;
}

.empty-title {
  font-size: 32rpx;
  color: $text-color;
  font-weight: 500;
}

.empty-desc {
  font-size: 26rpx;
  color: $text-secondary;
  margin-top: 12rpx;
  text-align: center;
}

.empty-btn {
  margin-top: 32rpx;
  background: $primary-color;
  color: #fff;
  font-size: 28rpx;
  border-radius: 40rpx;
  padding: 0 48rpx;
  height: 72rpx;
  line-height: 72rpx;

  &::after { border: none; }
}
</style>
