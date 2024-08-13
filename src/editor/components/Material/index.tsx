import { useComponentConfigStore } from '@/editor/stores/component-config'
import { useMemo } from 'react'

export interface MaterialItemProps {
  name: string
}

export function MaterialItem(props: MaterialItemProps) {
  const { name } = props

  return (
    <div
      className="
            border-dashed
            border-[1px]
            border-[#000]
            py-[8px] px-[10px] 
            m-[10px]
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]
        "
    >
      {name}
    </div>
  )
}

export function Material() {
  const { componentConfig } = useComponentConfigStore()

  const components = useMemo(() => {
    return Object.values(componentConfig)
  }, [componentConfig])

  return (
    <div>
      {components.map((item, index) => {
        return <MaterialItem name={item.name} key={item.name + index} />
      })}
    </div>
  )
}
