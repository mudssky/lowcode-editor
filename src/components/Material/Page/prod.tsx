import { CommonComponentProps } from '@/interface'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Page({ id, name, children }: CommonComponentProps) {
  return <div className="p-[20px]">{children}</div>
}

export default Page
