<script setup lang="ts">
import type { QuickNavTypeProp } from './quickNav.type'

defineOptions({
  name: 'WtQuickNav',
})
const props = defineProps<QuickNavTypeProp>()
</script>

<template>
  <section>
    <ul class="grid grid-cols-[repeat(auto-fill,4rem)] grid-rows-[repeat(auto-fill,4rem)] gap-2">
      <li v-for="item in props.data" :key="item.id" class="grid grid-rows-[1fr_auto] m-0 cursor-pointer">
        <div class="aspect-ratio-square">
          <img src="https://picsum.photos/id/237/200/300" class="h-full w-full rounded-md object-cover" alt="logo">
        </div>
        <span class="text-center text-3">{{ item.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul,
li {
  list-style: none;
}
</style>
