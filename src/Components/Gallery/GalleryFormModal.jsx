import { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const GalleryFormModal = ({ open, onClose, onSuccess, editingItem, token, apiBaseUrl }) => {
  const [form] = Form.useForm();
  const isEdit = Boolean(editingItem);
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      if (editingItem) {
        form.setFieldsValue({
          title: editingItem.title,
          description: editingItem.description,
        });
        // Show existing images as preview (not re-uploaded unless replaced)
        setFileList(
          editingItem.images.map((img, idx) => ({
            uid: `existing-${idx}`,
            name: `image-${idx}.jpg`,
            status: 'done',
            url: img.url,
          }))
        );
      } else {
        form.resetFields();
        setFileList([]);
      }
    }
  }, [open, editingItem, form]);

  const handleFileChange = ({ fileList: newList }) => {
    setFileList(newList);
  };

  const handleSubmit = async (values) => {
    // Get only NEW files (not already uploaded to Cloudinary)
    const newFiles = fileList.filter((f) => f.originFileObj).map((f) => f.originFileObj);

    if (!isEdit && newFiles.length === 0) {
      message.error('Please select at least one image');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      newFiles.forEach((file) => formData.append('images', file));

      const url = isEdit
        ? `${apiBaseUrl}/api/gallery/${editingItem._id}`
        : `${apiBaseUrl}/api/gallery`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      message.success(isEdit ? 'Gallery updated' : 'Gallery created');
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
      title={isEdit ? 'Edit Gallery Item' : 'Add New Photos'}
      okText={isEdit ? 'Update' : 'Create'}
      confirmLoading={submitting}
      destroyOnClose
      width={520}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input placeholder="Rural Health Camp — March 2026" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={3} placeholder="Short description about these photos (optional)" />
        </Form.Item>

        <Form.Item label="Photos" required>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            multiple
            accept="image/png,image/jpeg,image/webp"
          >
            {fileList.length >= 10 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          <p style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
            Up to 10 images. {isEdit ? 'Uploading new images will replace the existing set.' : ''}
          </p>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GalleryFormModal;