import { ComponentEvent } from '@/stores/component-config'
import { Modal, Segmented } from 'antd'
import { useEffect, useState } from 'react'
import { CustomJS, CustomJSConfig } from './actions/CustomJS'
import { GoToLink, GoToLinkConfig } from './actions/GoToLink'
import { ShowMessage, ShowMessageConfig } from './actions/ShowMessage'
import { ComponentMethod, ComponentMethodConfig } from './ComponentMethod'
export type ActionConfig =
  | GoToLinkConfig
  | ShowMessageConfig
  | CustomJSConfig
  | ComponentMethodConfig

interface ActionModalProps {
  visible: boolean
  action?: ActionConfig
  eventConfig: ComponentEvent
  handleOk: (config?: ActionConfig) => void
  handleCancel: () => void
}

export function ActionModal(props: ActionModalProps) {
  const { visible, handleOk, handleCancel, action } = props

  const map = {
    goToLink: '访问链接',
    showMessage: '消息提示',
    customJS: '自定义 JS',
    componentMethod: '组件方法',
  }

  const [curConfig, setCurConfig] = useState<ActionConfig>()

  const [key, setKey] = useState<string>('访问链接')

  useEffect(() => {
    if (action?.type) {
      setKey(map[action.type])
    }
  }, [action])

  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={['访问链接', '消息提示', '自定义 JS', '组件方法']}
        />
        {key === '访问链接' && (
          <GoToLink
            value={action?.type === 'goToLink' ? action.url : ''}
            onChange={(config) => {
              setCurConfig(config)
            }}
          />
        )}
        {key === '消息提示' && (
          <ShowMessage
            value={action?.type === 'showMessage' ? action.config : undefined}
            onChange={(config) => {
              setCurConfig(config)
            }}
          />
        )}
        {key === '组件方法' && (
          <ComponentMethod
            key="showMessage"
            value={
              action?.type === 'componentMethod' ? action.config : undefined
            }
            onChange={(config) => {
              setCurConfig(config)
            }}
          />
        )}
        {key === '自定义 JS' && (
          <CustomJS
            value={action?.type === 'customJS' ? action.code : ''}
            onChange={(config) => {
              setCurConfig(config)
            }}
          />
        )}
      </div>
    </Modal>
  )
}
