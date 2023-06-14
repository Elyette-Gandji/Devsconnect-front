// ? Librairies
import { useState, useEffect } from 'react';
import Select, { OnChangeValue, StylesConfig } from 'react-select'; // Composant Select de la librairie react-select
import { CSSObject } from '@emotion/react'; // Pour typer les styles en ligne (inline styles)
import { useAppSelector, useAppDispatch } from '../../../../../hook/redux';

// ? Actions
import { resizeWindow } from '../../../../../store/reducer/main';
import { fetchAllTags } from '../../../../../store/reducer/tag';

// ? Styles
import './style.scss';

// ? Typage
//* Pour typer les options du select
type TagI = {
  id: number;
  name: string;
};
//* Pour typer le state css `isFocused`
type StateI = {
  isFocused: boolean;
};

function SelectComponent() {
  //! States Redux
  const windowWidth = useAppSelector((state) => state.main.windowWidth); // On récupère la largeur de la fenêtre navigateur
  const tags = useAppSelector((state) => state.tag.list.data); // On récupère les tags
  //! States local
  const [selectedTechnos, setSelectedTechnos] = useState<TagI[]>([]); // Servira à stocker les technos sélectionnées
  const [selectedTechnoLabels, setSelectedTechnoLabels] = useState<string[]>(
    []
  );
  const [selectTechnosFromApi, setSelectTechnosFromApi] = useState<TagI[]>([]); // Servira à stocker les technos récupérées depuis l'api

  //! Dispatch
  const dispatch = useAppDispatch();

  //! useEffect
  //* On utilise useEffect pour récupérer les tags
  useEffect(() => {
    dispatch(fetchAllTags());
    setSelectTechnosFromApi(tags);
  }, [dispatch]);

  //! Gestion du placeholder
  /* //* On utilise useEffect pour mettre à jour la state windowWidth
  /  //* à chaque fois que la largeur de la fenêtre navigateur change
  */
  useEffect(() => {
    const handleWindowResize = () => {
      // On met à jour et on fait un nouveau rendu avec la nouvelle largeur de la fenêtre navigateur
      dispatch(resizeWindow());
    };
    // On ajoute un écouteur d'évènement sur le resize de la fenêtre navigateur
    window.addEventListener('resize', handleWindowResize);

    // On retourne une fonction de nettoyage pour supprimer l'écouteur d'évènement
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [dispatch]);
  /* On utilise ensuite la donnée windowWidth pour gérer le placeholder
  /* Le texte affiché dans le select dépend de la largeur de la fenêtre navigateur
  */
  const placeHolderText =
    windowWidth > 768
      ? 'Choisissez vos technos (limité à 5 maximum)'
      : 'Limité à 5 maximum';

  /* //! Fonction pour le choix des technos
  /  Fonction appelée à chaque fois que l'utilisateur sélectionne ou désélectionne une option
  /  Elle met à jour la state selectedTechnos avec le tableau d'objets
  */
  const handleOptionChange = (selected: OnChangeValue<TagI>) => {
    // On vérifie que selected est bien un tableau (Array.isArray(selected))
    // Si c'est le cas, on met à jour la state selectedTechnos

    setSelectedTechnos(selected);

    // Pour chaque option sélectionnée, on récupère le nom (pour l'affichage dans la barre de selection)
    // On ajoute le nom de chaque techno sélectionnée dans un tableau
    const names = selected.map((option) => option.name);
    // On met à jour la state selectedTechnoLabels avec le tableau de noms
    setSelectedTechnoLabels(names);
  };

  //! Fonction pour désactiver les options si 5 technos sont sélectionnées
  // Si le tableau de technos sélectionnées contient 5 éléments, on désactive les options
  const isOptionDisabled = (selected: TagI | null) => {
    return selectedTechnos.length >= 5;
  };

  /* //! Fonction pour personnaliser le rendu des options
  / Fonction appelée pour chaque option et reçoit en paramètre un objet avec les propriétés label, value et icon
  / Elle filtre le tableau de technos sélectionnées et si l'option est présente, elle n'affiche que le label et disparait de la liste déroulante.
  / Sinon, elle affiche le label et l'icône (dans la liste déroulante).
  */
  const formatOptionLabel = ({ name }: TagI) => {
    const isOptionSelected = selectedTechnoLabels.includes(name);

    // On affiche seulement le nom présent dans la barre de sélection
    if (isOptionSelected) {
      return name; // Afficher uniquement le label sans l'icône
    }
    return (
      <div className="Select--techno--flex">
        <img
          src={`images/technos/${name.toLowerCase()}.svg`}
          alt={name}
          className="Select--techno-svg"
        />
        {name}
      </div>
    );
  };

  // //! Style du select
  const customStyles: StylesConfig<TagI, true> = {
    // CSSObject est un type de typescript pour typer les styles en ligne (inline styles)
    // On l'importe depuis react-select et on l'utilise comme type pour typer les styles
    //! container complet
    control: (baseStyles: CSSObject, state: StateI) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#b3575c' : '#333',
      borderRadius: '10px',
      //* Media queries
      '@media (min-width: 1081px)': { width: '510px' },
      '@media (max-width: 1080px)': { width: '550px' },
      '@media (max-width: 768px)': { width: '100%', maxWidth: '500px' },
    }),
    //! placeholder
    placeholder: (baseStyles: CSSObject) => ({
      ...baseStyles,
      margin: 'auto 0',
      fontSize: '1.5rem',
    }),
    //! Input > Container des valeurs sélectionnées
    multiValue: (baseStyles: CSSObject) => ({
      ...baseStyles,
      display: 'flex',
      margin: '0 0.2rem',
      border: '1px solid rgba(163, 163, 163, 0.4)',
      opacity: '0.8',
      // display: 'none',
    }),
    //! Input > Texte des valeurs sélectionnées
    multiValueLabel: (baseStyles: CSSObject) => ({
      ...baseStyles,
      color: 'black',
      fontSize: '1rem',
      // display: 'none',
    }),
    //! Input > Croix des valeurs sélectionnées
    multiValueRemove: (baseStyles: CSSObject) => ({
      ...baseStyles,
      color: '#b3575c',
    }),
    //! Croix de suppression générale
    clearIndicator: (baseStyles: CSSObject) => ({
      ...baseStyles,
      color: '#b3575c',
      opacity: '0.6',
    }),
    //! Flèche
    dropdownIndicator: (baseStyles: CSSObject) => ({
      ...baseStyles,
      padding: '0 0.5rem',
      opacity: '0.6',
    }),
    // ! Menu déroulant
    menu: (baseStyles: CSSObject) => ({
      ...baseStyles,
      margin: '0rem 0',
      width: '100%', // Largeur du menu déroulant, même largeur que le select
      borderRadius: '0 0 20px 20px',
      '@media (min-width: 1081px)': { width: '510px' },
      '@media (max-width: 1080px)': { width: '550px' },
      '@media (max-width: 768px)': { width: '100%', maxWidth: '500px' },
    }),
    //! Chaque item du menu déroulant
    option: (base) => ({
      ...base,
      cursor: 'pointer',
      background: '#3f3f3f',
      ':hover': {
        backgroundColor: '#282828',
      },
    }),
    // ! Texte du menu déroulant
    menuList: (baseStyles: CSSObject) => ({
      ...baseStyles,
      maxHeight: '280px', // Hauteur du menu déroulant (1 technos = 40px * 7 = 280px)
      overflowY: 'auto',
      color: '#f4fefe',
    }),
  };
  console.log('selectedTechnoFromApi', selectTechnosFromApi);

  // console.log('tags', tags);
  // console.log('technos', selectedTechnoLabels);
  // console.log('selectedTechnos', selectedTechnos);
  return (
    <Select
      id="selectTechnos"
      isMulti // Choix multiple
      name="technos"
      options={selectTechnosFromApi} // Tableau des technos (importé de l'api)
      className="FilterBar--select"
      placeholder={placeHolderText} // variable définie plus haut
      value={selectedTechnos} // Valeur de la sélection (voir state plus haut)
      onChange={handleOptionChange} // Fonction pour le choix des technos (voir fonction plus haut)
      isOptionDisabled={isOptionDisabled} // Désactive les options si 5 technos sont sélectionnées
      formatOptionLabel={formatOptionLabel} // Personnalisation du rendu des options (voir fonction plus haut)
      styles={customStyles} // Style du select (voir const plus haut)
      captureMenuScroll // Empêche le scroll du menu déroulant de scroller la page
    />
  );
}

export default SelectComponent;
