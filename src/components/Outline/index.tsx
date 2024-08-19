import { useComponetsStore } from '@/stores/components'
import { Tree } from 'antd'

export function Outline() {
  const { components, setCurComponentId } = useComponetsStore()
  return (
    <Tree
      fieldNames={{ title: 'desc', key: 'id' }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      treeData={components as any}
      showLine
      defaultExpandAll
      onSelect={([selectedKey]) => {
        setCurComponentId(selectedKey as number)
      }}
    />
  )
}
