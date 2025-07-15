<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

defineOptions({ name: 'WtTimeDisplayer' })

const now = ref(Date.now())
const currentTime = useDateFormat(now, 'HH:mm')

let timer: number | undefined

function scheduleNextUpdate() {
  const ms = 60 * 1000 - (Date.now() % (60 * 1000)) // 距离下一个整分钟的毫秒数
  timer = window.setTimeout(() => {
    now.value = Date.now()
    scheduleNextUpdate() // 递归调度
  }, ms)
}

onMounted(() => {
  scheduleNextUpdate()
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <section class="text-center text-8">
    <span>{{ currentTime }}</span>
  </section>
</template>

<style scoped>

</style>
