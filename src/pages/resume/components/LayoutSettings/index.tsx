import { type LayoutSettings, layoutSettingsAtom } from '@/store/global'
import { DownOutlined } from '@ant-design/icons'
import { Popover, Slider, Space, Button } from 'antd'
import { useAtom } from 'jotai'

function LayoutSettings() {
  const [layoutSettings, setLayoutSettings] = useAtom(layoutSettingsAtom)
  const { moduleSpan, lineHeight, pageMargin } = layoutSettings

  const handleOnchange = (
    name: keyof LayoutSettings,
    val: LayoutSettings[keyof LayoutSettings]
  ) => {
    const newVal = { ...layoutSettings, [name]: val }
    setLayoutSettings(newVal)
  }
  return (
    <Popover
      content={
        <div className="min-w-[250px] px-4 py-3">
          <div>
            <div>模块上下间距 {moduleSpan}</div>
            <div className="flex items-center">
              <Slider
                className="flex-1 "
                min={1}
                max={20}
                onChange={(val) => handleOnchange('moduleSpan', val)}
                value={moduleSpan}
              />
              <Button
                onClick={() => handleOnchange('moduleSpan', 10)}
                size="small"
                className="ml-2"
              >
                重置
              </Button>
            </div>
          </div>
          <div>
            <div>行高 {lineHeight}</div>
            <div className="flex items-center">
              <Slider
                className="flex-1 "
                min={1}
                max={3}
                step={0.1}
                onChange={(val) => handleOnchange('lineHeight', val)}
                value={lineHeight}
              />
              <Button
                onClick={() => handleOnchange('lineHeight', 1.5)}
                size="small"
                className="ml-2"
              >
                重置
              </Button>
            </div>
          </div>
          <div>
            <div>
              <div>页面水平边距 {pageMargin[0]}</div>
              <div className="flex items-center">
                <Slider
                  className="flex-1 "
                  min={10}
                  max={100}
                  onChange={(val) => handleOnchange('pageMargin', [val, pageMargin[1]])}
                  value={pageMargin[0]}
                />
                <Button
                  onClick={() => handleOnchange('pageMargin', [20, pageMargin[1]])}
                  size="small"
                  className="ml-2"
                >
                  重置
                </Button>
              </div>
            </div>
            <div>
              <div>页面垂直边距 {pageMargin[1]}</div>
              <div className="flex items-center">
                <Slider
                  className="flex-1 "
                  min={10}
                  max={100}
                  onChange={(val) => handleOnchange('pageMargin', [pageMargin[0], val])}
                  value={pageMargin[1]}
                />
                <Button
                  onClick={() => handleOnchange('pageMargin', [pageMargin[0], 20])}
                  size="small"
                  className="ml-2"
                >
                  重置
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <Button>
        <Space>
          布局设置
          <DownOutlined />
        </Space>
      </Button>
    </Popover>
  )
}
export default LayoutSettings
