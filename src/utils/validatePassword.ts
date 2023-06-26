// Fonction de validation du mot de passe
function validatePassword(password) {
  const minLength = 8; // Longueur minimale requise
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password); // Vérifie la présence de caractères spéciaux
  const hasUpperCase = /[A-Z]/.test(password); // Vérifie la présence de lettres majuscules
  const hasLowerCase = /[a-z]/.test(password); // Vérifie la présence de lettres minuscules

  if (password.length < minLength) {
    return `Le mot de passe doit contenir au moins ${minLength} caractères.`;
  }
  if (!hasSpecialChar) {
    return 'Le mot de passe doit contenir au moins un caractère spécial.';
  }
  if (!hasUpperCase || !hasLowerCase) {
    return 'Le mot de passe doit contenir au moins une lettre minuscule et une lettre majuscule.';
  }

  return ''; // Le mot de passe est valide
}

export default validatePassword;
