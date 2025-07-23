import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '~/routers/route.type'

export const folderMenuName = Symbol('home')

export const menu: MenuItem = {
  id: crypto.randomUUID(),
  name: folderMenuName,
  logo: 'logo',
  label: '首页',
  icon: 'icon-folder',
  type: 'router',
}

const route: RouteRecordRaw = {
  path: '',
  name: folderMenuName,
  component: () => import('./../index.vue'),
}
export default route
