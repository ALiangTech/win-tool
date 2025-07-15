<script setup lang="ts">
defineOptions({
  name: 'WtSearchBox',
})
// https://www.bing.com/search?q=
</script>

<template>
  <section class="flex justify-center">
    <div class="w-40vw flex">
      <input
        type="search"
        name="search"
        placeholder="必应"
        aria-label="Search"
      >
    </div>
  </section>
</template>

<style scoped>

</style>
