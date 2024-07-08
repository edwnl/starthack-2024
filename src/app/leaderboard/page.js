"use client";

import React, { useState } from "react";
import { Button, Table, Tabs } from "antd";
import {
  allTimeData,
  columns,
  monthlyData,
  weeklyData,
  yearlyData,
} from "./fakeData";
import { ReloadOutlined } from "@ant-design/icons";
import UserProfileModal from "@/components/UserProfileModal";
const { TabPane } = Tabs;

const Leaderboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdateRequest = () => {
    console.log("Update requested");
    setLastUpdated(new Date());
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

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

      <div className="overflow-hidden">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Weekly" key="1">
            <Table
              dataSource={weeklyData}
              columns={enhancedColumns}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Monthly" key="2">
            <Table
              dataSource={monthlyData}
              columns={enhancedColumns}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Yearly" key="3">
            <Table
              dataSource={yearlyData}
              columns={enhancedColumns}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="All-Time" key="4">
            <Table
              dataSource={allTimeData}
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
