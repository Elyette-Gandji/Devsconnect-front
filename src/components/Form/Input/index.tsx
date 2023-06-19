//* Librairies
import { useId, useState } from 'react';
import Icon from '../../UI/Icon/Icon';

interface InputProps {
  //! Obligation d'avoir une propriété `name` sur l'input
  name: string;
  placeholder: string;
  [otherProps: string]: unknown; // On ne connait pas le type de ce qu'il peut y avoir => booleen, string, number, ...
}

// ? Composant
function Input({ name, placeholder, ...props }: InputProps) {
  // ? Génère un id aléatoire pour le champ
  const inputId = useId();

  // ? Gestion en local du champ
  const [value, setValue] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  return (
    <div className="Signin--inputText">
      {/* // ! On utilise l'id généré pour lier le label à l'input htmlFor = for  */}
      {/* // ! On utilise le placeholder reçu pour le label */}
      <label htmlFor={inputId} className="field-label">
        {name}
      </label>
      <input
        // infos obligatoires
        name={name}
        // React - state
        value={value}
        onChange={handleChange}
        id={inputId}
        placeholder={placeholder}
        // autres infos
        {...props}
        className=""
      />
    </div>
  );
}

// == Export
export default Input;
