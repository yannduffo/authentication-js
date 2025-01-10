// Importer Express
const express = require('express');

// Créer une instance d'application Express
const app = express();

// Définir un port
const PORT = 8000;

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Définir une route de test
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
