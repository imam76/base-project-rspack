import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Breadcrumb, Card, Col, Flex, Row, Space, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { ContactFormSchema } from '@/schema';
import proStyle from '@/styles/proComponentStyle';
import { zodResolver } from '@hookform/resolvers/zod';

const { Title, Text } = Typography;
const CreateContact = () => {
  const {
    // register,
    handleSubmit,
    // getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      npwp: '',
      address: '',
    },
  });

  const onSubmit = (data) => console.log(data);
  console.log('INII ERROR =>', errors);

  return (
    <Flex gap={'large'} vertical>
      <Flex justify="space-between" align="center">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home',
            },
            {
              title: 'Application Center',
              href: '',
            },
            {
              title: 'Application List',
              href: '',
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </Flex>
      <Card>
        <ProForm
          onFinish={handleSubmit(onSubmit)}
          submitter={{
            searchConfig: {
              submitText: 'save',
              resetText: 'close',
            },
          }}
        >
          <Space
            size={'small'}
            direction="vertical"
            style={{ display: 'flex' }}
          >
            <Flex justify="space-between">
              <Space size={'small'}>
                <Title level={3}>Create Contacts</Title>
              </Space>
            </Flex>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Controller
                  name="name"
                  control={control}
                  render={(form) => (
                    <div>
                      <ProFormText
                        {...form.field}
                        label="Name"
                        placeholder={''}
                        validateStatus={errors.name && 'error'}
                        extra={
                          <Text type="danger">{errors?.name?.message}</Text>
                        }
                        labelCol={{
                          style: {
                            //ant-form-item-label padding
                            paddingBottom:
                              proStyle.ProFormText.labelCol.style.padding,
                          },
                        }}
                      />
                    </div>
                  )}
                />
              </Col>
              <Col span={6}>
                <Controller
                  name="email"
                  control={control}
                  render={(form) => (
                    <div>
                      <ProFormText
                        {...form.field}
                        label="Email"
                        placeholder={''}
                        labelCol={{
                          style: {
                            //ant-form-item-label padding
                            paddingBottom:
                              proStyle.ProFormText.labelCol.style.padding,
                          },
                        }}
                      />
                    </div>
                  )}
                />
              </Col>
              <Col span={6} style={{ background: 'red' }}>
                col
              </Col>
            </Row>
          </Space>
        </ProForm>
      </Card>
    </Flex>
  );
};

export default CreateContact;
