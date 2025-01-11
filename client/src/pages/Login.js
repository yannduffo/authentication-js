import React, {useState} from "react";
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      //envoie de la requête de connexion à l'api
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      //vérifier si la réponse server indique une erreur
      if(!response.ok){
        const errorData = await response.json();
        console.error(errorData.error); //affichage de l'erreur dans la console
        alert(errorData.message); //popup pour informer l'utilisateur de ce qu'il a mal fait
        return;
      }

      //Si la réponse est un succès (ok 201) on la traite
      const data = await response.json();
      localStorage.setItem('token', data.token); //stockage du token dans le local storage
      console.log(data.message); // Affiche "Succesfully logged in" dans la console
      window.location.href = '/home'; //redirection vers la page home
    }
    catch(error){
      // Gestion des erreurs réseau ou autres exceptions
      console.error('Erreur réseau ou serveur :', error);
      alert('Impossible de se connecter au serveur. Vérifiez votre connexion.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return(    
  <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
  </div>
  );
};

export default Login;