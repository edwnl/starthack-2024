// import React from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const FriendsList = ({ friends, loading, loadMoreFriends, hasMore }) => {
  return (
    <div
      id="friendsListScrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
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
            <List.Item key={friend.id}>
              <List.Item.Meta
                avatar={<Avatar src={friend.avatar} />}
                title={<a href="#">{friend.name}</a>}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default FriendsList;
