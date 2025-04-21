import { AccountBookOutlined, PieChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { CreditCard, Database, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router';

const { Content, Sider } = Layout;

const App = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard size={16} />,
      label: 'Dashboard',
    },
    {
      key: '/datastore',
      icon: <Database size={16} />,
      label: 'Datastore',
    },
    {
      key: '/trasactions',
      icon: <CreditCard size={16} />,
      label: 'Transactions',
    },
    {
      key: '/reports',
      icon: <PieChartOutlined />,
      label: 'Reports',
    },
    {
      key: '/accounts',
      icon: <AccountBookOutlined />,
      label: 'Accounts',
    },
  ];

  const handleClick = ({ key }) => {
    navigate(key);
  };

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: '#FFFFFF',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 24,
          }}
        >
          {!collapsed && 'Accounting App'}
        </div>
        <Menu
          onClick={handleClick}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menuItems}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 0 : 200 }}>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            borderRadius: 4,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
