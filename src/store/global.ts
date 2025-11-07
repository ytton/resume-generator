import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type BaseInfoItem = {
  name: string
  title: string
  value: string
}

export type ModuleItem = {
  name: string
  title: string
  status: boolean
  [key: string]: any
}
export const moduleListAtom = atomWithStorage<ModuleItem[]>('moduleListAtom', [
  {
    name: 'baseInfo',
    title: '基本信息',
    height: 0,
    status: true
  },
  {
    name: 'eduInfo',
    title: '教育情况',
    height: 0,
    status: true
  },
  {
    name: 'skills',
    title: '专业技能',
    height: 0,
    status: true
  },
  {
    name: 'workExperiences',
    title: '工作经历',
    height: 0,
    status: true
  },
  {
    name: 'projectList',
    title: '项目经验',
    height: 0,
    status: true
  },
  {
    name: 'selfEvaluation',
    title: '个人总结',
    height: 200,
    status: true
  }
])
export type BaseInfo = {
  avatarVisible: boolean
  labelVisible: boolean
  fields: BaseInfoItem[]
}
export const baseInfoAtom = atomWithStorage<BaseInfo>('baseInfoAtom', {
  avatarVisible: true,
  labelVisible: true,
  fields: [
    {
      name: 'name',
      title: '姓名',
      value: '王二狗'
    },
    {
      name: 'gender',
      title: '性别',
      value: '男'
    },
    {
      name: 'birthday',
      title: '出生年月',
      value: '98-01-01'
    },
    {
      name: 'tel',
      title: '联系电话',
      value: '13060066618'
    },
    {
      name: 'email',
      title: '联系邮箱',
      value: 'ytton@x.com'
    },
    {
      name: 'workYears',
      title: '工作年限',
      value: '4年'
    },
    {
      name: 'target',
      title: '求职意向',
      value: 'web前端'
    },
    {
      name: 'city',
      title: '意向城市',
      value: '成都'
    },
    {
      name: 'salary',
      title: '期望薪资',
      value: '17k'
    },
    {
      name: 'curStatus',
      title: '当前状态',
      value: '在职，正在找工作'
    }
  ]
})
export const avatarAtom = atomWithStorage('avatarAtom', '')
export const skillsAtom = atomWithStorage<string[]>('skillsAtom', [
  '精通windows操作系统的开机和关机'
])
export type WorkExpItem = {
  company: string
  position: string
  dateRange: [startDate: string, endDate: string | 'now']
  content: string
}
export const workExpAtom = atomWithStorage<WorkExpItem[]>('workExpAtom', [
  {
    company: '朝阳永续',
    position: 'web前端',
    dateRange: ['2020-03-11', '2021-03-11'],
    content:
      '<ul><li>主要负责描述，例如：带领X人团队进行市场营销和产品策划。</li><li>1-3行主要负责描述，不要太多。测试问题字</li></ul>'
  }
])

export type eduInfoItem = {
  school: string
  major: string
  dateRange: [startDate: string, endDate: string | 'now']
  content: string
}
export const eduInfoAtom = atomWithStorage<eduInfoItem[]>('eduInfoAtom', [
  {
    school: '成都信息工程大学',
    major: '空间信息与数字技术',
    dateRange: ['2016-09', '2020-06'],
    content: ''
  }
])

export type ProjItem = {
  projName: string
  role: string
  dateRange: [startDate: string, endDate: string | 'now']
  content: string
}
export const projListAtom = atomWithStorage<ProjItem[]>('projListAtom', [
  {
    projName: '简历生成器（开源）',
    role: '前端开发',
    dateRange: ['2024-05', '2024-06'],
    content:
      '<p>一个纯前端的简历生成工具，具备以下特性</p><ul><li>实时预览，所见即所得的导出效果；</li><li>纯前端，初衷是不收集使用者信息；</li><li>后续简历维护，支持json导出和json导入；</li><li>未来支持在线分享简历URL、简历翻译、模板选择功能、自定义模板等功能</li></ul><p>使用的技术方案：</p><ul><li>react</li><li>jotai</li><li>typescript</li></ul>'
  }
])

export type ThemeColors = {
  mainColor: string
}

export const themeColorsAtom = atomWithStorage<ThemeColors>('themeColorsAtom', {
  mainColor: '#6767aa'
})

export type LayoutSettings = {
  moduleSpan: number
  lineHeight: number
  pageMargin: [number, number]
}

export const layoutSettingsAtom = atomWithStorage<LayoutSettings>('layoutSettingsAtom', {
  moduleSpan: 10,
  lineHeight: 1.5,
  pageMargin: [40, 50]
})

export const selfEvaluationAtom = atomWithStorage<string>(
  'selfEvaluationAtom',
  '<ul><li>描述自己的性格或工作以外的特长</li></ul>'
)

export const customModuleListAtom = atomWithStorage('customModuleListAtom', [])
export const customFieldListAtom = atomWithStorage<BaseInfoItem[]>('customFieldListAtom', [])

type Actions =
  | { type: 'get'; callback: (value: Record<string, unknown>) => void }
  | { type: 'set'; value: string; onError: (error: Error) => void }
export const allAtom = atom(null, (get, set, action: Actions) => {
  if (action.type === 'get') {
    const moduleList = get(moduleListAtom)
    const avatar = get(avatarAtom)
    const baseInfo = get(baseInfoAtom)
    const skills = get(skillsAtom)
    const workExp = get(workExpAtom)
    const eduInfo = get(eduInfoAtom)
    const projList = get(projListAtom)
    const selfEvaluation = get(selfEvaluationAtom)
    const layoutSettings = get(layoutSettingsAtom)
    const obj = {
      moduleList,
      baseInfo,
      skills,
      workExp,
      eduInfo,
      projList,
      selfEvaluation,
      layoutSettings,
      avatar
    }
    action.callback(obj)
  } else if (action.type === 'set') {
    try {
      const obj = JSON.parse(action.value)
      obj.moduleList && set(moduleListAtom, obj.moduleList)
      obj.avatar && set(avatarAtom, obj.avatar)
      obj.baseInfo && set(baseInfoAtom, obj.baseInfo)
      obj.skills && set(skillsAtom, obj.skills)
      obj.workExp && set(workExpAtom, obj.workExp)
      obj.eduInfo && set(eduInfoAtom, obj.eduInfo)
      obj.projList && set(projListAtom, obj.projList)
      obj.selfEvaluation && set(selfEvaluationAtom, obj.selfEvaluation)
      obj.layoutSettings && set(layoutSettingsAtom, obj.layoutSettings)
    } catch (error) {
      action.onError(error as Error)
    }
  }
})
