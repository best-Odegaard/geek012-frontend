<template>
  <view class="page">
    <LoadingView v-if="loading" />
    <view v-else-if="post">
      <swiper v-if="post.images?.length" class="banner" circular>
        <swiper-item v-for="(img, i) in post.images" :key="i">
          <image :src="img" mode="aspectFill" class="banner-img" />
        </swiper-item>
      </swiper>
      <image v-else class="cover" :src="post.cover" mode="aspectFill" />

      <view class="content">
        <text class="title">{{ post.title }}</text>
        <view class="author" @tap="followAuthor">
          <image class="avatar" :src="post.author.avatar" mode="aspectFill" />
          <text class="nickname">{{ post.author.nickname }}</text>
          <text v-if="!post.isFollowed" class="follow-btn">+ 关注</text>
        </view>
        <text class="body">{{ post.content || '精彩内容...' }}</text>
        <view v-if="post.tags?.length" class="tags">
          <text v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</text>
        </view>
      </view>

      <view class="action-bar safe-bottom">
        <view class="action" @tap="toggleLike">
          <text>{{ post.isLiked ? '❤️' : '🤍' }}</text>
          <text>{{ formatCount(post.likeCount) }}</text>
        </view>
        <view class="action" @tap="toggleCollect">
          <text>{{ post.isCollected ? '⭐' : '☆' }}</text>
          <text>{{ formatCount(post.collectCount) }}</text>
        </view>
        <view class="action" @tap="share">
          <text>📤</text>
          <text>分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingView from '@/components/LoadingView/LoadingView.vue'
import { getCommunityDetail, likePost, unlikePost, collectPost, uncollectPost, followAuthor as followApi } from '@/api/community'
import { formatCount } from '@/utils/format'
import { mockPosts } from '@/utils/mock'
import type { CommunityPost } from '@/api/community'

const loading = ref(true)
const post = ref<CommunityPost | null>(null)

onMounted(async () => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] as { options?: { id?: string } }
  const id = Number(page.options?.id || 0)
  try {
    post.value = await getCommunityDetail(id)
  } catch {
    post.value = mockPosts.find((p) => p.id === id) || mockPosts[0]
  }
  loading.value = false
})

function toggleLike() {
  if (!post.value) return
  post.value.isLiked = !post.value.isLiked
  post.value.likeCount += post.value.isLiked ? 1 : -1
}

function toggleCollect() {
  if (!post.value) return
  post.value.isCollected = !post.value.isCollected
  post.value.collectCount += post.value.isCollected ? 1 : -1
}

function followAuthor() {
  if (!post.value) return
  post.value.isFollowed = true
  uni.showToast({ title: '关注成功', icon: 'none' })
}

function share() {
  uni.showToast({ title: '点击右上角分享', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.banner, .cover { width: 100%; height: 500rpx; }
.banner-img { width: 100%; height: 100%; }

.content { padding: 32rpx; padding-bottom: 140rpx; }

.title {
  font-size: 36rpx;
  font-weight: 600;
  color: $text-color;
  display: block;
}

.author {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin: 24rpx 0;
}

.avatar { width: 64rpx; height: 64rpx; border-radius: 50%; }
.nickname { flex: 1; font-size: 28rpx; color: $text-color; }

.follow-btn {
  font-size: 24rpx;
  color: $primary-color;
  border: 2rpx solid $primary-color;
  padding: 6rpx 20rpx;
  border-radius: 24rpx;
}

.body {
  font-size: 28rpx;
  color: $text-secondary;
  line-height: 1.8;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 24rpx;
}

.tag {
  font-size: 24rpx;
  color: $primary-color;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 24rpx;
  background: #fff;
  box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);
}

.action {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24rpx;
  color: $text-secondary;
  gap: 4rpx;
}
</style>
