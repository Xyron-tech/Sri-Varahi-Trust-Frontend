import { useState, useEffect } from 'react';
import { Button, Spin, Empty, message } from 'antd';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import DonateFormModal from './DonateFormModal';
import './Donate.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const DonatePage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRecentDonations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/donations/recent?limit=10`);
      const data = await res.json();
      if (data.success) setDonations(data.data);
    } catch (err) {
      message.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentDonations();
  }, []);

  const handleDonationSuccess = (newDonation) => {
    setDonations((prev) => [newDonation, ...prev].slice(0, 10));
    setModalOpen(false);
  };

  return (
    <section className="donate-sec">
      <div className="wrap">
        <div className="sec-head-center">
          <span className="donate-kicker">
            <span className="kicker-line"></span> Make A Difference <span className="kicker-line"></span>
          </span>
          <h2 className="donate-heading">Support Our Mission</h2>
          <p className="donate-sub">
            Every contribution — big or small — helps us serve food, health, education, and hope to those in need.
          </p>

          <Button
            type="primary"
            size="large"
            className="donate-cta-btn"
            icon={<HeartFilled />}
            onClick={() => setModalOpen(true)}
          >
            Donate Now
          </Button>
        </div>

        <div className="donate-list-section">
          <h3 className="donate-list-heading">Recent Contributions</h3>

          {loading ? (
            <div className="donate-status"><Spin size="large" /></div>
          ) : donations.length === 0 ? (
            <Empty description="No donations yet — be the first to contribute!" className="donate-status" />
          ) : (
            <div className="donate-list">
              {donations.map((donation) => (
                <div className="donate-item" key={donation._id}>
                  <div className="donate-avatar">
                    <UserOutlined />
                  </div>
                  <div className="donate-item-body">
                    <div className="donate-item-top">
                      <span className="donate-name">{donation.name}</span>
                      <span className="donate-amount">₹{donation.amount.toLocaleString('en-IN')}</span>
                    </div>
                    {donation?.description && (
                      <p className="donate-desc">{donation.description}</p>
                    )}
                    <span className="donate-date">{formatDate(donation.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DonateFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleDonationSuccess}
        apiBaseUrl={API_BASE_URL}
      />
    </section>
  );
};

export default DonatePage;