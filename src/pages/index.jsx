import { AccountBookOutlined, PieChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { BrainIcon } from 'lucide-react';
import {
  ChevronLeft,
  CreditCard,
  Database,
  LayoutDashboard,
} from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

const { Content, Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard size={16} />,
      label: 'Dashboard',
    },
    {
      key: '/datastores',
      icon: <Database size={16} />,
      label: 'Datastores',
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
    {
      key: '/ai',
      icon: <BrainIcon size={16} />,
      label: 'Grooming Ai',
    },
  ];

  const handleClick = ({ key }) => {
    navigate(key);
  };

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth={0}
        zeroWidthTriggerStyle={{
          top: 16,
          left: collapsed ? 0 : 200,
          zIndex: 1000,
          width: 30,
          height: 20,
        }}
        trigger={<LayoutSiderTrigger />}
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
            padding: '0px 24px',
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

const LayoutSiderTrigger = () => {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <ChevronLeft size={12} />
    </div>
  );
};

export default AppLayout;
