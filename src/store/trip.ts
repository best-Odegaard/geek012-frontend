import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as tripApi from '@/api/trip'
import type { TripPlan, GenerateTripParams } from '@/api/trip'

export const useTripStore = defineStore('trip', () => {
  const currentTrip = ref<TripPlan | null>(null)
  const tripHistory = ref<TripPlan[]>([])
  const generating = ref(false)

  /** AI 生成行程 */
  async function generateTrip(params: GenerateTripParams) {
    generating.value = true
    try {
      const trip = await tripApi.generateTrip(params)
      currentTrip.value = trip
      return trip
    } finally {
      generating.value = false
    }
  }

  /** 保存行程 */
  async function saveTrip(trip?: TripPlan) {
    const data = trip || currentTrip.value
    if (!data) throw new Error('无行程数据')
    const saved = await tripApi.saveTrip(data)
    currentTrip.value = saved
    await loadHistory()
    return saved
  }

  /** 删除行程 */
  async function deleteTrip(id: number | string) {
    await tripApi.deleteTrip(id)
    tripHistory.value = tripHistory.value.filter((t) => t.id !== id)
    if (currentTrip.value?.id === id) {
      currentTrip.value = null
    }
  }

  /** 加载历史行程 */
  async function loadHistory() {
    const list = await tripApi.getMyTrips()
    tripHistory.value = list
    return list
  }

  /** 获取行程详情 */
  async function getTripDetail(id: number | string) {
    const trip = await tripApi.getTripDetail(id)
    currentTrip.value = trip
    return trip
  }

  return {
    currentTrip,
    tripHistory,
    generating,
    generateTrip,
    saveTrip,
    deleteTrip,
    loadHistory,
    getTripDetail
  }
})
