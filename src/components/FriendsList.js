// import React from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import UserProfileModal from "@/components/UserProfileModal";
import { useState } from "react";

const FriendsList = ({ friends, loading, loadMoreFriends, hasMore }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  return (
    <div
      id="friendsListScrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={friends.length}
        next={loadMoreFriends}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>No more friends to load</Divider>}
        scrollableTarget="friendsListScrollableDiv"
      >
        <List
          dataSource={friends}
          renderItem={(friend) => (
            <List.Item key={friend.id} onClick={() => handleUserClick(friend)}>
              <List.Item.Meta title={<a href="#">{friend.name}</a>} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      {selectedUser && (
        <UserProfileModal
          visible={modalVisible}
          onClose={handleModalClose}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default FriendsList;
