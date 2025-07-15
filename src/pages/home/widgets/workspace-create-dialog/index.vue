<script setup lang="ts">
import { WtDialog } from '~/components/index'

defineOptions({
  name: 'WorkspaceCreateDialog',
})
type WtDialogType = InstanceType<typeof WtDialog>
const dialog = useTemplateRef<WtDialogType>('dialog')
function openDialog() {
  dialog.value?.open()
}
// 监听键盘组合键shift+c 打开浏览器工作区创建弹窗
onKeyStroke(['Shift', 'C'], (e) => {
  const isShift = e.shiftKey
  const isC = e.key === 'C'
  if (isShift && isC) {
    openDialog()
  }
  e.preventDefault()
}, { dedupe: true })

function onConfirm(done: () => void) {
  done()
}
</script>

<template>
  <WtDialog ref="dialog" @confirm="onConfirm">
    <template #header>
      创建浏览器工作区
    </template>
    <form action="">
      <!-- 名称 -->
      <input type="text">
    </form>
  </WtDialog>
</template>

<style scoped>

</style>
