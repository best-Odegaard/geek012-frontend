import http from '@/utils/request'

export interface CommunityPost {
  id: number
  title: string
  cover: string
  content?: string
  images?: string[]
  tags?: string[]
  location?: string
  author: {
    id: number
    nickname: string
    avatar: string
  }
  likeCount: number
  collectCount: number
  commentCount: number
  isLiked?: boolean
  isCollected?: boolean
  isFollowed?: boolean
  createdAt: string
}

export interface CommunityQuery {
  keyword?: string
  tag?: string
  page?: number
  pageSize?: number
}

export interface PublishPostParams {
  title: string
  content: string
  images: string[]
  tags: string[]
  location?: string
}

export interface PageResult<T> {
  records: T[]
  total: number
}

/** 社区帖子列表（瀑布流） */
export function getCommunityList(params: CommunityQuery) {
  return http.get<PageResult<CommunityPost>>('/community/list', params as Record<string, unknown>)
}

/** 帖子详情 */
export function getCommunityDetail(id: number) {
  return http.get<CommunityPost>(`/community/${id}`)
}

/** 发布游记 */
export function publishPost(data: PublishPostParams) {
  return http.post<CommunityPost>('/community/publish', data, { showLoading: true, loadingText: '发布中...' })
}

/** 点赞 */
export function likePost(id: number) {
  return http.post<void>(`/community/${id}/like`)
}

/** 取消点赞 */
export function unlikePost(id: number) {
  return http.delete<void>(`/community/${id}/like`)
}

/** 收藏 */
export function collectPost(id: number) {
  return http.post<void>(`/community/${id}/collect`)
}

/** 取消收藏 */
export function uncollectPost(id: number) {
  return http.delete<void>(`/community/${id}/collect`)
}

/** 关注作者 */
export function followAuthor(authorId: number) {
  return http.post<void>(`/community/follow/${authorId}`)
}

/** 热门攻略 */
export function getHotPosts(limit = 10) {
  return http.get<CommunityPost[]>('/community/hot', { limit })
}

/** 发表评论 */
export function addComment(postId: number, content: string) {
  return http.post<void>(`/community/${postId}/comment`, { content })
}
