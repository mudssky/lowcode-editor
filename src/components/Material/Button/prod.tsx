import { CommonComponentProps } from '@/interface'
import { Button as AntdButton } from 'antd'
import { ButtonType } from 'antd/es/button'

export interface ButtonProps {
  type: ButtonType
  text: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Button = ({ id, type, text, styles, ...props }: CommonComponentProps) => {
  return (
    <AntdButton type={type} {...props}>
      {text}
    </AntdButton>
  )
}

export default Button
