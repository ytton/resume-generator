import { skillsAtom } from '@/store/global'
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useAtom } from 'jotai'
export default function Edit() {
  const [skills, setSkills] = useAtom(skillsAtom)
  const handleInputChange = (val: string, ind: number) => {
    const newValue = [...skills]
    newValue[ind] = val
    setSkills(newValue)
  }
  return (
    <div className="flex flex-col gap-3">
      {skills.map((skill, ind) => (
        <div className="flex items-center" key={'skill' + ind}>
          <Input
            className="mr-3"
            value={skill}
            onChange={(e) => handleInputChange(e.target.value, ind)}
          />
          <Button
            icon={<DeleteFilled />}
            onClick={() => {
              const newValue = [...skills]
              newValue.splice(ind, 1)
              setSkills(newValue)
            }}
          />
        </div>
      ))}
      <div>
        <Button icon={<PlusCircleFilled />} onClick={() => setSkills([...skills, ''])}>
          添加
        </Button>
      </div>
    </div>
  )
}
