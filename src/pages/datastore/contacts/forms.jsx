import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import { Flex } from 'antd';
import { Typography } from 'antd';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';

import proStyle from '@/styles/proComponentStyle';
import { Space } from 'antd';
import { Checkbox } from 'antd';

const { Title, Text } = Typography;

const Forms = ({
  title,
  control,
  isLoading,
  isSubmitting,
  handleSubmit,
  errors,
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <ProForm
        disabled={isLoading || isSubmitting}
        onFinish={handleSubmit}
        onReset={() => navigate(-1)}
        submitter={{
          searchConfig: {
            submitText: 'Save',
            resetText: 'Close',
          },
        }}
      >
        <Flex justify="space-between">
          <Title level={3}>{title}</Title>
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
            <div className="mb-16">
              <Space size={'small'}>
                <Controller
                  name="is_customer"
                  control={control}
                  render={(form) => (
                    <Checkbox {...form.field}>Customer</Checkbox>
                  )}
                />
                <Controller
                  name="is_supplier"
                  control={control}
                  render={(form) => (
                    <Checkbox {...form.field}>Supplier</Checkbox>
                  )}
                />
                <Controller
                  name="is_employee"
                  control={control}
                  render={(form) => (
                    <Checkbox {...form.field}>Employee</Checkbox>
                  )}
                />
                <Controller
                  name="is_salesman"
                  control={control}
                  render={(form) => (
                    <Checkbox {...form.field}>Salesman</Checkbox>
                  )}
                />
              </Space>
            </div>
          </Col>
        </Row>
      </ProForm>
    </Card>
  );
};

export default Forms;
