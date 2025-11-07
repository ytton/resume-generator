import { Form, Input } from 'antd'
import classNames from 'classnames'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useIsCompactMode } from '@/hooks/useIsCompactMode'
import DateRange from './dateRange'
import './index.less'
type Props = {
  className?: string
  richTextClassName?: string
  onlyRichText?: boolean
  title?: string
  titleLabel?: string
  subTitle?: string
  subTitleLabel?: string
  dateRangeLabel?: string
  dateRange?: [startDate: string, endDate: string | 'now']
  desc?: string
  onChange?: (
    val: string | [startDate: string, endDate: string | 'now'],
    name: 'title' | 'subTitle' | 'dateRange' | 'desc'
  ) => void
}
export default function Edit({
  onlyRichText = false,
  className,
  richTextClassName,
  title,
  titleLabel,
  subTitle,
  subTitleLabel,
  dateRange,
  dateRangeLabel,
  desc,
  onChange
}: Props) {
  const isCompact = useIsCompactMode()
  const richText = (
    <ReactQuill
      modules={{
        toolbar: isCompact
          ? [
              ['bold', 'italic'],
              [{ list: 'ordered' }, { list: 'bullet' }]
            ]
          : [
              [{ header: 1 }, { header: 2 }], // custom button values
              ['bold', 'italic', 'underline'], // toggled buttons
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ align: [] }],
              ['clean']
            ]
      }}
      className={classNames(
        `flex flex-col rich-text mt-3 ${isCompact ? 'min-h-20 text-xs' : 'min-h-28'}`,
        { [className ?? '']: onlyRichText },
        richTextClassName
      )}
      theme="snow"
      value={desc}
      onChange={(value, _, changeFrom) => {
        if (changeFrom === 'api') return
        onChange?.(value, 'desc')
      }}
    />
  )
  if (onlyRichText) return richText
  return (
    <div className={className}>
      <div>
        <Form className="pr-[30px]">
          {isCompact ? (
            // 紧凑模式：单列布局
            <div className="space-y-2">
              <Form.Item label={titleLabel} className="mb-2">
                <Input
                  size="small"
                  value={title}
                  onChange={(e) => onChange?.(e.target.value, 'title')}
                />
              </Form.Item>
              <Form.Item label={subTitleLabel} className="mb-2">
                <Input
                  size="small"
                  value={subTitle}
                  onChange={(e) => onChange?.(e.target.value, 'subTitle')}
                />
              </Form.Item>
              <Form.Item label={dateRangeLabel} className="mb-2">
                <DateRange
                  size="small"
                  value={dateRange}
                  onChange={(value) => onChange?.(value, 'dateRange')}
                />
              </Form.Item>
            </div>
          ) : (
            // 正常模式：多列布局
            <>
              <div className="flex gap-6">
                <Form.Item label={titleLabel} className="flex-1">
                  <Input value={title} onChange={(e) => onChange?.(e.target.value, 'title')} />
                </Form.Item>
                <Form.Item label={subTitleLabel} className="flex-1">
                  <Input
                    value={subTitle}
                    onChange={(e) => onChange?.(e.target.value, 'subTitle')}
                  />
                </Form.Item>
              </div>
              <Form.Item label={dateRangeLabel} className="flex-1 w-full">
                <DateRange value={dateRange} onChange={(value) => onChange?.(value, 'dateRange')} />
              </Form.Item>
            </>
          )}
        </Form>
      </div>
      {richText}
    </div>
  )
}
