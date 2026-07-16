import { useState } from 'react';
import { Modal, Form, Input, Button, Tabs, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import './Authmodal.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AuthModal = ({ open, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token + user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));

      message.success('Login successful!');
      loginForm.resetFields();
      onLoginSuccess?.(data.data);
      onClose();
    } catch (error) {
      message.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      message.success('Account created successfully! Please login.');
      registerForm.resetFields();
      setActiveTab('login');
    } catch (error) {
      message.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const tabItems = [
    {
      key: 'login',
      label: 'Login',
      children: (
        <Form form={loginForm} layout="vertical" onFinish={handleLogin} requiredMark={false}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email Address" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block loading={submitting} className="auth-submit-btn">
            Login
          </Button>
        </Form>
      ),
    },
    {
      key: 'register',
      label: 'Register',
      children: (
        <Form form={registerForm} layout="vertical" onFinish={handleRegister} requiredMark={false}>
          <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email Address" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block loading={submitting} className="auth-submit-btn">
            Create Account
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      className="auth-modal"
      destroyOnClose
    >
      <div className="auth-modal-head">
        <h3>Welcome to Sri Varahi Trust</h3>
        <p>Login or create an account to continue.</p>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        centered
      />
    </Modal>
  );
};

export default AuthModal;