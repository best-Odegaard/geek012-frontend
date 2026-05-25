<template>
  <view class="page">
    <view class="form card">
      <input v-model="form.title" class="title-input" placeholder="填写标题，吸引更多阅读" />

      <textarea
        v-model="form.content"
        class="content-input"
        placeholder="分享你的旅行故事..."
        maxlength="2000"
      />

      <!-- 图片上传 -->
      <view class="images">
        <view v-for="(img, i) in form.images" :key="i" class="img-item">
          <image :src="img" mode="aspectFill" class="img" />
          <text class="remove" @tap="removeImage(i)">×</text>
        </view>
        <view v-if="form.images.length < 9" class="add-btn" @tap="addImages">
          <text v-if="uploading">{{ progress }}%</text>
          <text v-else>+</text>
        </view>
      </view>

      <!-- 标签 -->
      <view class="tags-section">
        <text class="label">添加标签</text>
        <view class="tags">
          <text
            v-for="tag in COMMUNITY_TAGS"
            :key="tag"
            class="tag"
            :class="{ active: form.tags.includes(tag) }"
            @tap="toggleTag(tag)"
          >{{ tag }}</text>
        </view>
      </view>

      <input v-model="form.location" class="location-input" placeholder="添加地点（选填）" />
    </view>

    <button class="btn-primary publish-btn" :loading="publishing" @tap="handlePublish">发布游记</button>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { COMMUNITY_TAGS } from '@/utils/constant'
import { publishPost } from '@/api/community'
import { useUpload } from '@/hooks/useUpload'

const { uploading, progress, chooseAndUpload } = useUpload()
const publishing = ref(false)

const form = reactive({
  title: '',
  content: '',
  images: [] as string[],
  tags: [] as string[],
  location: ''
})

function toggleTag(tag: string) {
  const idx = form.tags.indexOf(tag)
  if (idx >= 0) form.tags.splice(idx, 1)
  else form.tags.push(tag)
}

async function addImages() {
  try {
    const urls = await chooseAndUpload(9 - form.images.length)
    form.images.push(...urls)
  } catch {
    // 演示模式：使用占位图
    form.images.push(`https://picsum.photos/seed/${Date.now()}/400/400`)
  }
}

function removeImage(index: number) {
  form.images.splice(index, 1)
}

async function handlePublish() {
  if (!form.title.trim()) {
    uni.showToast({ title: '请填写标题', icon: 'none' })
    return
  }
  if (!form.content.trim()) {
    uni.showToast({ title: '请填写内容', icon: 'none' })
    return
  }

  publishing.value = true
  try {
    await publishPost(form)
    uni.showToast({ title: '发布成功', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1000)
  } catch {
    uni.showToast({ title: '发布成功（演示）', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1000)
  } finally {
    publishing.value = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg-color;
  padding: 24rpx 32rpx;
}

.title-input {
  font-size: 34rpx;
  font-weight: 500;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid $border-color;
  margin-bottom: 20rpx;
}

.content-input {
  width: 100%;
  min-height: 300rpx;
  font-size: 28rpx;
  line-height: 1.8;
}

.images {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin: 24rpx 0;
}

.img-item {
  position: relative;
  width: 200rpx;
  height: 200rpx;
}

.img {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.remove {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 36rpx;
  height: 36rpx;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 36rpx;
  font-size: 24rpx;
}

.add-btn {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed $border-color;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60rpx;
  color: $text-placeholder;
}

.tags-section { margin: 24rpx 0; }

.label {
  font-size: 26rpx;
  color: $text-secondary;
  margin-bottom: 12rpx;
  display: block;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.tag {
  padding: 8rpx 20rpx;
  font-size: 24rpx;
  background: $bg-color;
  border-radius: 24rpx;
  color: $text-secondary;

  &.active {
    background: rgba($primary-color, 0.1);
    color: $primary-color;
  }
}

.location-input {
  height: 72rpx;
  padding: 0 20rpx;
  background: $bg-color;
  border-radius: 12rpx;
  font-size: 26rpx;
  margin-top: 16rpx;
}

.publish-btn { margin-top: 32rpx; }
</style>
