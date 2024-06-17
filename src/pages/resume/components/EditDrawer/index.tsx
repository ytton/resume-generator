import { createFromIconfontCN } from '@ant-design/icons'
import { Button, Drawer, DrawerProps, Space, Steps } from 'antd'
import React, { useState } from 'react'
import { ModuleItem, moduleListAtom } from '@/store/global'
import { useAtom } from 'jotai'
import { ModuleMap } from '../../constant'

import { arrayMoveImmutable } from 'array-move'
import classNames from 'classnames'
import './index.less'
import ModuleTitle from './moduleTitle'
const IconFont = createFromIconfontCN({
  scriptUrl: './assets/icons/iconfont.js'
})
function EditDrawer(props: DrawerProps) {
  const [current, setCurrent] = useState(0)
  const [moduleList, setModuleList] = useAtom(moduleListAtom)

  const onChange = (value: number) => {
    console.log('onChange:', value)
    setCurrent(value)
  }
  const icons: { [key: string]: React.ReactNode } = {
    baseInfo: <IconFont type="icon-baseInfo" />,
    skills: <IconFont type="icon-skill" />,
    eduInfo: <IconFont type="icon-edu" />,
    workExperiences: <IconFont type="icon-work-exp" />,
    projectList: <IconFont type="icon-project" />,
    selfEvaluation: <IconFont type="icon-self" />,
    default: <IconFont type="icon-default" />
  }
  const onModuleChange = (val: ModuleItem, ind: number) => {
    const newValue = [...moduleList]
    newValue[ind] = val
    setModuleList(newValue)
  }
  const onModuleOrderChange = (oldOrder: number, newOrder: number) => {
    const newVal = arrayMoveImmutable(moduleList, oldOrder, newOrder)
    setModuleList(newVal)
  }
  return (
    <Drawer
      title="编辑"
      mask={false}
      width="40vw"
      {...props}
      onClose={(e) => {
        setCurrent(0)
        props.onClose?.(e)
      }}
    >
      <Steps
        direction="vertical"
        current={current}
        onChange={onChange}
        className="steps"
        items={moduleList.map((module, ind) => ({
          title: (
            <ModuleTitle
              onlyTitle={module.name === 'baseInfo'}
              title={module.title}
              status={module.status}
              order={ind}
              preOrderDisabled={ind <= 1}
              nextOrderDisabled={ind >= moduleList.length - 1}
              onOrderChange={onModuleOrderChange}
              onTitleChange={(title) => onModuleChange({ ...module, title }, ind)}
              onStatusChange={(status) => onModuleChange({ ...module, status }, ind)}
            />
          ),
          icon: icons[module.name] ?? icons.default,
          disabled: !module.status,
          status: 'finish',
          description: ind === current && (
            <div
              className={classNames('cursor-default', [
                ind === current ? 'opacity-100' : 'h-0 transition-all opacity-0'
              ])}
            >
              <div className="p-3 my-4 border border-gray-300 bordered min-h-32">
                {React.createElement(ModuleMap[module.name]!.Edit)}
              </div>
              <Space>
                {ind !== 0 && (
                  <Button onClick={() => setCurrent((current) => current - 1)}>上一项</Button>
                )}
                <Button
                  onClick={(e) => {
                    const isFinished = ind === moduleList.length - 1
                    if (isFinished) {
                      props.onClose?.(e)
                      return setCurrent(0)
                    }
                    setCurrent((current) => current + 1)
                  }}
                >
                  {ind === moduleList.length - 1 ? '完成' : '下一项'}
                </Button>
              </Space>
            </div>
          )
        }))}
      />
    </Drawer>
  )
}

export default EditDrawer
