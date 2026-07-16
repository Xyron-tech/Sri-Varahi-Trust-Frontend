import { FacebookFilled, TwitterOutlined, LinkedinFilled } from '@ant-design/icons';
import './Leadership.css';
import Head from '../../assets/Head.webp';
import Security from '../../assets/security.webp';

const LEADERS = [
    {
        id: 'head',
        name: 'Guruji Thanapati mahant varun giri maharaja',
        role: 'Founder & Charity Head',
        bio: [
            'What began as a single ashram kitchen has, under his spiritual guidance, grown into a movement that now serves thousands of families across the region. Over two decades of dedicated seva have shaped his belief that true charity is not measured in numbers, but in the dignity restored to every life it touches.',
            'He remains deeply hands-on, personally visiting villages, shelters, and health camps to ensure the Trust never loses sight of the people it was built to serve. His philosophy is simple: leadership in service means walking alongside those you help, not standing apart from them.',
        ],
        quote: 'Service without humility is just charity in disguise — true seva asks for nothing in return.',
        imageSrc: Head,
    },
    {
        id: 'Disciple',
        name: 'Sishyan Anbumani giri',
        role: 'Trust Disciple',
        bio: [
            'He leads the Trust\'s day-to-day operations with a sharp focus on transparency and accountability, ensuring that every rupee donated is tracked, utilized responsibly, and reaches the communities that need it most.',
            'With over a decade of experience in nonprofit administration and community outreach, he has built the operational backbone of the organization — from volunteer coordination to donor relations — allowing the Trust\'s programs to run efficiently and grow sustainably.',
        ],
        quote: 'Every family we reach is a reminder of why this work matters.',
        imageSrc: Security,
    },
];

const Leadership = () => {
    return (
        <section className="leadership-sec">
            <div className="wrap">
                <div className="sec-head-center">
                    <span className="leadership-kicker">
                        <span className="kicker-line"></span> Our Leadership <span className="kicker-line"></span>
                    </span>
                    <h2 className="leadership-heading">The People Guiding Our Mission</h2>
                    <p className="leadership-sub">
                        Meet the people whose dedication and vision keep our work moving forward every day.
                    </p>
                </div>

                <div className="leadership-grid">
                    {LEADERS?.map((leader, index) => (
                        <div className={`leader-card ${index % 2 === 0 ? 'reverse' : ''}`} key={leader?.id}>
                            <div className="leader-img">
                                {leader?.imageSrc ? <img src={leader?.imageSrc} alt={leader?.name} /> : null}
                            </div>

                            <div className="leader-body">
                                <h3 className="leader-name">{leader?.name}</h3>
                                <span className="leader-role">{leader?.role}</span>

                                {Array.isArray(leader?.bio) ? (
                                    leader?.bio?.map((paragraph, i) => (
                                        <p className="leader-bio" key={i}>
                                            {paragraph}
                                        </p>
                                    ))
                                ) : (
                                    <p className="leader-bio">{leader?.bio}</p>
                                )}

                                {leader?.quote ? (
                                    <blockquote className="leader-quote">
                                        <span className="quote-mark">&ldquo;</span>
                                        {leader?.quote}
                                    </blockquote>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;