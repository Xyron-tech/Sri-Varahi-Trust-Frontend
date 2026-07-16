import { Button } from 'antd';
import { ArrowRightOutlined, PhoneOutlined, TeamOutlined, HeartOutlined } from '@ant-design/icons';
import foodImage from '../../assets/sri_varahi_food_image.webp';
import houseImage from '../../assets/Sri_Varahi_house.webp';
import groupImage from '../../assets/Sri_varahi_group_image.webp'
import childrenImage from '../../assets/Childrengroup2.webp';
import FoodService from '../../assets/Sri_varahi_food_service.webp'
import './AboutCharity.css';

const FEATURES = [
    {
        icon: <TeamOutlined />,
        title: 'Trusted Organization',
        desc: 'We help communities build a sustainable, dignified future together.',
    },
    {
        icon: <HeartOutlined />,
        title: 'Start Donating',
        desc: 'Every contribution directly powers our food, health, and education drives.',
    },
];

const AboutCharity = () => {
    return (
        <section className="about-charity-sec">
            <div className="wrap">
                <div className="about-charity-grid">
                    {/* Left — photo collage */}
                    <div className="ac-collage">
                        <img src={FoodService} alt="Community outreach" className="ac-img ac-img-top-left" />
                        <img src={childrenImage} alt="Food distribution" className="ac-img ac-img-top-right" />
                        <img src={groupImage} alt="Education program" className="ac-img ac-img-bottom-left" />
                        <div className="ac-stat-card">
                            <span className="ac-stat-number">2+</span>
                            <span className="ac-stat-label">Years Of<br />Year Established</span>
                        </div>
                    </div>

                    {/* Right — content */}
                    <div className="ac-content">
                        <span className="ac-kicker">
                            <span className="kicker-line"></span> About Our Charity
                        </span>
                        <h2 className="ac-heading">
                            We&apos;re Creating Hope<br />Where It&apos;s Needed Most
                        </h2>

                        <p className="ac-para">
                            <strong>Sri Varahi Datta Guru Charitable Trust</strong> is a registered
                            spiritual and charitable organization dedicated to transforming lives
                            through education, healthcare, food service, animal welfare,
                            environmental protection, village development, and humanitarian support.
                        </p>
                        <p className="ac-para">
                            Founded under the spiritual guidance of Shri Varun Giri, the Trust works
                            to uplift underprivileged communities and create sustainable social
                            impact through compassion, service, and spiritual values.
                        </p>

                        <div className="ac-features">
                            {FEATURES.map((f) => (
                                <div className="ac-feature" key={f.title}>
                                    <span className="ac-feature-icon">{f.icon}</span>
                                    <div>
                                        <h4>{f.title}</h4>
                                        <p>{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="ac-quote">
                            We believe every child deserves love, opportunity, and a future worth
                            dreaming about — and that&apos;s what we fight for every day.
                        </p>

                        <div className="ac-cta-row">
                            <Button type="primary" size="large" className="ac-cta" href="/about">
                                Discover Now <ArrowRightOutlined />
                            </Button>
                            <div className="ac-call">
                                <span className="ac-call-icon"><PhoneOutlined /></span>
                                <div>
                                    <span className="ac-call-label">Call us any time:</span>
                                    <span className="ac-call-number">+91 60057 18799</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCharity;