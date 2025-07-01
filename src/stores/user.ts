import type { MenuItem } from '~/routers/route.type'
import { acceptHMRUpdate, defineStore } from 'pinia'

// 批量导入菜单
const modules = import.meta.glob<{ menu: MenuItem }>('../pages/**/route.ts', { eager: true })
const routeMenus = Object.values(modules).map(i => i.menu)

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  const menus = ref(routeMenus)
  return {
    menus,
    savedName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
