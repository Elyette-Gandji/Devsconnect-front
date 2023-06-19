import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ValidateButton({ onSubmit }) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="success" onClick={onSubmit}>
        Valider
      </Button>
    </Stack>
  );
}

export default ValidateButton;
