"use client";
import { useState, useEffect } from "react";
import { Typography, Button, Input, Tabs } from "antd";
import AddFriendModal from "@/components/AddFriendModal";
import FriendsList from "@/components/FriendsList";
import FriendRequestsList from "@/components/FriendRequestsList";
import { getAllFriends, getAllFriendRequests } from "@/app/friends/actions";

const { Title } = Typography;
const { Search } = Input;

export default function Friends() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreRequests, setHasMoreRequests] = useState(true);

  useEffect(() => {
    loadMoreFriends();
    loadMoreFriendRequests();
  }, []);

  const updateFriendRequests = (newFriendRequests) => {
    setFriendRequests(newFriendRequests);
  };

  const loadMoreFriends = async () => {
    if (loading) return;
    setLoading(true);
    try {
      //HARD-CODED: Replace with actual user ID
      const userId = "username123";

      const result = await getAllFriends(userId);
      if (result.success) {
        setFriends(result.friends);
        setHasMore(false); // All friends are loaded at once
      } else {
        console.error("Failed to load friends:", result.error);
      }
    } catch (error) {
      console.error("Error loading friends:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreFriendRequests = async () => {
    if (loading) return;
    setLoading(true);
    try {
      //HARD-CODED: Replace with actual user ID
      const userId = "username123";
      const result = await getAllFriendRequests(userId);
      if (result.success) {
        setFriendRequests(result.friendRequests);
        setHasMoreRequests(false);
      } else {
        console.error("Failed to load friend requests:", result.error);
      }
    } catch (error) {
      console.error("Error loading friend requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //TODO: Implement search function
  const onSearch = (value) => console.log(value);

  const onChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "1",
      label: "Friends",
      children: (
        <FriendsList
          friends={friends}
          loading={loading}
          loadMoreFriends={loadMoreFriends}
          hasMore={hasMore}
        />
      ),
    },
    {
      key: "2",
      label: "Friend Requests",
      children: (
        <FriendRequestsList
          friendRequests={friendRequests}
          loading={loading}
          loadMoreFriendRequests={loadMoreFriendRequests}
          hasMore={hasMoreRequests}
          onRequestHandled={loadMoreFriendRequests}
          updateFriendRequests={updateFriendRequests}
        />
      ),
    },
  ];

  const getTitle = () => (activeTab === "1" ? "Friends" : "Friend Requests");
  const getSubtitle = () =>
    activeTab === "1"
      ? `All Friends - ${friends.length}`
      : `All Requests - ${friendRequests.length}`;

  return (
    <div className="flex w-full">
      <div className="flex flex-col p-4 w-2/3">
        <div className="mb-5">
          <Title
            level={2}
            style={{
              fontSize: "48px",
              fontWeight: "500",
              marginBottom: "0.5rem",
            }}
          >
            {getTitle()}
          </Title>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start w-full sm:w-1/2 mb-4 gap-3 sm:gap-5">
            <span className="text-2xl font-medium" style={{ fontSize: "1rem" }}>
              {getSubtitle()}
            </span>
            <Button
              type="primary"
              onClick={showModal}
              style={{
                backgroundColor: "#1890FF",
                borderColor: "#1890FF",
                boxShadow: "none",
                textDecoration: "none",
              }}
            >
              Add Friend
            </Button>
          </div>
          <AddFriendModal
            isOpen={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          />
        </div>
        <div className="w-full mb-4">
          <Search
            placeholder="Search friends"
            onSearch={onSearch}
            className="w-full"
          />
        </div>
        <div className="h-[500px] overflow-y-auto">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
