import { useComponentConfigStore } from '@/stores/component-config'
import { Component, useComponetsStore } from '@/stores/components'
import React, { MouseEventHandler, useState } from 'react'
import HoverMask from '../HoverMask'
import SelectedMask from '../SelectedMask'

export function EditArea() {
  const { components, setCurComponentId, curComponentId } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()
  const [hoverComponentId, setHoverComponentId] = useState<number>()
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]

      if (!config?.dev) {
        return null
      }

      return React.createElement(
        config.dev,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || []),
      )
    })
  }

  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath()

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement

      const componentId = ele.dataset?.componentId
      if (componentId) {
        setHoverComponentId(+componentId)
        return
      }
    }
  }

  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath()

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement

      const componentId = ele.dataset?.componentId
      if (componentId) {
        setCurComponentId(+componentId)
        return
      }
    }
  }

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => {
        setHoverComponentId(undefined)
      }}
      onClick={handleClick}
    >
      {renderComponents(components)}

      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          containerClassName="edit-area"
          componentId={hoverComponentId}
          portalWrapperClassName={'portal-wrapper'}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  )
}
