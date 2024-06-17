import { allAtom } from '@/store/global'
import { Button, message } from 'antd'
import { useAtom } from 'jotai'
import React, { useCallback, useRef } from 'react'

const ImportJsonButton: React.FC = () => {
  const [, dispatch] = useAtom(allAtom)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result
        try {
          const json = text as string
          dispatch({
            type: 'set',
            value: json,
            onError(error) {
              console.log(error)
              message.error('错误的json内容，请使用导出的json文件')
            }
          })
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }
      reader.readAsText(file)
    } else {
      console.error('Please select a JSON file.')
    }
  }, [])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button onClick={handleClick}>导入</Button>
    </div>
  )
}

export default ImportJsonButton
