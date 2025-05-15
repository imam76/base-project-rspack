import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Breadcrumb, Card, Checkbox, Col, Flex, Row, Space, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { ContactFormSchema } from '@/schema';
import proStyle from '@/styles/proComponentStyle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple', className: 'label-1' },
  { label: 'Pear', value: 'Pear', className: 'label-2' },
  { label: 'Orange', value: 'Orange', className: 'label-3', disabled: false },
];

const CreateContact = () => {
  const navigate = useNavigate();
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

  const onChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };

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
          onReset={() => navigate(-1)}
          submitter={{
            searchConfig: {
              submitText: 'save',
              resetText: 'close',
            },
          }}
        >
          <Flex justify="space-between">
            <Title level={3}>Create Contacts</Title>
          </Flex>
          <Row gutter={[16]}>
            <Col xs={24} md={24} lg={6}>
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
                        <Text style={{ fontSize: 12 }} type="danger">
                          {errors?.name?.message}
                        </Text>
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
            <Col xs={24} md={24} lg={6}>
              <Controller
                name="email"
                control={control}
                render={(form) => (
                  <div>
                    <ProFormText
                      {...form.field}
                      label="Email"
                      placeholder={''}
                      validateStatus={errors.email && 'error'}
                      extra={
                        <Text style={{ fontSize: 12 }} type="danger">
                          {errors?.email?.message}
                        </Text>
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
            <Col xs={24} md={24} lg={6}>
              <Controller
                name="phone"
                control={control}
                render={(form) => (
                  <div>
                    <ProFormText
                      {...form.field}
                      label="Phone"
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
            <Col xs={24} md={24} lg={18}>
              <Controller
                name="address"
                control={control}
                render={(form) => (
                  <div>
                    <ProFormTextArea
                      {...form.field}
                      label="Address"
                      placeholder={''}
                      validateStatus={errors.address && 'error'}
                      extra={
                        <Text style={{ fontSize: 12 }} type="danger">
                          {errors?.address?.message}
                        </Text>
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
            <Col xs={24} md={24} lg={12}>
              <div className='mb-16'>
                <Space size={'small'}>
                  <Controller
                    name='is_customer'
                    control={control}
                    render={(form) => (
                      <Checkbox
                        {...form.field}
                      >
                        Customer
                      </Checkbox>
                    )}
                  />
                  <Controller
                    name='is_supplier'
                    control={control}
                    render={(form) => (
                      <Checkbox
                        {...form.field}
                      >
                        Supplier
                      </Checkbox>
                    )}
                  />
                  <Controller
                    name='is_employee'
                    control={control}
                    render={(form) => (
                      <Checkbox
                        {...form.field}
                      >
                        Employee
                      </Checkbox>
                    )}
                  />
                  <Controller
                    name='is_salesman'
                    control={control}
                    render={(form) => (
                      <Checkbox
                        {...form.field}
                      >
                        Salesman
                      </Checkbox>
                    )}
                  />
                </Space>
              </div>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </Flex>
  );
};

export default CreateContact;
