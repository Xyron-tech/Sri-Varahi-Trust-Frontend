import { Link } from 'react-router-dom';
import {
  CompassOutlined,
  ReadOutlined,
  MedicineBoxOutlined,
  CoffeeOutlined,
  ArrowRightOutlined,
  HeartFilled
} from '@ant-design/icons';
import { PawPrint, Sprout } from 'lucide-react';
import './WhatWeDo.css';

const SERVICES = [
  {
    icon: <CompassOutlined />,
    title: 'Spiritual Development',
    desc: 'Guided teachings, meditation, and satsang programs that nurture inner peace and purpose.',
    color: '#3B82F6',
  },
  {
    icon: <ReadOutlined />,
    title: 'Education Support',
    desc: 'Free tuition, school supplies, and scholarships so no child is held back by poverty.',
    color: '#8B5CF6',
  },
  {
    icon: <MedicineBoxOutlined />,
    title: 'Medical Assistance',
    desc: 'Free health camps, medicines, and emergency care for families who need it most.',
    color: '#EF4444',
  },
  {
    icon: <CoffeeOutlined />,
    title: 'Food & Nutrition',
    desc: 'Daily meals through Annadanam, reaching the hungry, elderly, and those in need.',
    color: '#E4A046',
  },
  {
    icon: <PawPrint size={26} strokeWidth={1.8} />,
    title: 'Animal Welfare',
    desc: 'Shelter, medical care, and lifelong protection for animals rescued from distress.',
    color: '#10B981',
  },
  {
    icon: <HeartFilled />,
    title: 'Charity Donate',
    desc: 'Your donations directly fund meals, medicines, and education for those who need it most.',
    color: '#1F4A3D',
  },
];

const WhatWeDo = () => {
  return (
    <section className="wwd-sec">
      <div className="wrap">
        <div className="wwd-head">
          <span className="wwd-kicker">
            <span className="kicker-line"></span> What We Do <span className="kicker-line"></span>
          </span>
          <h2 className="wwd-heading">
            Changing lives through care,
            <br />
            compassion, and action
          </h2>
        </div>

        <div className="wwd-grid">
          {SERVICES?.map((service) => (
            <div
              className="wwd-card"
              key={service.title}
              style={{ '--card-color': service.color }}
            >
              <div className="wwd-icon">{service.icon}</div>
              <h3 className="wwd-title">{service.title}</h3>
              <p className="wwd-desc">{service.desc}</p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;