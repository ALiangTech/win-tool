<script setup lang="ts">
import type { MenuItem, WtDockProps } from './wt-docker.type'

defineOptions({
  name: 'WtDock',
})
const props = defineProps<WtDockProps>()
const router = useRouter()
// 在ui注册事件 通过事件冒泡触发
function onTrigger(e: any) {
  // 关键点：从事件触发源开始找最近的 li
  const li = e.target.closest('li')
  if (!li || !li.dataset.index)
    return
  const index = Number.parseInt(li.dataset.index)
  const item = props.data[index] as MenuItem
  if (item.type === 'workspace') {
    // 打开新窗口
    window.e_workspace.openWorkSpaceWindow('hashss')
    return
  }
  router.push({ name: item.name as any })
}
</script>

<template>
  <section class="cover-pico-var z-99min-w-12 absolute bottom-0 left-50% transform-translate-x--50% rounded-4 bg-sky">
    <ul class="flex gap-col-1 px-2 text-#fff" @click="onTrigger">
      <li v-for="(item, index) in props.data" :key="item.id" :data-index="index" class="cursor-pointer list-none">
        <svg class="iconpark-icon"><use href="#folder-open" /></svg>
        <span class="text-sm">{{ item.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.cover-pico-var {
  --pico-typography-spacing-vertical: 0;
}
</style>
