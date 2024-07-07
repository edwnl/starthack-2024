"use client";

import { Typography, Card, Statistic, Row, Col } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const StatsPage = () => {
  const statsData = [
    {
      period: "Weekly",
      totalTime: "10 hours, 23 minutes",
      avgTime: "1 hour, 29 minutes",
      groupsAttended: 19,
      trackingFrom: "8th July, 2024",
    },
    {
      period: "Monthly",
      totalTime: "42 hours, 15 minutes",
      avgTime: "1 hour, 45 minutes",
      groupsAttended: 24,
      trackingFrom: "1st July, 2024",
    },
    {
      period: "Yearly",
      totalTime: "520 hours, 30 minutes",
      avgTime: "1 hour, 35 minutes",
      groupsAttended: 328,
      trackingFrom: "1st Jan, 2024",
    },
    {
      period: "Lifetime",
      totalTime: "1,250 hours, 45 minutes",
      avgTime: "1 hour, 40 minutes",
      groupsAttended: 750,
      trackingFrom: "11th July, 2023",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      <Title level={2} className="mb-6">
        Stats
      </Title>
      {statsData.map((stats, index) => (
        <Card key={index} className="mb-8 shadow-md">
          <Title level={3}>{stats.period}</Title>
          <p className="text-gray-500 mb-4">
            Tracking from {stats.trackingFrom}
          </p>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Statistic
                title="Total Study Time"
                value={stats.totalTime}
                prefix={<ClockCircleOutlined />}
              />
            </Col>
            <Col xs={24} md={8}>
              <Statistic
                title="Average Study Time"
                value={stats.avgTime}
                prefix={<BarChartOutlined />}
              />
            </Col>
            <Col xs={24} md={8}>
              <Statistic
                title="Total Groups Attended"
                value={stats.groupsAttended}
                prefix={<TeamOutlined />}
              />
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default StatsPage;
