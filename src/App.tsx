import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import RequestCertificatePage from './pages/requestCert/RequestCertificatePage';
import CertificateListPage from './pages/certificates/CertificateListPage';
import certificatesListLoader from './pages/certificates/certificatesListLoader';
import { createCertificateAction } from './api/mutations/createCertificate';

//Set up Router and Paths
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <RequestCertificatePage />,
        action: createCertificateAction
      },
      {
        path: "/certificates",
        element: <CertificateListPage />,
        hydrateFallbackElement: <div>Loading...</div>,
        loader: certificatesListLoader
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
