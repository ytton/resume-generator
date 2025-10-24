import { atom } from 'jotai'

export type TemplateType =
  | 'default'
  | 'modern-clean'
  | 'classic-business'
  | 'creative-design'
  | 'tech-professional'
  | 'custom'

export const templateAtom = atom<TemplateType>('default')
