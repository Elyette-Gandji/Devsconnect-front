// ? Librairies
import { useId, useState } from 'react';

// ? Typage local
interface InputProps {
  name: string; //! Obligatoire
  placeholder: string;
  slot?: string;
  [otherProps: string]: unknown; // On ne connait pas le type de ce qu'il peut y avoir => booléen, string, number, ...
}

// ? Fonction principale
function Input({ name, placeholder, slot, ...props }: InputProps) {
  // ? State
  // Local
  const [value, setValue] = useState('');

  // ? useId
  const inputId = useId(); // Génère un id aléatoire pour le champ

  // ? Fonctions
  /** //* Mise à jour de la valeur de l'input
   * @param {React.ChangeEvent<HTMLInputElement>} event - On récupère l'évènement
   * On met à jour le state value avec la valeur de l'input
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }

  // ? Rendu JSX
  return (
    <div className="Signin--inputText">
      <label
        htmlFor={inputId} // On lie le label à l'input avec l'id généré (htmlFor = for en JS)
        className="field-label"
      >
        {slot}
      </label>
      <input
        slot={slot} // Pour le label en français
        className="Form--input"
        name={name}
        value={value}
        onChange={handleChange}
        id={inputId}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default Input;
