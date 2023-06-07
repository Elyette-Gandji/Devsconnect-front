import './style.scss';

function Login() {
  return (
    <div className="Login">
      <div className="Login--container">
        <h2 className="Login--container--title">Connexion</h2>
        <form className="Login--container--form">
          <label htmlFor="email" className="Login--container--form--label">
            Email
            <input
              type="email"
              name="email"
              id="email"
              className="Login--container--form--label--input"
            />
          </label>
          <label htmlFor="password" className="Login--container--form--label">
            Mot de passe
            <input
              type="password"
              name="password"
              id="password"
              className="Login--container--form--label--input"
            />
          </label>
          <button type="submit" className="Login--container--form--submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
