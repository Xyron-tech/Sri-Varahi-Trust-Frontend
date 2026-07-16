import { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { TextArea } = Input;

const VideoFormModal = ({ open, onClose, onSuccess, editingVideo, token, apiBaseUrl }) => {
  const [form] = Form.useForm();
  const isEdit = Boolean(editingVideo);
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      if (editingVideo) {
        form.setFieldsValue({
          title: editingVideo.title,
          description: editingVideo.description,
        });
      } else {
        form.resetFields();
      }
      setFileList([]);
    }
  }, [open, editingVideo, form]);

  const handleFileChange = ({ fileList: newList }) => {
    // Only keep the most recent file (single video upload)
    setFileList(newList.slice(-1));
  };

  const handleSubmit = async (values) => {
    const file = fileList[0]?.originFileObj;

    if (!isEdit && !file) {
      message.error('Please select a video file');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      if (file) {
        formData.append('video', file);
      }

      const url = isEdit
        ? `${apiBaseUrl}/api/videos/${editingVideo._id}`
        : `${apiBaseUrl}/api/videos`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      message.success(isEdit ? 'Video updated' : 'Video added');
      form.resetFields();
      setFileList([]);
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
      title={isEdit ? 'Edit Video' : 'Add New Video'}
      okText={isEdit ? 'Update' : 'Upload'}
      confirmLoading={submitting}
      destroyOnClose
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input placeholder="Free Food Distribution Drive" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={3} placeholder="Short description (optional)" />
        </Form.Item>

        <Form.Item label="Video File" required={!isEdit}>
          <Dragger
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            accept="video/mp4,video/mov,video/webm"
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag video file to upload</p>
            <p className="ant-upload-hint" style={{ fontSize: 12 }}>
              MP4, MOV, WEBM — max 50MB. {isEdit ? 'Uploading a new file replaces the existing video.' : ''}
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VideoFormModal;