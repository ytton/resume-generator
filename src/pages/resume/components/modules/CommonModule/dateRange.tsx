import { Checkbox, DatePicker } from 'antd'
import dayjs from 'dayjs'

type Props = {
  value?: [startDate: string, endDate: string | 'now']
  onChange?: (val: string | [startDate: string, endDate: string | 'now']) => void
}

export default function DateRange({ value, onChange }: Props) {
  const [startDate, endDate] = value ?? [
    dayjs().subtract(1, 'year').format('YYYY-MM'),
    dayjs().format('YYYY-MM')
  ]
  const isNow = endDate === 'now'
  return (
    <div className="flex items-center">
      <div>
        {isNow ? (
          <DatePicker
            value={dayjs(startDate)}
            picker="month"
            allowClear={false}
            onChange={(val) => {
              onChange?.([val.format('YYYY-MM'), 'now'])
            }}
          />
        ) : (
          <DatePicker.RangePicker
            className="w-[200px]"
            value={[dayjs(startDate), dayjs(endDate)]}
            picker="month"
            allowClear={false}
            onChange={(val) => {
              const [s, e] = val ?? []
              onChange?.([dayjs(s).format('YYYY-MM'), dayjs(e).format('YYYY-MM')])
            }}
          />
        )}
      </div>
      <div className="ml-3">
        <Checkbox
          checked={isNow}
          onChange={(v) => {
            const isChecked = v.target.checked
            onChange?.([startDate, isChecked ? 'now' : dayjs().format('YYYY-MM')])
          }}
        >
          至今
        </Checkbox>
      </div>
    </div>
  )
}
