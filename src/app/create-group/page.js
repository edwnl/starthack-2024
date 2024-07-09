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
  notification,
  Typography,
  Modal,
  Spin,
} from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { createGroup } from "./action";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedPage from "@/components/ProtectedPage";
import LocationInput from "@/components/LocationInput";

const { Title } = Typography;

const CreateGroup = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [startNow, setStartNow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceChange = (place) => {
    setSelectedPlace(place);
    form.setFieldsValue({
      location: {
        building: place.name || place.formatted_address,
      },
    });
  };

  useEffect(() => {
    if (startNow) {
      const now = dayjs();
      form.setFieldsValue({
        date: now,
        timeRange: [now, null],
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

      if (endDateTime && endDateTime.isBefore(startDateTime)) {
        endDateTime = endDateTime.add(1, "day");
      }

      const groupData = {
        ...otherValues,
        hostUser: user?.uid,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime ? endDateTime.toISOString() : null,
        location: {
          ...otherValues.location,
          placeDetails: selectedPlace,
        },
      };

      if (!groupData.groupSizeLimit) {
        groupData.groupSizeLimit = -1;
      }

      const serializedData = JSON.stringify(groupData);
      const result = await createGroup(serializedData);

      if (result.success) {
        notification.success({
          message: "Group Created",
          description: `Group successfully created!`,
        });
        form.resetFields();
        setSelectedPlace(null);
        setLoading(false);
      } else {
        notification.error({
          message: "Error",
          description: `Failed to create group: ${result.error}`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An unexpected error occurred while creating the group",
      });
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-bold">Create a Group</h1>
          <p className="text-sm text-gray-600 mb-2 sm:mb-0">
            Use this form to create a group!
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden !border-none">
          <Spin spinning={loading} tip="Creating group...">
            <Form
              form={form}
              name="createGroup"
              onFinish={onFinish}
              layout="vertical"
              className="!border-none"
            >
              <Form.Item
                name="name"
                label="Name Your Group"
                rules={[{ required: true, message: "Please name your group!" }]}
              >
                <Input placeholder="My Study Group" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please add some details!" },
                ]}
              >
                <Input placeholder="Chill session talking about this week's lecture!" />
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
                    rules={[
                      { required: true, message: "Building is required" },
                    ]}
                  >
                    <LocationInput
                      onPlaceChange={handlePlaceChange}
                      placeholder="Which building?"
                      className="w-full px-3 py-1 text-sm border border-black rounded-md placeholder-gray-300"
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
                      <DatePicker
                        style={{ width: "100%" }}
                        disabled={startNow}
                      />
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
          </Spin>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default CreateGroup;
