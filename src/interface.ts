import { PropsWithChildren } from 'react'

export interface CommonComponentProps extends PropsWithChildren {
  id: number
  name: string
  styles?: React.CSSProperties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
