import { baseInfoAtom } from '@/store/global'
import { DatePicker, Input, InputProps, Select, SelectProps, Space } from 'antd'
import { MonthPickerProps } from 'antd/es/date-picker'
import dayjs, { Dayjs } from 'dayjs'
import { useAtom } from 'jotai'
import React from 'react'

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
    <Space.Compact className="flex-1">
      <Input value={title} readOnly className="flex-shrink-0 w-[6em]" />
      {React.createElement(
        inputMap[inputType] as React.FC<{
          onChange: (InputProps | SelectProps | MonthPickerProps)['onChange']
          className?: string
          value?: string | Dayjs
          options: SelectProps['options']
        }>,
        {
          onChange: handleOnChange,
          className,
          value,
          options: inputType === 'select' ? options : undefined
        }
      )}
    </Space.Compact>
  )
}
