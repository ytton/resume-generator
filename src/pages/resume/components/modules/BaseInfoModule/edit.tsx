import { baseInfoFields } from '@/pages/resume/constant'
import { type BaseInfo, baseInfoAtom } from '@/store/global'
import { PlusSquareFilled } from '@ant-design/icons'
import { Button, Form, Switch, Tooltip } from 'antd'
import { useAtom } from 'jotai'
import Avatar from './Avatar'
import EditItem from './EditItem'

export default function Edit() {
  const [baseInfo, setBaseInfo] = useAtom(baseInfoAtom)
  const { avatarVisible, labelVisible } = baseInfo

  const handleOnchange = (name: keyof BaseInfo, val: BaseInfo[keyof BaseInfo]) => {
    const newVal = { ...baseInfo, [name]: val }
    setBaseInfo(newVal)
  }
  //TODO: 自定义字段
  // const [customFieldList, setcustomFieldList] = useAtom(customFieldListAtom)

  return (
    <div>
      <Form labelCol={{ style: { width: '6em' } }} colon={false}>
        <div className="flex items-center justify-between px-3 py-1 mb-3 border border-gray-300 border-dashed">
          <div className="flex items-center">
            <span className="mr-4">显示标题</span>
            <Switch
              onChange={(val) => handleOnchange('labelVisible', val)}
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              value={labelVisible}
            />
          </div>
          <Tooltip title="加班加点的开发中...">
            <Button disabled icon={<PlusSquareFilled />}>
              新增字段
            </Button>
          </Tooltip>
          <div className="flex items-center">
            <span className="mr-4">显示照片</span>
            <Switch
              onChange={(val) => handleOnchange('avatarVisible', val)}
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              value={avatarVisible}
            />
          </div>
        </div>
        <div className="flex gap-x-8">
          <div className="flex flex-col justify-between flex-1">
            <div className="flex gap-x-8">
              <EditItem inputType="input" {...baseInfoFields.name} />
              <EditItem
                {...baseInfoFields.gender}
                inputType="select"
                className="flex-1"
                options={[
                  { label: '男', value: 'male' },
                  { label: '女', value: 'female' }
                ]}
              />
            </div>
            <div className="flex gap-x-8">
              <EditItem {...baseInfoFields.birthday} className="flex-1" inputType="monthPicker" />
              <EditItem {...baseInfoFields.tel} inputType="input" />
            </div>
            <div className="flex gap-x-8">
              <EditItem {...baseInfoFields.email} inputType="input" />
              <EditItem {...baseInfoFields.workYears} inputType="input" />
            </div>
          </div>
          <Avatar />
        </div>
        <div className="flex mt-4 gap-x-8">
          <EditItem {...baseInfoFields.target} inputType="input" />
          <EditItem {...baseInfoFields.city} inputType="input" />
          <EditItem {...baseInfoFields.salary} inputType="input" />
        </div>
        <div className="flex mt-4 gap-x-8">
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
