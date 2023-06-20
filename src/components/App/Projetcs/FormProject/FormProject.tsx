import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import InputTitle from '../Form/InputTitle/InputTitle';
import MultilineTextFields from '../Form/MultiLineTextField/MultiLineTextFiled';
import SelectCheckMarks from '../Form/SelectCheckmark/SelectCheckmarks';
import ControlledSwitch from '../Form/Switch/Switch';
import ValidateButton from '../Form/Button/ValidateButton';
import { postOneProject } from '../../../../store/reducer/projects';

function FormProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technos, setTechnos] = useState([]);
  const [availability, setAvailability] = useState(false);
  const memberId = useAppSelector((state) => state.members.member.data?.id);
  const dispatch = useAppDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTechnosChange = (selectedTechnos) => {
    setTechnos(selectedTechnos);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.checked);
  };

  const handleSubmit = (event) => {
    const projectData = {
      title,
      description,
      technos,
      availability,
      user_id: memberId,
    };
    event.preventDefault();
    dispatch(postOneProject({ projectData }));
    console.log(projectData);
  };

  return (
    <form>
      <InputTitle value={title} onChange={handleTitleChange} />
      <MultilineTextFields
        value={description}
        onChange={handleDescriptionChange}
      />
      <SelectCheckMarks value={technos} onChange={handleTechnosChange} />
      <ControlledSwitch
        checked={availability}
        onChange={handleAvailabilityChange}
      />
      <ValidateButton onSubmit={handleSubmit} />
    </form>
  );
}

export default FormProject;
