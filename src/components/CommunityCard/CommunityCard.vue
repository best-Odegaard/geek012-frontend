<template>
  <view class="community-card" @tap="handleTap">
    <image class="cover" :src="item.cover" mode="widthFix" />
    <view class="info">
      <text class="title text-ellipsis-2">{{ item.title }}</text>
      <view class="author-row">
        <image class="avatar" :src="item.author.avatar" mode="aspectFill" />
        <text class="nickname text-ellipsis">{{ item.author.nickname }}</text>
      </view>
      <view class="stats">
        <text class="stat">❤️ {{ formatCount(item.likeCount) }}</text>
        <text class="stat">⭐ {{ formatCount(item.collectCount) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { formatCount } from '@/utils/format'
import type { CommunityPost } from '@/api/community'

interface Props {
  item: CommunityPost
}

const props = defineProps<Props>()

function handleTap() {
  uni.navigateTo({ url: `/pages/community/detail?id=${props.item.id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.community-card {
  background: #fff;
  border-radius: $card-radius;
  overflow: hidden;
  break-inside: avoid;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.cover {
  width: 100%;
  display: block;
}

.info {
  padding: 16rpx;
}

.title {
  font-size: 26rpx;
  font-weight: 500;
  color: $text-color;
  line-height: 1.4;
}

.author-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 12rpx;
}

.avatar {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
}

.nickname {
  font-size: 22rpx;
  color: $text-secondary;
  flex: 1;
}

.stats {
  display: flex;
  gap: 16rpx;
  margin-top: 8rpx;
}

.stat {
  font-size: 22rpx;
  color: $text-placeholder;
}
</style>
