import './style.scss';
import InputTitle from '../Form/InputTitle/InputTitle';
import SelectCheckmarks from '../Form/SelectCheckmark/SelectCheckmarks';
import MultilineTextFields from '../Form/MultiLineTextField/MultiLineTextFiled';
import ControlledSwitch from '../Form/Switch/Switch';
import ValidateButton from '../Form/Button/ValidateButton';

function FormProject() {
  return (
    <div>
      <h1>Créer mon projet</h1>

      <h2>Titre du projet</h2>
      <InputTitle />

      <h2>Quel sont les technos de votre projet</h2>
      <SelectCheckmarks />

      <h2>Description du projet</h2>
      <MultilineTextFields />

      <h2>Ouvert aux particpants</h2>
      <ControlledSwitch />

      <ValidateButton />
    </div>
  );
}

export default FormProject;
