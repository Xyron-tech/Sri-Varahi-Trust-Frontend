import { Link } from 'react-router-dom';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, PhoneOutlined, EnvironmentOutlined, MailOutlined } from '@ant-design/icons';
import './Footer.css';
import logo from '../../assets/icon.webp';


const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: <FacebookOutlined />, href: '#' },
  { label: 'Instagram', icon: <InstagramOutlined />, href: '#' },
  { label: 'YouTube', icon: <YoutubeOutlined />, href: '#' },
];

const CONTACT_ITEMS = [
  {
    icon: <EnvironmentOutlined />,
    text: 'Sri Varahi Datta Guru Ashram Ganga Deep colony, bairagi camp, kankal, haridwar - 249408',
    href: 'https://maps.google.com/?q=Sri+Varahi+Datta+Guru+Ashram+Ganga+Deep+Colony+Bairagi+Camp+Kankhal+Haridwar+249408',
    target: '_blank',
  },
  {
    icon: <PhoneOutlined />,
    text: '+91 60057 18799, +91 72008 06271',
    href: 'tel:+916005718799',
  },
  {
    icon: <MailOutlined />,
    text: 'Varahidattaguru93587@gmail.com',
    href: 'mailto:Varahidattaguru93587@gmail.com',
  },
];

const Logo = ({ orgName }) => (
  <div className='logo-container'>
    <img src={logo} alt={orgName} className="logo-img" />
    <div className="logo-text">
      <span className="logo-name">{orgName}</span>
    </div>
  </div>
);

const Footer = ({ orgName = 'Sri Varahi Trust' }) => {

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-about">
          <Logo orgName={orgName} />
          <p>Serving food, health, education, and community welfare with care and dedication.</p>

          <div className="footer-social">
            {SOCIAL_LINKS?.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className="social-icon">
                {social?.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          {QUICK_LINKS?.map((link) => (
            <Link key={link.path} to={link.path}>
              {link?.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          {CONTACT_ITEMS?.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="footer-contact-item"
              target={item.target || undefined}
              rel={item.target ? 'noopener noreferrer' : undefined}
            >
              {item.icon} {item.text}
            </a>
          ))}
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© 2025 {orgName}. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;