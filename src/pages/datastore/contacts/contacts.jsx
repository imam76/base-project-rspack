import { useDataQuery } from '@/utils/hooks/useDataQuery';
import { useDebouncedSearchParams } from '@/utils/hooks/useDebouncedSearchParams';
import navigateToChildRoute from '@/utils/navigateToChild';
import renderTags from '@/utils/renderTags';
import {
  Breadcrumb,
  Button,
  Card,
  Flex,
  Input,
  Space,
  Table,
  Typography,
} from 'antd';
import { createStyles } from 'antd-style';
import { ListFilterIcon, LucideDownload, MoreVertical } from 'lucide-react';

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    width: 100,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    key: 'is_active',
    width: 200,
    justify: 'center',
    render: (_, is_active) => renderTags(_, is_active),
  },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    align: 'right',
    width: 50,
    render: () => (
      <Button
        variant="text"
        type="text"
        shape="circle"
        icon={<MoreVertical size={12} />}
        size={'middle'}
      />
    ),
  },
];

const { Title } = Typography;
const { Search } = Input;

const Contacts = () => {
  const { styles } = useStyle();
  const navigateToChild = navigateToChildRoute();
  const updateParam = useDebouncedSearchParams(800); // bisa ganti delay
  const endpoints = '/api/v2/contacts';

  const { initialData, isLoading } = useDataQuery({
    queryKey: ['contacts'],
    getUrl: endpoints,
    filters: {
      per_page: 10,
      page: 1,
    },
  });

  const handleSearch = (e) => {
    updateParam('search', e.target.value);
  };

  console.log('INIII PROPS CONTACT =>', isLoading, initialData);

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
        <Search
          size="large"
          placeholder="Search"
          color="primary"
          onChange={handleSearch}
          style={{
            width: 300,
          }}
          enterButton
        />
      </Flex>
      <Card>
        <Space size={'small'} direction="vertical" style={{ display: 'flex' }}>
          <Flex justify="space-between">
            <Space size={'small'}>
              <Title level={2}>Contacts</Title>
              <Title level={3} type="secondary" strong>
                {initialData?.count}
              </Title>
            </Space>
            <Space size={'small'}>
              <Button
                variant="outlined"
                color="primary"
                shape="default"
                icon={<ListFilterIcon size={12} />}
                size={'middle'}
              />
              <Button variant="outlined" color="primary">
                <LucideDownload size={16} />
                Export to CSV
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={() => navigateToChild({ childrenPath: 'create' })}
              >
                Create
              </Button>
            </Space>
          </Flex>
          <Table
            className={`${styles.customTable} striped-table`}
            dataSource={initialData?.results ?? []}
            rowKey={'id'}
            columns={columns}
            scroll={{ y: 110 * 5 }}
            pagination={{
              pageSize: 50,
              position: ['bottomLeft'],
            }}
          />
        </Space>
      </Card>
    </Flex>
  );
};

export default Contacts;
