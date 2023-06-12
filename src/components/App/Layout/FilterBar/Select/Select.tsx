// Librairies
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useAppSelector, useAppDispatch } from '../../../../../hook/redux';

// Datas
import { technos } from '../../../../../utils/technosPath';

// Styles
import './style.scss';

function SelectComponent() {
  // State pour la taille de l'écran
  const windowWidth = useAppSelector((state) => state.main.windowWidth);
  // State pour la selection des technos
  const [selectedTechnos, setSelectedTechnos] = useState<[]>([]);

  //! Dispatch
  const dispatch = useAppDispatch();

  //! On utilise useEffect pour mettre à jour la state windowWidth à chaque fois que la largeur de la fenêtre navigateur change
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
  //! Placeholder du select en fonction de la taille de l'écran
  const placeHolderText =
    windowWidth > 768
      ? 'Choisissez vos technos (limité à 5 maximum)'
      : 'Limité à 5 maximum';

  //! Fonction pour le choix des technos
  const handleOptionChange = (selected) => {
    if (selected.length <= 5) {
      setSelectedTechnos(selected);
    }
  };
  // Fonction pour désactiver les options si 5 technos sont sélectionnées
  const isOptionDisabled = () => selectedTechnos.length >= 5;

  //! Fonction pour personnaliser le rendu des options
  //* Elle est appelée pour chaque option et reçoit en paramètre un objet avec les propriétés label, value et icon
  //* Elle filtre le tableau de technos sélectionnées et si l'option est présente, elle n'affiche que le label et disparait de la liste déroulante.
  //* Sinon, elle affiche le label et l'icône (dans la liste déroulante).
  const formatOptionLabel = ({ label, value, path }) => {
    if (selectedTechnos.some((option) => option.value === value)) {
      return label; // Afficher uniquement le value sans l'icône
    }
    return (
      <div className="Select--techno--flex">
        <img src={path} alt={value} className="Select--techno-svg" />
        {value}
      </div>
    );
  };

  // //! Style du select
  const customStyles = {
    // Styles personnalisés en ligne
    //! container complet
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#b3575c' : '#333',
      borderRadius: '10px',
      //* Media queries
      '@media (min-width: 1081px)': { width: '510px' },
      '@media (max-width: 1080px)': { width: '550px' },
      '@media (max-width: 768px)': { width: '100%', maxWidth: '500px' },
    }),
    //! container input
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      //* Media queries
      '@media (min-width: 1081px)': {},
      '@media (max-width: 1080px)': { width: '650px' },
      '@media (max-width: 768px)': { width: '90vw', maxWidth: '550px' },
      // width: '', // Sera limité par le container parent, permet de l'avoir en grand meme quand aucune option choisie
      // height: '5rem',
    }),
    //! placeholder
    placeholder: (baseStyles) => ({
      ...baseStyles,
      margin: 'auto 0',
      fontSize: '1.5rem',
    }),
    //! Input > Container des valeurs sélectionnées
    multiValue: (baseStyles) => ({
      ...baseStyles,
      display: 'flex',
      margin: '0 0.2rem',
      border: '1px solid rgba(163, 163, 163, 0.4)',
      opacity: '0.8',
      // display: 'none',
    }),
    //! Input > Texte des valeurs sélectionnées
    multiValueLabel: (baseStyles) => ({
      ...baseStyles,
      color: 'black',
      fontSize: '1rem',
      // display: 'none',
    }),
    //! Input > Croix des valeurs sélectionnées
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
      color: '#b3575c',
    }),
    //! Croix de suppression générale
    clearIndicator: (baseStyles) => ({
      ...baseStyles,
      color: '#b3575c',
      opacity: '0.6',
    }),
    //! Séparateur
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
    }),
    //! Flèche
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      padding: '0 0.5rem',
      opacity: '0.6',
    }),

    // ? Menu déroulant
    menu: (baseStyles) => ({
      ...baseStyles,
      margin: '0rem 0',
      width: '100%', // Largeur du menu déroulant, même largeur que le select
      backgroundColor: '#a3a3a3',
      borderRadius: '0 0 20px 20px',
      opacity: '1',
    }),
    // ? Texte du menu déroulant
    menuList: (baseStyles) => ({
      maxHeight: '280px', // Hauteur du menu déroulant (1 technos = 40px * 7 = 280px)
      overflowY: 'auto',
      color: '#535353',
    }),
  };
  return (
    <Select
      id="selectTechnos"
      isMulti // Choix multiple
      name="technos"
      options={technos} // Tableau des technos (importé de data/technosOptions)
      className="FilterBar--select"
      placeholder={placeHolderText}
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
