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
      <div className="w-full max-w-3xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="py-6 text-center">
          <h1 className="text-3xl font-bold">Create a Group</h1>
          <div className={"text-sm"}>Use this form to create a group! </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Form
            form={form}
            name="createGroup"
            onFinish={onFinish}
            layout="vertical"
            className="p-6"
          >
            <Form.Item
              name="name"
              label="Name Your Group"
              rules={[{ required: true, message: "Please name your group!" }]}
            >
              <Input placeholder="My Study Group" />
            </Form.Item>

            <Form.Item label="Where Are You Studying?">
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="small"
              >
                <Form.Item
                  name={["location", "building"]}
                  noStyle
                  rules={[{ required: true, message: "Building is required" }]}
                >
                  <Input
                    placeholder="Building"
                    suffix={<SearchOutlined className="text-gray-400" />}
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

            <Form.Item label="When Are You Studying?" className="mb-2">
              <div className="flex items-center mb-2">
                <span className="mr-2">Start Now</span>
                <Form.Item name="startNow" valuePropName="checked" noStyle>
                  <Checkbox onChange={onStartNowChange} />
                </Form.Item>
              </div>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="date"
                    rules={[
                      { required: true, message: "Please select a date!" },
                    ]}
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
                <span>
                  Group Size Limit{" "}
                  <span className="text-gray-400 text-sm">(optional)</span>
                </span>
              }
            >
              <InputNumber min={1} max={50} placeholder="5" />
            </Form.Item>

            <Form.Item
              name="studySubjects"
              label="What Are You Studying?"
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
                {/* Keep your existing Select.Option elements here */}
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
      </div>
    </ProtectedPage>
  );
};

export default CreateGroup;
