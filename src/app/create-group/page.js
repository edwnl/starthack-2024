"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Space,
  Row,
  Col,
  message,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { createGroup } from "./action";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedPage from "@/components/ProtectedPage";

const { Title } = Typography;

const CreateGroup = () => {
  const { user } = useAuth(); // Get the current user from auth context
  const [form] = Form.useForm();
  const [startNow, setStartNow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startNow) {
      const now = dayjs();
      form.setFieldsValue({
        date: now,
        timeRange: [now, null], // Only set the start time, leave end time empty
      });
    }
  }, [startNow, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { date, timeRange, ...otherValues } = values;
      let startDateTime = date
        .hour(timeRange[0].hour())
        .minute(timeRange[0].minute());
      let endDateTime = timeRange[1]
        ? date.hour(timeRange[1].hour()).minute(timeRange[1].minute())
        : null;

      // Adjust end time if it's earlier than start time (crosses midnight)
      if (endDateTime && endDateTime.isBefore(startDateTime)) {
        endDateTime = endDateTime.add(1, "day");
      }

      const groupData = {
        ...otherValues,
        hostUser: user?.uid, // Use the actual user ID from auth context
        startTime: startDateTime.toISOString(),
        endTime: endDateTime ? endDateTime.toISOString() : null,
      };

      const result = await createGroup(groupData);

      if (result.success) {
        message.success("Group created successfully!");
        form.resetFields();
      } else {
        message.error(`Failed to create group: ${result.error}`);
      }
    } catch (error) {
      message.error("An error occurred while creating the group");
    } finally {
      setLoading(false);
    }
  };

  const onStartNowChange = (e) => {
    const checked = e.target.checked;
    setStartNow(checked);
    if (!checked) {
      form.setFieldsValue({
        date: null,
        timeRange: null,
      });
    }
  };

  const disabledTime = (now, type) => {
    if (type === "start") {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  };

  return (
    <ProtectedPage>
      <div className="max-w-2xl mx-auto my-auto p-6 border border-gray-300 rounded-lg shadow-md flex flex-col">
        <Title
          level={1}
          className="mb-6"
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "2.5rem" }}
        >
          Create a Group
        </Title>
        <Form
          form={form}
          name="createGroup"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label={
              <span style={{ fontFamily: "Desktop/LG, sans-serif" }}>
                Name Your Group
              </span>
            }
            rules={[{ required: true, message: "Please name your group!" }]}
          >
            <Input placeholder="My Study Group" />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontFamily: "Desktop/LG, sans-serif" }}>
                Where Are You Studying?
              </span>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <Form.Item
                name={["location", "building"]}
                noStyle
                rules={[{ required: true, message: "Building is required" }]}
              >
                <Input
                  placeholder="Building"
                  suffix={
                    <SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  }
                />
              </Form.Item>
              <Form.Item
                name={["location", "locationInBuilding"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Location in building is required",
                  },
                ]}
              >
                <Input placeholder="Location in Building" />
              </Form.Item>
            </Space>
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontFamily: "Desktop/LG, sans-serif" }}>
                When Are You Studying?
              </span>
            }
            className="mb-2"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                  fontFamily: "Desktop/LG, sans-serif",
                }}
              >
                Start Now
              </span>
              <Form.Item name="startNow" valuePropName="checked" noStyle>
                <Checkbox onChange={onStartNowChange} />
              </Form.Item>
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="date"
                  rules={[{ required: true, message: "Please select a date!" }]}
                  className="mb-0"
                >
                  <DatePicker style={{ width: "100%" }} disabled={startNow} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="timeRange"
                  rules={[
                    {
                      type: "array",
                      required: true,
                      message: "Please select time!",
                    },
                  ]}
                  className="mb-0"
                >
                  <TimePicker.RangePicker
                    format="HH:mm"
                    style={{ width: "100%" }}
                    disabled={[startNow, false]}
                    disabledTime={disabledTime}
                    order={false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="groupSizeLimit"
            label={
              <span style={{ fontFamily: "Desktop/LG, sans-serif" }}>
                Group Size Limit{" "}
                <span style={{ color: "rgba(0,0,0,0.45)", fontSize: "0.9em" }}>
                  (optional)
                </span>
              </span>
            }
          >
            <InputNumber min={1} max={50} placeholder="5" />
          </Form.Item>

          <Form.Item
            name="studySubjects"
            label={
              <span style={{ fontFamily: "Desktop/LG, sans-serif" }}>
                What Are You Studying?
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please add at least one study subject!",
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Add subjects"
            >
              <Select.Option value="Mathematics">Mathematics</Select.Option>
              <Select.Option value="Physics">Physics</Select.Option>
              <Select.Option value="Chemistry">Chemistry</Select.Option>
              <Select.Option value="Biology">Biology</Select.Option>
              <Select.Option value="Computer Science">
                Computer Science
              </Select.Option>
              <Select.Option value="Engineering">Engineering</Select.Option>
              <Select.Option value="Literature">Literature</Select.Option>
              <Select.Option value="History">History</Select.Option>
              <Select.Option value="Philosophy">Philosophy</Select.Option>
              <Select.Option value="Psychology">Psychology</Select.Option>
              <Select.Option value="Sociology">Sociology</Select.Option>
              <Select.Option value="Economics">Economics</Select.Option>
              <Select.Option value="Business">Business</Select.Option>
              <Select.Option value="Accounting">Accounting</Select.Option>
              <Select.Option value="Law">Law</Select.Option>
              <Select.Option value="Political Science">
                Political Science
              </Select.Option>
              <Select.Option value="Art History">Art History</Select.Option>
              <Select.Option value="Music">Music</Select.Option>
              <Select.Option value="Theater">Theater</Select.Option>
              <Select.Option value="Film Studies">Film Studies</Select.Option>
              <Select.Option value="Linguistics">Linguistics</Select.Option>
              <Select.Option value="Anthropology">Anthropology</Select.Option>
              <Select.Option value="Environmental Science">
                Environmental Science
              </Select.Option>
              <Select.Option value="Geography">Geography</Select.Option>
              <Select.Option value="Geology">Geology</Select.Option>
              <Select.Option value="Astronomy">Astronomy</Select.Option>
              <Select.Option value="Statistics">Statistics</Select.Option>
              <Select.Option value="Medicine">Medicine</Select.Option>
              <Select.Option value="Nursing">Nursing</Select.Option>
              <Select.Option value="Pharmacy">Pharmacy</Select.Option>
              <Select.Option value="Dentistry">Dentistry</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ProtectedPage>
  );
};

export default CreateGroup;
