// app/leaderboard/page.js

"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, Col, notification, Row, Table, Tabs } from "antd";
import {
  FireOutlined,
  ReloadOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import UserProfileModal from "@/components/UserProfileModal";
import { getLeaderboardData } from "./actions";

const { TabPane } = Tabs;

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
    lifetime: [],
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // New state for awards
  const [awards, setAwards] = useState({
    streakAward: {
      title: "Longest Streak",
      prize: "Free Coffee for a Month",
      sponsor: "Starbucks",
    },
    topPerformerAward: {
      title: "Top Performer",
      prize: "5x $20 GYG Vouchers",
      sponsor: "Guzman y Gomez",
    },
  });

  const AwardCard = ({ award, icon }) => (
    <Card className="mb-4">
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <h3 className="text-xl font-bold">{award.title}</h3>
          <p className="text-lg">Prize: {award.prize}</p>
          <p className="text-sm">Sponsored by {award.sponsor}</p>
        </div>
      </div>
    </Card>
  );

  const fetchLeaderboardData = async (timeFrame) => {
    const result = await getLeaderboardData(timeFrame);
    if (result.success) {
      setLeaderboardData((prev) => ({ ...prev, [timeFrame]: result.data }));
      setLastUpdated(new Date(result.lastUpdated));
    } else {
      console.error("Failed to fetch leaderboard data:", result.error);
    }
  };

  const updateAllLeaderboards = async () => {
    await Promise.all([
      fetchLeaderboardData("weekly"),
      fetchLeaderboardData("monthly"),
      fetchLeaderboardData("yearly"),
      fetchLeaderboardData("lifetime"),
    ]);
  };

  useEffect(() => {
    updateAllLeaderboards();
    const interval = setInterval(updateAllLeaderboards, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const handleUpdateRequest = () => {
    updateAllLeaderboards();
    notification.success({
      message: "Updated Successfully",
      description: "You have successfully updated the leaderboard.",
      placement: "bottomRight",
    });
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    { title: "Rank", dataIndex: "rank", key: "rank" },
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "Total Study Time",
      dataIndex: "totalStudyTime",
      key: "totalStudyTime",
    },
    {
      title: "Study Groups Attended",
      dataIndex: "studyGroupsAttended",
      key: "studyGroupsAttended",
    },
    {
      title: "Longest Study Session",
      dataIndex: "longestStudySession",
      key: "longestStudySession",
    },
  ];

  const enhancedColumns = columns.map((col) => ({
    ...col,
    onCell: (record) => ({
      onClick: () => handleRowClick(record),
    }),
  }));

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <div className="flex flex-col justify-between items-start">
          <p className="text-sm text-gray-600">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={handleUpdateRequest}
          >
            Request Update Now
          </Button>
        </div>
      </div>

      {/* Awards Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">This Month's Awards</h2>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <AwardCard
              award={awards.streakAward}
              icon={<FireOutlined style={{ fontSize: "32px" }} />}
            />
          </Col>
          <Col xs={24} sm={12}>
            <AwardCard
              award={awards.topPerformerAward}
              icon={<TrophyOutlined style={{ fontSize: "32px" }} />}
            />
          </Col>
        </Row>
      </div>

      <div className="overflow-hidden">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Weekly" key="1">
            <Table
              dataSource={leaderboardData.weekly}
              columns={enhancedColumns}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Monthly" key="2">
            <Table
              dataSource={leaderboardData.monthly}
              columns={enhancedColumns}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Yearly" key="3">
            <Table
              dataSource={leaderboardData.yearly}
              columns={enhancedColumns}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="All-Time" key="4">
            <Table
              dataSource={leaderboardData.lifetime}
              columns={enhancedColumns}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </div>

      <UserProfileModal
        visible={isModalVisible}
        onClose={handleModalClose}
        user={selectedUser}
      />
    </div>
  );
};

export default Leaderboard;
