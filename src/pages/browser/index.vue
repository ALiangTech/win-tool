<script setup lang="ts">
import { useWorkspace } from './store/workspace'

defineOptions({
  name: 'WtPageBrowser',
})
const workspaceStore = useWorkspace()
const navs = workspaceStore.navs
function switchPage(name: string) {
  window.e_workspace.switchView(name)
}
// 在ui注册事件 通过事件冒泡触发
function onTrigger(e: any) {
  // 关键点：从事件触发源开始找最近的 li
  const li = e.target.closest('li')
  if (!li || !li.dataset.index)
    return
  const index = Number.parseInt(li.dataset.index)
  const item = navs[index] as any
  switchPage(item.link_identity)
}
onBeforeUnmount(() => {
  window.e_workspace.closeCurrentView()
})
onMounted(() => {
  // switchPage('page1')
})
</script>

<template>
  <nav>
    <ul @click="onTrigger">
      <li v-for="(item, index) in navs" :key="item.id" :data-index="index">
        <a href="#">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
