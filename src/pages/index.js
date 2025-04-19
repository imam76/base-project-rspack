import {
  AccountBookOutlined,
  DashboardOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Database } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Outlet } from 'react-router';

const { Header, Content, Sider } = Layout;


const App = () => {
  const menuItems = [
    {
      key: '1',
      icon: <LayoutDashboard size={16} />,
      label: 'Dashboard',
      path: "/dashboard"
    },
    {
      key: '2',
      icon: <Database size={16} />,
      label: 'Datastore',
      path: "/dashboard"
    },
    {
      key: '3',
      icon: <CreditCard size={16} />,
      label: 'Transactions',
      path: "/dashboard"
    },
    {
      key: '4',
      icon: <PieChartOutlined />,
      label: 'Reports',
      path: "/dashboard"
    },
    {
      key: '5',
      icon: <AccountBookOutlined />,
      label: 'Accounts',
      path: "/dashboard"
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#FFFFFF' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', paddingLeft: 24 }}>
          Accounting App
        </div>
        <Menu

          defaultSelectedKeys={['1']}
          mode="inline"
          items={menuItems}
        />
      </Sider>

      <Layout>
        {/* <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 24 }}>
          <Menu mode="horizontal">
            <Menu.SubMenu title="John Doe">
              <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header> */}

        <Content style={{ margin: '24px 16px', padding: 24, borderRadius: 4 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;