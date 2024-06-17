import { skillsAtom } from '@/store/global'
import { useAtom } from 'jotai'
import { DescItem } from '../BaseInfoModule/DescItem'

export default function Render() {
  const [skills] = useAtom(skillsAtom)
  return (
    <div>
      {skills.map((skill) => (
        <DescItem prefix="skills" value={skill} key={skill} />
      ))}
    </div>
  )
}
