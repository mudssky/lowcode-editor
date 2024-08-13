import { CommonComponentProps } from '@/interface'
import { useComponentConfigStore } from '@/stores/component-config'
import { useComponetsStore } from '@/stores/components'
import clsx from 'clsx'
import { useDrop } from 'react-dnd'

const Container = ({ id, children }: CommonComponentProps) => {
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
      className={clsx(
        'border-[1px] border-[#000] min-h-[100px] p-[20px]',
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]',
      )}
    >
      {children}
    </div>
  )
}

export default Container
