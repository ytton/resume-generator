import { PlusOutlined } from '@ant-design/icons'
import { GetProp, message, Upload, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import styles from './index.module.less'
import { avatarAtom } from '@/store/global'
import { useAtom } from 'jotai'
import classNames from 'classnames'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export default function Avatar({ className }: { className?: string }) {
  const [avatar, setAvatar] = useAtom(avatarAtom)
  
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    isJpgOrPng &&
      isLt2M &&
      getBase64(file, (url) => {
        setAvatar(url)
      })
    return false
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <ImgCrop rotationSlider aspect={3 / 4}>
      <Upload
        className={classNames(styles.avatar, className, {
          [styles.hasImg]: avatar
        })}
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
  )
}
