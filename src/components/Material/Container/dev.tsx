import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import { CommonComponentProps } from '@/interface'

import clsx from 'clsx'

const Container = ({ id, children, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(
    ['Button', 'Container', 'Modal'],
    id,
  )
  return (
    <div
      data-component-id={id}
      ref={drop}
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
