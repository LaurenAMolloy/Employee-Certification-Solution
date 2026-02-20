import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import RequestCertificatePage from './pages/requestCert/RequestCertificatePage';
import CertificateListPage from './pages/certificates/CertificateListPage';

//Set up Router and Paths
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      {
        index: true,
        element: <RequestCertificatePage />
      },
      {
        path: "/certificates",
        element: <CertificateListPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
