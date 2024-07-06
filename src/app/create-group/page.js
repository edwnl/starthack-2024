'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, DatePicker, InputNumber, Select, Checkbox, Button, Space, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { createGroup } from './action'

const { RangePicker } = DatePicker

const CreateGroup = () => {
  const [form] = Form.useForm()
  const [startNow, setStartNow] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (startNow) {
      const now = dayjs()
      form.setFieldsValue({
        timeRange: [now, null]
      })
    }
  }, [startNow, form])

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const groupData = {
        ...values,
        hostUser: 'user1', // Replace with actual user ID from auth context
        timeRange: values.timeRange.map(time => time.toISOString())
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

  const onStartNowChange = (e) => {
    const checked = e.target.checked
    setStartNow(checked)
    if (!checked) {
      form.setFieldsValue({
        timeRange: null
      })
    }
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
              <Input 
                placeholder="Building" 
                suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />} 
              />
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ marginRight: '8px' }}>Start Now</span>
            <Form.Item name="startNow" valuePropName="checked" noStyle>
              <Checkbox onChange={onStartNowChange} />
            </Form.Item>
          </div>
          <Form.Item 
            name="timeRange"
            noStyle
            rules={[{ type: 'array', required: true, message: 'Please select time!' }]}
          >
            <RangePicker 
              showTime 
              format="YYYY-MM-DD HH:mm:ss" 
              style={{ width: '100%' }}
              disabled={[startNow, false]}
            />
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
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateGroup