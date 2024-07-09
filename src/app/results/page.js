"use client";

import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Tag, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { fetchGroups } from "./actions";

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ignoreLocation, setIgnoreLocation] = useState(false);

  useEffect(() => {
    if (ignoreLocation) {
      setLat(null);
      setLng(null);
      setLocation(null);
      setName(null);
      return;
    }

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
  }, [searchParams, ignoreLocation]);

  useEffect(() => {
    if (lat && lng) {
      loadGroups();
    }
  }, [lat, lng, ignoreLocation]);

  const loadGroups = async () => {
    setLoading(true);
    try {
      const fetchedGroups = await fetchGroups(lat, lng, ignoreLocation);
      setGroups(fetchedGroups);
    } catch (error) {
      console.error("Error loading groups:", error);
    } finally {
      setLoading(false);
    }
  };

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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Group Owner",
      dataIndex: "hostUsername",
      key: "hostUsername",
    },
    {
      title: "Location",
      dataIndex: ["location", "building"],
      key: "location",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => new Date(startTime).toLocaleString(),
    },
    {
      title: "Number of Participants",
      dataIndex: "groupSizeLimit",
      key: "groupSizeLimit",
    },
    {
      title: "Subject Areas",
      key: "studySubjects",
      dataIndex: "studySubjects",
      render: (tags) => (
        <>
          {tags.map((tag) => {
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

  if (!location && !ignoreLocation) {
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
        <p className="mb-6">
          {groups.length} study groups found within 5km from {location}
        </p>
      )}
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {groups.length === 0 && !ignoreLocation && (
            <div className="text-center mb-4">
              <p>
                No groups found within 5km. Would you like to see all available
                groups?
              </p>
              <Button onClick={() => setIgnoreLocation(true)}>
                Show All Groups
              </Button>
            </div>
          )}
          <Table
            dataSource={groups}
            columns={columns}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            rowClassName="cursor-pointer hover:bg-gray-100"
            scroll={{ x: true }}
          />
        </>
      )}

      <Modal
        title={selectedGroup?.name}
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
              <strong>Group Owner:</strong> {selectedGroup.hostUsername}
            </p>
            <p>
              <strong>Location:</strong> {selectedGroup.location.building}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {new Date(selectedGroup.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>{" "}
              {new Date(selectedGroup.endTime).toLocaleString()}
            </p>
            <p>
              <strong>Participants:</strong> {selectedGroup.groupSizeLimit}{" "}
              <UserOutlined />
            </p>
            <p>
              <strong>Subject Areas:</strong>
            </p>
            <div>
              {selectedGroup.studySubjects.map((tag) => (
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
