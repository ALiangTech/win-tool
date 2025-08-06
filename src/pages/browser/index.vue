<script setup lang="ts">
import type { NavItem } from '~/pages/browser/store/type'
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
function onTrigger(itemData: NavItem) {
  switchPage(itemData.link_identity)
}
onBeforeUnmount(() => {
  window.e_workspace.closeCurrentView()
})
onMounted(() => {
  // switchPage('page1')
  window.e_workspace.initViews(toRaw(navs))
})
</script>

<template>
  <nav class="h-screen w-220px">
    <WtList :list="navs" @item-click="onTrigger">
      <template #default="{ data, isActive }">
        <div class="reset-pico group h-32px flex flex-1 items-center justify-between gap-1 overflow-hidden rounded-1 px-1" :class="[isActive ? 'is-active' : 'nav-hover']">
          <img src="https://picsum.photos/200/300" alt="logo" class="aspect-square h-4.5 rounded-1">
          <button class="m-0 flex-1 overflow-hidden truncate px-0 text-left line-height-1em">
            {{ data.name }}
          </button>
          <button class="m-0 hidden aspect-square h-4.5 p-0 line-height-4.5 group-hover:inline-block hover:bg-red" @click="workspaceStore.deleteNavItem(data.id)">
            x
          </button>
        </div>
      </template>
    </WtList>
  </nav>
</template>

<style scoped>
.reset-pico button {
  --pico-background-color: none;
  --pico-color: black;
  border: none;
  box-shadow: none;
}
.is-active {
  background-color: white;
  box-shadow: -2px 1px 6px 2px rgba(0, 0, 0, 0.1);
}
.nav-hover {
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
}
</style>
