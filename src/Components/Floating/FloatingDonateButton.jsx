import { useState } from 'react';
import { HeartFilled } from '@ant-design/icons';
import DonateFormModal from '../Donate/DonateFormModal';
import './FloatingDonateButton.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const FloatingDonateButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDonationSuccess = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="floating-donate-btn"
        onClick={() => setModalOpen(true)}
        aria-label="Donate Now"
      >
        <HeartFilled className="floating-heart-icon" />
        <span className="floating-donate-text">Donate Now</span>
      </button>

      <DonateFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleDonationSuccess}
        apiBaseUrl={API_BASE_URL}
      />
    </>
  );
};

export default FloatingDonateButton;