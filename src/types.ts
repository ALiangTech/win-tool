import type { App } from 'vue'
import type { Router } from 'vue-router'

export type Ctx = App
interface Params {
  app: Ctx
  router: Router
}
export type UserModule = (config: Params) => void
