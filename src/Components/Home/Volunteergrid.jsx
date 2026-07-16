import { Button } from 'antd';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import './VolunteerGrid.css';

const ACTIVITIES = [
    'Food distribution drives',
    'Medical camps',
    'Educational programs',
    'Environmental activities',
    'Animal welfare services',
    'Rural development initiatives',
    'Event coordination',
    'Fundraising campaigns',
];

const AVATARS = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/65.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
];

const VolunteerGrid = () => {
    return (
        <section className="volunteer-grid-sec">
            <div className="wrap">
                <div className="volunteer-grid">
                    {/* Card 1 — Become a volunteer */}
                    <div className="v-card v-card-list">
                        <h3 className="v-title">Become a volunteer</h3>
                        <ul className="v-activities">
                            {ACTIVITIES.map((item) => (
                                <li key={item}>
                                    <CheckOutlined className="v-check" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button className="v-btn v-btn-light" href="/contact">
                            Learn More <ArrowRightOutlined />
                        </Button>
                    </div>

                    {/* Card 2 — Stat card */}
                    <div className="v-card v-card-stat">
                        <div className="avatar-stack">
                            {AVATARS.map((src, i) => (
                                <img key={i} src={src} alt="Volunteer" className="avatar-img" />
                            ))}
                            <span className="avatar-more">+</span>
                        </div>
                        <span className="v-stat-number">2k+</span>
                        <span className="v-stat-label">Happy People</span>
                    </div>

                    {/* Card 3 — Join Us volunteer */}
                    <div className="v-card v-card-cta">
                        <h3 className="v-title">Join Us volunteer</h3>
                        <p className="v-desc">
                            Volunteering with the Trust is an opportunity to make meaningful
                            contributions to society while experiencing spiritual fulfillment
                            through service.
                        </p>
                        <Button className="v-btn v-btn-white" href="/contact">
                            Join Us Now <ArrowRightOutlined />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VolunteerGrid;