import { useState, useRef, useEffect } from 'react';

// Permet de relancer le rendu de ce composant à chaque fois que le state de la modale change
import { Switch } from '@mui/material';
import { useAppDispatch } from '../../../hook/redux';

// Actions du reducer
import { toggleModalSignin } from '../../../store/reducer/log';

// Composants
import Input from '../Input';
// Icone switch open to work

// Styles
import './style.scss';

function Signin() {
  // State pour la selection des technos

  const [selectedTechnos, setSelectedTechnos] = useState([]);
  // State pour le check de open to work
  const [checked, setChecked] = useState(false);

  const modalRef = useRef(null);

  // Dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Clic en dehors de la modale
        dispatch(toggleModalSignin());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImageClick = (imageId) => {
    if (selectedTechnos.includes(imageId)) {
      setSelectedTechnos(selectedTechnos.filter((id) => id !== imageId));
    } else {
      setSelectedTechnos([...selectedTechnos, imageId]);
    }
  };
  // * Une div n'est pas un element clickable
  // * Fonction d’accessibilité pour le clavier.
  // * Si la touche enter ou espace est pressée, on appelle la fonction handleClick()
  const handleImageKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleImageClick(imageId);
    }
  };

  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  //! Fonction pour la modale Signin
  const handleSignin = () => {
    // On dispatch l'action qui va gérer l'ouverture de la modale
    dispatch(toggleModalSignin());
  };

  // * Une div n'est pas un element clickable
  // * Fonction d’accessibilité pour le clavier.
  // * Si la touche enter ou espace est pressée, on appelle la fonction handleClick()
  const handleSigninKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleSignin();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Utilisez la valeur `checked` comme nécessaire lors de la soumission du formulaire
    console.log('Valeur du bouton de commutation :', checked);

    // Récupérer la valeur du champ CGU
    const cguAccepted = event.target.cgu.checked;

    // Préparez les données du formulaire
    const formData = {
      openToWork: checked,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      pseudo: event.target.pseudo.value,
      email: event.target.email.value,
      password: event.target.password.value,
      aboutMe: event.target.aboutMe.value,

      // Récupérer la valeur du champ CGU
      cguAccepted,
      // Récupérer les technos sélectionnées
      technos: selectedTechnos,
    };

    // Utilisez les données du formulaire comme nécessaire
    console.log('Données du formulaire :', formData);

    // Effectuez les actions nécessaires avec les données du formulaire
    // Par exemple, vous pouvez réinitialiser le formulaire, afficher un message de confirmation, etc.
  };

  return (
    <div className="Signin">
      <div className="Signin--container" ref={modalRef}>
        <div className="Signin--container--head">
          <h2 className="Signin--title">Inscription</h2>
          <div
            className="Signin--close"
            role="button"
            tabIndex={0}
            onClick={handleSignin}
            onKeyDown={handleSigninKeyDown}
          >
            X
          </div>
        </div>
        <form onSubmit={handleSubmit} className="Signin--form">
          <fieldset className="Signin--field">
            <Input name="firstname" type="text" placeholder="Prénom" />
            <Input name="lastname" type="text" placeholder="Nom" />
            <Input name="pseudo" type="text" placeholder="Pseudo" />
            <Input name="email" type="email" placeholder="Adresse Email" />
            <Input name="password" type="password" placeholder="Mot de passe" />
            <div className="Signin--openToWork">
              <p>Ouvert aux projets</p>
              <Switch checked={checked} onChange={handleSwitch} />
            </div>
            <label htmlFor="aboutMe" className="Signin--inputTextarea">
              A propos de moi
              <textarea name="aboutMe" id="aboutMe" />
            </label>
          </fieldset>

          <fieldset className="Signin--field">
            <div className="Signin--technos">
              <h3>Mes technos</h3>
              <p>(Plusieurs choix possibles)</p>
              <div className="Signin--techno">
                <div className="Signin--inputCheckbox">
                  <input
                    type="checkbox"
                    id="react"
                    name="react"
                    value="react"
                  />
                  <label htmlFor="html"> React</label>
                  <div
                    role="button"
                    onClick={() => handleImageClick('react')}
                    onKeyDown={handleImageKeyDown}
                    tabIndex={0}
                    className={`Signin--inputCheckbox--img ${
                      selectedTechnos.includes('react') ? 'selected' : ''
                    }`}
                  >
                    <img src="/images/technos/react.svg" alt="react" />
                  </div>
                </div>
                <div className="Signin--inputCheckbox">
                  <input type="checkbox" id="css" name="css" value="css" />
                  <label htmlFor="html"> CSS</label>
                  <div
                    role="button"
                    onClick={() => handleImageClick('css')}
                    onKeyDown={handleImageKeyDown}
                    tabIndex={0}
                    className={`Signin--inputCheckbox--img ${
                      selectedTechnos.includes('css') ? 'selected' : ''
                    }`}
                  >
                    <img src="/images/technos/css.svg" alt="css" />
                  </div>
                </div>
                <div className="Signin--inputCheckbox">
                  <input type="checkbox" id="vite" name="vite" value="vite" />
                  <label htmlFor="html"> Vite</label>
                  <div
                    role="button"
                    onClick={() => handleImageClick('vite')}
                    onKeyDown={handleImageKeyDown}
                    tabIndex={0}
                    className={`Signin--inputCheckbox--img ${
                      selectedTechnos.includes('vite') ? 'selected' : ''
                    }`}
                  >
                    <img src="/images/technos/vite.svg" alt="vite" />
                  </div>
                </div>
                <div className="Signin--inputCheckbox">
                  <input
                    type="checkbox"
                    id="typescript"
                    name="typescript"
                    value="typescript"
                  />
                  <label htmlFor="html"> Typescript</label>
                  <div
                    role="button"
                    onClick={() => handleImageClick('typescript')}
                    onKeyDown={handleImageKeyDown}
                    tabIndex={0}
                    className={`Signin--inputCheckbox--img ${
                      selectedTechnos.includes('typescript') ? 'selected' : ''
                    }`}
                  >
                    <img
                      src="/images/technos/typescript.svg"
                      alt="typescript"
                    />
                  </div>
                </div>
                <div className="Signin--inputCheckbox">
                  <input type="checkbox" id="html" name="html" value="html" />
                  <label htmlFor="html"> HTML</label>
                  <div
                    role="button"
                    onClick={() => handleImageClick('html')}
                    onKeyDown={handleImageKeyDown}
                    tabIndex={0}
                    className={`Signin--inputCheckbox--img ${
                      selectedTechnos.includes('html') ? 'selected' : ''
                    }`}
                  >
                    <img src="/images/technos/html.svg" alt="html" />
                  </div>
                </div>
              </div>
            </div>
            <div className="Signin--cgu">
              <label>
                J&apos;accepte les CGU
                <input
                  type="checkbox"
                  id="cgu"
                  name="cgu"
                  value="cgu"
                  className="Signin--inputCheckbox--cgu"
                />
              </label>
            </div>
            <button type="submit" className="Signin--form--submit">
              S&apos;inscrire
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Signin;
