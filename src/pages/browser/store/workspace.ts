import type { NavItem } from '~/pages/browser/store/type'
import { defineStore } from 'pinia'

export const useWorkspace = defineStore('workspace', () => {
  const navs = ref<NavItem[]>([
    {
      id: crypto.randomUUID(),
      name: '豆包',
      link: 'https://www.doubao.com/',
      link_identity: 'page1',
      favicon: null,
    },
    {
      id: crypto.randomUUID(),
      name: 'electron',
      link: 'https://www.baidu.com',
      link_identity: 'page2',
      favicon: null,
    },
  ])
  function addNavItem(item: NavItem) {
    unref(navs).push(item)
  }
  // 根据id 删除navs中的项
  function deleteNavItem(id: string) {
    const navsRef = unref(navs)
    const index = navsRef.findIndex(item => item.id === id)
    if (index !== -1) {
      navsRef.splice(index, 1)
    }
  }

  return {
    navs,
    addNavItem,
    deleteNavItem,
  }
})
