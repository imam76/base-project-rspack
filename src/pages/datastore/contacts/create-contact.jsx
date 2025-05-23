import { Breadcrumb, Flex } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ContactFormSchema } from '@/schema';
import { useDataQuery } from '@/utils/hooks/useDataQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import Forms from './forms';

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

  const endpoints = '/api/v2/contacts';

  const { isSubmitting, isSuccess, submit } = useDataQuery({
    queryKey: ['contacts'],
    getUrl: endpoints,
    method: 'POST',
    submitUrl: endpoints,
    onSuccess: () => {
      alert('User berhasil ditambahkan!');
    },
    onError: (err) => {
      console.error('Gagal submit:', err);
    },
    filters: {
      per_page: 10,
      page: 1,
      includes: [
        'emails',
        'phones',
        'other_fields',
        'addresses',
        'contact_persons',
        'restricted_departments',
        'restricted_contacts',
        'bank_accounts',
      ],
    },
  });

  const onSubmit = (data) => {
    console.log('ISI DATAAAAAAAAA =>', data);
    submit(data);
  };

  console.log('INII CREATE =>', errors, isSubmitting, isSuccess);

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
              onClick: () => navigate('/datastore'),
            },
            {
              title: 'Contacts',
              onClick: () => navigate('/datastore/contacts'),
            },
            {
              title: 'Add Contacts',
            },
          ]}
        />
      </Flex>

      <Forms
        title="Create Contact"
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </Flex>
  );
};

export default CreateContact;
