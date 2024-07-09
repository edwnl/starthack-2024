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
  Spin,
  notification,
} from "antd";
import {
  ClockCircleOutlined,
  MobileOutlined,
  LogoutOutlined,
  UserOutlined,
  LaptopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import UserProfileModal from "@/components/UserProfileModal";
import { useRouter } from "next/navigation";
import { getActiveSession, leaveSession } from "./actions";
import { useAuth } from "@/contexts/AuthContext";
import { useActiveSession } from "@/contexts/ActiveSessionContext"; // We'll create these actions

const ActiveSession = () => {
  const [minutes, setMinutes] = useState(0);
  const [isPhoneLocked, setIsPhoneLocked] = useState(false);
  const [isBrowserLocked, setIsBrowserLocked] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateActiveSession } = useActiveSession();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (user) {
        try {
          const session = await getActiveSession(user.uid);
          console.log(session);
          setSessionDetails(session);
        } catch (error) {
          console.error(
            "[fetchSessionDetails] Error fetching session details:",
            error,
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSessionDetails();
  }, [user]);

  useEffect(() => {
    if (sessionDetails) {
      const startTime = new Date(sessionDetails.startTime).getTime();
      const currentTime = new Date().getTime();
      const elapsedMinutes = Math.floor((currentTime - startTime) / 60000);
      setMinutes(elapsedMinutes);

      const timer = setInterval(() => {
        setMinutes((prevMinutes) => prevMinutes + 1);
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [sessionDetails]);

  const handleLeaveSession = async () => {
    try {
      await leaveSession(user.uid, sessionDetails.id);
      updateActiveSession(false); // Update the global state
      notification.success({
        message: "Left Session",
        description: "You have successfully left the session.",
        placement: "bottomRight",
      });
      router.push("/"); // Redirect to home page after leaving the session
    } catch (error) {
      console.error("[handleLeaveSession] Error leaving session:", error);
    }
  };

  const handleBrowserLock = (checked) => {
    setIsBrowserLocked(checked);
    // Implement browser lock logic here
  };

  const handlePhoneLock = (checked) => {
    setIsPhoneLocked(checked);
    // Implement phone lock logic here
  };

  const handleParticipantClick = (participant) => {
    setSelectedUser(participant.id);
    setIsProfileModalVisible(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!sessionDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">No Active Session</h1>
        <p className="mb-4">You are not currently in any study session.</p>
        <Button
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => router.push("/")}
        >
          Go to Home Page
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-3xl font-bold">Active Session</h1>
        <p className="text-sm text-gray-600 mb-2 sm:mb-0">
          Session started at{" "}
          {new Date(sessionDetails.startTime).toLocaleString()}
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
          <strong>Study Group:</strong> {sessionDetails.name}
        </p>
        <p>
          <strong>Host:</strong> {sessionDetails.hostUsername}
        </p>
        <p>
          <strong>Location:</strong> {sessionDetails.location.building}
        </p>
        <p>
          <strong>Start Time:</strong>{" "}
          {new Date(sessionDetails.startTime).toLocaleString()}
        </p>
        <p>
          <strong>Subject Areas:</strong>{" "}
          {sessionDetails.studySubjects.map((subject) => (
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
          dataSource={sessionDetails.participants}
          renderItem={(participant) => (
            <List.Item
              key={participant.id}
              onClick={() => handleParticipantClick(participant)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={participant.username}
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
