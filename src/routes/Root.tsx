// ? Librairies
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hook/redux';

// ? Composants
import Header from '../components/App/Layout/Header/Header';
import Footer from '../components/App/Layout/Footer/Footer';
import FlashMessage from '../components/Form/FlashMessage/FlashMessage';

// ? Typage global
import { FlashI } from '../@types/interface';

// ? Fonction principale
function Root() {
  // ? State
  // Redux
  const flash: FlashI | null | undefined = useAppSelector(
    (state) => state.main.flash
  );
  return (
    <>
      {/** //* Message flash
       * On positionne le message flash ici pour qu'il soit accessible partout
       */}
      {flash && (
        <FlashMessage type={flash?.type} duration={flash?.duration ?? 3000}>
          {flash?.children}
        </FlashMessage>
      )}

      <div className="devsConnect">
        <Header />
        <Outlet /> {/* Equivalent de App */}
        <Footer />
      </div>
    </>
  );
}

export default Root;
