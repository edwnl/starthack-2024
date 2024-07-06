'use client'

import React, { useState } from 'react'
import { createGroup } from './action'
import { Button, Form, Input, DatePicker, InputNumber, Select, Switch, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker
const { Option } = Select

const CreateGroup = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const groupData = {
        ...values,
        startTime: values.timeRange[0].toISOString(),
        endTime: values.timeRange[1].toISOString(),
        creatorId: 'user1', // Replace with actual user ID from auth context
      }
      
      const result = await createGroup(groupData)
      
      if (result.success) {
        message.success('Group created successfully!')
        form.resetFields()
      } else {
        message.error(`Failed to create group: ${result.error}`)
      }
    } catch (error) {
      message.error('An error occurred while creating the group')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Study Group</h1>
      <Form
        form={form}
        name="createGroup"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Group Name"
          rules={[{ required: true, message: 'Please input the group name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Main Subject"
          rules={[{ required: true, message: 'Please select the main subject!' }]}
        >
          <Select>
            <Option value="Math">Math</Option>
            <Option value="Science">Science</Option>
            <Option value="Literature">Literature</Option>
            <Option value="History">History</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="timeRange"
          label="Study Time"
          rules={[{ type: 'array', required: true, message: 'Please select time!' }]}
        >
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item
          name="groupSizeLimit"
          label="Group Size Limit"
          rules={[{ required: true, message: 'Please input the group size limit!' }]}
        >
          <InputNumber min={1} max={50} />
        </Form.Item>

        <Form.Item
          name="studySubjects"
          label="Study Subjects"
          rules={[{ required: true, message: 'Please add at least one study subject!' }]}
        >
          <Select mode="tags" style={{ width: '100%' }} placeholder="Add subjects">
            <Option value="Algebra">Algebra</Option>
            <Option value="Calculus">Calculus</Option>
            <Option value="Biology">Biology</Option>
            <Option value="Chemistry">Chemistry</Option>
          </Select>
        </Form.Item>

        <Form.Item name="repeat" label="Repeat" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.repeat !== currentValues.repeat}
        >
          {({ getFieldValue }) =>
            getFieldValue('repeat') ? (
              <Form.Item
                name={['repeat', 'frequency']}
                label="Repeat Frequency"
                rules={[{ required: true, message: 'Please select the repeat frequency!' }]}
              >
                <Select>
                  <Option value="daily">Daily</Option>
                  <Option value="weekly">Weekly</Option>
                  <Option value="monthly">Monthly</Option>
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} icon={<PlusOutlined />}>
            Create Group
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateGroup