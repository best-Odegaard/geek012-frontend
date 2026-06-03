import http from '@/utils/request'
import { USE_MOCK } from '@/utils/constant'
import * as mock from '@/api/mock/handlers'

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

/** 用户登录 — POST /user/login */
export function login(data: LoginParams) {
  if (USE_MOCK) return mock.mockUserLogin(data)
  return http.post<LoginResult>('/user/login', data, { showLoading: true, skipAuth: true })
}

/** 用户注册 — POST /user/register */
export function register(data: RegisterParams) {
  if (USE_MOCK) return mock.mockUserRegister(data)
  return http.post<void>('/user/register', data, { showLoading: true, skipAuth: true })
}

/** 获取用户信息 — GET /user/info */
export function getUserInfo() {
  if (USE_MOCK) return mock.mockGetUserInfo()
  return http.get<UserInfo>('/user/info')
}

/** 更新用户信息 — PUT /user/info */
export function updateUserInfo(data: Partial<UserInfo>) {
  if (USE_MOCK) return mock.mockUpdateUserInfo(data)
  return http.put<UserInfo>('/user/info', data, { showLoading: true })
}

/** 发送验证码 — POST /user/sms */
export function sendSmsCode(phone: string) {
  if (USE_MOCK) return mock.mockSendSmsCode(phone)
  return http.post<void>('/user/sms', { phone }, { skipAuth: true })
}
