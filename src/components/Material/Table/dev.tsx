import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import { CommonComponentProps } from '@/interface'
import { Table as AntdTable } from 'antd'
import React, { useEffect, useMemo, useRef } from 'react'

import { useDrag } from 'react-dnd'

function Table({ id, name, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(['TableColumn'], id)

  const divRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id,
    },
  })

  useEffect(() => {
    drop(divRef)
    drag(divRef)
  }, [])

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
    <div
      className={`w-[100%] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
      ref={divRef}
      data-component-id={id}
      style={styles}
    >
      <AntdTable columns={columns} dataSource={[]} pagination={false} />
    </div>
  )
}

export default Table
