import { CommonComponentProps } from '@/interface'
import { useComponentConfigStore } from '@/stores/component-config'
import { useComponetsStore } from '@/stores/components'
import { useDrop } from 'react-dnd'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Page({ id, name, children }: CommonComponentProps) {
  const { addComponent } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ['Button', 'Container'],
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      const props = componentConfig[item.type].defaultProps
      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id,
      )
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div
      ref={drop}
      className="p-[20px] h-[100%] box-border"
      style={{ border: canDrop ? '2px solid blue' : 'none' }}
    >
      {children}
    </div>
  )
}

export default Page
