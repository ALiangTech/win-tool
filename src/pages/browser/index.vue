<script setup lang="ts">
defineOptions({
  name: 'WtPageBrowser',
})
function switchPage(name: string) {
  window.e_workspace.switchView(name)
}

onBeforeUnmount(() => {
  window.e_workspace.closeCurrentView()
})
const router = useRouter()
function goHome() {
  router.push({ path: '/' })
}
</script>

<template>
  <button @click="goHome">
    返回首页
  </button>
  <button @click="switchPage('page1')">
    豆包
  </button>
  <button @click="switchPage('page2')">
    chatgpt
  </button>
</template>

<style scoped>

</style>
