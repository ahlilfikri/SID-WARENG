import { createBrowserRouter } from "react-router-dom";
//SID
import Landing from './sid/pages/landingPage';
import InformasiDesa from "./sid/pages/informasiDesa";
import DetailKegiatanDesa from "./sid/pages/detailKegiatanDesa";
import KegiatanProgramDesa from "./sid/pages/kegiatanProgramDesa";
//AUTHENTICATION
import SignUp from './auth/signUp';
import Login from "./auth/login";
import ForgotPassword from "./auth/forgotPassword";
//ASPIRASI
import Aspirasi from "./aspirasi/page";
//ADMINISTRATION
import WargaPage from "./administration/pages/administration/warga/warga.page";
import RtPage from "./administration/pages/administration/rt/rt.page";
import RwPage from "./administration/pages/administration/rw/rw.page";
import KasiPage from "./administration/pages/administration/kasi/kasi.page";

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
      //AUTHENTICATION
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
      //SID
      {
        path: "/informasi-desa",
        element: <InformasiDesa />,
      },
      {
        path: "/kegiatan-program-desa",
        element: <KegiatanProgramDesa />,
      },
      {
        path: "/detail-kegiatan-desa/:id",
        element: <DetailKegiatanDesa />,
      },
      //ASPIRATION
      {
        path: "/aspirasi",
        element: <Aspirasi />,
      },
      //ADMINISTRATION
      {
        path: "/warga",
        element: <WargaPage />,
      },
      {
        path: "/rt",
        element: <RtPage />,
      },
      {
        path: "/rw",
        element: <RwPage />,
      },
      {
        path: "/kasi",
        element: <KasiPage />,
      },
    ],
  },
]);

export default Routing;
