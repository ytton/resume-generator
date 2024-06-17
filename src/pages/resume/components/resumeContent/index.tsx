import PdfViewer from '@/components/pdfViwer'
import { moduleListAtom } from '@/store/global'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { kebabCase } from 'lodash-es'
import React from 'react'
import { ModuleMap } from '../../constant'
import './index.less'

type Props = {
  className?: string
  pageMargin: [number, number]
  moduleSpan: number
}

function ResumeContent({ className, pageMargin, moduleSpan }: Props) {
  const [moduleList] = useAtom(moduleListAtom)
  return (
    <PdfViewer
      pageMargin={pageMargin}
      chidSpan={moduleSpan}
      className={classNames('h-[calc(100vh-60px)]', className)}
    >
      {moduleList
        .filter((x) => x.status)
        .map((module) => (
          <div className={`${kebabCase(module.name)} module`} key={module.name}>
            <div className="module__title">
              <span>{module.title}</span>
            </div>
            <div className="module__content">
              {React.createElement(ModuleMap[module.name].Render)}
            </div>
          </div>
        ))}
    </PdfViewer>
  )
}

export default ResumeContent
