import { CommonComponentProps } from '@/interface'

import clsx from 'clsx'

const Container = ({ children, styles }: CommonComponentProps) => {
  return (
    <div className={clsx('p-[20px]')} style={styles}>
      {children}
    </div>
  )
}

export default Container
