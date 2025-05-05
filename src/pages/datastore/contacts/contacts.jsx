import renderTags from "@/utils/renderTags";
import { Card, Table } from "antd";

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    tags: 'active'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    tags: 'pending'
  },
  {
    key: '3',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: 'loser'
  },
  {
    key: '3',
    name: 'Johni',
    age: 44,
    address: '112 Downing Street',
    tags: ['pending', 'loser']
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
    render: (_, tags) => renderTags(_, tags)
  },
];

const Contacts = () => {
  return (
    <div>
      <Card>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            position: ["bottomLeft"]
          }}
          className="striped-table"
        />
      </Card>
    </div>
  )
}

export default Contacts;