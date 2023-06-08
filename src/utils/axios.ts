// ? Fonction simple pour créer une instance d'Axios
// ? On entre l'url principal de l'appel API
//! L'instance d'Axios est exportée et pourra être utilisée pour stocker le token par exemple

import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',
});
