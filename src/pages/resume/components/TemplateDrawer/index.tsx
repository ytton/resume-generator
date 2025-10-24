import { Button, Drawer, DrawerProps, Card, Row, Col, Space, Tooltip } from 'antd'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { TemplateType, templateAtom } from '@/store/template'
import { useIsCompactMode } from '@/hooks/useIsCompactMode'
import Editor from '@monaco-editor/react'
import { EditOutlined } from '@ant-design/icons'
import { getTemplateBaseCSS } from '@/utils/templateCSS'
import classNames from 'classnames'
import './index.less'

// 模板配置
const templateConfigs = [
  {
    id: 'default' as TemplateType,
    title: '默认模板',
    description: '经典简约风格，适合大部分场景使用。简洁明了的布局，突出核心信息。',
    preview: '/templates/default-preview.png' // 这里需要添加预览图
  },
  {
    id: 'modern-clean' as TemplateType,
    title: '现代简洁',
    description: '现代化设计，干净简洁。卡片式布局，渐变色彩，适合互联网、设计类工作。',
    preview: '/templates/modern-clean-preview.png'
  },
  {
    id: 'classic-business' as TemplateType,
    title: '经典商务',
    description: '正式商务风格，简洁专业。深色主题，权威感强，适合传统行业、管理岗位。',
    preview: '/templates/classic-business-preview.png'
  },
  {
    id: 'creative-design' as TemplateType,
    title: '创意设计',
    description: '创意十足的设计风格。丰富动画效果，色彩鲜艳，适合设计师、创意工作者。',
    preview: '/templates/creative-design-preview.png'
  },
  {
    id: 'tech-professional' as TemplateType,
    title: '技术专业',
    description: '代码风格界面，专为程序员设计。深色主题，等宽字体，技术感浓厚。',
    preview: '/templates/tech-professional-preview.png'
  }
]

interface Props extends DrawerProps {
  onTemplateSelect?: (template: TemplateType) => void
}

const defaultCustomCSS = `/* 自定义简历样式 */
.template-custom {
  .pages {
    background-color: #ffffff;
    line-height: var(--line-height, 1.6);
    
    .page + .page {
      margin-top: 20px;
    }
  }

  .module {
    margin-bottom: 24px;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    &__title {
      line-height: 1.4;
      padding: 12px 16px;
      background: var(--color-primary, #1890ff);
      border-radius: 8px 8px 0 0;

      span {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        padding: 0;
      }
    }

    &__content {
      padding: 16px;
    }
  }

  /* 在这里添加你的自定义样式 */
}`

