<script setup lang="ts">
import { useWorkspace } from './store/workspace'

defineOptions({
  name: 'WtPageBrowser',
})
const workspaceStore = useWorkspace()
const navs = workspaceStore.navs
const currentActiveLinkIdentity = ref('')
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
  currentActiveLinkIdentity.value = item.link_identity
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
  <nav class="grid grid-cols-[1fr] h-screen w-220px overflow-auto">
    <ul class="grid grid-rows-[repeat(auto-fill,36px)] grid-cols-1 mt-2 px-2" @click="onTrigger">
      <li
        v-for="(item, index) in navs"
        :key="item.id"
        :data-index="index"
        class="h-full flex flex-items-center rounded-1.25 px-2"
        :class="[currentActiveLinkIdentity === item.link_identity ? 'is-active' : 'nav-hover']"
      >
        <a href="#">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul li {
  cursor: pointer;
}
.is-active {
  background-color: white;
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.1);
}
.nav-hover {
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
}
</style>
