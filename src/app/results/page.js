"use client";

import React, { useState } from "react";
import { Typography, Table, Tag } from "antd";

const { Title, Text } = Typography;

const Results = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
      render: (location) => (
        <div>
          LTB
          <br />
          {location}
        </div>
      ),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Number of Participants",
      dataIndex: "numParticipants",
      key: "numParticipants",
    },
    {
      title: "Subject Areas",
      dataIndex: "subjectAreas",
      key: "subjectAreas",
      render: (subjectAreas) => (
        <div>
          {subjectAreas.map((subject, index) => (
            <Tag key={index} color={getTagColor(subject)}>
              {subject}
            </Tag>
          ))}
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      studyGroup: "Algorithms & Data Structures",
      groupOwner: "Ashley Zhang",
      location: "Ground floor",
      startTime: "10:00am",
      numParticipants: 12,
      subjectAreas: ["computer science"],
    },
    {
      key: "2",
      studyGroup: "Study n' Chill",
      groupOwner: "Professor's Walk Café",
      location: "Level 1",
      startTime: "2:00pm",
      numParticipants: 24,
      subjectAreas: ["social"],
    },
    {
      key: "3",
      studyGroup: "Quantum Computing",
      groupOwner: "Dr. Emily Chen",
      location: "Level 2",
      startTime: "4:30pm",
      numParticipants: 8,
      subjectAreas: ["physics", "computer science"],
    },
    {
      key: "4",
      studyGroup: "Shakespeare's Sonnets",
      groupOwner: "Prof. John Doe",
      location: "Ground floor",
      startTime: "7:00pm",
      numParticipants: 16,
      subjectAreas: ["literature"],
    },
    {
      key: "5",
      studyGroup: "Organic Chemistry",
      groupOwner: "Jane Smith",
      location: "Level 1",
      startTime: "9:00am",
      numParticipants: 18,
      subjectAreas: ["chemistry"],
    },
    {
      key: "6",
      studyGroup: "Intro to Machine Learning",
      groupOwner: "Professor AI",
      location: "Level 2",
      startTime: "11:00am",
      numParticipants: 20,
      subjectAreas: ["computer science"],
    },
    {
      key: "7",
      studyGroup: "Modern Art History",
      groupOwner: "Sarah Lee",
      location: "Ground floor",
      startTime: "1:00pm",
      numParticipants: 14,
      subjectAreas: ["arts"],
    },
    {
      key: "8",
      studyGroup: "Calculus 101",
      groupOwner: "Mr. Mathematic",
      location: "Level 1",
      startTime: "3:30pm",
      numParticipants: 22,
      subjectAreas: ["mathematics"],
    },
    {
      key: "9",
      studyGroup: "Intro to Psychology",
      groupOwner: "Dr. Mind",
      location: "Level 2",
      startTime: "6:00pm",
      numParticipants: 19,
      subjectAreas: ["social science"],
    },
    {
      key: "10",
      studyGroup: "Environmental Science",
      groupOwner: "Ms. Nature",
      location: "Ground floor",
      startTime: "8:00pm",
      numParticipants: 15,
      subjectAreas: ["science"],
    },
    {
      key: "11",
      studyGroup: "Programming Fundamentals",
      groupOwner: "CodeMaster",
      location: "Level 1",
      startTime: "10:00am",
      numParticipants: 18,
      subjectAreas: ["computer science"],
    },
    {
      key: "12",
      studyGroup: "Microeconomics",
      groupOwner: "Prof. Economica",
      location: "Level 2",
      startTime: "2:00pm",
      numParticipants: 21,
      subjectAreas: ["economics"],
    },
    {
      key: "13",
      studyGroup: "Mythology and Folklore",
      groupOwner: "Dr. Legends",
      location: "Ground floor",
      startTime: "4:30pm",
      numParticipants: 16,
      subjectAreas: ["humanities"],
    },
    {
      key: "14",
      studyGroup: "Biomedical Engineering",
      groupOwner: "Ms. Technica",
      location: "Level 1",
      startTime: "7:00pm",
      numParticipants: 14,
      subjectAreas: ["engineering", "science"],
    },
    {
      key: "15",
      studyGroup: "Creative Writing",
      groupOwner: "Author Extraordinaire",
      location: "Level 2",
      startTime: "9:00am",
      numParticipants: 17,
      subjectAreas: ["arts", "humanities"],
    },
    {
      key: "16",
      studyGroup: "Discrete Mathematics",
      groupOwner: "Prof. Logica",
      location: "Ground floor",
      startTime: "11:00am",
      numParticipants: 23,
      subjectAreas: ["mathematics"],
    },
  ];

  const getTagColor = (subject) => {
    switch (subject) {
      case "computer science":
        return "green";
      case "social":
        return "geekblue";
      case "physics":
        return "volcano";
      case "literature":
        return "gold";
      case "chemistry":
        return "purple";
      case "arts":
        return "magenta";
      case "mathematics":
        return "orange";
      case "social science":
        return "cyan";
      case "science":
        return "pink";
      case "economics":
        return "blue";
      case "humanities":
        return "red";
      case "engineering":
        return "lime";
      default:
        return "default";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-8">
      <Title level={2} className="mb-2">
        Study Groups
      </Title>
      <Text className="mb-8">
        16 study groups found nearby Learning Teaching's Building, Monash University
      </Text>
      <Table className="mt-2"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          current: currentPage,
          total: 16,
          showSizeChanger: false,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default Results;