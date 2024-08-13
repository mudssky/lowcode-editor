import { useComponentConfigStore } from '@/stores/component-config'
import { useMemo } from 'react'
import { useDrag } from 'react-dnd'

export interface MaterialItemProps {
  name: string
  desc: string
}

export function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  })
  return (
    <div
      ref={drag}
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
      {desc}
    </div>
  )
}

export function Material() {
  const { componentConfig } = useComponentConfigStore()

  const components = useMemo(() => {
    return Object.values(componentConfig).filter((item) => item.name !== 'Page')
  }, [componentConfig])

  return (
    <div>
      {components.map((item, index) => {
        return (
          <MaterialItem
            name={item.name}
            desc={item.desc}
            key={item.name + index}
          />
        )
      })}
    </div>
  )
}
