import { Card, Typography } from 'antd';

const { Title } = Typography;

const FinancialStatement = () => {
  return (
    <div>
      <Title level={2}>Financial Statement</Title>
      <Card>
        <p>Financial Statement overview page</p>
      </Card>
    </div>
  );
};

export default FinancialStatement;
