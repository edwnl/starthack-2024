import React from "react";
import { Modal, Input, Typography, message } from "antd";
import { sendFriendRequest } from "@/app/friends/actions";

const { Search } = Input;
const { Text } = Typography;

const AddFriendModal = ({ isOpen, onOk, onCancel }) => {
  const handleSearch = async (value) => {
    try {
      //HARD-CODED: Replace with actual user ID
      const userId = "username123";
      const result = await sendFriendRequest(userId, value);
      if (result.success) {
        message.success("Friend request sent successfully", 5);
        onOk();
      } else {
        message.error(`Failed to send friend request: ${result.error}`, 5);
      }
    } catch (error) {
      message.error(`Error sending friend request: ${error.message}`, 5);
    }
  };

  return (
    <Modal
      title="Add Friend"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <Text>You can add friends with their Groupzy username.</Text>
      <div style={{ marginTop: "20px" }}>
        <Search
          placeholder="Enter Groupzy username"
          enterButton="Send Friend Request"
          size="large"
          onSearch={handleSearch}
        />
      </div>
    </Modal>
  );
};

export default AddFriendModal;
