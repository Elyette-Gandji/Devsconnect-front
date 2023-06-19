import { useState } from 'react';
import { useAppDispatch } from '../../../../hook/redux';
import { postOneProject } from '../../../../store/reducer/projects';
import './style.scss';
import InputTitle from '../Form/InputTitle/InputTitle';
import SelectCheckMarks from '../Form/SelectCheckmark/SelectCheckMarks';
import MultilineTextFields from '../Form/MultiLineTextField/MultiLineTextFiled';
import ControlledSwitch from '../Form/Switch/Switch';
import ValidateButton from '../Form/Button/ValidateButton';

function FormProject() {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technos: [],
    open: false,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Créer un objet contenant les données du formulaire
    const projectData = {
      title: formData.title,
      description: formData.description,
      availability: formData.open,
    };

    // Dispatch l'action pour créer un nouveau projet
    dispatch(postOneProject(projectData))
      .then((response) => {
        // Gérer la réponse de l'API en cas de succès
        console.log('Projet créé avec succès:', response.payload);

        setFormData({
          title: '',
          description: '',
          technos: [],
          open: false,
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la création du projet:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTechnosChange = (selectedTechnos) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      technos: selectedTechnos,
    }));
  };

  const handleSwitchChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      open: event.target.checked,
    }));
  };

  return (
    <div className="form-container">
      <h1>Créer mon projet</h1>

      <form onSubmit={handleFormSubmit}>
        <h2 className="form-title">Titre du projet</h2>
        <InputTitle
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <h2 className="form-title">Quelles sont les technos de votre projet</h2>
        <SelectCheckMarks
          selectedTechnos={formData.technos}
          onTechnosChange={handleTechnosChange}
        />

        <h2 className="form-title">Description du projet</h2>
        <MultilineTextFields
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <h2 className="form-title">Ouvert aux participants</h2>
        <ControlledSwitch
          checked={formData.open}
          onChange={handleSwitchChange}
        />

        <div className="validate-button">
          <ValidateButton onSubmit={handleFormSubmit} />
        </div>
      </form>
    </div>
  );
}

export default FormProject;
