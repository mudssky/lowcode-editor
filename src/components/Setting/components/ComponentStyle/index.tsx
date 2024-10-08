import {
  ComponentSetter,
  useComponentConfigStore,
} from '@/stores/component-config'
import { useComponetsStore } from '@/stores/components'
import { Form, Input, InputNumber, Select } from 'antd'
import { debounce } from 'lodash-es'
import { CSSProperties, useEffect, useState } from 'react'
import styleToObject from 'style-to-object'
import CssEditor from '../../CssEditor'

export function ComponentStyle() {
  const [form] = Form.useForm()

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore()
  const { componentConfig } = useComponentConfigStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cssValue, setCssValue] = useState<string>(`.comp{\n\n}`)
  useEffect(() => {
    form.resetFields()
    const data = form.getFieldsValue()
    form.setFieldsValue({ ...data, ...curComponent?.styles })
  }, [curComponent])

  if (!curComponentId || !curComponent) return null

  const handleEditorChange = debounce((value) => {
    setCssValue(value)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const css: Record<string, any> = {}

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', '') // 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))
        ] = value
      })

      updateComponentStyles(curComponentId, css, true)
    } catch (e) {
      console.error(e)
    }
  }, 500)

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting

    if (type === 'select') {
      return <Select options={options} />
    } else if (type === 'input') {
      return <Input />
    } else if (type === 'inputNumber') {
      return <InputNumber />
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues)
    }
  }

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={cssValue} onChange={handleEditorChange} />
      </div>
    </Form>
  )
}
