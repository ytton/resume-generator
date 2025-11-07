import { Checkbox, DatePicker } from 'antd'
import dayjs from 'dayjs'

type Props = {
  value?: [startDate: string, endDate: string | 'now']
  onChange?: (val: string | [startDate: string, endDate: string | 'now']) => void
  size?: 'small'
}

export default function DateRange({ value, onChange, size = undefined }: Props) {
  const [startDate, endDate] = value ?? [
    dayjs().subtract(1, 'year').format('YYYY-MM'),
    dayjs().format('YYYY-MM')
  ]
  const isNow = endDate === 'now'
  return (
    <div className={`flex items-center ${size === 'small' ? 'text-xs' : ''}`}>
      <div>
        {isNow ? (
          <DatePicker
            value={dayjs(startDate)}
            picker="month"
            size={size}
            allowClear={false}
            onChange={(val) => {
              onChange?.([val.format('YYYY-MM'), 'now'])
            }}
          />
        ) : (
          <DatePicker.RangePicker
            className={size === 'small' ? 'w-[180px]' : 'w-[200px]'}
            value={[dayjs(startDate), dayjs(endDate)]}
            picker="month"
            size={size}
            allowClear={false}
            onChange={(val) => {
              const [s, e] = val ?? []
              onChange?.([dayjs(s).format('YYYY-MM'), dayjs(e).format('YYYY-MM')])
            }}
          />
        )}
      </div>
      <div className={size === 'small' ? 'ml-2' : 'ml-3'}>
        <Checkbox
          checked={isNow}
          onChange={(v) => {
            const isChecked = v.target.checked
            onChange?.([startDate, isChecked ? 'now' : dayjs().format('YYYY-MM')])
          }}
        >
          <span className="whitespace-nowrap">至今</span>
        </Checkbox>
      </div>
    </div>
  )
}
