import { useComponetsStore } from '@/stores/components'
import { Input } from 'antd'
import { useState } from 'react'

export interface GoToLinkConfig {
  type: 'goToLink'
  url: string
}

export interface GoToLinkProps {
  defaultValue?: string
  onChange?: (config: GoToLinkConfig) => void
}

export function GoToLink(props: GoToLinkProps) {
  const { defaultValue, onChange } = props

  const { curComponentId } = useComponetsStore()

  const [value, setValue] = useState(defaultValue)

  function urlChange(value: string) {
    if (!curComponentId) return

    setValue(value)

    onChange?.({
      type: 'goToLink',
      url: value,
    })
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[10px]">
        <div>链接</div>
        <div>
          <Input.TextArea
            style={{
              height: 200,
              width: 500,
              border: '1px solid #000',
            }}
            onChange={(e) => {
              urlChange(e.target.value)
            }}
            value={value || ''}
          />
        </div>
      </div>
    </div>
  )
}
