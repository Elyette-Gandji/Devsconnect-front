import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function InputTitle() {
  const [title, setTitle] = useState('');
  const handleChange = (event) => {
    setTitle(event.target.value);
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
          required
          id="standard-required"
          label="Required"
          value={title}
          variant="standard"
          onChange={handleChange}
        />
      </div>
    </Box>
  );
}

export default InputTitle;
