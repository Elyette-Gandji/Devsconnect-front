// Librairies
import { useState, useEffect, useRef } from 'react';
// import Carousel from 'react-multi-carousel';
import { useAppDispatch, useAppSelector } from '../../../../../hook/redux';

// Composants
import CustomSwitch from '../../../../../utils/customSwitchUI';
import ProjectCard from '../ProjectCard';
import Input from '../../../../Form/Input';
import DeleteModale from './DeleteModale/DeleteModale';
// import 'react-multi-carousel/lib/styles.css';

// Fonctions asynchrones
import {
  fetchOneMember,
  updateMember,
} from '../../../../../store/reducer/members';
import { fetchAllTags } from '../../../../../store/reducer/tag';

// Styles
import './style.scss';
// import { Key, ReactElement, JSXElementConstructor, ReactNode } from 'react';

function MyProfile() {
  // State pour le check de open to work
  const [checked, setChecked] = useState(false); // Valeur du switch

  const userId = useAppSelector((state) => state.user.login.id); // On récupère l'id de l'utilisateur connecté
  const member = useAppSelector((state) => state.members.member.data); // On récupère les données du membre

  const allTags = useAppSelector((state) => state.tag.list.data); // On récupère les données du membre
  const [selectedTags, setSelectedTags] = useState([member?.tags]); // On récupère les tags du membre qu'on stocke pour la gestion de l'update

  const [isEditMode, setIsEditMode] = useState(false); // State pour le mode édition
  const [isOpenDeleteModale, setIsOpenDeleteModale] = useState(false); // State pour la modale de <suppression></suppression>

  //! useRef
  const formRef = useRef(null); // Utiliser pour récupérer les données du formulaire (référence au <form>)

  //! useDispatch
  const dispatch = useAppDispatch();

  //! On récupère les données du membre
  useEffect(() => {
    if (userId) dispatch(fetchOneMember(userId));
  }, [dispatch]);

  /** //! On récupère les tags
   * * Qu'on stocke dans un state pour la gestion de l'update
   * * A chaque modification des tags du membre (validation de l'update), on met à jour le state
   * * Quand il sera rappelé, il sera à jour
   */
  useEffect(() => {
    dispatch(fetchAllTags());
    setSelectedTags(member?.tags);
  }, [dispatch, member?.tags]);

  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  //! Fonction d'envoi du formulaire
  const handleSubmit = (event) => {
    const form = formRef.current;
    const formData = new FormData();

    form.rest(); // Vider le formulaire

    // On parcourt les champs du formulaire pour voir ceux qui ont été modifiés
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];

      // Vérifier si le champ a été modifié par l'utilisateur
      if (element.value !== '') {
        // ? Dans le cas ou le champ est écrit plutôt qu'en placeholder => (element.value !== element.defaultValue)
        // Ajouter le champ au FormData
        formData.append(element.name, element.value);
      }
    }
    console.log('formData', formData);
    // dispatch(updateMember(formData)); //todo A décommenter pour l'update
  };

  //! Fonction pour le bouton edit
  const handleEditClick = (event) => {
    event.preventDefault();

    setIsEditMode(!isEditMode);

    if (isEditMode) {
      console.log('selectedTags', selectedTags); // On envoie les tags sélectionnés en remplacement
      console.log('update envoyé');
      handleSubmit(event.currentTarget);
    }
  };

  /* //! Fonction pour le bouton delete
   * * On ouvre la modale de confirmation de suppression
   */
  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };

  /* //! Fonction pour la modification du tableau selectedTags
   * * On récupère l'id du tag cliqué
   * * On vérifie si le tag est déjà sélectionné (find)
   * * Si oui, on le retire du tableau et on retire la classe `selected` du tag grace a son id
   * * Si non, on l'ajoute au tableau et on ajoute la classe `selected` au tag grace a son id
   */
  const handleImageClick = (id: number) => {
    const selectedTag = allTags.find((tag) => tag.id === id);
    if (selectedTag) {
      if (
        selectedTags &&
        selectedTags.some((tag) => tag.id === selectedTag.id)
      ) {
        //! Le tag est déjà sélectionné, on le supprime
        const updatedTags = selectedTags.filter(
          (tag) => tag.id !== selectedTag.id
        );
        console.log(`On retire le tag ${selectedTag.name}`);
        setSelectedTags(updatedTags);

        //* On retire la classe `selected` du tag
        const tagElement = document.getElementById(`tag-${selectedTag.id}`); // On cible l'element par son id spécifique
        if (tagElement) tagElement.classList.remove('selected');
      } else {
        //! Le tag n'est pas sélectionné, on l'ajoute
        const updatedTags = [...selectedTags, selectedTag];
        console.log(`On ajoute le tag ${selectedTag.name}`);
        setSelectedTags(updatedTags);

        //* On ajoute la classe `selected` au tag
        const tagElement = document.getElementById(`tag-${selectedTag.id}`); // On cible l'element par son id spécifique
        if (tagElement) tagElement.classList.add('selected');
      }
    }
  };
  /* //* Une div n'est pas un element clickable
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

  return (
    <>
      <div className="MyProfile">
        <h2 className="MyProfile--title">
          {member?.firstname} {member?.name}
        </h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="MyProfile--content">
            <fieldset className="MyProfile--content--firstField">
              {' '}
              {/* //! Style de MyProfile */}
              <img
                className="MyProfile--content--firstField--image"
                src="/images/profil/profil.svg"
                alt="profil"
              />
              <Input
                name="Prénom"
                type="text"
                // value={isEditMode ? member?.firstname : ''}
                placeholder={member?.firstname || ''}
                disabled={!isEditMode}
              />
              <Input
                name="Nom"
                type="text"
                // value={isEditMode ? member?.name : ''}
                placeholder={member?.name || ''}
                disabled={!isEditMode}
              />
              <Input
                name="Pseudo"
                type="text"
                // value={isEditMode ? member?.pseudo : ''}
                placeholder={member?.pseudo || ''}
                disabled={!isEditMode}
              />
              <Input
                name="Email"
                type="email"
                // value={isEditMode ? member?.email : ''}
                placeholder={member?.email || ''}
                disabled={!isEditMode}
              />
              <Input
                name="Mot de passe"
                type="password"
                // value={isEditMode ? member?.password : '*****'}
                placeholder="*****"
                disabled={!isEditMode}
              />
              <div className="MyProfile--content--firstField--openToWork">
                <p>Ouvert aux projets</p>
                <CustomSwitch
                  name="availability"
                  checked={member?.availability || !checked}
                  onChange={handleSwitch}
                  disabled={!isEditMode}
                />
              </div>
              <label
                htmlFor="description"
                className="MyProfile--content--firstField--inputTextarea"
              >
                {' '}
                A propos de moi :
                <textarea
                  name="description"
                  id="description"
                  placeholder={member?.description || ''}
                  disabled={!isEditMode}
                />
              </label>
            </fieldset>
            <fieldset className="MyProfile--content--secondField">
              <img
                src="/images/profil/profil.svg"
                alt="profil"
                className="MyProfile--content--secondField--image"
              />
              <div className="MyProfile--content--secondField--technos">
                <h4 className="MyProfile--content--secondField--technos--title">
                  Technos
                </h4>
                <div className="MyProfile--content--secondField--technos--technos">
                  {/* //! Style dans MyProfile */}
                  {/* Rendu conditionnel : 
              si on est en mode édition, on affiche tous les tags
              sinon on affiche les tags du membre
              Dans la partie lecture, on map sur les tags du membre directement
              Dans la partie edition, on map sur all tags pour tous les afficher,
              puis on compare chaque tag avec ceux du membre pour avoir la classe selected si il le possède
              */}
                  {!isEditMode
                    ? member?.tags &&
                      member.tags.map((tag) => (
                        <div
                          className="MyProfile--content--secondField--technos--technos--group"
                          key={tag.id}
                        >
                          <img
                            src={`/images/technos/${tag.name.toLowerCase()}.svg`}
                            alt={tag.name}
                            title={tag.name}
                          />
                          <p>{tag.name}</p>
                        </div>
                      ))
                    : allTags &&
                      allTags.map((tag) => {
                        const isMatchingTag =
                          member?.tags.find(
                            (selectedTag) => selectedTag.id === tag.id
                          ) !== undefined;
                        const className = isMatchingTag
                          ? 'MyProfile--content--secondField--technos--technos--group--selected'
                          : 'MyProfile--content--secondField--technos--technos--group';
                        return (
                          <div
                            className={className}
                            role="button"
                            key={tag.id}
                            id={`tag-${tag.id}`} // Sert de référence pour la fonction handleImageClick ( permet d'ajouter ou de retirer la classe selected quand on ajoute/supprime le tag)
                            onClick={() => handleImageClick(tag.id)}
                            onKeyDown={(event) =>
                              handleImageKeyDown(event, tag.id)
                            }
                            // On ajoute un tabIndex pour que l'élément soit focusable (accessibilité)
                            tabIndex={0}
                          >
                            <img
                              src={`/images/technos/${tag.name.toLowerCase()}.svg`}
                              alt={tag.name}
                              title={tag.name}
                            />
                            <p>{tag.name}</p>
                          </div>
                        );
                      })}
                </div>
              </div>
            </fieldset>
            <fieldset className="MyProfile--content--thirdField">
              <div className="MyProfile--thirdField--projects">
                <h4 className="MyProfile--thirdField--projects--title">
                  Projets
                </h4>
                {member?.projects &&
                  member.projects.length > 0 &&
                  member.projects.map((project) => (
                    <ProjectCard key={project.id} projectID={project} />
                  ))}
              </div>
            </fieldset>
          </div>
          <fieldset className="MyProfile--fourthField--button">
            <div className="MyProfile--fourthField--button--group">
              <button
                onClick={handleEditClick}
                type="submit"
                // className=`{MyProfile--fourthField--button--cancel isEditMode ? 'visible' : 'hidden'}`
                className={`MyProfile--fourthField--button--cancel ${
                  isEditMode
                    ? 'MyProfile--fourthField--button--group--visible'
                    : 'MyProfile--fourthField--button--group--hidden'
                }`}
                disabled={!isEditMode}
              >
                Annuler
              </button>
              <button
                onClick={handleEditClick}
                type="submit"
                className={`MyProfile--fourthField--button--submit ${
                  isEditMode
                    ? 'MyProfile--fourthField--button--updatedMode'
                    : 'MyProfile--fourthField--button--submittedMode'
                }`}
              >
                {isEditMode ? 'Valider' : 'Modifier mon profil'}
              </button>
            </div>
            <button
              type="button"
              className="MyProfile--fourthField--button--delete"
              onClick={handleDeleteModale}
            >
              Supprimer le profil
            </button>
          </fieldset>
        </form>
      </div>
      {isOpenDeleteModale && (
        <DeleteModale
          isOpenDeleteModale={isOpenDeleteModale}
          setIsOpenDeleteModale={setIsOpenDeleteModale}
        />
      )}
    </>
  );
}

export default MyProfile;
