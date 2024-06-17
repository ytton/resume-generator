import classNames from 'classnames'
import ReactQuill from 'react-quill'
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
}
import './index.less'
export default function Render({
  className,
  richTextClassName,
  onlyRichText = false,
  title,
  titleLabel,
  subTitle,
  subTitleLabel,
  dateRange,
  dateRangeLabel,
  desc
}: Props) {
  const [start, end] = dateRange ?? ['', '']
  const richText = (
    <ReactQuill
      modules={{
        toolbar: false
      }}
      className={classNames(
        'flex flex-col rich-text read-only',
        { [className ?? '']: onlyRichText },
        richTextClassName
      )}
      readOnly
      value={desc}
    />
  )
  if (onlyRichText) return richText
  return (
    <div className={classNames('common-module', className)}>
      <div className="flex header">
        <div className="title">
          <span>{titleLabel}</span>
          <span>{title}</span>
        </div>
        <div className="sub-title">
          <span>{subTitleLabel}</span>
          <span>{subTitle}</span>
        </div>
        <div className="date-range">
          <span>{dateRangeLabel}</span>
          <span>
            {start} ~ {end === 'now' ? '至今' : end}
          </span>
        </div>
      </div>
      {desc && desc !== '<p><br></p>' && <div className="desc">{richText}</div>}
    </div>
  )
}
