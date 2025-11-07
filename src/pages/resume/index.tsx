import ImportJsonButton from '@/components/ImportJsonButton'
import {
  allAtom,
  baseInfoAtom,
  layoutSettingsAtom,
  themeColorsAtom,
  moduleListAtom
} from '@/store/global'
import dom2img from '@/utils/dom2img'
import dom2pdf from '@/utils/dom2pdf'
import {
  BgColorsOutlined,
  CaretDownOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { Button, ColorPicker, Dropdown, MenuProps, Space, Tooltip } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import EditDrawer from './components/EditDrawer'
import LayoutSettings from './components/LayoutSettings'
import ResumeContent from './components/resumeContent'
import TemplateDrawer from './components/TemplateDrawer'

function Resume() {
  const [, dispatch] = useAtom(allAtom)
  const [layoutSettings] = useAtom(layoutSettingsAtom)
  const [themeColors, setThemeColors] = useAtom(themeColorsAtom)
  const [baseInfo] = useAtom(baseInfoAtom)
  const { labelVisible } = baseInfo
  const { moduleSpan, lineHeight, pageMargin } = layoutSettings

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [templateDrawerVisible, setTemplateDrawerVisible] = useState(false)
  const [moduleList] = useAtom(moduleListAtom)
  const [editStepIndex, setEditStepIndex] = useState(0)

  // 监听 ModuleWrapper 触发的编辑事件
  useEffect(() => {
    const handleEditModule = (event: CustomEvent) => {
      const { moduleName } = event.detail

      // 关闭模板选择抽屉，实现互斥
      setTemplateDrawerVisible(false)

      // 找到模块在列表中的索引，设置EditDrawer的step
      const moduleIndex = moduleList.findIndex((module) => module.name === moduleName)
      if (moduleIndex !== -1) {
        setEditStepIndex(moduleIndex)
        setDrawerVisible(true)
      }
    }

    window.addEventListener('openEditDrawer', handleEditModule as EventListener)
    return () => {
      window.removeEventListener('openEditDrawer', handleEditModule as EventListener)
    }
  }, [moduleList])

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'pdf') {
      return dom2pdf(document.querySelectorAll('.page'), '简历' + dayjs().format())
    }
    if (e.key === 'png') {
      return dom2img(document.querySelectorAll('.pages'), '简历' + dayjs().format())
    }
    if (e.key === 'json') {
      dispatch({
        type: 'get',
        callback(val) {
          // 将JavaScript对象转换为JSON字符串
          const jsonString = JSON.stringify(val, null, 2)

          // 创建一个Blob对象来存储JSON数据
          const blob = new Blob([jsonString], { type: 'application/json' })

          // 创建一个下载链接
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `简历${dayjs().format()}.json`

          // 将下载链接添加到文档中并触发点击事件
          document.body.appendChild(a)
          a.click()

          // 移除下载链接
          document.body.removeChild(a)

          // 释放URL对象
          URL.revokeObjectURL(url)
        }
      })
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'PDF',
      key: 'pdf',
      icon: <FilePdfOutlined />
    },
    {
      label: 'PNG',
      key: 'png',
      icon: <FileImageOutlined />
    },
    {
      label: 'JSON',
      key: 'json',
      icon: <FileTextOutlined />
    }
  ]

  const menuProps = {
    items,
    onClick: handleMenuClick
  }
  const handleEditDrawerOpen = () => {
    setDrawerVisible(true)
    setTemplateDrawerVisible(false)
  }
  const handleTemplateDrawerOpen = () => {
    setDrawerVisible(false)
    setTemplateDrawerVisible(true)
  }
  return (
    <div
      className="transition-all duration-300"
      style={{
        '--module-span': `${moduleSpan}px`,
        '--line-height': `${lineHeight}`,
        '--page-margin-x': `${pageMargin[0]}px`,
        '--page-margin-y': `${pageMargin[1]}px`,
        '--color-primary': `${themeColors.mainColor}`,
        marginRight: drawerVisible || templateDrawerVisible ? 'max(40vw, 420px)' : '0'
      }}
    >
      <header className="flex items-center bg-white h-[60px]">
        <div className="flex items-center gap-x-2 mx-auto w-[calc((100vh-80px)*0.70665)]">
          <Space className="flex-1">
            <ImportJsonButton />
            <Dropdown menu={menuProps} trigger={['hover']}>
              <Button>
                <div className="flex items-center">
                  <span>导出为</span> <CaretDownOutlined className="ml-2" />
                </div>
              </Button>
            </Dropdown>
            <Tooltip title="主题色">
              <ColorPicker
                trigger="hover"
                value={themeColors.mainColor}
                onChange={(color) =>
                  setThemeColors({ ...themeColors, mainColor: color.toHexString() })
                }
              >
                <Button icon={<BgColorsOutlined />}>主题</Button>
              </ColorPicker>
            </Tooltip>
            {/* <Tooltip title="开发中...">
              <Button className="flex items-center" disabled>
                分享
              </Button>
            </Tooltip> */}
          </Space>
          <Tooltip title="开发中...">
            <Button className="flex items-center" disabled>
              中 <SwapOutlined /> 英
            </Button>
          </Tooltip>
          <Space className="justify-end flex-1">
            <Button onClick={handleTemplateDrawerOpen}>模板</Button>
            <Button onClick={handleEditDrawerOpen}>编辑</Button>
            <LayoutSettings />
          </Space>
        </div>
      </header>
      <ResumeContent
        pageMargin={pageMargin}
        moduleSpan={moduleSpan}
        className={classNames({ 'hide-label': !labelVisible })}
      />
      <EditDrawer
        title="编辑"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        initialStep={editStepIndex}
      ></EditDrawer>
      <TemplateDrawer
        open={templateDrawerVisible}
        onClose={() => setTemplateDrawerVisible(false)}
      />
    </div>
  )
}

export default Resume
