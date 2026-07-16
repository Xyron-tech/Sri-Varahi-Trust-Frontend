import { CheckCircleFilled } from '@ant-design/icons';
import './AboutSection.css';
import Childmemories from '../../assets/Memories.webp';
import FoodCollection from '../../assets/Sri_varahi_food_collection.jpeg';
import FoodDonate from '../../assets/Sri_varahi_food_donate.jpeg';
import Foodserve from '../../assets/Sri_varahi_food_serve.jpeg';

const CHECKLIST = [
  'Spiritual Development',
  'Education Support',
  'Medical Assistance',
  'Free Food Distribution',
  'Rural & Tribal Development',
  'Women Empowerment',
  'Animal Welfare & Goshala',
  'Environmental Sustainability',
  'Disaster Relief Activities',
  'Skill Development Programs',
];

const AboutSection = () => {
  const half = Math.ceil(CHECKLIST.length / 2);
  const col1 = CHECKLIST.slice(0, half);
  const col2 = CHECKLIST.slice(half);

  return (
    <section className="about-sec">
      <div className="wrap about-wrap">
        <div className="about-gallery">
          <div className="about-img img-1">
            <img src={Childmemories} alt="Community service" />
          </div>
          <div className="about-img img-2">
            <img src={FoodCollection} alt="Free food distribution" />
          </div>
          <div className="about-img img-3">
            <img src={FoodDonate} alt="Education support" />
          </div>
          <div className="about-img img-4">
            <img src={Foodserve} alt="Medical assistance camp" />
          </div>
        </div>

        <div className="about-content">
          <h2 className="about-heading">
            Bringing Compassion And Care <br />
            To Every Life We Touch
          </h2>

          <p className="about-para">
            <strong>SRI VARAHI DATTA GURU CHARITABLE TRUST</strong> was
            established with a vision to serve humanity through spiritual
            wisdom, charitable service, and community empowerment.
          </p>

          <p className="about-para">
            The Trust believes that spirituality is not limited to worship
            alone — true spirituality means helping the poor, feeding the
            hungry, protecting animals, empowering women, supporting
            education, preserving nature, and serving society selflessly.
          </p>

          <div className="about-checklist">
            <ul className="check-col">
              {col1.map((item) => (
                <li key={item}>
                  <CheckCircleFilled /> {item}
                </li>
              ))}
            </ul>
            <ul className="check-col">
              {col2.map((item) => (
                <li key={item}>
                  <CheckCircleFilled /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="about-features">
            <div className="feature-item">
              <span className="feature-icon">🤝</span>
              <div>
                <h4>Trusted Organization</h4>
                <p>
                  We help communities through transparent, accountable, and
                  sustainable charitable programs.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🎁</span>
              <div>
                <h4>Start Donating</h4>
                <p>
                  Your contribution directly funds food, education, and
                  medical relief for those who need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;