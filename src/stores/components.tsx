import { CSSProperties } from 'react'
import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

export interface Component {
  id: number
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  children?: Component[]
  parentId?: number
  desc: string
  styles?: CSSProperties
}

interface State {
  components: Component[]
  curComponentId?: number | null
  curComponent: Component | null
  mode: 'edit' | 'preview'
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void
  deleteComponent: (componentId: number) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateComponentProps: (componentId: number, props: any) => void
  setCurComponentId: (componentId: number | null) => void
  setMode: (mode: State['mode']) => void
  updateComponentStyles: (
    componentId: number,
    styles: CSSProperties,
    replace?: boolean,
  ) => void
}

const creator: StateCreator<State & Action> = (set, get) => ({
  components: [
    {
      id: 1,
      name: 'Page',
      props: {},
      desc: '页面',
    },
  ],
  curComponentId: null,
  curComponent: null,
  mode: 'edit',
  setMode: (mode) => set({ mode }),
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components)

        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component)
          } else {
            parentComponent.children = [component]
          }
        }

        component.parentId = parentId
        return { components: [...state.components] }
      }
      return { components: [...state.components, component] }
    }),
  deleteComponent: (componentId) => {
    if (!componentId) return

    const component = getComponentById(componentId, get().components)
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components,
      )

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(
          (item) => item.id !== +componentId,
        )

        set({ components: [...get().components] })
      }
    }
  },
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        component.props = { ...component.props, ...props }

        return { components: [...state.components] }
      }

      return { components: [...state.components] }
    }),
  updateComponentStyles: (componentId, styles, replace?: boolean) =>
    set((state) => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        component.styles = replace
          ? { ...styles }
          : { ...component.styles, ...styles }

        return { components: [...state.components] }
      }

      return { components: [...state.components] }
    }),
  setCurComponentId: (componentId) =>
    set((state) => ({
      curComponentId: componentId,
      curComponent: getComponentById(componentId, state.components),
    })),
})

export const withPersist =
  (enablePersist: boolean) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any, options: PersistOptions<unknown, unknown>) =>
    enablePersist ? persist(config, options) : config

export const useComponetsStore = create<State & Action>()(
  withPersist(true)(creator, {
    name: 'COMPONENTS_STORE',
  }),
)

export function getComponentById(
  id: number | null,
  components: Component[],
): Component | null {
  if (!id) return null

  for (const component of components) {
    if (component.id == id) return component
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children)
      if (result !== null) return result
    }
  }
  return null
}
