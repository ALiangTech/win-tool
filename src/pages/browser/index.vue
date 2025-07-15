<script setup lang="ts">
defineOptions({
  name: 'WtPageBrowser',
})
function switchPage(name: string) {
  window.e_workspace?.switchView(name)
}
</script>

<template>
  <button @click="switchPage('page1s')">
    页面1
  </button>
  <button @click="switchPage('page2')">
    页面2
  </button>
</template>

<style scoped>

</style>
