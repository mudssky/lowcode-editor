import { CommonComponentProps } from '@/interface'
import { Table as AntdTable } from 'antd'
import React, { useMemo, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Table({ id, name, children, styles, ...props }: CommonComponentProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const columns = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div
            className="m-[-16px] p-[16px]"
            data-component-id={item.props?.id}
          >
            {item.props?.title}
          </div>
        ),
        dataIndex: item.props?.dataIndex,
      }
    })
  }, [children])

  return (
    <div ref={divRef} data-component-id={id} style={styles} {...props}>
      <AntdTable columns={columns} dataSource={[]} pagination={false} />
    </div>
  )
}

export default Table
