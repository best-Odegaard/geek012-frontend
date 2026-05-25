import http from '@/utils/request'

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

/** AI 生成行程 */
export function generateTrip(data: GenerateTripParams) {
  return http.post<TripPlan>('/trip/generate', data, { showLoading: true, loadingText: 'AI 规划中...' })
}

/** 保存行程 */
export function saveTrip(data: TripPlan) {
  return http.post<TripPlan>('/trip/save', data, { showLoading: true })
}

/** 获取我的行程列表 */
export function getMyTrips() {
  return http.get<TripPlan[]>('/trip/list')
}

/** 获取行程详情 */
export function getTripDetail(id: number | string) {
  return http.get<TripPlan>(`/trip/${id}`)
}

/** 更新行程 */
export function updateTrip(id: number | string, data: Partial<TripPlan>) {
  return http.put<TripPlan>(`/trip/${id}`, data, { showLoading: true })
}

/** 删除行程 */
export function deleteTrip(id: number | string) {
  return http.delete<void>(`/trip/${id}`, undefined, { showLoading: true })
}

/** 复制行程 */
export function copyTrip(id: number | string) {
  return http.post<TripPlan>(`/trip/${id}/copy`, {}, { showLoading: true })
}
