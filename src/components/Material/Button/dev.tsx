import { CommonComponentProps } from '@/interface'
import { Button as AntdButton } from 'antd'
import { ButtonType } from 'antd/es/button'

export interface ButtonProps {
  type: ButtonType
  text: string
}

const Button = ({ id, type, text, styles }: CommonComponentProps) => {
  return (
    <AntdButton data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  )
}

export default Button
