"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Statistic,
  Switch,
  List,
  Avatar,
  Modal,
  Col,
  Row,
} from "antd";
import {
  ClockCircleOutlined,
  MobileOutlined,
  LogoutOutlined,
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import UserProfileModal from "@/components/UserProfileModal";

// Assuming you have a UserProfileModal component

const ActiveSession = () => {
  const [minutes, setMinutes] = useState(0);
  const [isPhoneLocked, setIsPhoneLocked] = useState(false);
  const [isBrowserLocked, setIsBrowserLocked] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  // Mock data for the study group details
  const sessionDetails = {
    studyGroup: "Algorithms & Data Structures",
    host: "Ashley Zhang",
    location: "Baillieu Library, Level 2 South Side",
    startTime: "Monday, July 1st, 2024, 10:00am",
    subjectAreas: ["comp sci", "leetcode", "algo"],
    description:
      "Join our Algorithms & Data Structures Study Group to enhance your understanding of essential computer science concepts through collaborative learning and practical exercises.",
  };

  // Mock data for participants
  const participants = [
    { id: 1, name: "Ashley Zhang", avatar: "https://example.com/avatar1.jpg" },
    { id: 2, name: "John Doe", avatar: "https://example.com/avatar2.jpg" },
    { id: 3, name: "Jane Smith", avatar: "https://example.com/avatar3.jpg" },
    // Add more participants as needed
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes((prevMinutes) => prevMinutes + 1);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleLeaveSession = () => {
    // Implement leave session logic hereCertainly! I'll modify the "Lock Phone for Extra Minutes" section to create two inline boxes: one for locking the browser and another for locking the phone. Here's how you can update your Active Session component to achieve this layout:
    //
    // jsx
    //
    // Copy
    // "use client";
    //
    // import React, { useState, useEffect } from "react";
    // import { Card, Statistic, Switch, Row, Col } from "antd";
    // import { ClockCircleOutlined, LaptopOutlined, MobileOutlined } from "@ant-design/icons";
    //
    // const ActiveSession = () => {
    //   const [minutes, setMinutes] = useState(0);
    //   const [isBrowserLocked, setIsBrowserLocked] = useState(false);
    //   const [isPhoneLocked, setIsPhoneLocked] = useState(false);
    //
    //   // ... other states and useEffect
    //
    //   const handleBrowserLock = (checked) => {
    //     setIsBrowserLocked(checked);
    //     console.log("Browser lock toggled:", checked);
    //   };
    console.log("Leaving session");
  };

  const handleBrowserLock = (checked) => {
    setIsBrowserLocked(checked);
    console.log("Browser lock toggled:", checked);
  };

  const handlePhoneLock = (checked) => {
    setIsPhoneLocked(checked);
    // Implement phone lock logic here
    console.log("Phone lock toggled:", checked);
  };

  const handleParticipantClick = (user) => {
    setSelectedUser(user);
    setIsProfileModalVisible(true);
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-3xl font-bold">Active Session</h1>
        <p className="text-sm text-gray-600 mb-2 sm:mb-0">
          Session started at {new Date().toLocaleString()}
        </p>
      </div>

      <Card className="mb-6">
        <Statistic
          title="Session Duration"
          value={minutes}
          suffix="minutes"
          prefix={<ClockCircleOutlined />}
        />
      </Card>

      <Row gutter={16} className="mb-6">
        <Col span={12}>
          <Card>
            <div className="flex justify-between items-center">
              <span>Lock Browser</span>
              <Switch
                checked={isBrowserLocked}
                onChange={handleBrowserLock}
                checkedChildren={<LaptopOutlined />}
                unCheckedChildren={<LaptopOutlined />}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className="flex justify-between items-center">
              <span>Lock Phone</span>
              <Switch
                checked={isPhoneLocked}
                onChange={handlePhoneLock}
                checkedChildren={<MobileOutlined />}
                unCheckedChildren={<MobileOutlined />}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Session Details</h2>
        <p>
          <strong>Study Group:</strong> {sessionDetails.studyGroup}
        </p>
        <p>
          <strong>Host:</strong> {sessionDetails.host}
        </p>
        <p>
          <strong>Location:</strong> {sessionDetails.location}
        </p>
        <p>
          <strong>Start Time:</strong> {sessionDetails.startTime}
        </p>
        <p>
          <strong>Subject Areas:</strong>{" "}
          {sessionDetails.subjectAreas.map((subject) => (
            <span
              key={subject}
              className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2"
            >
              {subject}
            </span>
          ))}
        </p>
        <p>
          <strong>Description:</strong> {sessionDetails.description}
        </p>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Participants</h2>
        <List
          dataSource={participants}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() => handleParticipantClick(item)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
                title={item.name}
              />
            </List.Item>
          )}
        />
      </Card>

      <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        onClick={handleLeaveSession}
        size="large"
        block
      >
        Leave Session
      </Button>

      <UserProfileModal
        visible={isProfileModalVisible}
        onClose={() => setIsProfileModalVisible(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default ActiveSession;
