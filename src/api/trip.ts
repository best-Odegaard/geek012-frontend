import http from '@/utils/request'
import { USE_MOCK } from '@/utils/constant'
import * as mock from '@/api/mock/handlers'

export interface GenerateTripParams {
  fromCity: string
  toCity: string
  days: number
  budget: number
  people: number
  tags: string[]
}

export interface TripScheduleItem {
  time: string
  title: string
  description?: string
  type?: 'scenic' | 'food' | 'hotel' | 'transport'
}

export interface TripDayPlan {
  day: number
  title: string
  schedules: TripScheduleItem[]
}

export interface TripPlan {
  id?: number | string
  title: string
  fromCity: string
  toCity: string
  days: number
  budget: number
  people: number
  tags: string[]
  dayPlans: TripDayPlan[]
  estimatedCost?: number
  hotel?: string
  createdAt?: string
}

/** AI 生成行程 — POST /trip/generate */
export function generateTrip(data: GenerateTripParams) {
  if (USE_MOCK) return mock.mockGenerateTrip(data)
  return http.post<TripPlan>('/trip/generate', data, { showLoading: true, loadingText: 'AI 规划中...' })
}

/** 保存行程 — POST /trip/save */
export function saveTrip(data: TripPlan) {
  if (USE_MOCK) return mock.mockSaveTrip(data)
  return http.post<TripPlan>('/trip/save', data, { showLoading: true })
}

/** 我的行程列表 — GET /trip/list */
export function getMyTrips() {
  if (USE_MOCK) return mock.mockGetMyTrips()
  return http.get<TripPlan[]>('/trip/list')
}

/** 行程详情 — GET /trip/:id */
export function getTripDetail(id: number | string) {
  if (USE_MOCK) return mock.mockGetTripDetail(id)
  return http.get<TripPlan>(`/trip/${id}`)
}

/** 更新行程 — PUT /trip/:id */
export function updateTrip(id: number | string, data: Partial<TripPlan>) {
  if (USE_MOCK) return mock.mockUpdateTrip(id, data)
  return http.put<TripPlan>(`/trip/${id}`, data, { showLoading: true })
}

/** 删除行程 — DELETE /trip/:id */
export function deleteTrip(id: number | string) {
  if (USE_MOCK) return mock.mockDeleteTrip(id)
  return http.delete<void>(`/trip/${id}`, undefined, { showLoading: true })
}

/** 复制行程 — POST /trip/:id/copy */
export function copyTrip(id: number | string) {
  if (USE_MOCK) return mock.mockCopyTrip(id)
  return http.post<TripPlan>(`/trip/${id}/copy`, {}, { showLoading: true })
}
