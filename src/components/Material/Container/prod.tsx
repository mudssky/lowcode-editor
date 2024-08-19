import { CommonComponentProps } from '@/interface'

import clsx from 'clsx'

const Container = ({ children }: CommonComponentProps) => {
  return <div className={clsx('p-[20px]')}>{children}</div>
}

export default Container
