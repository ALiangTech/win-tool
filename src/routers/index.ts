import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from './../layouts/home.vue'

// 动态导入pages 下面的所有route文件
const modules = import.meta.glob<RouteRecordRaw>('../pages/**/route.ts', { eager: true, import: 'default' })

const routes = [
  {
    path: '/',
    component: Layout,
    children: Object.values(modules),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
