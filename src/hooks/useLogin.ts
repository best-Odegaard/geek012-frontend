import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { isLoggedIn } from '@/utils/auth'

/** 登录相关 Hook */
export function useLogin() {
  const userStore = useUserStore()
  const loading = ref(false)

  async function handleLogin(phone: string, password: string) {
    loading.value = true
    try {
      await userStore.login({ phone, password })
      uni.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => {
        const pages = getCurrentPages()
        if (pages.length > 1) {
          uni.navigateBack()
        } else {
          uni.switchTab({ url: '/pages/home/index' })
        }
      }, 1000)
    } finally {
      loading.value = false
    }
  }

  function checkLogin(): boolean {
    if (!isLoggedIn()) {
      uni.showModal({
        title: '提示',
        content: '请先登录',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({ url: '/pages/auth/login' })
          }
        }
      })
      return false
    }
    return true
  }

  return { loading, handleLogin, checkLogin, isLogin: userStore.isLogin }
}
