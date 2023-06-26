import TextField from '@mui/material/TextField';
import { useState } from 'react';

function InputTitle() {
  const [title, setTitle] = useState('');
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <TextField
        required
        id="standard-required"
        label="Required"
        value={title}
        variant="standard"
        onChange={handleChange}
      />
    </div>
  );
}

export default InputTitle;
