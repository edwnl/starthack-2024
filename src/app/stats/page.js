"use client";

import { useState, useEffect } from "react";
import { Typography, Card, Statistic, Row, Col, Button, Spin } from "antd";
import {
  ClockCircleOutlined,
  TeamOutlined,
  BarChartOutlined,
  ReloadOutlined,
  FireOutlined,
} from "@ant-design/icons";
import ProtectedPage from "@/components/ProtectedPage";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserStats } from "./actions";

const { Title } = Typography;

const StatsPage = () => {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadStats = async () => {
    setLoading(true);
    try {
      const serialisedStats = await fetchUserStats(user.uid);
      const stats = JSON.parse(serialisedStats);
      setStatsData(Object.values(stats));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading stats:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  return (
    <ProtectedPage>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-2">Stats</h1>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Last updated:{" "}
              {lastUpdated ? lastUpdated.toLocaleString() : "Never"}
            </p>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadStats}
              loading={loading}
            >
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          statsData.map((stats, index) => (
            <div key={index} className="shadow-sm overflow-hidden mb-4">
              <div className="border border-black p-4 rounded">
                <h2 className="text-2xl font-semibold">{stats.period}</h2>
                <p className="text-gray-500 text-sm">
                  Tracking from{" "}
                  {new Date(stats.trackingFrom).toLocaleDateString()}
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
          ))
        )}
      </div>
    </ProtectedPage>
  );
};

export default StatsPage;
