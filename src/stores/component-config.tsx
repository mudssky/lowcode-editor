import ButtonDev from '@/components/Material/Button/dev'
import ButtonProd from '@/components/Material/Button/prod'
import ContainerDev from '@/components/Material/Container/dev'
import ContainerProd from '@/components/Material/Container/prod'
import FormDev from '@/components/Material/Form/dev'
import FormProd from '@/components/Material/Form/prod'
import ModalDev from '@/components/Material/Modal/dev'
import ModalProd from '@/components/Material/Modal/prod'
import PageDev from '@/components/Material/Page/dev'
import PageProd from '@/components/Material/Page/prod'
import TableDev from '@/components/Material/Table/dev'
import TableProd from '@/components/Material/Table/prod'
import TableColumnDev from '@/components/Material/TableColumn/dev'
import TableColumnProd from '@/components/Material/TableColumn/prod'

import FormItemDev from '@/components/Material/FormItem/dev'
import FormItemProd from '@/components/Material/FormItem/prod'

import { create, StateCreator } from 'zustand'
import { withPersist } from './components'

export interface ComponentSetter {
  name: string
  label: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ComponentEvent {
  name: string
  label: string
}

export interface ComponentMethod {
  name: string
  label: string
}

export interface ComponentConfig {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps: Record<string, any>
  setter?: ComponentSetter[]
  stylesSetter?: ComponentSetter[]
  events?: ComponentEvent[]
  methods?: ComponentMethod[]
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

const creator: StateCreator<State & Action> = (set) => ({
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
      stylesSetter: [
        {
          name: 'width',
          label: '宽度',
          type: 'inputNumber',
        },
        {
          name: 'height',
          label: '高度',
          type: 'inputNumber',
        },
      ],
      events: [
        {
          name: 'onClick',
          label: '点击事件',
        },
        {
          name: 'onDoubleClick',
          label: '双击事件',
        },
      ],
      desc: '按钮',
      // component: Button,
      dev: ButtonDev,
      prod: ButtonProd,
    },
    Modal: {
      name: 'Modal',
      defaultProps: {
        title: '弹窗',
      },
      setter: [
        {
          name: 'title',
          label: '标题',
          type: 'input',
        },
      ],
      stylesSetter: [],
      events: [
        {
          name: 'onOk',
          label: '确认事件',
        },
        {
          name: 'onCancel',
          label: '取消事件',
        },
      ],
      methods: [
        {
          name: 'open',
          label: '打开弹窗',
        },
        {
          name: 'close',
          label: '关闭弹窗',
        },
      ],

      desc: '弹窗',
      dev: ModalDev,
      prod: ModalProd,
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      desc: '页面',
      // component: Page,
      dev: PageDev,
      prod: PageProd,
    },
    Table: {
      name: 'Table',
      defaultProps: {},
      desc: '表格',
      setter: [
        {
          name: 'url',
          label: 'url',
          type: 'input',
        },
      ],
      dev: TableDev,
      prod: TableProd,
    },
    TableColumn: {
      name: 'TableColumn',
      desc: '表格列',
      defaultProps: {
        dataIndex: `col_${new Date().getTime()}`,
        title: '列名',
      },
      setter: [
        {
          name: 'type',
          label: '类型',
          type: 'select',
          options: [
            {
              label: '文本',
              value: 'text',
            },
            {
              label: '日期',
              value: 'date',
            },
          ],
        },
        {
          name: 'title',
          label: '标题',
          type: 'input',
        },
        {
          name: 'dataIndex',
          label: '字段',
          type: 'input',
        },
      ],
      dev: TableColumnDev,
      prod: TableColumnProd,
    },
    Form: {
      name: 'Form',
      defaultProps: {},
      desc: '表单',
      setter: [
        {
          name: 'title',
          label: '标题',
          type: 'input',
        },
      ],
      events: [
        {
          name: 'onFinish',
          label: '提交事件',
        },
      ],
      methods: [
        {
          name: 'submit',
          label: '提交',
        },
      ],
      dev: FormDev,
      prod: FormProd,
    },
    FormItem: {
      name: 'FormItem',
      desc: '表单项',
      defaultProps: {
        name: new Date().getTime(),
        label: '姓名',
      },
      dev: FormItemDev,
      prod: FormItemProd,
      setter: [
        {
          name: 'type',
          label: '类型',
          type: 'select',
          options: [
            {
              label: '文本',
              value: 'input',
            },
            {
              label: '日期',
              value: 'date',
            },
          ],
        },
        {
          name: 'label',
          label: '标题',
          type: 'input',
        },
        {
          name: 'name',
          label: '字段',
          type: 'input',
        },
        {
          name: 'rules',
          label: '校验',
          type: 'select',
          options: [
            {
              label: '必填',
              value: 'required',
            },
          ],
        },
      ],
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
})
export const useComponentConfigStore = create<State & Action>()(
  withPersist(false)(creator, {
    name: 'COMPONENT_CONFIG',
  }),
)
