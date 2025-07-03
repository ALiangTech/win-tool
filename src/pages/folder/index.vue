<script setup lang="ts">
defineOptions({
  name: 'WtPageFolder',
})
function switchPage(name: string) {
  window.e_workspace?.switchView(name)
}
</script>

<template>
  <div>
    <button @click="switchPage('page1')">
      页面1
    </button>
    <button @click="switchPage('page2')">
      页面2
    </button>
  </div>
</template>

<style scoped>

</style>
