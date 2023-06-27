// ? Librairies
import { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';

// ? Fonctions externes
import {
  toggleModalLogin,
  toggleModalSignin,
} from '../../../store/reducer/log';
import signinUser from '../../../store/actions/signin';
import { fetchAllTags } from '../../../store/reducer/tag';
import { resetMessage, updateFlash } from '../../../store/reducer/main';
import validatePassword from '../../../utils/validatePassword';

// ? Composants externes
import CustomSwitch from '../../../utils/customSwitchUI';

// ? Composants
import Input from '../Input';

// ? Styles
import './style.scss';

// ? Typage global
import { TagSelectedI } from '../../../@types/interface';

// ? Fonction principale
function Signin() {
  // ? State
  const allTagsFromApi: TagSelectedI[] = useAppSelector(
    (state) => state.tag.list.data
  ); // Tableau des tags récupérés depuis l'API
  // Local
  const [selectedTags, setSelectedTags] = useState<TagSelectedI[]>([]); // Tableau des tags sélectionnés par l'utilisateur
  const [checked, setChecked] = useState(true); // State pour le check de open to work
  const [cgu, setCgu] = useState(false); // State pour la case à cocher CGU

  // ? useRef
  const modalRef = useRef(null); // Référence pour la modale

  // ? Dispatch
  const dispatch = useAppDispatch();

  // ? useEffect
  /** //* UseEffect pour la récupération des tags
   * @param {fetchAllTags} dispatch - Dispatch de l'action pour récupérer les tags
   * Au chargement du composant, on dispatch l'action pour récupérer les tags
   * On ne met pas de dépendance car on veut que ça se lance qu'une seule fois
   */
  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  //* useEffect pour clic externe à la modale
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        // Si on clique en dehors de la modale
        modalRef.current &&
        !(modalRef.current as Element).contains(event.target as Node)
        // On précise que modalRef.current éun element html (Element)
        // On précise que event.target représente un noeud du DOM (Node)
      ) {
        // Clic en dehors de la modale
        dispatch(toggleModalSignin());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  // ? Fonctions
  /** //* Fonction pour ouvrir ou fermer la modale de connexion
   * @param {toggleModalSignin} dispatch - Dispatch de l'action pour ouvrir ou fermer la modale
   * Au clic, on dispatch l'action pour ouvrir ou fermer la modale
   */
  const handleSignin = () => {
    // On dispatch l'action qui va gérer l'ouverture de la modale
    dispatch(toggleModalSignin());
  };

  /** //! Accessibilité
   * @param {React.KeyboardEvent<HTMLDivElement>} event - Événement clavier
   * @param {toggleModalSignin} dispatch - Dispatch de l'action pour ouvrir ou fermer la modale
   * * Une div n'est pas un element clickable par défaut.
   * On ajoute un fonction d’accessibilité pour le clavier.
   * Si la touche enter ou espace est pressée, on appelle la fonction handleSignin() juste au dessus.
   */
  const handleSigninKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleSignin();
    }
  };

  /** //* Fonction pour le switch open to work
   * @param {setChecked} setChecked - State pour le check de open to work
   * Au clic, on inverse la valeur du state
   */
  const handleSwitch = () => {
    setChecked(!checked);
  };

  /** //* Fonction pour la case à cocher CGU
   * @param {setCgu} setCgu - State pour la case à cocher CGU
   * Au clic, on inverse la valeur du state
   */
  const handleCguChange = (event) => {
    setCgu(event.target.checked);
  };

  /** //* Fonction pour la selection des technos (au clic sur une techno)
   * @param {number} id - Id de la techno
   * @param {allTagsFromApi} allTagsFromApi - Tableau des tags récupérés depuis l'API
   * @param {selectedTags} selectedTags - Tableau des tags sélectionnés par l'utilisateur
   * @param {setSelectedTags} setSelectedTags - State pour le tableau des tags sélectionnés par l'utilisateur
   * Au clic sur une techno, on vérifie si elle est déjà sélectionnée ou non
   * Si elle est déjà sélectionnée, on la supprime du tableau des technos sélectionnées
   * Si elle n'est pas sélectionnée, on l'ajoute au tableau des technos sélectionnées
   * On met à jour le state des technos sélectionnées
   */
  const handleImageClick = (id: number) => {
    // On vérifie que le tag sélectionné existe bien dans le tableau des tags récupérés depuis l'API
    const selectedTag = allTagsFromApi.find((tag) => tag.id === id);
    if (selectedTag) {
      // Si le tag existe
      // On vérifie si le tag est déjà sélectionné ou non
      if (selectedTags.some((tag) => tag.id === selectedTag.id)) {
        // On crée une variable qui récupère tous les tags sauf celui qui est déjà sélectionné
        const updatedTags = selectedTags.filter(
          (tag) => tag.id !== selectedTag.id
        );
        // On met à jour le state des technos sélectionnées
        setSelectedTags(updatedTags);
      } else {
        // Le tag n'est pas sélectionné, on l'ajoute
        // Dans la limite de 5 technos
        if (selectedTags.length === 5) {
          // Si l'utilisateur a déjà sélectionné 5 tags, on ne fait rien
          return;
        }
        // On ajoute le tag à la variable updatedTags
        const updatedTags = [...selectedTags, selectedTag];
        // On met à jour le state des technos sélectionnées
        setSelectedTags(updatedTags);
      }
    }
  };

  /** //! Accessibilité
   * @param {React.KeyboardEvent<HTMLDivElement>} event - Événement clavier
   * @param {number} imageId - Id de l'image
   * * Une div n'est pas un element clickable par défaut.
   * On ajoute un fonction d’accessibilité pour le clavier.
   * Si la touche enter ou espace est pressée, on appelle la fonction handleImageClick() juste au dessus.
   */
  const handleImageKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    imageId: string
  ) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleImageClick(Number(imageId));
    }
  };

  /** //! Fonction pour l'envoie du formulaire
   * @param {React.FormEvent<HTMLFormElement>} event - Événement formulaire
   * @param {FormData} formData - Données du formulaire
   * @param {selectedTags} selectedTags - Tableau des tags sélectionnés par l'utilisateur
   * Au submit du formulaire, on récupère les données du formulaire et on les envoie à l'API
   * On dispatch l'action pour fermer la modale
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // On empêche le comportement par défaut du formulaire

    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstname = formData.get('firstname');
    const name = formData.get('name');
    const pseudo = formData.get('pseudo');
    const email = formData.get('email').toString();
    const password = formData.get('password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour vérifier le format de l'email

    let isFormValid = true; // Variable pour suivre l'état des conditions

    dispatch(resetMessage()); // On reset le message flash
    if (cgu === false) {
      dispatch(
        updateFlash({
          type: 'error',
          children: "Veuillez accepter les conditions générales d'utilisation",
        })
      );
      isFormValid = false;
    } else if (selectedTags.length === 0) {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez sélectionner au moins une techno',
        })
      );
      isFormValid = false;
    } else if (firstname === '') {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez renseigner votre prénom',
        })
      );
      isFormValid = false;
    } else if (name === '') {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez renseigner votre nom',
        })
      );
      isFormValid = false;
    } else if (pseudo === '') {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez renseigner un pseudo',
        })
      );
      isFormValid = false;
    } else if (email === '' || !emailRegex.test(email)) {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez renseigner un email valide',
        })
      );
      isFormValid = false;
    } else if (password === '') {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez renseigner un mot de passe',
        })
      );
      isFormValid = false;
    } else if (password !== '') {
      const validationResult = validatePassword(password); // On vérifie que le mot de passe est valide
      if (validationResult !== '') {
        dispatch(
          updateFlash({
            type: 'error',
            children: validationResult,
          })
        );
        isFormValid = false;
      }
    }

    if (isFormValid) {
      // Créer un tableau pour les données de selectedTags
      const selectedTagsData = selectedTags.map((tag) => tag.id);
      // Convertir le tableau en chaîne JSON
      const tagsJSON = JSON.stringify(selectedTagsData);
      // Ajouter le tableau selectedTagsData à formData
      formData.delete('cgu');
      formData.append('tags', tagsJSON);
      formData.append('availability', String(checked));
      dispatch(signinUser(formData)); // On envoie les données du formulaire à l'API
      dispatch(toggleModalSignin()); // On ferme la modale
      dispatch(toggleModalLogin()); // On ouvre la modale de connexion
    }
  };
  // ? Rendu JSX
  return (
    <div className="Signin">
      <div
        className="Signin--container"
        ref={modalRef} // On ajoute la référence pour la modale
      >
        <div className="Signin--container--head">
          <h2 className="Signin--title">Inscription</h2>
          <div
            className="Signin--close"
            role="button"
            onClick={handleSignin} // On appelle la fonction handleSignin() au clic
            tabIndex={0} // On ajoute la propriété tabIndex pour rendre la div focusable
            onKeyDown={handleSigninKeyDown} // On appelle la fonction handleSigninKeyDown() au clavier
          >
            X
          </div>
        </div>
        <form
          onSubmit={handleSubmit} // On appelle la fonction handleSubmit() au submit
          className="Signin--form"
        >
          <fieldset className="Signin--field">
            {/* Input maison, importé */}
            <Input
              name="firstname"
              type="text"
              placeholder="Prénom"
              slot="Prénom"
            />
            <Input name="name" type="text" placeholder="Nom" slot="Nom" />
            <Input
              name="pseudo"
              type="text"
              placeholder="Pseudo"
              slot="Pseudo"
            />
            <Input
              name="email"
              type="text"
              placeholder="Adresse Email"
              slot="Email"
            />
            <Input
              name="password"
              type="password"
              placeholder="Mot de passe"
              slot="Mot de passe"
            />

            <div className="Signin--openToWork">
              <p>Ouvert aux projets</p>
              <CustomSwitch
                name="availability"
                checked={checked} // On récupère la valeur du state checked
                onChange={handleSwitch} // On appelle la fonction handleSwitch() au changement
              />
            </div>
            <label htmlFor="description" className="Signin--inputTextarea">
              A propos de moi
              <textarea name="description" id="description" />
            </label>
          </fieldset>

          <fieldset className="Signin--field">
            <div className="Signin--technos">
              <h3>Mes technos</h3>
              <p>(Choisissez entre 1 et 5 technos)</p>
              <div className="Signin--techno">
                {/* //? On map sur le tableau des technos récupérées depuis l'API */}
                {allTagsFromApi.map((techno: TagSelectedI) => (
                  <div className="Signin--inputCheckbox" key={techno.id}>
                    {/* //? Pour chaque techno, on lui donne un id, un name et une value provenant de la table tag */}
                    <input
                      type="checkbox"
                      id={String(techno.id)} // On lui donne un id, converti en string
                      name={techno.name}
                      value={techno.name}
                    />
                    {/* // On lui donne un label et htmlFor */}
                    <label htmlFor={techno.name}>{techno.name}</label>
                    <div
                      role="button"
                      onClick={() => handleImageClick(Number(techno.id))} // Au clic, on appelle la fonction handleImageClick() et on lui passe l'id de la techno, converti en number
                      onKeyDown={
                        (event) => handleImageKeyDown(event, String(techno.id)) // Au clavier, on lui passe l'id de la techno, converti en string
                      }
                      tabIndex={0} // On ajoute la propriété tabIndex pour rendre la div focusable
                      className={`Signin--inputCheckbox--img ${
                        // On ajoute la classe selected si la techno est sélectionnée
                        selectedTags.some((tag) => tag.id === techno.id)
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <img
                        src={`/images/technos/${techno.name.toLocaleLowerCase()}.svg`}
                        title={techno.name.toLocaleLowerCase()}
                        alt={techno.name.toLocaleLowerCase()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="Signin--cgu">
              <label>
                J&apos;accepte les CGU
                <input
                  type="checkbox"
                  onChange={handleCguChange}
                  checked={cgu}
                  id="cgu"
                  name="cgu"
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
