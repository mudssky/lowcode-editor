/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonComponentProps } from '@/interface'
import { Table as AntdTable } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'

function Table({
  url,
  // id,
  // name,
  children,
  styles,
  ...props
}: CommonComponentProps) {
  const [data, setData] = useState<Array<Record<string, any>>>([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    if (url) {
      setLoading(true)

      // const { data } = await axios.get(url)
      setData(data)

      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item?.props?.type === 'date') {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (value: any) =>
            value ? dayjs(value).format('YYYY-MM-DD') : null,
        }
      } else {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
        }
      }
    })
  }, [children])

  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
  )
}

export default Table
