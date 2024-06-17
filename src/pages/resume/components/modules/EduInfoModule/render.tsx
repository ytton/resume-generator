import { useAtom } from 'jotai'
import { CommonModule } from '../CommonModule'
import { eduInfoAtom } from '@/store/global'

export default function Render() {
  const [eduInfo] = useAtom(eduInfoAtom)
  return (
    <div>
      {eduInfo.map((item) => (
        <CommonModule.Render
          className="edu-info-item"
          title={item.school}
          subTitle={item.major}
          dateRange={item.dateRange}
          desc={item.content}
          richTextClassName="min-h-[1em] border-none"
        />
      ))}
    </div>
  )
}
