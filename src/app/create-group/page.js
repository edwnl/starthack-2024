'use client'

import React from 'react'
import { Form, Input, DatePicker, InputNumber, Select, Switch, Button, Space } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker

const CreateGroup = () => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    // Here you would call your createGroup action
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create a Group</h1>
      <Form
        form={form}
        name="createGroup"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name Your Group"
          rules={[{ required: true, message: 'Please name your group!' }]}
        >
          <Input placeholder="My Study Group" />
        </Form.Item>

        <Form.Item label="Where Are You Studying?">
          <Space direction="vertical" style={{ width: '100%' }} size="small">
            <Form.Item
              name={['location', 'building']}
              noStyle
              rules={[{ required: true, message: 'Building is required' }]}
            >
              <Input placeholder="Building" suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}  />
            </Form.Item>
            <Form.Item
              name={['location', 'locationInBuilding']}
              noStyle
              rules={[{ required: true, message: 'Location in building is required' }]}
            >
              <Input placeholder="Location in Building" />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label="When Are You Studying?">
          <Form.Item name="startNow" valuePropName="checked" noStyle>
            <Switch checkedChildren="Start Now" unCheckedChildren="Start Later" />
          </Form.Item>
          <Form.Item 
            name="timeRange"
            noStyle
            rules={[{ type: 'array', required: true, message: 'Please select time!' }]}
          >
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ marginTop: '10px', width: '100%' }} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="groupSizeLimit"
          label="Group Size Limit (optional)"
        >
          <InputNumber min={1} max={50} placeholder="5" />
        </Form.Item>

        <Form.Item
          name="studySubjects"
          label="What Are You Studying?"
          rules={[{ required: true, message: 'Please add at least one study subject!' }]}
        >
          <Select mode="tags" style={{ width: '100%' }} placeholder="Add subjects">
            <Select.Option value="comp sci">comp sci</Select.Option>
            <Select.Option value="leetcode">leetcode</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateGroup