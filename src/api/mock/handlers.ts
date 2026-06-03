/**
 * Mock API 实现（与 src/api/*.ts 接口路径一一对应，后端就绪后关闭 VITE_USE_MOCK）
 */
import type { ScenicQuery, ScenicItem, PageResult as ScenicPageResult } from '@/api/scenic'
import type { ActivityQuery, ActivityItem, PageResult as ActivityPageResult } from '@/api/activity'
import type { CommunityQuery, CommunityPost, PublishPostParams, PageResult as CommunityPageResult } from '@/api/community'
import type { GenerateTripParams, TripPlan } from '@/api/trip'
import type { LoginParams, LoginResult, RegisterParams, UserInfo } from '@/api/user'
import {
  mockScenics,
  mockActivities,
  mockPosts,
  mockUser,
  mockLogin,
  mockTripList,
  findMockTrip,
  getMockTripStore,
  setMockTripStore,
  buildMockTripFromGenerate,
  paginate
} from '@/utils/mock'

// —— 行程 ——
export function mockGetMyTrips(): Promise<TripPlan[]> {
  return Promise.resolve([...getMockTripStore()])
}

export function mockGetTripDetail(id: number | string): Promise<TripPlan> {
  const trip = findMockTrip(id)
  if (!trip) return Promise.reject(new Error('行程不存在'))
  return Promise.resolve({ ...trip })
}

export function mockGenerateTrip(params: GenerateTripParams): Promise<TripPlan> {
  return Promise.resolve(buildMockTripFromGenerate(params))
}

export function mockSaveTrip(data: TripPlan): Promise<TripPlan> {
  const saved = { ...data, id: data.id || `mock-${Date.now()}` }
  const list = getMockTripStore()
  const idx = list.findIndex((t) => String(t.id) === String(saved.id))
  if (idx >= 0) list[idx] = saved
  else list.unshift(saved)
  setMockTripStore(list)
  return Promise.resolve(saved)
}

export function mockUpdateTrip(id: number | string, data: Partial<TripPlan>): Promise<TripPlan> {
  const list = getMockTripStore()
  const idx = list.findIndex((t) => String(t.id) === String(id))
  if (idx < 0) return Promise.reject(new Error('行程不存在'))
  list[idx] = { ...list[idx], ...data }
  setMockTripStore(list)
  return Promise.resolve(list[idx])
}

export function mockDeleteTrip(id: number | string): Promise<void> {
  setMockTripStore(getMockTripStore().filter((t) => String(t.id) !== String(id)))
  return Promise.resolve()
}

export function mockCopyTrip(id: number | string): Promise<TripPlan> {
  const src = findMockTrip(id)
  if (!src) return Promise.reject(new Error('行程不存在'))
  const copy = { ...src, id: `mock-copy-${Date.now()}`, title: `${src.title}（副本）` }
  const list = getMockTripStore()
  list.unshift(copy)
  setMockTripStore(list)
  return Promise.resolve(copy)
}

// —— 景点 ——
function filterScenics(params: ScenicQuery): ScenicItem[] {
  let list = [...mockScenics]
  if (params.keyword) {
    const kw = params.keyword.toLowerCase()
    list = list.filter((s) => s.name.includes(kw) || s.city.includes(kw))
  }
  if (params.city) list = list.filter((s) => s.city === params.city)
  if (params.category && params.category !== '全部') {
    list = list.filter((s) => s.category === params.category)
  }
  return list
}

export function mockGetScenicList(params: ScenicQuery): Promise<ScenicPageResult<ScenicItem>> {
  const list = filterScenics(params)
  return Promise.resolve(paginate(list, params.page, params.pageSize))
}

export function mockGetScenicDetail(id: number): Promise<ScenicItem> {
  const item = mockScenics.find((s) => s.id === id) || mockScenics[0]
  return Promise.resolve({ ...item, images: [item.cover, item.cover] })
}

export function mockGetHotScenics(limit = 10): Promise<ScenicItem[]> {
  return Promise.resolve(mockScenics.slice(0, limit))
}

export function mockSearchScenic(keyword: string): Promise<ScenicItem[]> {
  return Promise.resolve(filterScenics({ keyword }))
}

export function mockCollectScenic(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockUncollectScenic(_id: number): Promise<void> {
  return Promise.resolve()
}

// —— 活动 ——
function filterActivities(params: ActivityQuery): ActivityItem[] {
  let list = [...mockActivities]
  if (params.city) list = list.filter((a) => a.city === params.city)
  if (params.category && params.category !== '全部') {
    list = list.filter((a) => a.category === params.category)
  }
  return list
}

export function mockGetActivityList(params: ActivityQuery): Promise<ActivityPageResult<ActivityItem>> {
  const list = filterActivities(params)
  return Promise.resolve({
    records: paginate(list, params.page, params.pageSize).records,
    total: list.length
  })
}

export function mockGetActivityDetail(id: number): Promise<ActivityItem> {
  const item = mockActivities.find((a) => a.id === id) || mockActivities[0]
  return Promise.resolve({ ...item })
}

export function mockGetHotActivities(limit = 10): Promise<ActivityItem[]> {
  return Promise.resolve(mockActivities.slice(0, limit))
}

export function mockCollectActivity(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockUncollectActivity(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockEnrollActivity(_id: number): Promise<void> {
  return Promise.resolve()
}

// —— 社区 ——
export function mockGetCommunityList(params: CommunityQuery): Promise<CommunityPageResult<CommunityPost>> {
  let list = [...mockPosts]
  if (params.keyword) {
    const kw = params.keyword
    list = list.filter((p) => p.title.includes(kw))
  }
  const page = params.page || 1
  const pageSize = params.pageSize || 10
  return Promise.resolve({
    records: paginate(list, page, pageSize).records,
    total: list.length
  })
}

export function mockGetCommunityDetail(id: number): Promise<CommunityPost> {
  const post = mockPosts.find((p) => p.id === id) || mockPosts[0]
  return Promise.resolve({ ...post, content: post.title + ' 的详细内容（Mock）。' })
}

export function mockPublishPost(data: PublishPostParams): Promise<CommunityPost> {
  const post: CommunityPost = {
    id: Date.now(),
    title: data.title,
    cover: data.images[0] || 'https://picsum.photos/seed/newpost/400/500',
    content: data.content,
    author: { id: 1, nickname: mockUser.nickname, avatar: mockUser.avatar },
    likeCount: 0,
    collectCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString().slice(0, 10)
  }
  mockPosts.unshift(post)
  return Promise.resolve(post)
}

export function mockLikePost(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockUnlikePost(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockCollectPost(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockUncollectPost(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockFollowAuthor(_id: number): Promise<void> {
  return Promise.resolve()
}

export function mockGetHotPosts(limit = 10): Promise<CommunityPost[]> {
  return Promise.resolve(mockPosts.slice(0, limit))
}

export function mockCommentPost(_postId: number, _content: string): Promise<void> {
  return Promise.resolve()
}

// —— 用户 ——
export function mockUserLogin(params: LoginParams): Promise<LoginResult> {
  return Promise.resolve(mockLogin(params))
}

export function mockUserRegister(_params: RegisterParams): Promise<void> {
  return Promise.resolve()
}

export function mockGetUserInfo(): Promise<UserInfo> {
  return Promise.resolve({ ...mockUser })
}

export function mockUpdateUserInfo(data: Partial<UserInfo>): Promise<UserInfo> {
  return Promise.resolve({ ...mockUser, ...data })
}

export function mockSendSmsCode(_phone: string): Promise<void> {
  return Promise.resolve()
}
