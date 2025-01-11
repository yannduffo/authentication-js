import React, { useEffect, useState } from 'react';

function Home() {
    const [message, setMessage] = useState('Loading...');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Vérifie si un token existe et tente de valider l'utilisateur
    useEffect(() => {
    const checkAuth = async () => {
        //chargement du token depuis la mémoire locale
        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('Unauthorized: Please login first.');
            return;
        }

        try {
            // Appel au backend pour vérifier le token
            const response = await fetch('http://localhost:8000/api/home', {
                method: 'GET',
                headers: { Authorization: token },
        });

        //en fonction de la réponse du serveur sur la vérification du token
        if (response.ok) {
            const data = await response.json();
            setMessage(`Welcome to the Home Page, ${data.user.email}!`);
            setIsAuthenticated(true);
        } else {
            setMessage('Unauthorized: Invalid token.');
        }
        } catch (error) {
            setMessage('Error: Unable to verify token.');
        }
    };

    checkAuth();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <p>{message}</p>
            {isAuthenticated && <button className="logoutButton" onClick={() => logout()}>Logout</button>}
        </div>
    );
}

// Fonction pour déconnecter l'utilisateur
function logout() {
    localStorage.removeItem('token'); // Supprimer le token
    window.location.href = '/'; // Rediriger vers la page de login
}

export default Home;
