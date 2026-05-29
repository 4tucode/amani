import { ref } from 'vue'

export type SidebarPanel = 'about' | 'blog' | 'contact' | null

const activePanel = ref<SidebarPanel>(null)

export function useSidebarPanel() {
  return {
    activePanel,
    setPanel: (panel: SidebarPanel) => {
      activePanel.value = panel
    },
    closePanel: () => {
      activePanel.value = null
    },
  }
}
