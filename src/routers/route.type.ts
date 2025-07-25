type Type = 'workspace' | 'router'

export interface MenuItem {
  logo: string
  icon: string
  label: string
  name: symbol
  id: string
  type: Type
}
