import Button from '@/components/Material/Button'
import Container from '@/components/Material/Container'
import Page from '@/components/Material/Page'
import { create } from 'zustand'

export interface ComponentSetter {
  name: string
  label: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ComponentConfig {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps: Record<string, any>
  setter?: ComponentSetter[]
  desc: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

interface State {
  componentConfig: { [key: string]: ComponentConfig }
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: 'Container',
      defaultProps: {},
      desc: '容器',
      component: Container,
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮',
      },
      setter: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' },
          ],
        },
        {
          name: 'text',
          label: '文本',
          type: 'input',
        },
      ],
      desc: '按钮',
      component: Button,
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      desc: '页面',
      component: Page,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      }
    }),
}))
