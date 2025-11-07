import { baseInfoFields } from '@/pages/resume/constant'
import { type BaseInfo, baseInfoAtom } from '@/store/global'
import { PlusSquareFilled } from '@ant-design/icons'
import { Button, Form, Switch, Tooltip } from 'antd'
import { useAtom } from 'jotai'
import { useIsCompactMode } from '@/hooks/useIsCompactMode'
import EditItem from './EditItem'
import classNames from 'classnames'

export default function Edit() {
  const [baseInfo, setBaseInfo] = useAtom(baseInfoAtom)
  const { avatarVisible, labelVisible } = baseInfo
  const isCompact = useIsCompactMode()

  const handleOnchange = (name: keyof BaseInfo, val: BaseInfo[keyof BaseInfo]) => {
    const newVal = { ...baseInfo, [name]: val }
    setBaseInfo(newVal)
  }
  //TODO: 自定义字段
  // const [customFieldList, setcustomFieldList] = useAtom(customFieldListAtom)

  return (
    <div>
      <Form labelCol={{ style: { width: '6em' } }} colon={false}>
        <div
          className={`flex items-center justify-between px-3 py-1 mb-3 border border-gray-300 border-dashed`}
        >
          <div className={classNames('flex gap-2 justify-between w-full')}>
            <div className="flex items-center">
              <span className={`mr-4 ${isCompact ? 'text-xs mr-2' : ''}`}>显示标题</span>
              <Switch
                size={isCompact ? 'small' : undefined}
                onChange={(val) => handleOnchange('labelVisible', val)}
                checkedChildren={isCompact ? '' : '显示'}
                unCheckedChildren={isCompact ? '' : '隐藏'}
                value={labelVisible}
              />
            </div>
            <Tooltip title="加班加点的开发中...">
              <Button size={isCompact ? 'small' : undefined} disabled icon={<PlusSquareFilled />}>
                新增字段
              </Button>
            </Tooltip>
            <div className="flex items-center">
              <span className={`mr-4 ${isCompact ? 'text-xs mr-2' : ''}`}>显示照片</span>
              <Switch
                size={isCompact ? 'small' : undefined}
                onChange={(val) => handleOnchange('avatarVisible', val)}
                checkedChildren={isCompact ? '' : '显示'}
                unCheckedChildren={isCompact ? '' : '隐藏'}
                value={avatarVisible}
              />
            </div>
          </div>
        </div>
        <div className={classNames('grid gap-4', isCompact ? 'grid-cols-1' : 'grid-cols-2')}>
          <EditItem inputType="input" {...baseInfoFields.name} />
          <EditItem
            {...baseInfoFields.gender}
            inputType="select"
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' }
            ]}
          />
          <EditItem {...baseInfoFields.birthday} inputType="monthPicker" />
          <EditItem {...baseInfoFields.tel} inputType="input" />
          <EditItem {...baseInfoFields.email} inputType="input" />
          <EditItem {...baseInfoFields.workYears} inputType="input" />
          <EditItem {...baseInfoFields.target} inputType="input" />
          <EditItem {...baseInfoFields.city} inputType="input" />
          <EditItem {...baseInfoFields.salary} inputType="input" />
          <EditItem {...baseInfoFields.curStatus} inputType="input" />
        </div>

        {/* <Row>
          {customFieldList.map((item, ind) => (
            <Col key={item.name} span={8}>
              <Form.Item name={item.name} label={item.title}>
                <Input
                  value={item.value}
                  onChange={(e) => {
                    const newBaseInfo = [...baseInfo]
                    newBaseInfo[ind].value = e.target.value
                    setBaseInfo(newBaseInfo)
                  }}
                />
              </Form.Item>
            </Col>
          ))}
        </Row> */}
      </Form>
    </div>
  )
}
