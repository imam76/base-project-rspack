import navigateToChildRoute from '@/utils/navigateToChild';
import { Flex } from 'antd';
import { Dropdown, Typography } from 'antd';
import { Trash } from 'lucide-react';
import { File, Pen } from 'lucide-react';

const { Text } = Typography;

const ContextMenuOption = ({ children, editPath, deletePath, detailPath }) => {
  const navigateToChild = navigateToChildRoute();

  const items = [
    {
      key: '1',
      label: (
        <Text onClick={() => navigateToChild({ childrenPath: editPath })}>
          <Flex gap={8} align="center">
            <Pen size={16} />
            Edit
          </Flex>
        </Text>
      ),
    },
    {
      key: '2',
      label: (
        <Text
          type="warning"
          onClick={() => navigateToChild({ childrenPath: detailPath })}
        >
          <Flex gap={8} align="center">
            <File size={16} />
            Detail
          </Flex>
        </Text>
      ),
    },
    {
      key: '3',
      label: (
        <Text
          type="danger"
          onClick={() => navigateToChild({ childrenPath: deletePath })}
        >
          <Flex gap={8} align="center">
            <Trash size={16} />
            Delete
          </Flex>
        </Text>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
      arrow
    >
      {children}
    </Dropdown>
  );
};
export default ContextMenuOption;
