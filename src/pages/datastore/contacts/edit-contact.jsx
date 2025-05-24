import { Breadcrumb, Flex } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ContactFormSchema } from '@/schema';
import { useDataQuery } from '@/utils/hooks/useDataQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Forms from './forms';

const CreateContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const endpoints =
    id && typeof id === 'string' && id.trim() !== ''
      ? `/api/v2/contacts/${id}`
      : '/api/v2/contacts';

  console.log('URL PARAMS =>', id);

  const { initialData, isLoading, isSubmitting, isSuccess, submit } =
    useDataQuery({
      queryKey: ['contacts'],
      getUrl: endpoints,
      method: 'PUT', // Use PUT for updating existing contact
      submitUrl: endpoints,
      onSuccess: () => {
        alert('User berhasil edit!');
      },
      onError: (err) => {
        console.error('Gagal submit:', err);
      },
      // filters: {
      //   per_page: 10,
      //   page: 1,
      //   includes: ["emails", "phones", "other_fields", "addresses", "contact_persons", "restricted_departments", "restricted_contacts", "bank_accounts"],
      // },
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
        name: initialData.name,
        email: initialData.emails[0]?.value || '',
        phone: initialData.phones[0]?.value || '',
        npwp: initialData.npwp || '',
        address: initialData.addresses[0]?.address || '',
      });
    }
  }, [initialData, reset]);

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

export default CreateContact;
