import { useState } from 'react';
import './index.scss';
import { styled } from '@mui/material';

const Sidebar = ({ isShrinkView, setIsShrinkView, setSelectedContent }) => {
  const [activeItem, setActiveItem] = useState('administrasi');

  const handleSidebarView = () => {
    setIsShrinkView(prev => !prev);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setSelectedContent(item);
  };

  return (
    <div className="container-fluid " style={{ height: '100vh' }}>
      <div className={`sidebar-container${isShrinkView ? " shrink" : ""}`} style={{ minHeight:'100vh' }}>
        <button
          className="sidebar-viewButton"
          type="button"
          aria-label={isShrinkView ? "Expand Sidebar" : "Shrink Sidebar"}
          title={isShrinkView ? "Expand" : "Shrink"}
          onClick={handleSidebarView}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="sidebar-wrapper">
          <ul className="sidebar-list">
            <li
              className={`sidebar-listItem ${activeItem === 'administrasi' ? 'active' : ''}`}
              onClick={() => handleItemClick('administrasi')}
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon me-2"
                  style={{ width:'30px' }}
                >
                  <rect x="3" y="3" rx="2" ry="2" className="sidebar-listIcon" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                <span className="sidebar-listItemText">Administrasi</span>
              </a>
            </li>
            <li
              className={`sidebar-listItem ${activeItem === 'aspirasi' ? 'active' : ''}`}
              onClick={() => handleItemClick('aspirasi')}
            >
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sidebar-listIcon me-2" style={{ width:'30px' }}>
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
                <span className="sidebar-listItemText">Aspirasi</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
