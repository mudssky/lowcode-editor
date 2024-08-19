import ButtonDev from '@/components/Material/Button/dev'
import ButtonProd from '@/components/Material/Button/prod'
import ContainerDev from '@/components/Material/Container/dev'
import ContainerProd from '@/components/Material/Container/prod'
import PageDev from '@/components/Material/Page/dev'
import PageProd from '@/components/Material/Page/prod'
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
  // component: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dev: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prod: any
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
      // component: Container,
      dev: ContainerDev,
      prod: ContainerProd,
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
      // component: Button,
      dev: ButtonDev,
      prod: ButtonProd,
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      desc: '页面',
      // component: Page,
      dev: PageDev,
      prod: PageProd,
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
