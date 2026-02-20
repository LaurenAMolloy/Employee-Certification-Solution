// Layout.js
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav'

const Layout = () => {
  return (
    <div>
      <Nav />
      <main className="container">
        <Outlet /> {/* Content specific to the route will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;