import renderTags from '@/utils/renderTags';
import { Input } from 'antd';
import {
  AutoComplete,
  Breadcrumb,
  Button,
  Card,
  Flex,
  Space,
  Table,
  Typography,
} from 'antd';
import { createStyles } from 'antd-style';
import { MoreVertical } from 'lucide-react';
import { ListFilterIcon } from 'lucide-react';
import { useState } from 'react';

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

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    tags: 'active',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    tags: 'pending',
  },
  {
    key: '3',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: 'loser',
  },
  {
    key: '23',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: ['pending', 'loser'],
  },
  {
    key: '13',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: ['pending', 'loser'],
  },
  {
    key: '33',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: ['pending', 'loser'],
  },
  {
    key: '33',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: ['pending', 'loser'],
  },
  {
    key: '213',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: ['pending', 'loser'],
  },
  {
    key: '323',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: ['pending', 'loser'],
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Status',
    dataIndex: 'tags',
    key: 'tags',
    width: 200,
    justify: 'center',
    render: (_, tags) => renderTags(_, tags),
  },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    align: 'right',
    width: 50,
    render: () => <Button
      variant="text"
      type='text'
      shape="circle"
      icon={<MoreVertical size={12} />}
      size={'middle'}
    />,
  },
];

const { Title } = Typography;

const getRandomInt = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
  Array.from({ length: getRandomInt(5) })
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const Contacts = () => {
  const { styles } = useStyle();
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };

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
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{ width: 300 }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          size="large"
        >
          <Input.Search
            size="large"
            placeholder="Search"
            color="primary"
            enterButton
          />
        </AutoComplete>
      </Flex>
      <Card>
        <Space size={'small'} direction="vertical" style={{ display: 'flex' }}>
          <Flex justify="space-between">
            <Space size={'small'}>
              <Title level={2}>Contacts</Title>
              <Title level={3} type="secondary" strong>
                4
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
              <Button variant="solid" color="primary">
                Create
              </Button>
            </Space>
          </Flex>
          <Table
            className={`${styles.customTable} striped-table`}
            dataSource={dataSource}
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
