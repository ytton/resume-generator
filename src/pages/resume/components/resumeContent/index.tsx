import PdfViewer from '@/components/pdfViwer'
import { moduleListAtom } from '@/store/global'
import { templateAtom } from '@/store/template'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { kebabCase } from 'lodash-es'
import React, { useEffect } from 'react'
import { ModuleMap } from '../../constant'
import ModuleWrapper from '../ModuleWrapper'
import './index.less'
import './templates/default.less'

type Props = {
  className?: string
  pageMargin: [number, number]
  moduleSpan: number
}

function ResumeContent({ className, pageMargin, moduleSpan }: Props) {
  const [moduleList] = useAtom(moduleListAtom)
  const [template] = useAtom(templateAtom)

  useEffect(() => {
    // 动态导入模板样式
    const loadTemplate = async () => {
      switch (template) {
        case 'modern-clean':
          await import('./templates/modern-clean.less')
          break
        case 'classic-business':
          await import('./templates/classic-business.less')
          break
        case 'creative-design':
          await import('./templates/creative-design.less')
          break
        case 'tech-professional':
          await import('./templates/tech-professional.less')
          break
        case 'custom':
          // 自定义样式从localStorage加载，已经在CSSEditor中处理
          break
        default:
          // 使用默认样式
          break
      }
    }
    loadTemplate()

    // 如果是自定义模板，从localStorage加载CSS
    if (template === 'custom') {
      const customCSS = localStorage.getItem('customResumeCSS')
      if (customCSS) {
        const styleId = 'custom-resume-styles'
        let styleElement = document.getElementById(styleId)

        if (!styleElement) {
          styleElement = document.createElement('style')
          styleElement.id = styleId
          document.head.appendChild(styleElement)
        }

        styleElement.textContent = customCSS
      }
    }
  }, [template])

  return (
    <PdfViewer
      pageMargin={pageMargin}
      chidSpan={moduleSpan}
      className={classNames('h-[calc(100vh-60px)]', className, `template-${template}`)}
    >
      {moduleList
        .filter((x) => x.status)
        .map((module, index, filteredModules) => {
          // 判断是否是同名模块的第一个实例
          const isFirst = filteredModules.findIndex((m) => m.name === module.name) === index
          return (
            <ModuleWrapper
              key={`${module.name}-${index}`}
              className={`${kebabCase(module.name)}`}
              title={module.title}
              moduleName={module.name}
              isFirst={isFirst}
            >
              {React.createElement(ModuleMap[module.name].Render)}
            </ModuleWrapper>
          )
        })}
    </PdfViewer>
  )
}

export default ResumeContent
