import TextField from '@mui/material/TextField';
import { useState } from 'react';

function MultilineTextFields() {
  const [textField, setTextField] = useState('');

  const handleChange = (event) => {
    setTextField(event.target.value);
  };
  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={20}
        value={textField}
        onChange={handleChange}
      />
    </div>
  );
}

export default MultilineTextFields;
