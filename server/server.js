// Importation
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Configurer dotenv (charger les données du fichier .env)
dotenv.config();

// Créer une instance d'application Express et définir le port
const app = express();
const PORT = 8000;

// configurer CORS
app.use(cors({ origin: 'http://localhost:3000' })); // Autoriser localhost:3000
app.use(express.json()); // Middleware pour parser le JSON

// Importer et utiliser les routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});