import { AccountBookOutlined, PieChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { CreditCard, Database, LayoutDashboard } from 'lucide-react';
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#FFFFFF' }}>
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 24,
          }}
        >
          Accounting App
        </div>
        <Menu
          onClick={handleClick}
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
