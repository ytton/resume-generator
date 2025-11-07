import { projListAtom } from '@/store/global'
import { useAtom } from 'jotai'
import { CommonModule } from '../CommonModule'
import { Button, Divider } from 'antd'
import dayjs from 'dayjs'
import { DeleteFilled } from '@ant-design/icons'

export default function Edit() {
  const [eduInfo, setEduInfo] = useAtom(projListAtom)
  const handleOnChange = (
    val: string | [startDate: string, endDate: string | 'now'],
    name: string,
    ind: number
  ) => {
    const newValue = [...eduInfo]
    if (name === 'title' && typeof val === 'string') {
      newValue[ind].projName = val
    } else if (name === 'subTitle' && typeof val === 'string') {
      newValue[ind].role = val
    } else if (name === 'desc' && typeof val === 'string') {
      newValue[ind].content = val
    } else if (Array.isArray(val)) {
      newValue[ind].dateRange = val
    }
    setEduInfo(newValue)
  }
  return (
    <div>
      {eduInfo.map((item, ind) => (
        <div key={'proj' + ind}>
          <div className="relative pr-[30px]">
            <CommonModule.Edit
              titleLabel="项目名称"
              richTextClassName="mr-[-30px] pr-2"
              title={item.projName}
              subTitleLabel="担任角色"
              dateRangeLabel="项目时间"
              subTitle={item.role}
              dateRange={item.dateRange}
              desc={item.content}
              onChange={(v, n) => handleOnChange(v, n, ind)}
            />
            {eduInfo.length > 1 && (
              <div className="h-[75px] flex items-center absolute top-0 right-3">
                <Button
                  icon={<DeleteFilled />}
                  onClick={() => {
                    const newValue = [...eduInfo]
                    newValue.splice(ind, 1)
                    setEduInfo(newValue)
                  }}
                />
              </div>
            )}
          </div>
          {eduInfo.length > 1 && ind < eduInfo.length - 1 && (
            <Divider dashed className="my-3 border-gray-400" />
          )}
        </div>
      ))}
      <div className="py-3 text-center">
        <Button
          onClick={() =>
            setEduInfo([
              {
                projName: '项目名称',
                role: 'web前端开发',
                dateRange: [dayjs().format('YYYY-MM'), dayjs().format('YYYY-MM')],
                content: ''
              },
              ...eduInfo
            ])
          }
        >
          新增一个
        </Button>
      </div>
    </div>
  )
}
