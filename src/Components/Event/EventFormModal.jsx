import { useEffect, useState } from 'react';
import { Modal, Form, Input, TimePicker, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const EventFormModal = ({ open, onClose, onSuccess, editingEvent, token, apiBaseUrl }) => {
  const [form] = Form.useForm();
  const isEdit = Boolean(editingEvent);
  const [imageFile, setImageFile] = useState(null);   // new file selected by user
  const [imagePreview, setImagePreview] = useState(''); // preview URL (existing or new)
  const [submitting, setSubmitting] = useState(false);

  const parseTimeLabelToRange = (label) => {
    if (!label) return null;
    const [start, end] = label.split(' - ');
    const startTime = dayjs(start, 'hh:mm A');
    const endTime = dayjs(end, 'hh:mm A');
    if (!startTime.isValid() || !endTime.isValid()) return null;
    return [startTime, endTime];
  };

  useEffect(() => {
    if (open) {
      if (editingEvent) {
        form.setFieldsValue({
          ...editingEvent,
          timeRange: parseTimeLabelToRange(editingEvent.timeLabel),
        });
        setImagePreview(editingEvent.imageSrc || '');
      } else {
        form.setFieldsValue({
          title: '',
          dateLabel: undefined,
          timeRange: null,
          desc: '',
          author: '',
        });
        setImagePreview('');
      }
      setImageFile(null);
    }
  }, [open, editingEvent, form]);

  // Don't auto-upload — just capture the file and preview it locally
  const handleImageSelect = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    return false; // prevents antd's default auto-upload behavior
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const { timeRange, ...rest } = values;

      const timeLabel = timeRange
        ? `${timeRange[0].format('hh:mm A')} - ${timeRange[1].format('hh:mm A')}`
        : '';

      // Build multipart form data — text fields + image file in ONE request
      const formData = new FormData();
      formData.append('title', rest.title);
      formData.append('dateLabel', rest.dateLabel);
      formData.append('timeLabel', timeLabel);
      formData.append('desc', rest.desc);
      formData.append('author', rest.author || 'Trust Volunteer Team');
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const url = isEdit
        ? `${apiBaseUrl}/api/events/${editingEvent._id}`
        : `${apiBaseUrl}/api/events`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // ⚠️ Do NOT set 'Content-Type' manually — browser sets it automatically
          // with the correct multipart boundary when using FormData
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      message.success(isEdit ? 'Event updated' : 'Event created');
      form.resetFields();
      setImageFile(null);
      setImagePreview('');
      onSuccess(data.data, isEdit);
    } catch (err) {
      message.error(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      title={isEdit ? 'Edit Event' : 'Add New Event'}
      okText={isEdit ? 'Update' : 'Create'}
      destroyOnClose
      confirmLoading={submitting}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input placeholder="Rural Health Checkup Camp" />
        </Form.Item>

        <Form.Item name="dateLabel" label="Event Status" rules={[{ required: true, message: 'Please select event status' }]}>
          <Select
            placeholder="Select event status"
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Upcoming', label: 'Upcoming' },
              { value: 'Completed', label: 'Completed' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="timeRange"
          label="Event Time"
          rules={[{ required: true, message: 'Please select start and end time' }]}
        >
          <TimePicker.RangePicker use12Hours format="hh:mm A" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="desc" label="Description" rules={[{ required: true, message: 'Description is required' }]}>
          <Input.TextArea rows={3} placeholder="Short event description" />
        </Form.Item>

        <Form.Item name="author" label="Author">
          <Input placeholder="Trust Volunteer Team" />
        </Form.Item>

        <Form.Item label="Event Image">
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={handleImageSelect}
            accept="image/png,image/jpeg,image/webp"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventFormModal;