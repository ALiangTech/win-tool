/**
 * @desc 沿着窗口四周拖动
 * @func useMoveOnWindow
 */

export default function useMoveOnWindow(el: Ref<HTMLElement>) {
  onMounted(() => {
    const dragEl = unref(el)

    let isDragging = false
    let startX = 0
    let startY = 0
    let currentX = 0
    let currentY = 0
    const dragElWidth = dragEl.offsetWidth

    dragEl.addEventListener('mousedown', (e) => {
      isDragging = true
      startX = e.clientX - currentX
      startY = e.clientY - currentY
      dragEl.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    })

    document.addEventListener('mousemove', (e) => {
      if (!isDragging)
        return
      currentX = e.clientX - startX
      currentY = e.clientY - startY
      // 如果当前元素在顶部 则可以左右移动 并且不能超过整个window窗口
      if (dragEl.offsetTop === 0 && ((dragElWidth + currentX) < window.innerWidth && currentX > 0)) {
        dragEl.style.transform = `translate(${currentX}px, ${0}px)`
      }
      // dragEl.style.transform = `translate(${currentX}px, ${currentY}px)`
    })

    document.addEventListener('mouseup', () => {
      isDragging = false
      dragEl.style.cursor = 'grab'
      document.body.style.userSelect = ''
    })
  })
}
