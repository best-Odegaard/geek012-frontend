/** 开发阶段 Mock 数据（后端接口未就绪时使用） */
import type { ScenicItem } from '@/api/scenic'
import type { ActivityItem } from '@/api/activity'
import type { CommunityPost } from '@/api/community'
import type { TripPlan } from '@/api/trip'

export const mockScenics: ScenicItem[] = [
  { id: 1, name: '西湖', cover: 'https://picsum.photos/seed/xihu/400/300', rating: 4.9, city: '杭州', price: 0, category: '自然风光' },
  { id: 2, name: '灵隐寺', cover: 'https://picsum.photos/seed/lingyin/400/300', rating: 4.8, city: '杭州', price: 75, category: '历史文化' },
  { id: 3, name: '宽窄巷子', cover: 'https://picsum.photos/seed/kuanzhai/400/300', rating: 4.7, city: '成都', price: 0, category: '古镇' },
  { id: 4, name: '洪崖洞', cover: 'https://picsum.photos/seed/hongya/400/300', rating: 4.8, city: '重庆', price: 0, category: '历史文化' },
  { id: 5, name: '兵马俑', cover: 'https://picsum.photos/seed/bingmayong/400/300', rating: 4.9, city: '西安', price: 120, category: '博物馆' }
]

export const mockActivities: ActivityItem[] = [
  { id: 1, title: '西湖音乐节', cover: 'https://picsum.photos/seed/music/400/300', startTime: '2026-06-01 19:00', location: '杭州西湖', city: '杭州', category: '音乐节' },
  { id: 2, title: '成都美食节', cover: 'https://picsum.photos/seed/foodfest/400/300', startTime: '2026-05-15 10:00', location: '春熙路', city: '成都', category: '美食节' },
  { id: 3, title: '故宫文化展', cover: 'https://picsum.photos/seed/exhibit/400/300', startTime: '2026-07-01 09:00', location: '故宫博物院', city: '北京', category: '展览' }
]

export const mockPosts: CommunityPost[] = [
  {
    id: 1,
    title: '杭州三日游攻略，西湖+灵隐寺完美路线',
    cover: 'https://picsum.photos/seed/post1/400/500',
    author: { id: 1, nickname: '旅行小达人', avatar: 'https://picsum.photos/seed/avatar1/100/100' },
    likeCount: 2340,
    collectCount: 890,
    commentCount: 156,
    createdAt: '2026-05-20'
  },
  {
    id: 2,
    title: '成都火锅探店指南，本地人推荐',
    cover: 'https://picsum.photos/seed/post2/400/600',
    author: { id: 2, nickname: '吃货小王', avatar: 'https://picsum.photos/seed/avatar2/100/100' },
    likeCount: 1890,
    collectCount: 670,
    commentCount: 98,
    createdAt: '2026-05-18'
  },
  {
    id: 3,
    title: '重庆夜景CityWalk，洪崖洞到解放碑',
    cover: 'https://picsum.photos/seed/post3/400/450',
    author: { id: 3, nickname: '摄影爱好者', avatar: 'https://picsum.photos/seed/avatar3/100/100' },
    likeCount: 3200,
    collectCount: 1200,
    commentCount: 234,
    createdAt: '2026-05-15'
  }
]

export const mockTrip: TripPlan = {
  title: '杭州3日精品之旅',
  fromCity: '深圳',
  toCity: '杭州',
  days: 3,
  budget: 3000,
  people: 2,
  tags: ['美食', '摄影'],
  estimatedCost: 2800,
  hotel: '西湖边精品民宿',
  dayPlans: [
    {
      day: 1,
      title: '西湖经典一日游',
      schedules: [
        { time: '09:00', title: '西湖', description: '漫步苏堤春晓，欣赏断桥残雪', type: 'scenic' },
        { time: '12:00', title: '楼外楼午餐', description: '品尝正宗杭帮菜', type: 'food' },
        { time: '15:00', title: '灵隐寺', description: '千年古刹，感受禅意', type: 'scenic' },
        { time: '18:00', title: '河坊街', description: '逛古街，品小吃', type: 'scenic' }
      ]
    },
    {
      day: 2,
      title: '文化深度体验',
      schedules: [
        { time: '09:00', title: '中国丝绸博物馆', type: 'scenic' },
        { time: '12:00', title: '知味观', description: '小笼包、片儿川', type: 'food' },
        { time: '14:00', title: '宋城', description: '观看千古情演出', type: 'scenic' },
        { time: '19:00', title: '西湖音乐喷泉', type: 'scenic' }
      ]
    },
    {
      day: 3,
      title: '休闲返程',
      schedules: [
        { time: '09:00', title: '西溪湿地', type: 'scenic' },
        { time: '12:00', title: '外婆家', type: 'food' },
        { time: '15:00', title: '返程', type: 'transport' }
      ]
    }
  ]
}

/** 安全调用 API，失败时返回 Mock 数据 */
export async function withFallback<T>(apiCall: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await apiCall()
  } catch {
    console.warn('[Mock] 接口不可用，使用 Mock 数据')
    return fallback
  }
}
