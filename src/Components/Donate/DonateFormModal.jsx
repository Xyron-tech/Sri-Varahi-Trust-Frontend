import { useState } from "react";
import { Modal, Form, Input, InputNumber, Tabs, message } from "antd";
import { UserOutlined, PhoneOutlined, HeartFilled, LockOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const DonateFormModal = ({ open, onClose, onSuccess, apiBaseUrl }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone || "",
          description: values.description || "",
          amount: values.amount,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      message.success("Thank you for your generous donation 🙏");
      form.resetFields();
      onSuccess(data.data);
    } catch (err) {
      message.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const tabItems = [
    {
      key: "form",
      label: "Donate Online",
      children: (
        <Form form={form} layout="vertical" requiredMark={false} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number (Optional)">
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" size="large" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Donation Amount (₹)"
            rules={[{ required: true, message: "Please enter donation amount" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              min={1}
              placeholder="1000"
              prefix="₹"
            />
          </Form.Item>

          <div className="quick-amount">
            <button type="button" onClick={() => form.setFieldValue("amount", 100)}>₹100</button>
            <button type="button" onClick={() => form.setFieldValue("amount", 500)}>₹500</button>
            <button type="button" onClick={() => form.setFieldValue("amount", 1000)}>₹1000</button>
            <button type="button" onClick={() => form.setFieldValue("amount", 5000)}>₹5000</button>
          </div>

          <Form.Item name="description" label="Message (Optional)">
            <TextArea rows={3} placeholder="Share why you're donating..." maxLength={200} />
          </Form.Item>

          <div className="donate-note">
            <LockOutlined /> Your donation is secure and will make a real difference.
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Processing..." : "Donate Now"}
          </button>
        </Form>
      ),
    },
    {
      key: "qr",
      label: "Scan & Pay",
      children: (
        <div className="qr-tab-content">
          <p className="qr-instruction">Scan using any UPI app</p>

          <div className="qr-card">
            <img src="/images/gpay-qr.png" alt="Scan to donate via UPI" />
            <h3>Sri Varahi Datta Guru Trust</h3>
            <span>UPI ID: yourupi@okaxis</span>
          </div>

          <p className="qr-footnote">
            After payment, you can share your details with us via WhatsApp or the contact form
            so we can acknowledge your contribution.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={null}
      destroyOnClose
      centered
      width={480}
      className="donate-modal"
    >
      <div className="donate-modal-wrapper">
        <div className="donate-header">
          <div className="donate-header-icon">
            <HeartFilled />
          </div>
          <h2>Make a Donation</h2>
          <p>Your contribution helps us serve food, education and healthcare.</p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          centered
          className="donate-tabs"
        />
      </div>
    </Modal>
  );
};

export default DonateFormModal;