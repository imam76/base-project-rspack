import { useAuth } from '@/context/AuthContext';
import { LoginFormSchema } from '@/schema';
import {
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from 'antd';
import { App, Card, Space } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const { Text } = Typography;

export default () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        notification.success({
          message: 'Login Successful',
          description: 'Welcome back! Redirecting to dashboard.',
          duration: 3,
        });

        // Navigate to the page they were trying to access or dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login submission error:', error);
    }
  };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card>
        <LoginForm
          title="Accounting Manager"
          subTitle="Sign in to your account"
          onFinish={handleSubmit(onSubmit)}
          submitter={{
            submitButtonProps: {
              disabled: isSubmitting,
              loading: isSubmitting,
            },
            searchConfig: {
              submitText: 'Sign In',
            },
          }}
          actions={
            <Space>
              Or sign in with
              <GoogleOutlined style={iconStyles} />
              <GithubOutlined style={iconStyles} />
              <FacebookOutlined style={iconStyles} />
            </Space>
          }
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <ProFormText
                {...field}
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'Email'}
                validateStatus={errors.email && 'error'}
                extra={
                  errors?.email?.message && (
                    <Text style={{ fontSize: 12 }} type="danger">
                      {errors?.email?.message}
                    </Text>
                  )
                }
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <ProFormText.Password
                {...field}
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'Password'}
                validateStatus={errors.password && 'error'}
                extra={
                  errors?.password?.message && (
                    <Text style={{ fontSize: 12 }} type="danger">
                      {errors?.password?.message}
                    </Text>
                  )
                }
              />
            )}
          />
        </LoginForm>
      </Card>
    </div>
  );
};
