import React, { useState } from 'react';
import './style.scss';
import InputTitle from '../Form/InputTitle/InputTitle';
import SelectCheckMarks from '../Form/SelectCheckmark/SelectCheckMarks';
import MultilineTextFields from '../Form/MultiLineTextField/MultiLineTextFiled';
import ControlledSwitch from '../Form/Switch/Switch';
import ValidateButton from '../Form/Button/ValidateButton';

function FormProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technos: [],
    open: false,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Envoyer les données du formulaire à l'API ou effectuer d'autres actions nécessaires
    console.log(formData);
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
      <h1>Créer mon projet</h1>

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

export default FormProject;
