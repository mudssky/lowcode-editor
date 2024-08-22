import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import { CommonComponentProps } from '@/interface'

import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

const Container = ({ id, name, children, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(
    ['Button', 'Container', 'Modal', 'Table', 'Form'],
    id,
  )
  const divRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id,
    },
  })

  useEffect(() => {
    drop(divRef)
    drag(divRef)
  }, [])
  return (
    <div
      ref={divRef}
      data-component-id={id}
      className={clsx(
        'border-[1px] border-[#000] min-h-[100px] p-[20px]',
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]',
      )}
      style={styles}
    >
      {children}
    </div>
  )
}

export default Container
