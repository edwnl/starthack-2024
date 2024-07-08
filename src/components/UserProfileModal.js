import React from "react";
import { Modal, Statistic } from "antd";
import {
  ClockCircleOutlined,
  BarChartOutlined,
  TeamOutlined,
  FireOutlined,
} from "@ant-design/icons";

const UserProfileModal = ({ visible, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal
      title={`${user.username}'s Profile`}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="space-y-4">
        <Statistic
          title="Total Study Time"
          value={(user.stats && user.stats.totalTime) || 0}
          prefix={<ClockCircleOutlined className="mr-2" />}
        />
        <Statistic
          title="Average Study Time"
          value={(user.stats && user.stats.avgTime) || 0}
          prefix={<BarChartOutlined className="mr-2" />}
        />
        <Statistic
          title="Total Groups Attended"
          value={(user.stats && user.stats.groupsAttended) || 0}
          prefix={<TeamOutlined className="mr-2" />}
        />
        <Statistic
          title="Longest Streak"
          value={(user.stats && user.stats.longestStreak) || 0}
          suffix="days"
          prefix={<FireOutlined className="mr-2" />}
        />
      </div>
    </Modal>
  );
};

export default UserProfileModal;
