import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    TagOutlined,
    MessageOutlined,
    ArrowUpOutlined,
    ArrowRightOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import './Contact.css';

const { TextArea } = Input;

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const WAYS_TO_HELP = [
    'Donations',
    'CSR Partnerships',
    'Volunteer Participation',
    'Social Collaborations',
    'Spiritual Programs',
    'Humanitarian Support',
];

const CONTACT_INFO = [
    {
        icon: <PhoneOutlined />,
        label: 'Phone',
        value: '+91 60057 18799',
        href: 'tel:+916005718799',
    },
    {
        icon: <MailOutlined />,
        label: 'Email',
        value: 'Varahidattaguru93587@gmail.com',
        href: 'mailto: Varahidattaguru93587@gmail.com',
    },
    {
        icon: <EnvironmentOutlined />,
        label: 'Location',
        value: 'Sri Varahi Datta Guru Ashram, Ganga Deep Colony, Bairagi Camp, Kankhal, Haridwar - 249408',
        href: 'https://maps.google.com/?q=Sri+Varahi+Datta+Guru+Ashram+Ganga+Deep+Colony+Bairagi+Camp+Kankhal+Haridwar+249408',
    },
];

const Contact = () => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: values.subject || `New enquiry from ${values.name} — Sri Varahi Trust website`,
                    ...values,
                }),
            });
            const result = await response.json();
            if (result.success) {
                message.success('Thank you! Your message has been sent successfully.');
                form.resetFields();
            } else {
                message.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            message.error('Network error. Please check your connection and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="contact-sec">
            <div className="wrap">

                <div className="contact-card">
                    <div className="contact-left">
                        <span className="contact-kicker"><span className="kicker-line"></span> Join Hands</span>
                        <h2 className="contact-heading">Connect<br />With Us</h2>
                        <p className="contact-desc">
                            We welcome collaborations and support from individuals and organizations
                            globally to further our mission.
                        </p>
                        <ul className="contact-ways-list">
                            {WAYS_TO_HELP?.map((item) => (
                                <li key={item}>
                                    <span className="way-icon"><ArrowRightOutlined /></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="contact-right">
                        <h3 className="form-heading">Get In Touch</h3>
                        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
                            <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                                <Input prefix={<UserOutlined />} placeholder="Your Name" size="large" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                                <Input prefix={<MailOutlined />} placeholder="Email Address" size="large" />
                            </Form.Item>
                            <div className="form-row">
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Please enter your phone number' },
                                        {
                                            pattern: /^[0-9+\-\s]{7,15}$/,
                                            message: 'Please enter a valid phone number',
                                        },
                                    ]}
                                >
                                    <Input prefix={<PhoneOutlined />} placeholder="Phone Number" size="large" />
                                </Form.Item>
                                <Form.Item name="subject">
                                    <Input prefix={<TagOutlined />} placeholder="Subject" size="large" />
                                </Form.Item>
                            </div>
                            <Form.Item name="message" rules={[{ required: true, message: 'Please enter your message' }]}>
                                <TextArea rows={5} placeholder="Type Your Message" className="message-textarea" />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" size="large" loading={submitting} block className="send-btn">
                                Send A Message <ArrowUpOutlined style={{ transform: 'rotate(45deg)' }} />
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className="contact-info-grid">
                    {CONTACT_INFO?.map((item) => (
                        <a
                            key={item.label}
                            className="info-card"
                            href={item.href}
                            target={item.label === 'Location' ? '_blank' : undefined}
                            rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                        >
                            <span className="info-icon">{item.icon}</span>
                            <span className="info-text">
                                <span className="info-label">{item.label}</span>
                                <span className="info-value">{item.value}</span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;