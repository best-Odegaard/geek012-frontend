import { storage } from './storage'
import { TOKEN_KEY } from './constant'

/** 获取 Token */
export function getToken(): string {
  return storage.get<string>(TOKEN_KEY, '') || ''
}

/** 设置 Token */
export function setToken(token: string): void {
  storage.set(TOKEN_KEY, token)
}

/** 移除 Token */
export function removeToken(): void {
  storage.remove(TOKEN_KEY)
}

/** 是否已登录 */
export function isLoggedIn(): boolean {
  return !!getToken()
}

/** 跳转登录页 */
export function redirectToLogin(): void {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const redirect = currentPage ? `/${currentPage.route}` : ''
  uni.navigateTo({
    url: `/pages/auth/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`
  })
}
