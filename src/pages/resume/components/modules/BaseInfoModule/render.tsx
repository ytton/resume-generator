import { baseInfoAtom } from '@/store/global'
import { useAtom } from 'jotai'
import { DescItem } from './DescItem'
import Avatar from './Avatar'
import dayjs from 'dayjs'

export default function Render() {
  const [baseInfo] = useAtom(baseInfoAtom)
  const { fields, avatarVisible, labelVisible } = baseInfo
  const ind = fields.findIndex((x) => x.name === 'birthday')
  const birthDay = fields[ind]
  const now = dayjs()
  const age = now.diff(birthDay.value, 'year')
  const realFields = [...fields]
  if (!labelVisible) {
    realFields[ind] = {
      name: 'age',
      value: age + '岁',
      title: '年龄'
    }
  }

  return (
    <>
      {realFields.map((item) => (
        <DescItem prefix="base-info" {...item} key={item.name} />
      ))}
      {avatarVisible && <Avatar className="base-info__avatar" />}
    </>
  )
}
