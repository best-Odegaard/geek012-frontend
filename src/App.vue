<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'

onLaunch(() => {
  const userStore = useUserStore()
  userStore.initFromStorage()
})
</script>

<style lang="scss">
@import '@/styles/common.scss';
</style>
