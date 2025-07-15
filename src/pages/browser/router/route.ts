import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '~/routers/route.type'

export const browserMenuName = Symbol('browser')
export const menu: MenuItem = {
  id: crypto.randomUUID(),
  name: browserMenuName,
  logo: 'logo',
  label: '浏览器',
  icon: 'icon-folder',
}

const route: RouteRecordRaw = {
  path: '/browser',
  name: browserMenuName,
  component: () => import('./../index.vue'),
}
export default route
