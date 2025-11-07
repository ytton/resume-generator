import { baseInfoAtom } from '@/store/global'
import { DatePicker, Input, InputProps, Select, SelectProps, Space } from 'antd'
import { MonthPickerProps } from 'antd/es/date-picker'
import dayjs, { Dayjs } from 'dayjs'
import { useAtom } from 'jotai'
import { useIsCompactMode } from '@/hooks/useIsCompactMode'
import React from 'react'
import classNames from 'classnames'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'

type Props = {
  inputType: 'input' | 'select' | 'monthPicker'
  name: string
  title: string
  options?: SelectProps['options']
  className?: string
}

type ChangeFnReturn<Fn, NewReturnType> = Fn extends (...args: infer Args) => any
  ? (...args: Args) => NewReturnType
  : never

export default function EditItem({ inputType, name, title, options, className }: Props) {
  const [baseInfo, setBaseInfo] = useAtom(baseInfoAtom)
  const { fields } = baseInfo
  const isCompact = useIsCompactMode()
  const selectValueMaps: { [key: string]: Record<string, string> } = {
    gender: {
      male: '男',
      female: '女',
      男: 'male',
      女: 'female'
    }
  }
  const curIndex = fields.findIndex((x) => x.name === name)
  const curItem = fields[curIndex] ?? {}

  const handleInputOnChange: ChangeFnReturn<InputProps['onChange'], string> = (e) =>
    (e as React.ChangeEvent<HTMLInputElement>).target.value

  const handleSelectOnChange: ChangeFnReturn<SelectProps['onChange'], string> = (val) =>
    selectValueMaps[name][val as string]

  const handleMonthPickerOnChange: ChangeFnReturn<MonthPickerProps['onChange'], string> = (val) =>
    dayjs(val as dayjs.Dayjs).format('YY-MM')

  const inputMap = {
    input: Input,
    select: Select,
    monthPicker: DatePicker.MonthPicker
  }

  const eventMap = {
    input: handleInputOnChange,
    select: handleSelectOnChange,
    monthPicker: handleMonthPickerOnChange
  }

  const handleOnChange = (e: unknown) => {
    const newValue = [...fields]
    newValue[curIndex].value = eventMap[inputType](e)
    setBaseInfo({ ...baseInfo, fields: newValue })
  }

  const getValue = () => {
    if (inputType === 'input') return curItem.value
    if (inputType === 'select') return selectValueMaps[name][curItem.value as string]
    if (inputType === 'monthPicker') return dayjs(curItem.value as string)
  }

  const value = getValue()

  return (
    <div className={classNames('relative group', isCompact ? 'w-full' : 'flex-1')}>
      <div className="!hidden text-white bg-gray-400 w-[14px] h-[14px] items-center justify-center rounded-full text-[10px] !cursor-move group-hover:!inline-flex absolute left-0-0 top-0 z-10 -translate-y-1/2 -translate-x-1/2">
        <MenuOutlined />
      </div>
      <Space.Compact className={classNames('w-full')}>
        <Input
          value={title}
          readOnly
          className={`flex-shrink-0 ${isCompact ? 'w-1/2 text-xs' : 'w-[6em]'}`}
          size={isCompact ? 'small' : undefined}
        />
        {React.createElement(
          inputMap[inputType] as React.FC<{
            onChange: (InputProps | SelectProps | MonthPickerProps)['onChange']
            className?: string
            value?: string | Dayjs
            options: SelectProps['options']
            allowClear?: boolean
            size?: 'small' | 'default'
          }>,
          {
            onChange: handleOnChange,
            className: classNames(className, 'flex-1'),
            value,
            allowClear: false,
            options: inputType === 'select' ? options : undefined,
            size: isCompact ? 'small' : undefined
          }
        )}
      </Space.Compact>
      <div className="!hidden text-white bg-red-400 w-[14px] h-[14px] items-center justify-center rounded-full text-[8px] !cursor-pointer group-hover:!inline-flex absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2">
        <CloseOutlined />
      </div>
    </div>
  )
}
