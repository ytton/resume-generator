import { DevTools } from 'jotai-devtools'
import 'jotai-devtools/styles.css'
import 'quill/dist/quill.core.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      {import.meta.env.DEV && <DevTools />}
      <App />
    </>
  </React.StrictMode>
)
