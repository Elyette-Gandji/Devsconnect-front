// Librairies
import { useState, useEffect } from 'react';
// import Carousel from 'react-multi-carousel';
import { useAppDispatch, useAppSelector } from '../../../../../hook/redux';

// Composants
import CustomSwitch from '../../../../../utils/customSwitchUI';
import ProjectCard from '../ProjectCard';
import Input from '../../../../Form/Input';
import DeleteModale from './DeleteModale/DeleteModale';
// import 'react-multi-carousel/lib/styles.css';

// Fonctions asynchrones
import { fetchOneMember } from '../../../../../store/reducer/members';

// Styles
import './style.scss';
// import { Key, ReactElement, JSXElementConstructor, ReactNode } from 'react';

function MyProfile() {
  // State pour le check de open to work
  const [checked, setChecked] = useState(false); // Valeur du switch

  const userId = useAppSelector((state) => state.user.login.id); // On récupère l'id de l'utilisateur connecté
  const member = useAppSelector((state) => state.members.member.data); // On récupère les données du membre

  const [isEditMode, setIsEditMode] = useState(false); // State pour le mode édition
  const [isOpenDeleteModale, setIsOpenDeleteModale] = useState(true); // State pour la modale de <suppression></suppression>

  const dispatch = useAppDispatch();

  //! On récupère les données du membre
  useEffect(() => {
    if (userId) dispatch(fetchOneMember(userId));
  }, [dispatch, userId]);

  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  //! Fonction pour le bouton edit
  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditMode(!isEditMode);

    if (isEditMode) {
      console.log('update envoyé');
      // TODO : dispatch de la fonction d'update du profil
      // const form = event.currentTarget;
      // const formData = new FormData(form);
      // dispatch(updateMember(formData));
      // etc...
    }
  };

  //! Fonction pour le bouton delete
  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };

  return (
    <>
      <div className="MyProfile">
        <h2 className="MyProfile--title">
          {member?.firstname} {member?.name}
        </h2>

        <fieldset className="OneMember--firstField">
          {' '}
          {/* //! Style de OneMember */}
          <img
            src="/images/profil/profil.svg"
            alt="profil"
            className="OneMember--firstField--image" //! Style de OneMember
          />
          <Input
            name="Prénom"
            type="text"
            placeholder={member?.firstname || ''}
            disabled={!isEditMode}
          />
          <Input
            name="Nom"
            type="text"
            placeholder={member?.name || ''}
            disabled={!isEditMode}
          />
          <Input
            name="Pseudo"
            type="text"
            placeholder={member?.pseudo || ''}
            disabled={!isEditMode}
          />
          <Input
            name="Email"
            type="email"
            placeholder={member?.email || ''}
            disabled={!isEditMode}
          />
          <Input
            name="Mot de passe"
            type="password"
            placeholder="*****"
            disabled={!isEditMode}
          />
          <div className="Signin--openToWork">
            {' '}
            {/* //! Style de Signin */}
            <p>Ouvert aux projets</p>
            <CustomSwitch
              name="availability"
              checked={member?.availability || !checked}
              onChange={handleSwitch}
              disabled={!isEditMode}
            />
          </div>
          <label htmlFor="description" className="Signin--inputTextarea">
            {' '}
            {/* //! Style de Signin  */}A propos de moi
            <textarea
              name="description"
              id="description"
              placeholder={member?.description || ''}
              disabled={!isEditMode}
            />
          </label>
        </fieldset>
        <fieldset>
          <div className="OneMember--firstField--technos">
            <h4 className="OneMember--firstField--technos--title">
              Technos maitrisées
            </h4>
            <div className="OneMember--firstField--technos--technos">
              {/* //! Style de OneMember (changer en secondField egalement) */}
              {/* Si le membre à des tags, et si les tags sont sous la forme d'un tableau */}
              {!isEditMode
                ? member?.tags &&
                  Array.isArray(member.tags) &&
                  member.tags.map((tag) => (
                    <div
                      className="OneMember--firstField--technos--technos--group"
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
                : console.log('edit mode')}
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className="OneMember--secondField--projects">
            <h4 className="OneMember--secondField--projects--title">
              Projets réalisés
            </h4>
            {member?.projects &&
              member.projects.length > 0 &&
              member.projects.map((project) => (
                <ProjectCard key={project.id} projectID={project} />
              ))}
          </div>
        </fieldset>
        <fieldset className="MyProfile--fourthField--button">
          <button
            onClick={handleEditClick}
            type="submit"
            className={`MyProfile--fourthField--button--submit ${
              isEditMode ? 'updatedMode' : 'submittedMode'
            }`}
          >
            {isEditMode ? 'Valider' : 'Modifier mon profil'}
          </button>
          <button
            type="submit"
            className="MyProfile--fourthField--button--delete"
            onClick={handleDeleteModale}
          >
            Supprimer le profil
          </button>
        </fieldset>
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

/**
 *     header : titre (prénom nom)
div {
    Bloc 1 : inputs (mobile > ajout photo)
    Bloc 2 : technos (desktop > ajout photo)
    Bloc 3 : Projets (mobile caroussel ?)
    }
    footer : bouton  
  * */
