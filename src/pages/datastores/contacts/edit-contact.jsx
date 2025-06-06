import ProSkeleton from '@ant-design/pro-skeleton';
import { Breadcrumb, Flex } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ContactFormSchema } from '@/schema';
import { useDataQuery } from '@/utils/hooks/useDataQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { App } from 'antd';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Forms from './forms';

const EditContact = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { id } = useParams();

  const endpoints =
    id && typeof id === 'string' && id.trim() !== ''
      ? `/api/v2/contacts/${id}`
      : '/api/v2/contacts';

  const { initialData, isLoading, isSubmitting, submit } = useDataQuery({
    queryKey: ['contacts'],
    getUrl: endpoints,
    method: 'PUT', // Use PUT for updating existing contact
    submitUrl: endpoints,
    onSuccess: () => {
      notification.success({
        message: 'Contact Updated',
        description: 'Contact has been successfully updated.',
        duration: 3,
      });
      navigate('/datastores/contacts');
    },
    onError: (err) => {
      notification.success({
        message: 'Contact Update Failed',
        description: err.message || 'Failed to update contact.',
        duration: 3,
      });
    },
  });

  const {
    // register,
    handleSubmit,
    // getValues,
    reset,
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

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        name: initialData.name,
        email: initialData.emails[0]?.value || '',
        phone: initialData.phones[0]?.value || '',
        npwp: initialData.npwp || '',
        address: initialData.addresses[0]?.address || '',
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const body = {
      ...data,
      emails: [{ value: data.email }],
      phones: [{ value: data.phone }],
      npwp: initialData.npwp || '',
      addresses: [{ address: data.address }],
      reason: 'Update contact information',
    };
    submit(body);
  };

  if (isLoading) {
    return <ProSkeleton type="descriptions" />;
  }

  return (
    <Flex gap={'large'} vertical>
      <Flex justify="space-between" align="center">
        <Breadcrumb
          separator=">"
          style={{
            cursor: 'pointer',
          }}
          items={[
            {
              title: 'Datastore',
              onClick: () => navigate('/datastores'),
            },
            {
              title: 'Contacts',
              onClick: () => navigate('/datastores/contacts'),
            },
            {
              title: 'Edit Contacts',
            },
          ]}
        />
      </Flex>

      <Forms
        title="Edit Contact"
        control={control}
        isLoading={isLoading}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </Flex>
  );
};

export default EditContact;
