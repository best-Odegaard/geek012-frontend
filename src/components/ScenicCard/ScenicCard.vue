<template>
  <view class="scenic-card" @tap="handleTap">
    <image class="cover" :src="item.cover" mode="aspectFill" />
    <view class="info">
      <text class="name text-ellipsis">{{ item.name }}</text>
      <view class="meta">
        <text class="rating">⭐ {{ formatRating(item.rating) }}</text>
        <text class="city">{{ item.city }}</text>
      </view>
      <text v-if="item.price !== undefined" class="price">{{ formatPrice(item.price) }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { formatRating, formatPrice } from '@/utils/format'
import type { ScenicItem } from '@/api/scenic'

interface Props {
  item: ScenicItem
}

const props = defineProps<Props>()

function handleTap() {
  uni.navigateTo({ url: `/pages/scenic/detail?id=${props.item.id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.scenic-card {
  width: 280rpx;
  flex-shrink: 0;
  background: #fff;
  border-radius: $card-radius;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.cover {
  width: 100%;
  height: 200rpx;
}

.info {
  padding: 16rpx;
}

.name {
  font-size: 28rpx;
  font-weight: 500;
  color: $text-color;
  display: block;
}

.meta {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-top: 8rpx;
}

.rating {
  font-size: 22rpx;
  color: $warning-color;
}

.city {
  font-size: 22rpx;
  color: $text-secondary;
}

.price {
  font-size: 24rpx;
  color: $error-color;
  margin-top: 8rpx;
  display: block;
}
</style>
