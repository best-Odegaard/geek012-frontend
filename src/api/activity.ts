import http from '@/utils/request'

export interface ActivityItem {
  id: number
  title: string
  cover: string
  startTime: string
  endTime?: string
  location: string
  city: string
  category?: string
  organizer?: string
  description?: string
  images?: string[]
  price?: number
  isCollected?: boolean
}

export interface ActivityQuery {
  city?: string
  category?: string
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}

export interface PageResult<T> {
  records: T[]
  total: number
}

/** 活动列表 */
export function getActivityList(params: ActivityQuery) {
  return http.get<PageResult<ActivityItem>>('/activity/list', params as Record<string, unknown>)
}

/** 活动详情 */
export function getActivityDetail(id: number) {
  return http.get<ActivityItem>(`/activity/${id}`)
}

/** 热门活动 */
export function getHotActivities(limit = 10) {
  return http.get<ActivityItem[]>('/activity/hot', { limit })
}

/** 收藏活动 */
export function collectActivity(id: number) {
  return http.post<void>(`/activity/${id}/collect`)
}

/** 取消收藏 */
export function uncollectActivity(id: number) {
  return http.delete<void>(`/activity/${id}/collect`)
}

/** 活动报名 */
export function enrollActivity(id: number) {
  return http.post<void>(`/activity/${id}/enroll`, {}, { showLoading: true })
}
