// app/social/page.js
"use client";

import React from "react";
import { Layout, Typography, List, Avatar, Space } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

const posts = [
  {
    id: 1,
    author: "Alice",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
    content:
      "Looking for study buddies for tomorrow's Physics exam! Join my group at the library, 2nd floor, 3 PM. #StudyGroup #Physics",
    timestamp: "2 hours ago",
    likes: 15,
    comments: 5,
    shares: 2,
  },
  {
    id: 2,
    author: "Bob",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
    content:
      "Just finished a 3-hour study session on Calculus. Feeling accomplished! 📚💪 #StudyStreak",
    timestamp: "1 hour ago",
    likes: 20,
    comments: 3,
    shares: 1,
  },
  {
    id: 3,
    author: "Charlie",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
    content:
      "Can someone explain the difference between RNA and DNA? Struggling with this Bio concept. 🧬 #BiologyHelp",
    timestamp: "30 minutes ago",
    likes: 5,
    comments: 10,
    shares: 0,
  },
  {
    id: 4,
    author: "Diana",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
    content:
      "The new study pods in the Student Union are amazing! Quiet, comfy, and great for group work. Has anyone else tried them? #CampusLife",
    timestamp: "15 minutes ago",
    likes: 30,
    comments: 8,
    shares: 5,
  },
  {
    id: 5,
    author: "Ethan",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
    content:
      "Just hit the top 10 on the Computer Science leaderboard! 🎉 50 hours of focused study this month. Who's up for some friendly competition? #LeaderboardChallenge",
    timestamp: "5 minutes ago",
    likes: 25,
    comments: 7,
    shares: 3,
  },
];

const SocialFeed = () => {
  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-4 sm:p-6 md:p-8">
        <Title level={2} className="mb-6 text-center">
          Groupzy Social Feed
        </Title>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Space key="like">
                  <LikeOutlined /> {item.likes}
                </Space>,
                <Space key="comment">
                  <MessageOutlined /> {item.comments}
                </Space>,
                <Space key="share">
                  <ShareAltOutlined /> {item.shares}
                </Space>,
              ]}
              className="bg-white rounded-lg shadow-md mb-4 p-4"
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
                title={<Text strong>{item.author}</Text>}
                description={item.timestamp}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default SocialFeed;
