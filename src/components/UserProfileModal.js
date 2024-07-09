import React from "react";
import { Modal, Statistic } from "antd";
import {
  ClockCircleOutlined,
  BarChartOutlined,
  TeamOutlined,
  FireOutlined,
} from "@ant-design/icons";

const UserProfileModal = ({ visible, onClose, username }) => {
  // Static data
  const userData = {
    username: username || "User",
    stats: {
      totalTime: 1200,
      avgTime: 60,
      groupsAttended: 15,
      longestStreak: 7,
    },
  };

  return (
    <Modal
      title={`${userData.username}'s Profile [DEMO DATA]`}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="space-y-4">
        <Statistic
          title="Total Study Time"
          value={userData.stats.totalTime}
          suffix="minutes"
          prefix={<ClockCircleOutlined className="mr-2" />}
        />
        <Statistic
          title="Average Study Time"
          value={userData.stats.avgTime}
          suffix="minutes"
          prefix={<BarChartOutlined className="mr-2" />}
        />
        <Statistic
          title="Total Groups Attended"
          value={userData.stats.groupsAttended}
          prefix={<TeamOutlined className="mr-2" />}
        />
        <Statistic
          title="Longest Streak"
          value={userData.stats.longestStreak}
          suffix="days"
          prefix={<FireOutlined className="mr-2" />}
        />
      </div>
    </Modal>
  );
};

export default UserProfileModal;
