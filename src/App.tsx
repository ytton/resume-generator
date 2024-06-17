import Home from '@/pages/home'
import Resume from '@/pages/resume'
import { useState } from 'react'
import './App.less'

export default function App() {
  const [currentPage] = useState('resume')

  const pages = [
    {
      key: 'home',
      label: '首页',
      Component: <Home />
    },
    {
      key: 'resume',
      label: '设置简历',
      Component: <Resume />
    }
  ]
  return pages.find((x) => x.key === currentPage)?.Component
}