function TemplateDrawer(props: Props) {
  const [currentTemplate, setCurrentTemplate] = useAtom(templateAtom)
  const [showCustomEditor, setShowCustomEditor] = useState(false)
  const [cssCode, setCssCode] = useState(() => {
    return localStorage.getItem('customResumeCSS') || defaultCustomCSS
  })
  const [isApplying, setIsApplying] = useState(false)
  const isCompact = useIsCompactMode()

  const handleTemplateSelect = (template: TemplateType) => {
    setCurrentTemplate(template)
    props.onTemplateSelect?.(template)
  }

  const handleCustomizeFromTemplate = (baseTemplate: TemplateType) => {
    // 继承基础模板的样式，然后打开自定义编辑器
    const baseCSS = getTemplateBaseCSS(baseTemplate)
    setCssCode(baseCSS + '\n\n/* 在此基础上添加你的自定义样式 */')
    setCurrentTemplate('custom')
    setShowCustomEditor(true)
  }

  const handleApplyCustomStyles = async () => {
    setIsApplying(true)

    try {
      // 创建一个style元素来应用自定义CSS
      const styleId = 'custom-resume-styles'
      let styleElement = document.getElementById(styleId)

      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        document.head.appendChild(styleElement)
      }

      styleElement.textContent = cssCode

      // 设置当前模板为自定义
      setCurrentTemplate('custom')

      // 将自定义CSS保存到localStorage
      localStorage.setItem('customResumeCSS', cssCode)
    } catch (error) {
      console.error('应用样式时出错:', error)
    } finally {
      setIsApplying(false)
    }
  }

  const handleResetCustomCSS = () => {
    setCssCode(defaultCustomCSS)
  }

  return (
    <Drawer
      title="选择简历模板"
      mask={false}
      rootClassName="template-drawer"
      {...props}
      onClose={(e) => {
        setShowCustomEditor(false)
        props.onClose?.(e)
      }}
    >
      <div className={classNames('template-drawer-content', { 'compact-mode': isCompact })}>
        {!showCustomEditor ? (
          <>
            {/* 预设模板网格 */}
            <Row gutter={[16, 16]}>
              {templateConfigs.map((template) => (
                <Col key={template.id} span={isCompact ? 12 : 8}>
                  <Card
                    hoverable
                    className={classNames('template-card', {
                      selected: currentTemplate === template.id,
                      hovered: true // 支持hover效果
                    })}
                    onClick={() => handleTemplateSelect(template.id)}
                    cover={
                      <div className="template-preview">
                        <img
                          src={template.preview}
                          alt={`${template.title}预览`}
                          className="preview-image"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              'data:image/svg+xml,' +
                              encodeURIComponent(`
                              <svg xmlns="http://www.w3.org/2000/svg" width="210" height="297" viewBox="0 0 210 297">
                                <rect width="210" height="297" fill="#f0f0f0" stroke="#ddd" stroke-width="1"/>
                                <text x="105" y="148" text-anchor="middle" font-family="Arial" font-size="12" fill="#666">
                                  ${template.title}
                                </text>
                              </svg>
                            `)
                          }}
                        />
                        {/* hover时显示自定义样式按钮 */}
                        <div className="hover-overlay">
                          <Tooltip title="基于此模板自定义样式">
                            <Button
                              type="primary"
                              size="small"
                              shape="circle"
                              icon={<EditOutlined />}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCustomizeFromTemplate(template.id)
                              }}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    }
                  >
                    <Card.Meta
                      title={template.title}
                      description={
                        <div className="text-xs text-gray-500">{template.description}</div>
                      }
                    />
                  </Card>
                </Col>
              ))}

              {/* 自定义样式卡片 */}
              <Col span={isCompact ? 12 : 8}>
                <Card
                  hoverable
                  className={classNames('template-card custom-template-card', {
                    selected: currentTemplate === 'custom'
                  })}
                  onClick={() => {
                    setCurrentTemplate('custom')
                    setShowCustomEditor(true)
                  }}
                  cover={
                    <div className="template-preview custom-preview">
                      <div className="custom-placeholder">
                        <div className="text-white text-center">
                          <div className="text-xl mb-1">🎨</div>
                          <div className="text-sm font-semibold">自定义设计</div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Card.Meta
                    title="自定义样式"
                    description={
                      <div className="text-xs text-gray-500">
                        完全自定义的简历样式，通过编写CSS代码来创建独一无二的简历设计
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          /* 自定义CSS编辑器 */
          <div className="custom-css-editor">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">自定义CSS样式编辑器</h3>
              <div className="text-sm text-gray-600">
                <p className="mb-2">💡 提示：</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>
                    所有样式都应该写在{' '}
                    <code className="bg-gray-100 px-1 rounded">.template-custom</code> 选择器内
                  </li>
                  <li>
                    可以使用 CSS 变量{' '}
                    <code className="bg-gray-100 px-1 rounded">var(--color-primary)</code>{' '}
                    来引用主题色
                  </li>
                  <li>编辑器支持代码高亮和自动补全</li>
                  <li>修改代码后点击"应用样式"实时预览效果</li>
                </ul>
              </div>
            </div>

            <div className="editor-container" style={{ height: isCompact ? '300px' : '400px' }}>
              <Editor
                height="100%"
                defaultLanguage="css"
                value={cssCode}
                onChange={(value) => setCssCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: 'on',
                  formatOnPaste: true,
                  formatOnType: true
                }}
              />
            </div>

            <Space className="mt-4 w-full justify-end">
              <Button onClick={() => setShowCustomEditor(false)}>返回模板选择</Button>
              <Button onClick={handleResetCustomCSS}>重置默认</Button>
              <Button type="primary" loading={isApplying} onClick={handleApplyCustomStyles}>
                应用样式
              </Button>
            </Space>
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default TemplateDrawer
