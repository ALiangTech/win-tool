interface WorkSpace {
  switchView: (viewName: string) => void
  closeCurrentView: () => void
  initViews: (views: any) => void
}

type WorkSpaceEvent = keyof WorkSpace

declare interface Window {
  e_workspace: {
    [K in WorkSpaceEvent]: WorkSpace[K]
  }
}
