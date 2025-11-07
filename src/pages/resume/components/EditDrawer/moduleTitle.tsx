import {
  EditOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import { Button, Input, Popconfirm, Space, Switch, Tooltip } from 'antd'
import { useState } from 'react'
import { useIsCompactMode } from '@/hooks/useIsCompactMode'
import './index.less'
type Props = {
  onlyTitle?: boolean
  order: number
  title: string
  status: boolean
  preOrderDisabled: boolean
  nextOrderDisabled: boolean
  onOrderChange?: (oldOrder: number, newOrder: number) => void
  onTitleChange?: (val: string) => void
  onStatusChange?: (val: boolean) => void
}

function ModuleTitle({
  onlyTitle = false,
  order,
  title,
  status,
  preOrderDisabled = false,
  nextOrderDisabled = false,
  onTitleChange,
  onStatusChange,
  onOrderChange
}: Props) {
  const [newTitle, setNewTitle] = useState(title)
  const isCompact = useIsCompactMode()
  const titleEdit = (
    <Popconfirm
      title={
        <div className="flex items-center mt-3">
          <span>新标题</span>
          <Input
            className="flex-1 ml-3"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
      }
      icon={false}
      onConfirm={(e) => {
        e?.stopPropagation()
        onTitleChange?.(newTitle)
      }}
      onOpenChange={() => console.log('open change')}
    >
      <Tooltip title="更改名称">
        <Button
          type="text"
          size={isCompact ? 'small' : undefined}
          icon={<EditOutlined />}
          // onClick={() => setChangeTitleOpen(true)}
        />
      </Tooltip>
    </Popconfirm>
  )
  if (onlyTitle)
    return (
      <Space size={isCompact ? 'small' : 'middle'}>
        <div className={`cursor-pointer moduleTitle__title ${isCompact ? 'text-sm' : ''}`}>
          {title}
        </div>
        {titleEdit}
      </Space>
    )
  return (
    <>
      <Space
        className="flex items-center w-full"
        size={isCompact ? 'small' : 'middle'}
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains('moduleTitle__title')) return
          e.stopPropagation()
        }}
      >
        <div className={`cursor-pointer moduleTitle__title ${isCompact ? 'text-sm' : ''}`}>
          {title}
        </div>
        <div>
          <Switch
            size="small"
            value={status}
            onChange={onStatusChange}
            checkedChildren={isCompact ? '' : '开启'}
            unCheckedChildren={isCompact ? '' : '关闭'}
          />
        </div>
        {titleEdit}
        <Tooltip title="上移">
          <Button
            type="text"
            disabled={preOrderDisabled}
            onClick={() => onOrderChange?.(order, order - 1)}
            size="small"
            icon={<VerticalAlignTopOutlined />}
          />
        </Tooltip>
        <Tooltip title="下移">
          <Button
            type="text"
            disabled={nextOrderDisabled}
            onClick={() => onOrderChange?.(order, order + 1)}
            size="small"
            icon={<VerticalAlignBottomOutlined />}
          />
        </Tooltip>
      </Space>
    </>
  )
}

export default ModuleTitle
