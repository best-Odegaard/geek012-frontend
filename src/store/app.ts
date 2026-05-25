import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark'

export const useAppStore = defineStore('app', () => {
  const theme = ref<ThemeMode>('light')
  const tabbarIndex = ref(0)
  const loading = ref(false)
  /** 创建计划浮层是否显示 */
  const showCreateMenu = ref(false)

  function changeTheme(mode: ThemeMode) {
    theme.value = mode
  }

  function setTabbarIndex(index: number) {
    tabbarIndex.value = index
  }

  function openCreateMenu() {
    showCreateMenu.value = true
  }

  function closeCreateMenu() {
    showCreateMenu.value = false
  }

  function toggleCreateMenu() {
    showCreateMenu.value = !showCreateMenu.value
  }

  function showLoading() {
    loading.value = true
    uni.showLoading({ title: '加载中...', mask: true })
  }

  function hideLoading() {
    loading.value = false
    uni.hideLoading()
  }

  return {
    theme,
    tabbarIndex,
    loading,
    showCreateMenu,
    changeTheme,
    setTabbarIndex,
    openCreateMenu,
    closeCreateMenu,
    toggleCreateMenu,
    showLoading,
    hideLoading
  }
})
