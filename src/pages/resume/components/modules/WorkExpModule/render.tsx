import { workExpAtom } from '@/store/global'
import { useAtom } from 'jotai'
import { CommonModule } from '../CommonModule'

export default function Render() {
  const [workExp] = useAtom(workExpAtom)
  return (
    <div>
      {workExp.map((workExpItem) => (
        <CommonModule.Render
          className="work-exp-item"
          title={workExpItem.company}
          subTitle={workExpItem.position}
          dateRange={workExpItem.dateRange}
          desc={workExpItem.content}
          richTextClassName="min-h-[1em] border-none"
        />
      ))}
    </div>
  )
}
