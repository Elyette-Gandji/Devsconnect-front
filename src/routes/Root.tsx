import { Outlet } from 'react-router-dom';

import Header from '../components/App/Layout/Header/Header';
import Footer from '../components/App/Layout/Footer/Footer';

function Root() {
  return (
    <div className="app">
      <Header />
      <Outlet /> {/* Equivalent de App */}
      <Footer />
    </div>
  );
}

export default Root;
