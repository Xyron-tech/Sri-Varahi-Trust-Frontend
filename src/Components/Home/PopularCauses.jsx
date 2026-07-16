import { ArrowRightOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import './PopularCauses.css';
import Food from '../../assets/Sri_varahi_food_dist.webp'
import Education from '../../assets/Sri_varahi_Education.webp'
import { Link } from 'react-router-dom';

const CAUSES = [
  { id: 'food', title: 'Free Food Distribution Program', raised: '7M', goal: '10M', percent: 70, imageSrc: Food },
  { id: 'education', title: 'Education for Underprivileged Children', raised: '6M', goal: '10M', percent: 60, imageSrc: Education },
  { id: 'healthcare', title: 'Healthcare & Medical Assistance', raised: '4M', goal: '10M', percent: 40, imageSrc: null },
  { id: 'animal', title: 'Animal Shelter & Rescue', raised: '3M', goal: '8M', percent: 38, imageSrc: null },
  { id: 'water', title: 'Clean Water & Sanitation', raised: '5M', goal: '9M', percent: 55, imageSrc: null },
  { id: 'relief', title: 'Emergency Disaster Relief', raised: '2M', goal: '6M', percent: 33, imageSrc: null },
];

const PopularCauses = () => {
  return (
    <section className="pc-sec">
      <div className="pc-banner">
        <div className="wrap pc-banner-inner">
          <span className="pc-kicker"><span className="kicker-line"></span> Popular Causes</span>
          <h2 className="pc-heading">Let&apos;s Help Change Lives<br />For Good</h2>
        </div>
      </div>

      <div className="wrap pc-grid-wrap">
        <div className="pc-grid">
          {CAUSES.map((cause) => (
            <div className="pc-card" key={cause.id}>
              <div className="pc-img">
                {cause.imageSrc ? <img src={cause.imageSrc} alt={cause.title} /> : null}
              </div>
              <h3 className="pc-title">{cause.title}</h3>
              <div className="pc-donation">
                <div className="pc-donation-top">
                  <span>Donation</span>
                  <span className="pc-percent-badge">{cause.percent}%</span>
                </div>
                <div className="pc-progress-bar">
                  <div className="pc-progress-fill" style={{ width: `${cause.percent}%` }}></div>
                </div>
                <div className="pc-donation-meta">
                  <span>Raised - {cause.raised}</span>
                  <span>Goal - ${cause.goal}</span>
                </div>
              </div>
              <Link to="/donate" className="wwd-link" >
                Donate Now <ArrowRightOutlined />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCauses;