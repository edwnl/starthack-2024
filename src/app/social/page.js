// app/social/page.js
"use client";

import React from "react";
import { Layout, Typography, List, Avatar, Space, Card, Progress } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  LikeOutlined,
  ShareAltOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
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
    additionalContext: {
      type: "studySession",
      data: {
        duration: 180, // in minutes
        subject: "Calculus",
        streak: 5,
      },
    },
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
    additionalContext: {
      type: "leaderboard",
      data: {
        rank: 10,
        totalHours: 50,
        subject: "Computer Science",
        topUsers: [
          { name: "Ethan", hours: 50 },
          { name: "Fiona", hours: 55 },
          { name: "George", hours: 60 },
        ],
      },
    },
  },
];

const LeaderboardCard = ({ data }) => (
  <Card className="mt-4">
    <div className="flex items-center mb-4">
      <TrophyOutlined style={{ fontSize: "24px", color: "#faad14" }} />
      <Title level={4} className="m-0 ml-2">
        Computer Science Leaderboard
      </Title>
    </div>
    <Text strong>Your Rank: {data.rank}</Text>
    <Progress percent={(data.rank / 100) * 100} showInfo={false} />
    <Text>Total Study Hours: {data.totalHours}</Text>
    <div className="mt-4">
      <Text strong>Top Performers:</Text>
      {data.topUsers.map((user, index) => (
        <div key={index} className="flex justify-between">
          <Text>{user.name}</Text>
          <Text>{user.hours} hours</Text>
        </div>
      ))}
    </div>
  </Card>
);

const StudySessionCard = ({ data }) => (
  <Card className="mt-4">
    <div className="flex items-center mb-4">
      <ClockCircleOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
      <Title level={4} className="m-0 ml-2">
        Study Session Completed
      </Title>
    </div>
    <div className="flex justify-between">
      <Text>Duration:</Text>
      <Text strong>{data.duration} minutes</Text>
    </div>
    <div className="flex justify-between">
      <Text>Subject:</Text>
      <Text strong>{data.subject}</Text>
    </div>
    <div className="flex justify-between">
      <Text>Current Streak:</Text>
      <Text strong>{data.streak} days</Text>
    </div>
  </Card>
);

const SocialFeed = () => {
  return (
    <Layout className="min-h-screen">
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
              className="bg-white rounded-lg shadow-md mb-4 p-4 border border-black"
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
                title={<Text strong>{item.author}</Text>}
                description={item.timestamp}
              />
              {item.content}
              {item.additionalContext &&
                item.additionalContext.type === "leaderboard" && (
                  <LeaderboardCard data={item.additionalContext.data} />
                )}
              {item.additionalContext &&
                item.additionalContext.type === "studySession" && (
                  <StudySessionCard data={item.additionalContext.data} />
                )}
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default SocialFeed;
