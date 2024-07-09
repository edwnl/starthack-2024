"use client";

import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const sampleData = [
  {
    id: 1,
    studyGroup: "Algorithms & Data Structures",
    groupOwner: "Ashley Zhang",
    location: "Baillieu Library",
    startTime: "10:00am",
    participants: 12,
    subjectAreas: ["computer science"],
  },
  {
    id: 2,
    studyGroup: "Study n' Chill",
    groupOwner: "Professor's Walk Café",
    location: "Baillieu Library",
    startTime: "2:00pm",
    participants: 24,
    subjectAreas: ["social"],
  },
  // Add more sample data here...
];

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");
    const locationParam = searchParams.get("location");
    const nameParam = searchParams.get("name");

    if (nameParam) setName(nameParam);
    if (latParam && lngParam) {
      setLat(parseFloat(latParam));
      setLng(parseFloat(lngParam));
    }
    if (locationParam) setLocation(decodeURIComponent(locationParam));
  }, [searchParams]);

  const handleRowClick = (record) => {
    setSelectedGroup(record);
    setModalVisible(true);
  };

  const handleJoinGroup = () => {
    // Implement join group functionality here
    console.log(`Joined group: ${selectedGroup.studyGroup}`);
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Study Group",
      dataIndex: "studyGroup",
      key: "studyGroup",
    },
    {
      title: "Group Owner",
      dataIndex: "groupOwner",
      key: "groupOwner",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Number of Participants",
      dataIndex: "participants",
      key: "participants",
    },
    {
      title: "Subject Areas",
      key: "subjectAreas",
      dataIndex: "subjectAreas",
      render: (_, { subjectAreas }) => (
        <>
          {subjectAreas.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "social") {
              color = "blue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  if (!location) {
    return (
      <div className="my-auto mx-auto text-center">
        <Title level={3} style={{ fontFamily: "Montserrat, sans-serif" }}>
          Error reading search location!
        </Title>
        <Link href="/" passHref>
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold my-6">
        Study Groups {name && "at " + name}
      </h1>
      {location && (
        <p className="mb-6">10 study groups found nearby {location}</p>
      )}
      <Table
        dataSource={sampleData}
        columns={columns}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="cursor-pointer hover:bg-gray-100"
        scroll={{ x: true }}
      />

      <Modal
        title={selectedGroup?.studyGroup}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="join" type="primary" onClick={handleJoinGroup}>
            Join Group
          </Button>,
        ]}
      >
        {selectedGroup && (
          <div>
            <p>
              <strong>Group Owner:</strong> {selectedGroup.groupOwner}
            </p>
            <p>
              <strong>Location:</strong> {selectedGroup.location}
            </p>
            <p>
              <strong>Start Time:</strong> {selectedGroup.startTime}
            </p>
            <p>
              <strong>Participants:</strong> {selectedGroup.participants}{" "}
              <UserOutlined />
            </p>
            <p>
              <strong>Subject Areas:</strong>
            </p>
            <div>
              {selectedGroup.subjectAreas.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResultsPage;
