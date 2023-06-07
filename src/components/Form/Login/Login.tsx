// Composants
import Title from '../../App/Layout/Header/Title/Title';
import Input from '../Input';

// Styles
import './style.scss';

function Login() {
  return (
    <div className="Login">
      <div className="Login--container">
        <h2 className="Login--title">Connexion</h2>
        <form className="Login--form">
          <Input
            name="email"
            type="email"
            placeholder="Adresse Email"
            className="Login--inputText"
          />
          <Input
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="Login--inputText"
          />

          <button type="submit" className="Login--container--form--submit">
            Se connecter
          </button>
        </form>
        <p>DevsConnect</p>
      </div>
    </div>
  );
}

export default Login;
