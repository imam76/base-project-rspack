import { Card, Col, Row, Typography } from 'antd';
import {
  BarChart3,
  DollarSign,
  FileText,
  LineChart,
  PieChart,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const { Title } = Typography;

const Reports = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Profit & Loss',
      icon: <TrendingUp size={24} />,
      description: 'View comprehensive profit and loss statements',
      path: '/reports/profit-loss',
    },
    {
      title: 'Expense Tracking',
      icon: <TrendingDown size={24} />,
      description: 'Track and analyze business expenses',
      path: '/reports/expenses',
    },
    {
      title: 'Revenue Analysis',
      icon: <DollarSign size={24} />,
      description: 'Analyze revenue streams and trends',
      path: '/reports/revenue',
    },
    {
      title: 'Cash Flow',
      icon: <LineChart size={24} />,
      description: 'Monitor cash flow and liquidity',
      path: '/reports/cash-flow',
    },
    {
      title: 'Financial Ratios',
      icon: <BarChart3 size={24} />,
      description: 'Key financial performance indicators',
      path: '/reports/ratios',
    },
    {
      title: 'Tax Reports',
      icon: <FileText size={24} />,
      description: 'Tax summaries and reports',
      path: '/reports/tax',
    },
    {
      title: 'Balance Sheet',
      icon: <PieChart size={24} />,
      description: 'View assets, liabilities, and equity',
      path: '/reports/balance',
    },
  ];

  return (
   <div>
      <Title level={2}>Reports</Title>
      <Row gutter={[16, 16]}>
        {menuItems.map((item) => (
          <Col xs={24} sm={12} md={6} key={item.title}>
            <Card
              hoverable
              style={{
                borderRadius: '8px',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
              onClick={() => navigate(item.path)}
              className="hover:shadow-lg"
            >
              <div className="flex justify-center items-center p-4">
                {item.icon}
              </div>
              <Title level={4}>{item.title}</Title>
              <p className="text-gray-500 text-sm mt-2">
                Manage your {item.title.toLowerCase()} information
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reports;