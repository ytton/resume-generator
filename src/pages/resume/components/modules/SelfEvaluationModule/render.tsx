import { useAtom } from 'jotai'
import { CommonModule } from '../CommonModule'
import { selfEvaluationAtom } from '@/store/global'

export default function Render() {
  const [selfEvaluation] = useAtom(selfEvaluationAtom)
  return (
    <div>
      <CommonModule.Render
        className="self-evaluation"
        onlyRichText
        desc={selfEvaluation}
        richTextClassName="min-h-[1em] border-none"
      />
    </div>
  )
}
