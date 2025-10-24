import {
  baseInfoAtom,
  eduInfoAtom,
  layoutSettingsAtom,
  projListAtom,
  selfEvaluationAtom,
  skillsAtom,
  workExpAtom
} from '@/store/global'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { uniqBy } from 'lodash-es'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

export interface PdfViewerProps {
  children: ReactNode
  className?: string
  pageMargin?: [number, number]
  chidSpan?: number
}

type PageProps = {
  content: ReactNode[]
  style?: React.CSSProperties
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  children,
  className,
  pageMargin = [10, 20],
  chidSpan = 10
}) => {
  const [baseInfo] = useAtom(baseInfoAtom)
  const [eduInfo] = useAtom(eduInfoAtom)
  const [skills] = useAtom(skillsAtom)
  const [workExp] = useAtom(workExpAtom)
  const [projList] = useAtom(projListAtom)
  const [selfEvaluation] = useAtom(selfEvaluationAtom)
  const [layoutSettings] = useAtom(layoutSettingsAtom)

  const [curPage, setCurPage] = useState(1)
  const [pages, setPages] = useState<PageProps[]>([{ content: React.Children.toArray(children) }])
  const [xMargin = 0, yMargin = 0] = pageMargin
  const pagesRef = useRef<HTMLDivElement>(null)
  const childrenRef = useRef<Set<HTMLDivElement | null>>(new Set())
  const calcPages = () => {
    const childrenList = uniqBy([...document.querySelectorAll('[data-key]')], 'dataset.key')
    console.warn(childrenList.map((x) => (x as unknown as { offsetHeight: number })?.offsetHeight))
    const pageHeight = (pagesRef.current?.offsetHeight ?? 0) - yMargin * 2
    const pages: PageProps[] = []
    let page: PageProps = {
      style: {
        height: '100%'
      },
      content: []
    }
    let curPageRemainHeight = pageHeight
    React.Children.toArray(children).forEach((child, ind) => {
      const childHeight =
        (childrenList[ind] as unknown as { offsetHeight: number })?.offsetHeight ?? 0
      let childRemainHeight = childHeight
      while (curPageRemainHeight < childRemainHeight) {
        page.content.push(child)
        pages.push({ ...page })
        childRemainHeight = childRemainHeight - curPageRemainHeight
        page = {
          style: {
            position: 'absolute',
            left: xMargin,
            right: xMargin,
            top: -childHeight + childRemainHeight + yMargin
          },
          content: []
        }
        curPageRemainHeight = pageHeight
      }
      if (childRemainHeight !== childHeight) {
        page.content.push(child)
        curPageRemainHeight -= childRemainHeight
        return
      }
      // 放下来的一定是剩余高度比元素高度大
      page.content.push(child)
      curPageRemainHeight -= childHeight
    })
    pages.push(page)
    setPages(pages)
  }
  useEffect(() => {
    const scrollEl = pagesRef.current?.parentElement
    const handleScroll = () => {
      if (pagesRef) {
        const pageIndex =
          Math.floor((scrollEl?.scrollTop ?? 0) / ((scrollEl?.clientHeight ?? 0) + 20)) + 1
        setCurPage(pageIndex)
      }
    }
    calcPages()
    handleScroll()
    scrollEl?.addEventListener('scroll', handleScroll)
    return () => {
      scrollEl?.addEventListener('scroll', handleScroll)
    }
  }, [skills, layoutSettings, baseInfo, eduInfo, workExp, projList, selfEvaluation, children])

  return (
    <main className={classNames('pdf-viewer', className)}>
      <div className="text-white h-[30px] flex items-center justify-center">
        {curPage} / {pages.length} 页
      </div>
      <div className="pb-[10px] h-[calc(100%-30px)]">
        <div className="h-full overflow-auto">
          <div className="pages h-full aspect-[0.70665] min-w-[763px] mx-auto" ref={pagesRef}>
            {pages.map((page, pInd) => (
              <div
                className="relative h-full overflow-hidden bg-white page"
                style={{ padding: `${yMargin}px ${xMargin}px` }}
                key={'page' + pInd}
              >
                <div
                  className="absolute top-0 left-0 right-0 z-40 overflow-hidden bg-white"
                  style={{ height: yMargin }}
                ></div>
                <div style={page.style}>
                  {React.Children.map(page.content, (child, ind) => (
                    <div
                      key={'page' + pInd + (child as { key: string }).key}
                      data-key={(child as { key: string }).key}
                      ref={(ins) => childrenRef.current.add(ins)}
                      style={{
                        paddingBottom: ind < page.content.length - 1 ? chidSpan : 0
                      }}
                    >
                      {child}
                    </div>
                  ))}
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 z-40 bg-white"
                  style={{ height: yMargin }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PdfViewer
