"use client";

import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Tag, Spin, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { fetchGroups } from "./actions";
import { useAuth } from "@/contexts/AuthContext";
import { checkActiveSession, joinGroup } from "@/app/active-session/actions";
import { useActiveSession } from "@/contexts/ActiveSessionContext";

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
  const { user } = useAuth(); // Get the current user from AuthContext
  const router = useRouter();
  const { updateActiveSession } = useActiveSession();

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

  const sponsoredGroups = [
    {
      id: "sponsored1",
      name: "Starbucks Study Group",
      hostUsername: "Starbucks",
      location: { building: "Starbucks Downtown" },
      startTime: new Date("2024-07-11T14:00:00").toISOString(),
      endTime: new Date("2024-07-11T16:00:00").toISOString(),
      groupSizeLimit: 10,
      studySubjects: ["coffee", "productivity"],
      isSponsored: true,
    },
    {
      id: "sponsored2",
      name: "Library Tech Hub",
      hostUsername: "City Library",
      location: { building: "Central Library" },
      startTime: new Date("2024-07-12T10:00:00").toISOString(),
      endTime: new Date("2024-07-12T12:00:00").toISOString(),
      groupSizeLimit: 15,
      studySubjects: ["technology", "research"],
      isSponsored: true,
    },
  ];

  const loadGroups = async () => {
    setLoading(true);
    try {
      const fetchedGroups = await fetchGroups(lat, lng, ignoreLocation);
      setGroups([...sponsoredGroups, ...fetchedGroups]);
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

  const handleJoinGroup = async () => {
    if (!user) {
      notification.error({
        message: "Authentication Error",
        description: "Please log in to join a group.",
      });
      setModalVisible(false);
      return;
    }

    try {
      const hasActiveSession = await checkActiveSession(user.uid);

      if (hasActiveSession) {
        notification.error({
          message: "Join Group Error",
          description: "You are already part of an active session.",
        });
        setModalVisible(false);
      } else {
        await joinGroup(user.uid, selectedGroup.id);
        updateActiveSession(true);
        notification.success({
          message: "Join Group Success",
          description: `You have successfully joined the group: ${selectedGroup.name}`,
        });
        setModalVisible(false);
        router.push("/active-session");
      }
    } catch (error) {
      console.error("[handleJoinGroup] Error:", error);
      notification.error({
        message: "Join Group Error",
        description:
          "An error occurred while joining the group. Please try again.",
      });
    }
  };

  const columns = [
    {
      title: "Study Group",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span>
          {text} {record.isSponsored && <Tag color="gold">Sponsored</Tag>}
        </span>
      ),
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
          {groups.length - sponsoredGroups.length} study groups found within 5km
          from {location}
        </p>
      )}
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {groups.length === sponsoredGroups.length && !ignoreLocation && (
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
              className: `cursor-pointer hover:bg-gray-100 ${
                record.isSponsored ? "bg-blue-50" : ""
              }`,
            })}
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
            {selectedGroup.isSponsored && (
              <Tag color="gold" className="mb-2">
                Sponsored
              </Tag>
            )}
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
