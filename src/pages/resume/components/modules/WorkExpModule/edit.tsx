import { workExpAtom } from '@/store/global'
import { useAtom } from 'jotai'
import { CommonModule } from '../CommonModule'
import { Button, Divider } from 'antd'
import dayjs from 'dayjs'
import { DeleteFilled } from '@ant-design/icons'

export default function Edit() {
  const [workExp, setWorkExp] = useAtom(workExpAtom)
  const handleOnChange = (
    val: string | [startDate: string, endDate: string | 'now'],
    name: string,
    ind: number
  ) => {
    const newValue = [...workExp]
    if (name === 'title' && typeof val === 'string') {
      newValue[ind].company = val
    } else if (name === 'subTitle' && typeof val === 'string') {
      newValue[ind].position = val
    } else if (name === 'desc' && typeof val === 'string') {
      newValue[ind].content = val
    } else if (Array.isArray(val)) {
      newValue[ind].dateRange = val
    }
    newValue[ind] = { ...newValue[ind], [name]: val }
    setWorkExp(newValue)
  }
  return (
    <div>
      {workExp.map((exp, ind) => (
        <div key={'workExp' + ind}>
          <div className="relative pr-[30px]">
            <CommonModule.Edit
              titleLabel="公司名称"
              richTextClassName="mr-[-30px] pr-2"
              title={exp.company}
              subTitleLabel="担任岗位"
              dateRangeLabel="就职时间"
              subTitle={exp.position}
              dateRange={exp.dateRange}
              desc={exp.content}
              onChange={(v, n) => handleOnChange(v, n, ind)}
            />
            {ind >= 1 && (
              <div className="h-[75px] flex items-center absolute top-0 right-3">
                <Button
                  icon={<DeleteFilled />}
                  onClick={() => {
                    const newValue = [...workExp]
                    newValue.splice(ind, 1)
                    setWorkExp(newValue)
                  }}
                />
              </div>
            )}
          </div>
          {workExp.length > 1 && ind < workExp.length - 1 && (
            <Divider dashed className="my-3 border-gray-400" />
          )}
        </div>
      ))}
      <div className="py-3 text-center">
        <Button
          onClick={() =>
            setWorkExp([
              ...workExp,
              {
                company: 'XXX公司',
                position: 'web前端开发',
                dateRange: [dayjs().format('YYYY-MM'), dayjs().format('YYYY-MM')],
                content:
                  '<ul><li>主要负责描述，例如：带领X人团队进行市场营销和产品策划。</li><li>1-3行主要负责描述，不要太多。</li></ul>'
              }
            ])
          }
        >
          新增一个
        </Button>
      </div>
    </div>
  )
}
