import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function MultilineTextFields() {
  const [textField, setTextField] = useState('');

  const handleChange = (event) => {
    setTextField(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
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
    </Box>
  );
}

export default MultilineTextFields;
