import { createMemoryHistory, createRouter } from 'vue-router'
import Layout from './../layouts/home.vue'
import HomeView from './../pages/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: HomeView },
    ],
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
