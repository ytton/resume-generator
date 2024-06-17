import { useAtom } from 'jotai'
import { CommonModule } from '../CommonModule'
import { selfEvaluationAtom } from '@/store/global'

export default function Edit() {
  const [selfEvaluation, setSelfEvaluation] = useAtom(selfEvaluationAtom)
  const handleOnChange = (content: string) => {
    setSelfEvaluation(content)
  }
  return (
    <div>
      <CommonModule.Edit
        richTextClassName="mr-[-30px] pr-2"
        desc={selfEvaluation}
        onlyRichText
        onChange={(v) => handleOnChange(v as string)}
      />
    </div>
  )
}
