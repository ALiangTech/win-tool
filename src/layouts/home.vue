<script setup lang="ts">
const store = useUserStore()
</script>

<template>
  <main>
    <RouterView />
  </main>
  <footer>
    <WtDock :data="store.menus" />
  </footer>
</template>
