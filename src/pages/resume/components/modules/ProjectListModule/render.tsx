import { useAtom } from 'jotai'
import { CommonModule } from '../CommonModule'
import { projListAtom } from '@/store/global'

export default function Render() {
  const [projList] = useAtom(projListAtom)
  return (
    <div>
      {projList.map((item) => (
        <CommonModule.Render
          className="proj-item"
          title={item.projName}
          subTitle={item.role}
          dateRange={item.dateRange}
          desc={item.content}
          richTextClassName="min-h-[1em] border-none"
        />
      ))}
    </div>
  )
}
