import { DevTools } from 'jotai-devtools'
import 'jotai-devtools/styles.css'
import 'quill/dist/quill.core.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import { ConfigProvider } from 'antd'

import zhCN from 'antd/locale/zh_CN'
// for date-picker i18n
import 'dayjs/locale/zh-cn'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      {import.meta.env.DEV && <DevTools />}
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
