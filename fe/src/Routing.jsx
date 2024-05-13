import { createBrowserRouter } from "react-router-dom";
import Landing from './sid/pages/landingPage';
import InformasiDesa from "./sid/pages/informasiDesa";
import DetailKegiatanDesa from "./sid/pages/detailKegiatanDesa";
import KegiatanProgramDesa from "./sid/pages/kegiatanProgramDesa";
import SignUp from './auth/signUp';
import Login from "./auth/login";
import ForgotPassword from "./auth/forgotPassword";
// import SignIn from "./pages/siginPage/SiginPage";

import WargaPage from "./administration/pages/administration/warga/warga.page";
import RtPage from "./administration/pages/administration/rt/rt.page";
import App from "./App";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/informasi-desa",
        element: <InformasiDesa />,
      },
      {
        path: "/kegiatan-program-desa",
        element: <KegiatanProgramDesa />,
      },
      {
        path: "/detail-kegiatan-desa",
        element: <DetailKegiatanDesa />,
      },
      {
        path: "/warga",
        element: <WargaPage />,
      },
      {
        path: "/rt",
        element: <RtPage />,
      },

    ],
  },
]);

export default Routing;
