import type { NavItem } from '~/pages/browser/store/type'
import { defineStore } from 'pinia'

export const useWorkspace = defineStore('workspace', () => {
  const navs = ref<NavItem[]>([
    {
      id: crypto.randomUUID(),
      name: '豆包',
      link: 'https://www.baidu.com',
      link_identity: 'page1',
    },
    {
      id: crypto.randomUUID(),
      name: 'electron',
      link: 'https://www.baidu.com',
      link_identity: 'page2',
    },
  ])
  function addNavItem(item: NavItem) {
    unref(navs).push(item)
  }
  return {
    navs,
    addNavItem,
  }
})
