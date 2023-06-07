// ? Librairies
import { FormEvent } from 'react'; // ? Pour le typage de l'event de soumission du formulaire
import { useAppDispatch, useAppSelector } from '../../hook/redux';

// ? Fonctions reducer
// ? On importe les fonctions `login` et `logout` depuis le reducer `user`
import { login, logout } from '../../store/reducer/user';

// ? Composant
import Input from './Input';
// Composant pour afficher les messages flash (optionnel)
import FlashMessage from './FlashMessage/FlashMessage';

// ? Styles
import './styles.scss';

// ? Fonction
function Form() {
  //* dispatch pour les actions
  const dispatch = useAppDispatch();

  //* useAppSelector pour récupérer les données du state
  const pseudo = useAppSelector((state) => state.user.pseudo);
  const isLogged = useAppSelector((state) => state.user.logged);
  const flash = useAppSelector((state) => state.user.message);

  //! Fonction à garder pour la soumission d'un formulaire, elle ne change pas
  //* Connexion
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // On récupère les données du formulaire
    const form = event.currentTarget;
    // On récupère les valeurs du formulaire dans un objet de type { email: '...', password: '...' }
    const formData = new FormData(form);

    // On dispatch l'action `login` avec les données du formulaire
    dispatch(login(formData));
  };

  //* Déconnexion
  const handleLogout = () => {
    // On dispatch l'action `logout`
    dispatch(logout());
  };

  return (
    <div className="">
      {/* //? Si on a un message flash, on l'affiche, sinon on n'affiche rien */}
      {/* // ? On utilise le composant `FlashMessage` pour afficher le message */}
      {/* //? On utilise la propriété `children` pour afficher le contenu du message flash */}
      {flash && (
        <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
          {flash.children}
        </FlashMessage>
      )}
      {/* // ? Si l'utilisateur est connecté, on affiche un message de bienvenue et un bouton de déconnexion */}
      {isLogged && (
        <div className="">
          <p className="">Bienvenue {pseudo}</p>
          <button type="button" className="" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      )}
      {/* // ? Si l'utilisateur n'est pas connecté, on affiche un message de connexion et un bouton de connexion */}
      {!isLogged && (
        <form
          //! autoComplete="off" pour désactiver l'autocomplétion du navigateur, gestion au cas par cas
          // autoComplete="off"
          className=""
          //* onSubmit pour gérer la soumission du formulaire
          onSubmit={handleSubmit}
        >
          {/* //? On utilise le composant Input pour gérer les champs du formulaire */}
          <Input name="email" type="email" placeholder="Adresse Email" />
          <Input name="password" type="password" placeholder="Mot de passe" />
          {/* //? On utilise un bouton de type submit pour soumettre le formulaire */}
          <button type="submit" className="login-form-button">
            OK
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;
