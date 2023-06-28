// ? Librairies
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hook/redux';

// ? Fonctions externes
import { resetMessage, updateFlash } from '../../../../../store/reducer/main';
import validatePassword from '../../../../../utils/validatePassword';
import { fetchAllTags } from '../../../../../store/reducer/tag';
import { fetchOneMember } from '../../../../../store/reducer/members';
import updateMember from '../../../../../store/actions/updateMember';
import { toggleEditMode } from '../../../../../store/reducer/log';

// ? Composants
import CustomSwitch from '../../../../../utils/customSwitchUI';
import ProjectCard from '../ProjectCard';
import Input from '../../../../Form/Input';
import DeleteModale from './DeleteModale/DeleteModale';

// ? Styles
import './style.scss';

// ? Typage global
import { TagI, MemberI } from '../../../../../@types/interface';

// ? Fonction principale
function MyProfile() {
  // ? State
  // Store
  const member: MemberI | null = useAppSelector(
    (state) => state.members.member.data
  ); // On récupère les données du membre
  const userId = useAppSelector((state) => state.user.login.id); // On récupère l'id de l'utilisateur connecté
  const allTags: TagI[] = useAppSelector((state) => state.tag.list.data); // On récupère les tags
  const isEditMode = useAppSelector((state) => state.log.isEditMode); // On récupère le state isEditMode

  // Local
  const [checked, setChecked] = useState(false); // Valeur du switch
  const [emailValue, setEmailValue] = useState(''); // On récupère l'email du membre qu'on stocke (pour la gestion de l'update)
  const [selectedTags, setSelectedTags] = useState<TagI[] | undefined>(
    member?.tags
  ); // On récupère les tags du membre qu'on stocke (pour la gestion de l'update)
  // const [isEditMode, setIsEditMode] = useState(false); // State pour le mode édition
  const [isOpenDeleteModale, setIsOpenDeleteModale] = useState(false); // State pour la modale de suppression

  // ? useRef
  const formRef = useRef<HTMLFormElement>(null); // Utiliser pour récupérer les données du formulaire (référence au <form>)

  // ? useDispatch
  const dispatch = useAppDispatch();
  // ? useEffect
  useEffect(() => {
    // On récupère les données du membre en fonction de l'id
    if (userId) {
      const userIdString = userId.toString(); // On convertit l'id en string
      dispatch(fetchOneMember(userIdString));
      setChecked(member?.availability); // On stocke la valeur de l'availability du membre dans le state checked
    }
  }, [dispatch, isEditMode, userId]); // On rappelle le useEffect à chaque modification du state isEditMode et/ou userId

  useEffect(() => {
    // On récupère tous les tags
    dispatch(fetchAllTags());
    setSelectedTags(member?.tags); // On stocke les tags du membre dans le state selectedTags
  }, [dispatch, member?.tags, isEditMode]); // On rappelle le useEffect à chaque modification du state isEditMode et/ou member?.tags

  // ? Fonctions
  /** //* Switch open to work
   * @param {boolean} checked - valeur du switch
   * Au clic, on inverse la valeur du switch
   */
  const handleSwitch = () => {
    setChecked(!checked);
  };

  /** //* Fonction pour le bouton annuler
   * @param {boolean} isEditMode - valeur du state isEditMode
   * Au clic, on inverse la valeur du state isEditMode
   */
  const handleCancelClick = () => {
    dispatch(toggleEditMode());
  };

  /** //* Fonction pour le bouton delete
   * @param {boolean} isOpenDeleteModale - valeur du state isOpenDeleteModale
   * Au clic, on inverse la valeur du state isOpenDeleteModale
   * qui affiche ou non la modale de suppression
   */
  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };

  /** //* Fonction pour la modification du tableau selectedTags
   * @param {number} id - id du tag cliqué
   * On récupère l'id du tag cliqué
   * On vérifie si le tag est présent dans selectedTags (find)
   * Si oui, on le retire du tableau et on retire la classe `selected` du tag.
   * Si non, on l'ajoute au tableau et on ajoute la classe `selected` au tag.
   */
  const handleImageClick = (id: number) => {
    // Si on trouve l'id dans allTags, on stocke dans selectedTag
    const selectedTag = allTags.find((tag) => tag.id === id);
    if (selectedTag) {
      if (
        // Si selectedTags existe et que selectedTag est présent dans selectedTags
        selectedTags &&
        selectedTags.some((tag) => tag.id === selectedTag.id)
      ) {
        // ? Le tag est déjà sélectionné
        // On le supprime en filtrant selectedTags pour ne garder que ceux avec un id différent
        const updatedTags = selectedTags.filter(
          (tag) => tag.id !== selectedTag.id
        );
        // On met à jour le state
        setSelectedTags(updatedTags);

        // On retire la classe `selected` du tag
        const tagElement = document.getElementById(`tag-${selectedTag.id}`); // On cible l'element par son id spécifique
        if (tagElement) tagElement.classList.remove('selected'); // Si on trouve l'element avec l'id de selectedTag, on retire la classe `selected`
      } else {
        // ? Le tag n'est pas sélectionné
        // On l'ajoute en concaténant selectedTags et selectedTag dans updatedTags (spread operator)
        // Pour éviter l'erreur de linter sur le ternaire imbriqué => eslint-disable-next-line no-nested-ternary
        // eslint-disable-next-line no-nested-ternary
        const updatedTags: TagI[] | undefined = selectedTag
          ? selectedTags !== undefined
            ? [...selectedTags, selectedTag]
            : [selectedTag]
          : [selectedTag]; // Si selectedTags existe, on concatène, sinon on crée un tableau avec selectedTag
        // On met à jour le state
        setSelectedTags(updatedTags);

        // On ajoute la classe `selected` au tag
        const tagElement = document.getElementById(`tag-${selectedTag.id}`); // On cible l'element par son id spécifique
        if (tagElement) tagElement.classList.add('selected'); // Si on trouve l'element avec l'id de selectedTag, on ajoute la classe `selected`
      }
    }
  };
  /** //! Accessibilité
   * Une div n'est pas un element clickable par défaut.
   * @param {React.KeyboardEvent<HTMLDivElement>} event - event du clavier
   * @param {string} imageId - id de l'image cliquée
   * On ajoute un fonction d’accessibilité pour le clavier.
   * Si la touche enter ou espace est pressée, on appelle la fonction handleClick() juste au dessus.
   */
  const handleImageKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    imageId: string
  ) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleImageClick(Number(imageId));
    }
  };

  /** //* Fonction d'envoi du formulaire
   * @param {React.FormEvent<HTMLFormElement>} event - event du formulaire
   * On empêche le comportement par défaut du formulaire
   * On crée un objet formData pour stocker les données du formulaire
   * On stocke les données du formulaire dans un objet
   * On soumet le formulaire
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ! Déclaration des variables
    const formData = new FormData(); // On crée un objet formData pour stocker les données du formulaire
    const objData = Object.fromEntries(formData.entries()); // On stocke les données du formulaire dans un objet

    // inputs
    const inputs = formRef.current
      ? formRef.current.querySelectorAll('.MyProfile--input') // On cible tous les inputs du formulaire
      : null;

    // textarea
    const textarea = formRef.current
      ? formRef.current.querySelector('textarea') // On cible le textarea du formulaire
      : null;
    const textareaName: keyof MemberI = textarea?.name as keyof MemberI; // On récupère le name du textarea
    const textareaValue: string | undefined = textarea?.value; // On récupère la value du textarea
    const firstname = inputs?.item(0) as HTMLInputElement; // On cible le premier input du formulaire
    const name = inputs?.item(1) as HTMLInputElement; // On cible le premier input du formulaire
    const pseudo = inputs?.item(2) as HTMLInputElement; // On cible le premier input du formulaire
    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Regex pour vérifier le format de l'email
    // password
    const passwordElement = document.querySelector(
      '#password'
    ) as HTMLInputElement;
    const password = passwordElement.value;

    // erreurs du formulaire
    let isFormValid = true; // Variable pour suivre l'état des conditions

    // ! Gestion des erreurs

    dispatch(resetMessage()); // On reset le message flash
    if (firstname.value !== '') {
      if (firstname.value.length < 1 || firstname.value.length > 30) {
        dispatch(
          updateFlash({
            type: 'error',
            children: 'Votre prénom doit contenir entre 1 et 30 caractères',
          })
        );
        isFormValid = false;
      }
    }
    if (name.value !== '') {
      if (name.value.length < 1 || name.value.length > 30) {
        dispatch(
          updateFlash({
            type: 'error',
            children: 'Votre nom doit contenir entre 1 et 30 caractères',
          })
        );
        isFormValid = false;
      }
    }
    if (pseudo.value !== '') {
      if (pseudo.value.length < 1 || pseudo.value.length > 30) {
        dispatch(
          updateFlash({
            type: 'error',
            children: 'Votre pseudo doit contenir entre 1 et 30 caractères',
          })
        );
        isFormValid = false;
      }
    }
    if (emailValue !== '' && !emailRegex.test(emailValue)) {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez renseigner un email valide',
        })
      );
      isFormValid = false;
    }
    if (password !== '') {
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
    if (selectedTags.length === 0) {
      dispatch(
        updateFlash({
          type: 'error',
          children: 'Veuillez sélectionner au moins une techno',
        })
      );
      isFormValid = false;
    }

    // ! Soumission du formulaire
    if (isFormValid) {
      // ? Gestion des inputs
      inputs?.forEach((input) => {
        // Pour chaque input
        const { name, value } = input as HTMLInputElement; // On récupère le name et la value en destructuring
        // Vérifiez si `name` est une clé valide de `MemberI`
        if (member && name in member) {
          const memberValue = member[name as keyof MemberI]; // Obtenez la valeur actuelle de `name` dans `objData`

          // Si la valeur est différente d'une string vide et de la valeur initiale, on l'ajoute à formData et à objData
          if (value !== '' && value !== memberValue) {
            formData.append(name, value);
            objData[name] = value;
          }
        }
      });

      // ? Gestion du textarea
      if (
        textareaValue !== undefined && // On vérifie que textareaValue existe
        textareaValue !== '' && // On vérifie que textareaValue n'est pas une string vide
        textareaName && // On vérifie que textareaName existe
        member && // On vérifie que member existe
        textareaValue !== member[textareaName] // On vérifie que textareaValue est différent de la valeur initiale
      ) {
        formData.append(textareaName, textareaValue); // Alors, on ajoute textareaValue à formData
        objData[textareaName] = textareaValue; // On ajoute textareaValue à objData
      }

      // ? Gestion du password
      formData.append('password', password);
      objData.password = password;

      // ? Gestion du switch openToWork
      if (
        checked !== undefined && // On vérifie que checked existe
        checked !== member?.availability
      ) {
        // Si la valeur du state est différente de la valeur du membre, on l'ajoute à formData
        formData.append('availability', checked.toString());
      }

      // ? Gestion des tags
      if (selectedTags && selectedTags.length > 0) {
        // On vérifie que selectedTags existe et qu'il contient au moins un tag
        const selectedTagsData = selectedTags.map((tag) => tag.id); // On crée un tableau avec les id des tags sélectionnés
        // const tagsJSON = JSON.stringify(selectedTagsData); // On convertie le tableau en chaîne JSON

        formData.append('tags', selectedTagsData); // On ajoute le tableau selectedTagsData à formData
        objData.tags = selectedTagsData; // On ajoute le tableau selectedTagsData à objData
      }

      dispatch(
        // On dispatch l'action updateMember avec l'id du membre et les données du formulaire
        updateMember({
          id: userId,
          formData: { availability: checked, ...objData }, // Dans formData, on ajoute la valeur de checked et on ajoute les données du formulaire (objData)
        })
      );
    } else {
      dispatch(toggleEditMode(true));
    }
  };

  /** //* Fonction pour le bouton d'édition
   * @param {React.FormEvent<HTMLFormElement>} event - event du formulaire
   * On empêche le comportement par défaut du formulaire
   * Au clic, on inverse la valeur du state isEditMode
   *
   * Si isEditMode est true, on soumet le formulaire
   */
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch(toggleEditMode());

    if (isEditMode) {
      handleSubmit(event);
    }
  };
  // ? Rendu JSX
  return (
    <>
      <div className="MyProfile">
        <h2 className="MyProfile--title">
          {member?.firstname} {member?.name}
        </h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="MyProfile--content">
            <fieldset className="MyProfile--content--firstField">
              <img
                className="MyProfile--content--firstField--image"
                src="/images/profil/profil.svg"
                alt="profil"
              />
              {/* Pour chaque input, on désactive le champ si on est pas en mode édition */}
              <Input
                name="firstname"
                slot="Prénom"
                type="text"
                placeholder={member?.firstname || ''}
                disabled={!isEditMode}
                className="MyProfile--input"
              />
              <Input
                name="name"
                slot="Nom"
                type="text"
                placeholder={member?.name || ''}
                disabled={!isEditMode}
                className="MyProfile--input"
              />
              <Input
                name="pseudo"
                slot="Pseudo"
                type="text"
                placeholder={member?.pseudo || ''}
                disabled={!isEditMode}
                className="MyProfile--input"
              />
              <Input
                name="email"
                slot="Email"
                id="email"
                type="email"
                placeholder={member?.email || ''}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                disabled={!isEditMode}
                className="MyProfile--input"
              />
              <Input
                id="password"
                slot="Mot de passe"
                name="password"
                type="password"
                placeholder="*****"
                disabled={!isEditMode}
                className="MyProfile--input"
              />
              <div className="MyProfile--content--firstField--openToWork">
                <p>Ouvert aux projets</p>
                <CustomSwitch
                  name="availability"
                  checked={isEditMode ? checked : member?.availability} // Si on est en mode édition, on affiche la valeur du state checked, sinon on affiche la valeur du membre
                  onChange={handleSwitch} // On appelle la fonction handleSwitch au changement de valeur du switch
                  disabled={!isEditMode} // On désactive le switch si on est pas en mode édition
                />
              </div>
              <label
                htmlFor="description"
                className="MyProfile--content--firstField--inputTextarea"
              >
                A propos de moi :
                <textarea
                  name="description"
                  id="description"
                  placeholder={member?.description || ''}
                  disabled={!isEditMode} // On désactive le textarea si on est pas en mode édition
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
                  Mes technos
                </h4>
                <p>(1 techno minimum et 5 technos maximum)</p>
                <div className="MyProfile--content--secondField--technos--technos">
                  {/** //! Rendu conditionnel des tags
                   * @param {boolean} isEditMode - Si on est en mode édition ou lecture
                   * @param {array} member.tags - Les tags du membre
                   * @param {array} allTags - Tous les tags
                   *
                   * Affichage des tags en fonction des conditions lecture ou édition
                   */}
                  {!isEditMode
                    ? /** //* En mode lecture
                       * Si on a des tags, on les affiche avec un map() sur les tags du membre
                       * On ajoute une key à chaque tag
                       * On affiche l'image du tag et son nom
                       */
                      member?.tags &&
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
                    : /** //* En mode édition
                       * Si on a des tags, on les affiche avec un map() sur allTags
                       * On ajoute une key à chaque tag
                       * On affiche l'image du tag et son nom
                       *
                       * On vérifie si le tag est présent dans les tags du membre pour ajouter la classe selected
                       */
                      allTags &&
                      allTags?.map((tag) => {
                        const isMatchingTag =
                          member?.tags?.find(
                            (memberTag) => memberTag.id === tag.id // On vérifie si le tag est présent dans les tags du membre
                          ) !== undefined;
                        const className = isMatchingTag ? 'selected' : ''; // Si le tag est présent dans les tags du membre, on ajoute la classe selected
                        return (
                          <div
                            className={`MyProfile--content--secondField--technos--technos--group ${className}`}
                            role="button"
                            key={tag.id}
                            id={`tag-${tag.id}`} // Sert de référence pour la fonction handleImageClick ( permet d'ajouter ou de retirer la classe selected quand on ajoute/supprime le tag)
                            onClick={() => handleImageClick(tag.id)} // On appelle la fonction handleImageClick au clic sur l'image
                            onKeyDown={(
                              event // On appelle la fonction handleImageKeyDown au keydown sur l'image
                            ) => handleImageKeyDown(event, tag.id.toString())}
                            tabIndex={0} // On ajoute un tabIndex pour que l'élément soit focusable (accessibilité)
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
                {/** //! Projets du membre
                 * @param {array} member.projects - Les projets du membre
                 * Si on a au moins un projet, on les affiche avec un map() sur les projets du membre
                 * Pour chaque projet, on envoie au composant <ProjectCard /> une key et le projet
                 */}
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
              <button // ? Bouton annuler
                onClick={handleCancelClick} // On appelle la fonction handleCancelClick au clic sur le bouton
                type="button"
                className={`MyProfile--fourthField--button--cancel ${
                  // On contrôle l'affichage du bouton si on est en mode édition grâce à la classe CSS visible ou hidden
                  isEditMode
                    ? 'MyProfile--fourthField--button--group--visible'
                    : 'MyProfile--fourthField--button--group--hidden'
                }`}
                disabled={!isEditMode}
              >
                Annuler
              </button>
              <button // ? Bouton modifier ou valider
                onClick={handleEditClick}
                type="button"
                className={`MyProfile--fourthField--button--submit ${
                  // On contrôle l'affichage du bouton si on est en mode édition grâce à la classe CSS updatedMode ou submittedMode
                  isEditMode
                    ? 'MyProfile--fourthField--button--updatedMode'
                    : 'MyProfile--fourthField--button--submittedMode'
                }`}
              >
                {isEditMode ? 'Valider' : 'Modifier mon profil'}{' '}
                {/* On affiche le texte en fonction du mode isEditMode */}
              </button>
            </div>
            <button // ? Bouton supprimer le profil
              type="button"
              className="MyProfile--fourthField--button--delete"
              onClick={handleDeleteModale} // On appelle la fonction handleDeleteModale au clic sur le bouton
            >
              Supprimer le profil
            </button>
          </fieldset>
        </form>
      </div>
      {/** //! Modale de suppression
       * @param {boolean} isOpenDeleteModale - Si la modale est ouverte ou non
       * @param {function} setIsOpenDeleteModale - Setter pour modifier isOpenDeleteModale
       * Si isOpenDeleteModale est true, on affiche la modale
       * On envoie à la modale la fonction setIsOpenDeleteModale pour pouvoir la fermer depuis la modale
       */}
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
