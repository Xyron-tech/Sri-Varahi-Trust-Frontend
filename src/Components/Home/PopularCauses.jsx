import { ArrowRightOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import './PopularCauses.css';
import Food from '../../assets/Sri_varahi_food_dist.webp'
import Education from '../../assets/Sri_varahi_Education.webp'
import GroupImage from '../../assets/sri_varahi_popular_causes_group_image.webp'
import FoodImage from '../../assets/sri_varahi_popular_causes_food_image.webp'
import Image1 from '../../assets/sri_varahi_popular_causes_image.jpeg'
import Image2 from '../../assets/sri_varahi_popular_causes_image2.webp'
import { Link } from 'react-router-dom';

const CAUSES = [
  {
    id: 'annadanam',
    title: 'Annadanam Seva',
    content: 'Providing free sacred meals to sadhus, pilgrims, and devotees as an act of selfless service.',
    raised: '7M', goal: '10M', percent: 70, imageSrc: Food
  },
  {
    id: 'prasad',
    title: 'Temple Prasad Distribution',
    content: 'Preparing and distributing sacred prasad offerings to devotees visiting the temple premises.',
    raised: '6M', goal: '10M', percent: 60, imageSrc: Education
  },
  {
    id: 'sadhu-sangha',
    title: 'Sadhu Sangha Support',
    content: "Supporting the wellbeing and spiritual journey of sadhus and saints through the trust's ongoing seva initiatives.",
    raised: '4M', goal: '10M', percent: 40, imageSrc: GroupImage
  },
  {
    id: 'bhandara',
    title: 'Bhandara for Pilgrims',
    content: 'Organizing community meals for pilgrims and sadhus during religious gatherings and festivals.',
    raised: '3M', goal: '8M', percent: 38, imageSrc: FoodImage
  },
  {
    id: 'ganga-ghat',
    title: 'Ganga Ghat Seva',
    content: "Serving meals to sadhus and devotees along the sacred riverside ghats as part of the trust's spiritual outreach.",
    raised: '5M', goal: '9M', percent: 55, imageSrc: Image1
  },
  {
    id: 'bhojan-seva',
    title: 'Sadhu Bhojan Seva',
    content: 'Ensuring nutritious meals reach sadhus and ascetics through dedicated bhojan (food) seva programs.',
    raised: '2M', goal: '6M', percent: 33, imageSrc: Image2
  },
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
          {CAUSES?.map((cause) => (
            <div className="pc-card" key={cause.id}>
              <div className="pc-img">
                {cause.imageSrc ? <img src={cause.imageSrc} alt={cause.title} /> : null}
              </div>
              <h3 className="pc-title">{cause.title}</h3>
              <p className="pc-desc">{cause.content}</p>
              <div className="pc-donation">
                <div className="pc-donation-top">
                  <Button style={{borderRadius:'24px',backgroundColor:'#b995f5',color:'white'}}>Donation</Button>
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