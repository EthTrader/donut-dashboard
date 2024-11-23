import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function TopNav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const menuItems = [
    { title: 'Home', path: '/', items: null },
    {
      title: 'About',
      items: [
        { title: 'How to Register', path: '/register' },
        { title: 'FAQ', path: '/faq' },
        { title: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Dashboards',
      items: [
        { title: 'Governance Scores', path: '/governance' },
        { title: 'Distributions', path: '/distribution' },
        { title: 'Topic Limits', path: '/topiclimits' },
        { title: 'Liquidity Leaderboard', path: '/liquidity' },
      ],
    },
    {
      title: 'Apps',
      items: [
        { title: 'Membership Purchases', path: '/membership' },
        { title: 'Track Donuts', path: '/track' },
        { title: 'Stake', path: '/stake' },
        { title: 'Delicious Donuts', path: '/delicious-donuts' },
      ],
    },
  ];

  // Check if the device is mobile based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle the menu open/close state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      {/* Hamburger menu icon for mobile */}
      {isMobile && (
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <div className="hamburger-icon">
            {/* Hamburger icon lines */}
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <ul className={`menu ${menuOpen ? 'open' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
        {menuItems.map((menuItem, index) => (
          <li key={index} className="menu-item">
            {menuItem.items ? (
              // Menu item with sub-items (dropdown)
              <div className="dropdown">
                <span className="dropbtn">
                  {menuItem.title}
                </span>
                <div className="dropdown-content">
                  {menuItem.items.map((subItem, subIndex) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={location.pathname === subItem.path ? 'active' : ''}
                      onClick={() => isMobile && setMenuOpen(false)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              // Menu item without sub-items
              <Link
                to={menuItem.path}
                className={location.pathname === menuItem.path ? 'active' : ''}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                {menuItem.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TopNav;
 