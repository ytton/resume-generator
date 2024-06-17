import { BaseInfoModule } from './components/modules/BaseInfoModule'
import { EduInfoModule } from './components/modules/EduInfoModule'
import { SkillsModule } from './components/modules/SkillsModule'
import { WorkExpModule } from './components/modules/WorkExpModule'
import { ProjectListModule } from './components/modules/ProjectListModule'
import { SelfEvaluationModule } from './components/modules/SelfEvaluationModule'

type ModuleMap = {
  [key: string]: {
    Edit: () => JSX.Element
    Render: () => JSX.Element
  }
}

export const ModuleMap: ModuleMap = {
  baseInfo: BaseInfoModule,
  skills: SkillsModule,
  workExperiences: WorkExpModule,
  projectList: ProjectListModule,
  selfEvaluation: SelfEvaluationModule,
  eduInfo: EduInfoModule
}

export const baseInfoFields = {
  name: {
    name: 'name',
    title: '姓名',
    value: '袁通'
  },
  gender: {
    name: 'gender',
    title: '性别',
    value: '男'
  },
  birthday: {
    name: 'birthday',
    title: '出生年月',
    value: '98-01-01'
  },
  tel: {
    name: 'tel',
    title: '联系电话',
    value: '13060066542'
  },
  email: {
    name: 'email',
    title: '联系邮箱',
    value: '1105002007@qq.com'
  },
  workYears: {
    name: 'workYears',
    title: '工作年限',
    value: '3'
  },
  target: {
    name: 'target',
    title: '求职意向',
    value: 'web前端'
  },
  city: {
    name: 'city',
    title: '意向城市',
    value: '成都'
  },
  salary: {
    name: 'salary',
    title: '期望薪资',
    value: '15k'
  },
  curStatus: {
    name: 'curStatus',
    title: '当前状态',
    value: ''
  }
}
