import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined, RobotOutlined } from '@ant-design/icons'
import { useAtom } from 'jotai'
import { moduleListAtom } from '@/store/global'
import './index.less'

interface ModuleWrapperProps {
  className: string
  title: string
  children: React.ReactNode
  moduleName: string
  onEdit?: () => void
  isFirst?: boolean // 标识是否是同名模块的第一个
}

// 全局hover状态，用于同步分页模块的背景颜色变化
const hoverListeners: Set<(moduleName: string | null) => void> = new Set()

const setGlobalHoveredModule = (moduleName: string | null) => {
  hoverListeners.forEach((listener) => listener(moduleName))
}

const ModuleWrapper: React.FC<ModuleWrapperProps> = ({
  className,
  title,
  children,
  moduleName,
  onEdit,
  isFirst = true // 默认为第一个
}) => {
  const [moduleList, setModuleList] = useAtom(moduleListAtom)
  const [isHovered, setIsHovered] = useState(false)
  const [globalHoveredModule, setGlobalHoveredModuleState] = useState<string | null>(null)

  // 监听全局hover状态
  useEffect(() => {
    const listener = (hoveredModule: string | null) => {
      setGlobalHoveredModuleState(hoveredModule)
    }
    hoverListeners.add(listener)
    return () => {
      hoverListeners.delete(listener)
    }
  }, [])

  // 当前模块是否应该显示hover效果（自己hover或同名模块hover）
  const shouldShowHover = isHovered || globalHoveredModule === moduleName

  const handleMouseEnter = () => {
    setIsHovered(true)
    setGlobalHoveredModule(moduleName)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setGlobalHoveredModule(null)
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit()
    } else {
      // 默认的编辑逻辑 - 触发编辑抽屉并选择对应模块
      const editEvent = new CustomEvent('openEditDrawer', {
        detail: { moduleName }
      })
      window.dispatchEvent(editEvent)
    }
  }

  const handleDelete = () => {
    // 通过更新模块状态来"删除"模块（设置为不显示）
    const updatedModuleList = moduleList.map((module) =>
      module.name === moduleName ? { ...module, status: false } : module
    )
    setModuleList(updatedModuleList)
    message.success(`已隐藏 ${title} 模块`)
  }

  const handleAIOptimize = () => {
    message.info('AI优化功能开发中...')
  }

  return (
    <div
      className={`module ${className} ${shouldShowHover ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="module__title">
        <span>{title}</span>
      </div>
      <div className="module__content">{children}</div>

      {/* 悬浮操作按钮 - 只在第一个实例且hover时显示 */}
      {shouldShowHover && isFirst && (
        <div className="module-actions">
          <Button
            type="text"
            size="small"
            icon={<RobotOutlined />}
            className="action-btn ai-btn"
            onClick={handleAIOptimize}
            title="AI优化"
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            className="action-btn edit-btn"
            onClick={handleEdit}
            title="编辑"
          />
          <Popconfirm
            title="确认删除"
            description={`确定要删除 "${title}" 模块吗？`}
            onConfirm={handleDelete}
            okText="确认"
            cancelText="取消"
          >
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              className="action-btn delete-btn"
              title="删除"
            />
          </Popconfirm>
        </div>
      )}
    </div>
  )
}

export default ModuleWrapper
