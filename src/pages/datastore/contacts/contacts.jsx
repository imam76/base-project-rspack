import ProSkeleton from '@ant-design/pro-skeleton';
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
import {
  ListFilterIcon,
  LucideDownload,
  MoreVertical,
  RefreshCcw,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

import ContextMenuOption from '@/blocs/ContextMenuOption';
import { useDataQuery } from '@/utils/hooks/useDataQuery';
import { useDebouncedSearchParams } from '@/utils/hooks/useDebouncedSearchParams';

// styles variables
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

//default variables
const DEFAULT_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTERS = {
  per_page: DEFAULT_PER_PAGE,
  page: DEFAULT_PAGE,
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
};

// setting table columns
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
    render: (column) => column?.emails?.[0]?.value ?? '-',
  },
  // {
  //   title: 'Status',
  //   dataIndex: 'is_active',
  //   key: 'is_active',
  //   width: 200,
  //   justify: 'center',
  //   render: (_, record) => {
  //     const status = record.is_active ? 'active' : 'inactive';
  //     return renderTags(_, { tags: [status] });
  //   },
  // },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    align: 'right',
    width: 50,
    render: (_, record) => (
      <ContextMenuOption
        editPath={`/edit/${record.id}`}
        detailPath={`/detail/${record.id}`}
        deletePath={`/delete/${record.id}`}
      >
        <Button
          variant="text"
          type="text"
          shape="circle"
          icon={<MoreVertical size={12} />}
          size={'middle'}
        />
      </ContextMenuOption>
    ),
  },
];

const { Title, Text } = Typography;
const { Search } = Input;

const TitleTableRender = ({ selectedLength }) => {
  if (selectedLength === 0) {
    return null;
  }
  return (
    <Space size={'small'}>
      <Text color="primary">Total Selected Items</Text>
      <Text color="primary">{selectedLength}</Text>
    </Space>
  );
};

// main  component
const Contacts = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchParam, updateParam } = useDebouncedSearchParams(800); // bisa ganti delay
  const [selectedRow, setSelectedRow] = useState([]);
  const endpoints = '/api/v2/contacts';

  const { initialData, isLoading, refetch, setFilters } = useDataQuery({
    queryKey: ['contacts'],
    getUrl: endpoints,
    filters: DEFAULT_FILTERS,
  });

  // Update filters when changes
  useEffect(() => {
    const getAllParams = Object.fromEntries(searchParam.entries()) ?? {};
    const searchValue = getAllParams['search[name,code]'] ?? '';
    setFilters({
      ...getAllParams,
      per_page: perPage,
      page: searchValue ? 1 : currentPage, // reset page to 1 if searchValue is present
    });
  }, [currentPage, setFilters, perPage, searchParam]);

  const handleSearch = (e) => {
    updateParam('search[name,code]', e.target.value);
  };

  const onShowSizeChange = (_, perPage) => {
    setPerPage(perPage);
  };

  // Function to handle row selection
  const handleSelectRow = (selectedRowKeys, selectedRows) => {
    console.info('selectedRowKeys =>', selectedRowKeys);
    console.info('selectedRows =>', selectedRows);

    setSelectedRow(selectedRowKeys);
  };

  // Function to handle page change
  const onChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <ProSkeleton type="result" />;
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
              onClick: () => navigate('/datastore'),
            },
            {
              title: 'Contacts',
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
          <Flex justify="space-between" wrap="wrap">
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
                icon={<RefreshCcw size={12} />}
                size={'middle'}
                onClick={refetch}
              />
              <Button
                variant="outlined"
                color="primary"
                shape="default"
                icon={<ListFilterIcon size={12} />}
                size={'middle'}
                onClick={() => navigate('filter')}
              />
              <Button variant="outlined" color="primary">
                <LucideDownload size={16} />
                Export to CSV
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={() => navigate('/datastore/contacts/create')}
              >
                Create
              </Button>
            </Space>
          </Flex>

          <Table
            size="middle"
            loading={isLoading}
            className={`${styles.customTable} striped-table`}
            // scroll={{ y: 55 * 10 }}
            dataSource={initialData?.results ?? []}
            rowKey={'id'}
            rowSelection={{
              preserveSelectedRowKeys: true,
              type: 'checkbox',
              onChange: handleSelectRow,
              checkStrictly: true,
            }}
            columns={columns}
            title={() =>
              TitleTableRender({ selectedLength: selectedRow.length })
            }
            pagination={{
              responsive: true,
              current: currentPage,
              onChange: onChange,
              showSizeChanger: true,
              onShowSizeChange: onShowSizeChange,
              defaultPageSize: DEFAULT_PER_PAGE,
              pageSize: perPage,
              total: initialData?.count ?? 0,
              position: ['bottomLeft'],
              size: 'default',
            }}
          />
        </Space>
      </Card>
      <Outlet />
    </Flex>
  );
};

export default Contacts;
