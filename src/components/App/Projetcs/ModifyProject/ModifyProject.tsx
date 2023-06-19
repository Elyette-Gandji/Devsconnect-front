import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import { putOneProject } from '../../../../store/reducer/projects';
import './style.scss';
import InputTitle from '../Form/InputTitle/InputTitle';
import SelectCheckMarks from '../Form/SelectCheckmark/SelectCheckMarks';
import MultilineTextFields from '../Form/MultiLineTextField/MultiLineTextFiled';
import ControlledSwitch from '../Form/Switch/Switch';
import ValidateButton from '../Form/Button/ValidateButton';

function FormEditProject({ projectId }) {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technos: [],
    open: false,
  });

  useEffect(() => {
    // Recherche du projet correspondant à l'identifiant donné
    const project = projects.find((project) => project.id === projectId);

    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        technos: project.technos,
        open: project.open,
      });
    }
  }, [projects, projectId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Créer un objet contenant les données du formulaire
    const projectData = {
      id: projectId,
      title: formData.title,
      description: formData.description,
      technos: formData.technos,
      open: formData.open,
    };

    // Dispatch l'action pour mettre à jour le projet
    dispatch(putOneProject(projectData))
      .then((response) => {
        // Gérer la réponse de l'API en cas de succès
        console.log('Projet mis à jour avec succès:', response.payload);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du projet:', error);
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
    <div>
      <h1>Modifier mon projet</h1>

      <form onSubmit={handleFormSubmit}>
        <h2>Titre du projet</h2>
        <InputTitle
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <h2>Quelles sont les technos de votre projet</h2>
        <SelectCheckMarks
          selectedTechnos={formData.technos}
          onTechnosChange={handleTechnosChange}
        />

        <h2>Description du projet</h2>
        <MultilineTextFields
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <h2>Ouvert aux participants</h2>
        <ControlledSwitch
          checked={formData.open}
          onChange={handleSwitchChange}
        />

        <ValidateButton onSubmit={handleFormSubmit} />
      </form>
    </div>
  );
}

export default FormEditProject;
