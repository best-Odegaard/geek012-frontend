import http from '@/utils/request'

export interface UserInfo {
  id: number
  nickname: string
  avatar: string
  phone: string
  bio?: string
}

export interface LoginParams {
  phone: string
  password: string
}

export interface RegisterParams {
  phone: string
  password: string
  nickname: string
  code?: string
}

export interface LoginResult {
  token: string
  userInfo: UserInfo
}

/** 用户登录 */
export function login(data: LoginParams) {
  return http.post<LoginResult>('/user/login', data, { showLoading: true, skipAuth: true })
}

/** 用户注册 */
export function register(data: RegisterParams) {
  return http.post<void>('/user/register', data, { showLoading: true, skipAuth: true })
}

/** 获取用户信息 */
export function getUserInfo() {
  return http.get<UserInfo>('/user/info')
}

/** 更新用户信息 */
export function updateUserInfo(data: Partial<UserInfo>) {
  return http.put<UserInfo>('/user/info', data, { showLoading: true })
}

/** 发送验证码 */
export function sendSmsCode(phone: string) {
  return http.post<void>('/user/sms', { phone }, { skipAuth: true })
}
