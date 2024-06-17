import { kebabCase } from 'lodash-es'

type DescItemProps = {
  prefix: string
  name?: string
  title?: string
  value?: string
}
export const DescItem = ({ prefix, title, name = '', value }: DescItemProps) => {
  return (
    <div className={`${prefix}__${kebabCase(name)} desc-item`}>
      <span className="label">{title}</span>
      <span>{value}</span>
    </div>
  )
}
