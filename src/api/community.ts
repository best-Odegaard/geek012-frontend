import http from '@/utils/request'
import { USE_MOCK } from '@/utils/constant'
import * as mock from '@/api/mock/handlers'

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

/** 社区帖子列表 — GET /community/list */
export function getCommunityList(params: CommunityQuery) {
  if (USE_MOCK) return mock.mockGetCommunityList(params)
  return http.get<PageResult<CommunityPost>>('/community/list', params as Record<string, unknown>)
}

/** 帖子详情 — GET /community/:id */
export function getCommunityDetail(id: number) {
  if (USE_MOCK) return mock.mockGetCommunityDetail(id)
  return http.get<CommunityPost>(`/community/${id}`)
}

/** 发布游记 — POST /community/publish */
export function publishPost(data: PublishPostParams) {
  if (USE_MOCK) return mock.mockPublishPost(data)
  return http.post<CommunityPost>('/community/publish', data, { showLoading: true, loadingText: '发布中...' })
}

/** 点赞 — POST /community/:id/like */
export function likePost(id: number) {
  if (USE_MOCK) return mock.mockLikePost(id)
  return http.post<void>(`/community/${id}/like`)
}

/** 取消点赞 — DELETE /community/:id/like */
export function unlikePost(id: number) {
  if (USE_MOCK) return mock.mockUnlikePost(id)
  return http.delete<void>(`/community/${id}/like`)
}

/** 收藏 — POST /community/:id/collect */
export function collectPost(id: number) {
  if (USE_MOCK) return mock.mockCollectPost(id)
  return http.post<void>(`/community/${id}/collect`)
}

/** 取消收藏 — DELETE /community/:id/collect */
export function uncollectPost(id: number) {
  if (USE_MOCK) return mock.mockUncollectPost(id)
  return http.delete<void>(`/community/${id}/collect`)
}

/** 关注作者 — POST /community/follow/:authorId */
export function followAuthor(authorId: number) {
  if (USE_MOCK) return mock.mockFollowAuthor(authorId)
  return http.post<void>(`/community/follow/${authorId}`)
}

/** 热门攻略 — GET /community/hot */
export function getHotPosts(limit = 10) {
  if (USE_MOCK) return mock.mockGetHotPosts(limit)
  return http.get<CommunityPost[]>('/community/hot', { limit })
}

/** 发表评论 — POST /community/:postId/comment */
export function addComment(postId: number, content: string) {
  if (USE_MOCK) return mock.mockCommentPost(postId, content)
  return http.post<void>(`/community/${postId}/comment`, { content })
}
