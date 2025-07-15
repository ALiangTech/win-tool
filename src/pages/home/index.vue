<script setup lang="ts">
import { WorkspaceCreateDialog, WtQuickNav, WtSearchBox, WtTimeDisplayer } from './widgets'

defineOptions({
  name: 'WtPageHome',
})
const store = useUserStore()
</script>

<template>
  <section>
    <!-- 时间展示器 -->
    <WtTimeDisplayer />
    <!-- 搜索 -->
    <WtSearchBox />
    <!-- 快速导航 -->
    <WtQuickNav :data="store.menus" />
    <!-- 创建浏览器工作区弹窗 -->
    <WorkspaceCreateDialog />
  </section>
</template>

<style scoped>

</style>
