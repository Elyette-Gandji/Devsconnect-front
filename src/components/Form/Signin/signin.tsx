// ? Librairies
import { useState, useRef, useEffect } from 'react';

// ? Permet de relancer le rendu de ce composant à chaque fois que le state de la modale change
import { useAppSelector, useAppDispatch } from '../../../hook/redux';
import CustomSwitch from '../../../utils/customSwitchUI';

// ? Actions du reducer
import {
  toggleModalLogin,
  toggleModalSignin,
} from '../../../store/reducer/log';
import { signinUser } from '../../../store/reducer/user';
import { fetchAllTags } from '../../../store/reducer/tag';

// ? Composants
import Input from '../Input';
// import FlashMessage from '../FlashMessage/FlashMessage';

// ? Utils
// import { technos } from '../../../utils/technosPath'; // Pour le choix des technos

// Styles
import './style.scss';

// ? Typage
import { TagSelectedI } from '../../../@types/interface';

function Signin() {
  const flash = useAppSelector((state) => state.user.signin.message);

  // Tags provenant de l'API
  const allTagsFromApi = useAppSelector((state) => state.tag.list.data);
  // Gestion locale des tags sélectionnés
  const [selectedTags, setSelectedTags] = useState<TagSelectedI[]>([]);

  // State pour le check de open to work
  const [checked, setChecked] = useState(false);

  //! Ref pour la modale
  const modalRef = useRef(null);

  // ! Dispatch
  const dispatch = useAppDispatch();

  /* //! useEffect pour clic externe à la modale
  !* On utilise le hook useEffect pour effectuer une action au chargement du composant (donc de la page)
  !* On précise en 1er paramètre du hook useEffect une fonction qui va effectuer l'action
  !* On utilise le dispatch pour appeler l'action toggleModalSignin qui va gérer l'ouverture de la modale
  !* On précise en 2eme paramètre du hook useEffect dispatch pour que l'action ne soit effectuée qu'une seule fois
  !* On ajoute un écouteur d'évènement sur le document pour écouter les clics
  !* On précise en 1er paramètre du addEventListener le type d'évènement écouté (ici mousedown)
  !* On précise en 2eme paramètre du addEventListener une fonction qui va effectuer l'action
  !* A chaque clic, on vérifie si le clic a eu lieu en dehors de la modale
  !* Si le clic a eu lieu en dehors de la modale, on ferme la modale
  */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        //* On précise que modalRef.current éun element html (Element)
        //* On précise que event.target représente un noeud du DOM (Node)
        !(modalRef.current as Element).contains(event.target as Node)
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

  //! Fonction pour fermer la modale avec la croix
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

  /* //! UseEffect pour la récupération des tags depuis l'API
    !* On utilise le hook useEffect pour effectuer une action au chargement du composant (donc de la page)
    !* On précise en 1er paramètre du hook useEffect une fonction qui va effectuer l'action
    !* On utilise une fonction asynchrone donc > await
    !* On utilise le dispatch pour appeler l'action fetchAllTags qui va récupérer les tags depuis l'API
    !* On précise en 2eme paramètre du hook useEffect un tableau vide pour que l'action ne soit effectuée qu'une seule fois
    */
  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  /* //! Fonction pour la selection des technos (au clic sur une techno)
   !* Prend en paramètre l'id de la techno
   !* 1ere étape: on récupère la techno correspondant à l'id dans le tableau des technos récupérées depuis l'API
   !* //* const selectedTag = allTagsFromApi.find((tag) => tag.id === id);
   !* 2eme étape: on vérifie si la techno est déjà sélectionnée ou non
   !* 3eme étape: si la techno est déjà sélectionnée, on la supprime du tableau des technos sélectionnées
   !* 4eme étape: si la techno n'est pas sélectionnée, on l'ajoute au tableau des technos sélectionnées
   !* 5eme étape: on met à jour le state des technos sélectionnées
   *  `setSelectedTags(updatedTags)`
   */
  const handleImageClick = (id: number) => {
    const selectedTag = allTagsFromApi.find((tag) => tag.id === id);
    if (selectedTag) {
      if (selectedTags.some((tag) => tag.id === selectedTag.id)) {
        // Le tag est déjà sélectionné, on le supprime
        const updatedTags = selectedTags.filter(
          (tag) => tag.id !== selectedTag.id
        );
        setSelectedTags(updatedTags);
      } else {
        // Le tag n'est pas sélectionné, on l'ajoute
        const updatedTags = [...selectedTags, selectedTag];
        setSelectedTags(updatedTags);
      }
    }
  };
  /* Une div n'est pas un element clickable
   * Fonction d’accessibilité pour le clavier.
   * Si la touche enter ou espace est pressée, on appelle la fonction handleClick()
   */
  const handleImageKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    imageId: string
  ) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleImageClick(imageId);
    }
  };

  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  //! Fonction pour l'envoie du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    dispatch(signinUser(formData));
    dispatch(toggleModalSignin());
    dispatch(toggleModalLogin());
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
            <Input name="Prénom" type="text" placeholder="Prénom" />
            <Input name="Nom" type="text" placeholder="Nom" />
            <Input name="Pseudo" type="text" placeholder="Pseudo" />
            <Input name="Email" type="email" placeholder="Adresse Email" />
            <Input
              name="Mot de passe"
              type="password"
              placeholder="Mot de passe"
            />
            <div className="Signin--openToWork">
              <p>Ouvert aux projets</p>
              <CustomSwitch
                name="availability"
                checked={checked}
                onChange={handleSwitch}
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
              <p>(Plusieurs choix possibles)</p>
              <div className="Signin--techno">
                {/* //? On map sur le tableau des technos récupérées depuis l'API */}
                {allTagsFromApi.map((techno: TagI) => (
                  <div className="Signin--inputCheckbox" key={techno.id}>
                    {/* //? Pour chaque techno, on lui donne un id, un name et une value provenant de la table tag */}
                    <input
                      type="checkbox"
                      id={techno.id}
                      name={techno.name}
                      value={techno.name}
                    />
                    {/* // On lui donne un label et htmlFor provenant de la table name */}
                    <label htmlFor={techno.name}>{techno.name}</label>
                    <div
                      role="button"
                      // Au clic, on appelle la fonction handleImageClick() et on lui passe l'id de la techno
                      onClick={() => handleImageClick(techno.id)}
                      // Fonction d’accessibilité pour le clavier. Si la touche enter ou espace est pressée, on appelle la fonction handleClick()
                      onKeyDown={(event) =>
                        handleImageKeyDown(event, techno.id)
                      }
                      // On ajoute un tabIndex pour que l'élément soit focusable (accessibilité)
                      tabIndex={0}
                      // On ajoute la classe selected si la techno est sélectionnée
                      className={`Signin--inputCheckbox--img ${
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
                  required
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
