import { useState } from 'react';
import './index.scss';
import { PropTypes } from 'prop-types';  
// import svg


const Sidebar = ({ isShrinkView, setIsShrinkView, setSelectedContent }) => {
  const [activeItem, setActiveItem] = useState('administrasi');

//   const handleSidebarView = () => {
//     toggleShrinkView();
//   };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setSelectedContent(item);
  };

  return (
    <div className="container-fluid" style={{ height: '70vh' }}>
      <div className={`sidebar-container${isShrinkView ? " shrink" : ""}`}>
        <button
          className="sidebar-viewButton"
          type="button"
          aria-label={isShrinkView ? "Expand Sidebar" : "Shrink Sidebar"}
          title={isShrinkView ? "Expand" : "Shrink"}
          onClick={handleSidebarView}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
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
                  className="sidebar-listIcon"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sidebar-listIcon"
                >
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
                <span className="sidebar-listItemText">Aspirasi</span>
              </a>
            </li>
 

            {/* tombol menu arsip  */}
            <li
              className={`sidebar-listItem ${activeItem === 'arsip' ? 'active' : ''}`}
              onClick={() => handleItemClick('arsip')}
            >
              <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-archive">
              <polyline points="21 8 21 21 3 21 3 8">
                </polyline>
                <rect x="1" y="3" width="22" height="5">
                </rect>
                  <line x1="10" y1="12" x2="14" y2="12">
                  </line>
                </svg>
                <span className="sidebar-listItemText ms-1"> Arsip</span>
              </a>  
            </li> 
            {/* tombol list contact */}
            <li
              className={`sidebar-listItem ${activeItem === 'contact' ? 'active' : ''}`}
              onClick={() => handleItemClick('contact')}
            >
             <a>
              <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-archive">
              <path d="M16.57 22a2 2 0 0 0 1.43-.59l2.71-2.71a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0l-1.6 1.59a7.55 7.55 0 0 1-3-1.59 7.62 7.62 0 0 1-1.59-3l1.59-1.6a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0L2.59 6A2 2 0 0 0 2 7.43 15.28 15.28 0 0 0 6.3 17.7 15.28 15.28 0 0 0 16.57 22zM6 5.41 8.59 8 7.3 9.29a1 1 0 0 0-.3.91 10.12 10.12 0 0 0 2.3 4.5 10.08 10.08 0 0 0 4.5 2.3 1 1 0 0 0 .91-.27L16 15.41 18.59 18l-2 2a13.28 13.28 0 0 1-8.87-3.71A13.28 13.28 0 0 1 4 7.41zM20 11h2a8.81 8.81 0 0 0-9-9v2a6.77 6.77 0 0 1 7 7z"></path><path d="M13 8c2.1 0 3 .9 3 3h2c0-3.22-1.78-5-5-5z"></path></svg>
              <span className="sidebar-listItemText">Contact</span>
            </a>
            </li>
          </ul>
          <div className="sidebar-profileSection">
            <img
              src="https://assets.codepen.io/3306515/i-know.jpg"
              width="40"
              height="40"
              alt="Monica Geller"
            />
            <span>Monica Geller</span>
          </div>
        </div>
      </div>
    </div>
  );
};

//
Sidebar.propTypes = {
  isShrinkView: PropTypes.bool.isRequired,
  setIsShrinkView: PropTypes.func.isRequired,
  setSelectedContent: PropTypes.func.isRequired,
};

export default Sidebar;
