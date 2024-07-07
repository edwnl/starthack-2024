"use client";

import React from "react";
import { Table, Tabs } from "antd";
import {
  allTimeData,
  columns,
  monthlyData,
  weeklyData,
  yearlyData,
} from "./fakeData";
import Title from "antd/es/typography/Title";

const { TabPane } = Tabs;

const Leaderboard = () => {
  return (
    <div className="flex-grow flex flex-col justify-center p-4">
      <Title
        level={2}
        style={{
          fontSize: "48px",
          fontWeight: "500",
          marginBottom: "0.5rem",
        }}
      >
        Leaderboard
      </Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Weekly" key="1">
          <Table
            dataSource={weeklyData}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane tab="Monthly" key="2">
          <Table
            dataSource={monthlyData}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane tab="Yearly" key="3">
          <Table
            dataSource={yearlyData}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane tab="All-Time" key="4">
          <Table
            dataSource={allTimeData}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
