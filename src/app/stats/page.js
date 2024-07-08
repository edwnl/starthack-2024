"use client";

import { Typography, Card, Statistic, Row, Col, Button } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  BarChartOutlined,
  ReloadOutlined,
  FireOutlined,
} from "@ant-design/icons";
import ProtectedPage from "@/components/ProtectedPage";

const { Title } = Typography;

const StatsPage = () => {
  const statsData = [
    {
      period: "Weekly",
      totalTime: "10 hours, 23 minutes",
      avgTime: "1 hour, 29 minutes",
      groupsAttended: 19,
      trackingFrom: "8th July, 2024",
      longestStreak: 5,
    },
    {
      period: "Monthly",
      totalTime: "42 hours, 15 minutes",
      avgTime: "1 hour, 45 minutes",
      groupsAttended: 24,
      trackingFrom: "1st July, 2024",
      longestStreak: 8,
    },
    {
      period: "Yearly",
      totalTime: "520 hours, 30 minutes",
      avgTime: "1 hour, 35 minutes",
      groupsAttended: 328,
      trackingFrom: "1st Jan, 2024",
      longestStreak: 10,
    },
    {
      period: "Lifetime",
      totalTime: "1,250 hours, 45 minutes",
      avgTime: "1 hour, 40 minutes",
      groupsAttended: 750,
      trackingFrom: "11th July, 2023",
      longestStreak: 25,
    },
  ];

  return (
    <ProtectedPage>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-2">Stats</h1>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        {statsData.map((stats, index) => (
          <div key={index} className="shadow-sm overflow-hidden mb-4">
            <div className="border border-black p-4 rounded">
              <h2 className="text-2xl font-semibold">{stats.period}</h2>
              <p className="text-gray-500 text-sm">
                Tracking from {stats.trackingFrom}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 ">
                <Statistic
                  title="Total Study Time"
                  value={stats.totalTime}
                  prefix={<ClockCircleOutlined className="mr-2" />}
                />
                <Statistic
                  title="Average Study Time"
                  value={stats.avgTime}
                  prefix={<BarChartOutlined className="mr-2" />}
                />
                <Statistic
                  title="Total Groups Attended"
                  value={stats.groupsAttended}
                  prefix={<TeamOutlined className="mr-2" />}
                />
                <Statistic
                  title="Longest Streak"
                  value={stats.longestStreak || 0}
                  suffix="days"
                  prefix={<FireOutlined className="mr-2" />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProtectedPage>
  );
};

export default StatsPage;
