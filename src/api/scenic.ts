import http from '@/utils/request'

export interface ScenicItem {
  id: number
  name: string
  cover: string
  rating: number
  city: string
  category?: string
  price?: number
  openTime?: string
  description?: string
  images?: string[]
  reason?: string
  address?: string
  latitude?: number
  longitude?: number
  isCollected?: boolean
}

export interface ScenicQuery {
  keyword?: string
  city?: string
  category?: string
  sortBy?: 'rating' | 'price'
  page?: number
  pageSize?: number
}

export interface PageResult<T> {
  records: T[]
  total: number
  page: number
  pageSize: number
}

/** 景点列表 */
export function getScenicList(params: ScenicQuery) {
  return http.get<PageResult<ScenicItem>>('/scenic/list', params as Record<string, unknown>)
}

/** 景点详情 */
export function getScenicDetail(id: number) {
  return http.get<ScenicItem>(`/scenic/${id}`)
}

/** 热门景点 */
export function getHotScenics(limit = 10) {
  return http.get<ScenicItem[]>('/scenic/hot', { limit })
}

/** 收藏景点 */
export function collectScenic(id: number) {
  return http.post<void>(`/scenic/${id}/collect`)
}

/** 取消收藏 */
export function uncollectScenic(id: number) {
  return http.delete<void>(`/scenic/${id}/collect`)
}

/** 搜索景点 */
export function searchScenic(keyword: string) {
  return http.get<ScenicItem[]>('/scenic/search', { keyword })
}
