// ? Librairies
import { Outlet } from 'react-router-dom';

// ? Composants
import Header from '../components/App/Layout/Header/Header';
import Footer from '../components/App/Layout/Footer/Footer';

// ? Fonction principale
function Root() {
  return (
    <div className="devsConnect">
      <Header />
      <Outlet /> {/* Equivalent de App */}
      <Footer />
    </div>
  );
}

export default Root;
