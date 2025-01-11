import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      //envoie de la requête de registering à l'api
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      //vérifier si la réponse indique une erreur
      if (!response.ok){
        const errorData = await response.json();
        console.error(errorData.error); //affichage de l'erreur dans la console
        alert(errorData.message); //popup pour informer l'utilisateur de ce qu'il a mal fait
        return;
      }

      //si la réponse est ok (201)
      const data = await response.json();
      console.log(data.message); // Affiche "User registered successfully" dans la console
      window.location.href = '/'; //redirection vers la page par défaut (la page de login)
    }
    catch(error) {
      // Gestion des erreurs réseau ou autres
      console.error('Erreur réseau ou serveur :', error);
      alert('Impossible de se connecter au serveur. Vérifiez votre connexion.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          required 
        />
        <button type="submit" onClick={handleRegister}>Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
