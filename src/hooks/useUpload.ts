import { ref } from 'vue'
import { API_BASE_URL } from '@/utils/constant'
import { getToken } from '@/utils/auth'

/** 图片上传 Hook */
export function useUpload() {
  const uploading = ref(false)
  const progress = ref(0)

  /** 选择并上传图片 */
  async function chooseAndUpload(count = 9): Promise<string[]> {
    const chooseRes = await new Promise<UniApp.ChooseImageSuccessCallbackResult>((resolve, reject) => {
      uni.chooseImage({
        count,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject
      })
    })

    uploading.value = true
    progress.value = 0

    const urls: string[] = []
    const total = chooseRes.tempFilePaths.length

    for (let i = 0; i < total; i++) {
      const url = await uploadFile(chooseRes.tempFilePaths[i])
      urls.push(url)
      progress.value = Math.round(((i + 1) / total) * 100)
    }

    uploading.value = false
    return urls
  }

  /** 上传单个文件 */
  function uploadFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const token = getToken()
      uni.uploadFile({
        url: `${API_BASE_URL}/common/upload`,
        filePath,
        name: 'file',
        header: token ? { Authentication: token } : {},
        success: (res) => {
          try {
            const data = JSON.parse(res.data)
            if (data.code === 1 || data.code === 200) {
              resolve(data.data)
            } else {
              reject(new Error(data.msg || '上传失败'))
            }
          } catch {
            reject(new Error('上传响应解析失败'))
          }
        },
        fail: reject
      })
    })
  }

  return { uploading, progress, chooseAndUpload, uploadFile }
}
