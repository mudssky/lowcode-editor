import { CommonComponentProps } from '@/interface'
import { Button as AntdButton } from 'antd'
import { ButtonType } from 'antd/es/button'

export interface ButtonProps {
  type: ButtonType
  text: string
}

const Button = ({ type, text }: CommonComponentProps) => {
  return <AntdButton type={type}>{text}</AntdButton>
}

export default Button
