<script setup lang="ts">
defineOptions({
  name: 'WtDialog',
})
const emit = defineEmits<
  {
    confirm: [done: () => void]
  }
>()

const dialog = useTemplateRef<HTMLDialogElement>('dialog')

function open() {
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}
defineExpose({ open })
</script>

<template>
  <dialog ref="dialog">
    <article>
      <header>
        <slot name="header" />
      </header>
      <slot />
      <footer>
        <slot name="footer">
          <button @click="dialog?.close()">
            关闭
          </button>
          <button @click="emit('confirm', close)">
            确认
          </button>
        </slot>
      </footer>
    </article>
  </dialog>
</template>

<style scoped>

</style>
