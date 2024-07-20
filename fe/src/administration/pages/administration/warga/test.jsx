import Navbar from "../../../../shared/layout/navBar";
import Sidebar from "../../../../shared/layout/sideBar";
import { isShrinkView } from "../../../../shared/layout/sideBar";

const TestPage = () => {
    return (
        <div className="container-fluid" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <div className="warping-navbar" style={{ position: 'fixed', top: 0, right: 0, width: '100%' }}>
                <Navbar />
            </div>
            <div className="warping-sidebar" style={{ position: 'fixed', left: 0, top: 0, height: '100%' }}>
                <Sidebar />
            </div>
            <div className="content" style={{ marginLeft: isShrinkView ? '92px' : '240px', width: 'calc(100% - 240px)', height: '100vh', overflow: 'auto' }}>
                <h1>Main Content</h1>
            </div>
        </div>
    );
};

export default TestPage;
