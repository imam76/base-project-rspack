import { useAuthStore } from '@/stores';
import { useDataQuery } from '@/utils/hooks/useDataQuery';
import {
  AccountBookOutlined,
  CheckOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
  message,
} from 'antd';
import { BrainIcon } from 'lucide-react';
import {
  ChevronLeft,
  CreditCard,
  Database,
  LayoutDashboard,
} from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, logout, getCurrentWorkspace, switchWorkspace } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const currentWorkspace = getCurrentWorkspace();

  // Fetch available workspaces
  const { initialData: workspacesData, refetch: refetchWorkspaces } =
    useDataQuery({
      queryKey: ['workspaces'],
      getUrl: '/api/v1/workspaces',
    });

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
      key: '/workspaces',
      icon: <SwapOutlined />,
      label: 'Workspaces',
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

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const handleSwitchWorkspace = (workspace) => {
    switchWorkspace(workspace);
    message.success(`Switched to workspace: ${workspace.name}`);
    refetchWorkspaces(); // Refresh workspace data
  };

  // Get available workspaces and sort them
  const availableWorkspaces = (() => {
    const allWorkspaces = [];

    if (workspacesData?.results && Array.isArray(workspacesData.results)) {
      allWorkspaces.push(...workspacesData.results);
    }

    // Sort workspaces: current workspace first, then others
    return allWorkspaces.sort((a, b) => {
      const aIsCurrent = currentWorkspace?.id === a.id;
      const bIsCurrent = currentWorkspace?.id === b.id;

      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;

      return (a.name || '').localeCompare(b.name || '');
    });
  })();

  // Create workspace dropdown menu items
  const workspaceMenuItems = [
    ...availableWorkspaces.map((workspace) => {
      const isCurrentWorkspace = currentWorkspace?.id === workspace.id;
      return {
        key: `workspace-${workspace.id}`,
        label: (
          <Space>
            {workspace.name || `Workspace ${workspace.id}`}
            {isCurrentWorkspace && (
              <CheckOutlined style={{ color: '#52c41a' }} />
            )}
          </Space>
        ),
        onClick: () => {
          if (!isCurrentWorkspace) {
            handleSwitchWorkspace(workspace);
          }
        },
        disabled: isCurrentWorkspace,
      };
    }),
    {
      type: 'divider',
    },
    {
      key: 'manage-workspaces',
      label: 'Manage Workspaces',
      icon: <SwapOutlined />,
      onClick: () => navigate('/workspaces'),
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

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
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Space size="large">
            {/* Workspace Selector */}
            <Space>
              <Typography.Text type="secondary">Workspace:</Typography.Text>
              <Dropdown
                menu={{ items: workspaceMenuItems }}
                placement="bottomLeft"
                trigger={['click']}
              >
                <Button type="text" style={{ fontWeight: 500 }}>
                  <Space>
                    {currentWorkspace?.name || 'Select Workspace'}
                    <SwapOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Space>

            {/* User Menu */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <Text>
                  {user?.first_name && user?.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user?.username || user?.email || 'User'}
                </Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
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
