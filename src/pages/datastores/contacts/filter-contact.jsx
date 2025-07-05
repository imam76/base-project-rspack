import SelectWithReactQuery from '@/components/SelectWithReactQuery';
import { fetchSelect } from '@/utils/services/fetchSelect';
import { ProForm } from '@ant-design/pro-components';
import { Col, Modal, Row, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const { Title } = Typography;

export default function FilterContact() {
  const navigate = useNavigate();

  const {
    // register,
    handleSubmit,
    // getValues,
    control,
    formState: { isSubmitting, isLoading },
  } = useForm({
    defaultValues: {
      classification: null,
      currency: null,
    },
  });

  const handleClose = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  const onSubmit = (data) => {
    // Proses data filter di sini
    const filterParams = {
      'classification[id]': data.classification.value,
      'currency[id]': data.currency.value,
    };
    const queryParams = new URLSearchParams(filterParams).toString();
    navigate(`/datastores/contacts/list?${queryParams}`, { replace: true });
  };

  return (
    <Modal open={true} onCancel={handleClose} footer={null}>
      <Title level={3}>{'Filter'}</Title>

      <ProForm
        disabled={isLoading || isSubmitting}
        onFinish={handleSubmit(onSubmit)}
        onReset={() => navigate(-1)}
        submitter={{
          submitButtonProps: {
            disabled: isLoading || isSubmitting,
            loading: isLoading || isSubmitting,
          },
          searchConfig: {
            submitText: 'Save',
            resetText: 'Close',
          },
        }}
      >
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24}>
            <Controller
              name="classification"
              control={control}
              render={(form) => (
                <div>
                  <SelectWithReactQuery
                    {...form.field}
                    url="/api/v2/contact_classifications"
                    queryKey={['contacts', '']}
                    placeholder="Select classification"
                    customFetcher={fetchSelect}
                    labelKey="name"
                    valueKey="id"
                  />
                </div>
              )}
            />
          </Col>
          <Col xs={24}>
            <Controller
              name="currency"
              control={control}
              render={(form) => (
                <div>
                  <SelectWithReactQuery
                    {...form.field}
                    url="/api/v2/currencies"
                    queryKey={['currency', '']}
                    placeholder="Select currency"
                    customFetcher={fetchSelect}
                    labelKey="symbol"
                    valueKey="id"
                  />
                </div>
              )}
            />
          </Col>
        </Row>
      </ProForm>
    </Modal>
  );
}
