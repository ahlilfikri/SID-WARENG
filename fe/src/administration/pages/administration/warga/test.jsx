import { useState } from 'react';
import Navbar from "../../../../shared/layout/navBar";
import Sidebar from "../../../../shared/layout/sideBar";
import './wargaPage.css';

const TestPage = () => {
  const [isShrinkView, setIsShrinkView] = useState(false);

  return (
    <div className="container-fluid" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <div className="warping-navbar" style={{ position: 'fixed', top: 0, right: 0, width: '100%' }}>
        <Navbar />
      </div>
      <div className="warping-sidebar" style={{ position: 'fixed', left: -10, top: 110, height: '70vh' }}>
        <Sidebar isShrinkView={isShrinkView} setIsShrinkView={setIsShrinkView} />
      </div>
      <div className="content" style={{ marginTop: '10%', marginRight: '11%', marginLeft: isShrinkView ? '92px' : '240px', width: `calc(100% - ${isShrinkView ? '92px' : '240px'})`, height: '100vh', overflow: 'auto' }}>
       
            <div className="container-test-page mt-md-5 mt-3" style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                <h1>Test Page</h1>
                <h1>Test Page</h1>
                <h1>Test Page</h1>
                <h1>Test Page</h1>
                <h1>Test Page</h1>
            </div>
       
      </div>
    </div>
  );
};

export default TestPage;
