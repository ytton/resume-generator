import { useState } from 'react'
import Home from '@/pages/home'
import Resume from '@/pages/resume'
import { Layout, Menu, theme } from 'antd'
import {} from 'antd/es/layout/layout'
const { Header, Content, Footer } = Layout
import './App.less'
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  // const pageMap = {
  //   home:,
  //   resume: <Resume />
  // }
  const {
    token: { colorBgContainer }
  } = theme.useToken()
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
  return (
    // <div>
    //   <nav>
    //     <div className="item" onClick={() => setCurrentPage('home')}>
    //       首页
    //     </div>
    //     <div className="item" onClick={() => setCurrentPage('resume')}>
    //       制作简历
    //     </div>
    //   </nav>
    //   <div className="content">{pageMap[currentPage]}</div>
    // </div>
    <Layout className="main">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={pages}
          onClick={({ key }) => setCurrentPage(key)}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '20px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            height: '100%',
            padding: 24
          }}
        >
          {pages.find((x) => x.key === currentPage)?.Component}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}
