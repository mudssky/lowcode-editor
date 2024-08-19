import { CommonComponentProps } from '@/interface'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Page({ id, name, children, styles, ...props }: CommonComponentProps) {
  return (
    <div className="p-[20px]" style={styles} {...props}>
      {children}
    </div>
  )
}

export default Page
