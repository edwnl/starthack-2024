"use client";

import React from "react";
import { Avatar, Button, Divider, List, Skeleton, message } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "@/app/friends/actions";
import { useAuth } from "@/contexts/AuthContext";

const FriendRequestsList = ({
  friendRequests,
  loading,
  loadMoreFriendRequests,
  hasMore,
  onRequestHandled,
  updateFriendRequests,
}) => {
  const { user } = useAuth(); // Use the useAuth hook to get the current user

  const handleAccept = async (requesterId) => {
    try {
      if (!user) {
        message.error("You must be logged in to accept friend requests");
        return;
      }
      const result = await acceptFriendRequest(user.uid, requesterId);
      if (result.success) {
        message.success("Friend request accepted");
        updateFriendRequests(
          friendRequests.filter((request) => request.id !== requesterId),
        );
        if (onRequestHandled) onRequestHandled();
      } else {
        message.error("Failed to accept friend request");
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
      message.error("An error occurred while accepting the friend request");
    }
  };

  const handleDecline = async (requesterId) => {
    try {
      if (!user) {
        message.error("You must be logged in to decline friend requests");
        return;
      }
      const result = await declineFriendRequest(user.uid, requesterId);
      if (result.success) {
        message.success("Friend request declined");
        updateFriendRequests(
          friendRequests.filter((request) => request.id !== requesterId),
        );
        if (onRequestHandled) onRequestHandled();
      } else {
        message.error("Failed to decline friend request");
      }
    } catch (error) {
      console.error("Error declining friend request:", error);
      message.error("An error occurred while declining the friend request");
    }
  };

  return (
    <div
      id="friendRequestsListScrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={friendRequests.length}
        next={loadMoreFriendRequests}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>No more friend requests to load</Divider>}
        scrollableTarget="friendRequestsListScrollableDiv"
      >
        <List
          dataSource={friendRequests}
          renderItem={(request) => (
            <List.Item key={request.id}>
              <List.Item.Meta title={<a href="#">{request.name}</a>} />
              <div>
                <Button
                  type="primary"
                  size="small"
                  style={{
                    marginRight: "8px",
                    backgroundColor: "#1890FF",
                    borderColor: "#1890FF",
                    boxShadow: "none",
                    textDecoration: "none",
                  }}
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </Button>
                <Button
                  danger
                  size="small"
                  onClick={() => handleDecline(request.id)}
                >
                  Decline
                </Button>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default FriendRequestsList;
