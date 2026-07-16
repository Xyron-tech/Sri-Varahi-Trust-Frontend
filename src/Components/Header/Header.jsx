import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Menu, Button, Dropdown, Avatar, message } from 'antd';
import {
  HomeOutlined, InfoCircleOutlined, CompassOutlined, PictureOutlined,
  PhoneOutlined, MenuOutlined, HeartFilled, UserOutlined, LogoutOutlined, DownOutlined,
} from '@ant-design/icons';
import logo from '../../assets/icon.webp';
import AuthModal from '../Authmodal/Authmodal';
import './Header.css';

const NAV_LINKS = [
  { key: '/', label: 'Home', icon: <HomeOutlined /> },
  { key: '/about', label: 'About', icon: <InfoCircleOutlined /> },
  { key: '/events', label: 'Events', icon: <CompassOutlined /> },
  { key: '/gallery', label: 'Gallery', icon: <PictureOutlined /> },
  { key: '/contact', label: 'Contact Us', icon: <PhoneOutlined /> },
];

const Logo = ({ orgName }) => (
  <div className='logo-container'>
    <img src={logo} alt={orgName} className="logo-img" />
    <div className="logo-text"><span className="logo-name">{orgName}</span></div>
  </div>
);

const Header = ({ orgName = 'Sri Varahi Trust', onDonateClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load logged-in user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleDonateClick = () => {
    setDrawerOpen(false);
    if (onDonateClick) onDonateClick();
    else navigate('/donate');
  };

  const handleMenuClick = ({ key }) => {
    setDrawerOpen(false);
    navigate(key);
  };

  const handleLoginSuccess = () => {
    message.success('Login successful!');
    // Full page refresh so every component (Events page icons, etc.) picks up the new role
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('Logged out successfully');
    window.location.href = '/';
  };

  const userDropdownItems = [
    {
      key: 'role',
      label: (
        <span style={{ fontSize: 12, color: '#888', textTransform: 'capitalize' }}>
          {user?.role === 'superAdmin' ? 'Super Admin' : 'Guest'}
        </span>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const UserAvatarButton = ({ light }) => (
    <Dropdown menu={{ items: userDropdownItems }} trigger={['click']}>
      <div className="user-avatar-btn" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
        <Avatar icon={<UserOutlined />} size={32} />
        <span style={{ fontSize: 13, fontWeight: 600, color: light ? '#fff' : 'inherit' }}>
          {user?.name?.split(' ')[0]}
        </span>
        <DownOutlined style={{ fontSize: 9, color: light ? '#fff' : '#888' }} />
      </div>
    </Dropdown>
  );

  return (
    <header className="site-header">
      <div className="main-nav">
        <div className="wrap nav">
          <Logo orgName={orgName} />

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <NavLink to={link.key} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <Button className="nav-cta" type="primary" icon={<HeartFilled />} onClick={handleDonateClick}>
              Donate Now
            </Button>

            {user ? (
              <UserAvatarButton />
            ) : (
              <Button
                className="login-btn"
                type="text"
                icon={<UserOutlined style={{ fontSize: 18 }} />}
                onClick={() => setAuthModalOpen(true)}
                aria-label="Login"
              />
            )}
          </ul>

          <div className="mobile-actions">
            {user ? (
              <UserAvatarButton light />
            ) : (
              <Button
                className="login-btn"
                type="text"
                icon={<UserOutlined style={{ fontSize: 20, color: '#fff' }} />}
                onClick={() => setAuthModalOpen(true)}
                aria-label="Login"
              />
            )}
            <Button
              className="menu-btn"
              type="text"
              icon={<MenuOutlined style={{ fontSize: 22, color: '#fff' }} />}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            />
          </div>
        </div>
      </div>

      <Drawer title={orgName} placement="right" onClose={() => setDrawerOpen(false)} open={drawerOpen} size={300} className="nav-drawer">
        <Menu mode="vertical" selectedKeys={[location.pathname]} items={NAV_LINKS} onClick={handleMenuClick} />
        <Button style={{ marginTop: '20px' }} type="primary" block icon={<HeartFilled />} onClick={handleDonateClick}>
          Donate Now
        </Button>

        {user && (
          <Button
            style={{ marginTop: '10px' }}
            block
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Drawer>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </header>
  );
};

export default Header;