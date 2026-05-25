/** 全局常量配置 */

/** API 基础地址 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

/** Token 存储键名（与后端 user-token-name 一致） */
export const TOKEN_KEY = 'Authentication'

/** 用户信息存储键名 */
export const USER_INFO_KEY = 'userInfo'

/** 请求超时时间（毫秒） */
export const REQUEST_TIMEOUT = 30000

/** 兴趣标签列表（兼容旧版） */
export const INTEREST_TAGS = [
  '美食',
  '摄影',
  '历史文化',
  '自然风光',
  '户外运动',
  '亲子旅行',
  '购物娱乐',
  '夜生活'
] as const

/** 旅行偏好（竞品风格芯片） */
export const TRAVEL_PREFERENCES = [
  { id: 'classic', emoji: '📍', label: '经典必玩' },
  { id: 'food', emoji: '🍽️', label: '吃吃喝喝' },
  { id: 'niche', emoji: '🕵️', label: '小众探索' },
  { id: 'photo', emoji: '📸', label: '拍照出片' },
  { id: 'walk', emoji: '🚶', label: 'citywalk' },
  { id: 'nature', emoji: '🏞️', label: '自然风光' },
  { id: 'history', emoji: '🏛️', label: '历史古建' },
  { id: 'shop', emoji: '🛍️', label: '逛街购物' },
  { id: 'art', emoji: '🎨', label: '文艺展览' }
] as const

/** 精选专题 */
export const FEATURED_TOPICS = [
  {
    id: 1,
    tag: '😋 吃点好的',
    title: '舌尖上的广州',
    placeCount: 18,
    cover: 'https://picsum.photos/seed/guangzhou-food/400/560'
  },
  {
    id: 2,
    tag: '🌍 深度旅行',
    title: '伦敦经典三日',
    placeCount: 19,
    cover: 'https://picsum.photos/seed/london/400/560'
  },
  {
    id: 3,
    tag: '📸 拍照出片',
    title: '杭州西湖漫步',
    placeCount: 12,
    cover: 'https://picsum.photos/seed/hangzhou-walk/400/560'
  },
  {
    id: 4,
    tag: '🏛️ 历史古建',
    title: '西安千年古都',
    placeCount: 15,
    cover: 'https://picsum.photos/seed/xian-old/400/560'
  }
] as const

/** 热门城市列表 */
export const HOT_CITIES = [
  { name: '杭州', cover: 'https://picsum.photos/seed/hangzhou/400/300', rating: 4.9 },
  { name: '成都', cover: 'https://picsum.photos/seed/chengdu/400/300', rating: 4.8 },
  { name: '重庆', cover: 'https://picsum.photos/seed/chongqing/400/300', rating: 4.8 },
  { name: '西安', cover: 'https://picsum.photos/seed/xian/400/300', rating: 4.7 },
  { name: '北京', cover: 'https://picsum.photos/seed/beijing/400/300', rating: 4.9 },
  { name: '广州', cover: 'https://picsum.photos/seed/guangzhou/400/300', rating: 4.8 },
  { name: '厦门', cover: 'https://picsum.photos/seed/xiamen/400/300', rating: 4.8 },
  { name: '长沙', cover: 'https://picsum.photos/seed/changsha/400/300', rating: 4.6 }
] as const

/** 社区标签示例 */
export const COMMUNITY_TAGS = [
  '杭州旅行',
  'CityWalk',
  '周末出游',
  '美食推荐'
] as const

/** 景点分类 */
export const SCENIC_CATEGORIES = ['全部', '自然风光', '历史文化', '主题乐园', '博物馆', '古镇'] as const

/** 活动分类 */
export const ACTIVITY_CATEGORIES = ['全部', '音乐节', '展览', '户外', '美食节', '文化体验'] as const

/** Banner 轮播数据 */
export const BANNERS = [
  { id: 1, title: '探索杭州西湖', image: 'https://picsum.photos/seed/banner1/750/360', link: '/pages/scenic/list?city=杭州' },
  { id: 2, title: '成都美食之旅', image: 'https://picsum.photos/seed/banner2/750/360', link: '/pages/plan/wizard' },
  { id: 3, title: '周末CityWalk', image: 'https://picsum.photos/seed/banner3/750/360', link: '/pages/discover/index' }
] as const

/** 天数选项 */
export const DAY_OPTIONS = Array.from({ length: 14 }, (_, i) => i + 1)
