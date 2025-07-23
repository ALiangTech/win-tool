import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '~/routers/route.type'

export const folderMenuName = Symbol('folder')
export const menu: MenuItem = {
  id: crypto.randomUUID(),
  name: folderMenuName,
  logo: 'logo',
  label: '文件夹管理',
  icon: 'icon-folder',
  type: 'router',
}

const route: RouteRecordRaw = {
  path: 'folder',
  name: folderMenuName,
  component: () => import('./../index.vue'),
}
export default route
