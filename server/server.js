// Importation
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

// Configurer dotenv (charger les données du fichier .env dans process.env)
dotenv.config();

// Créer une instance d'application Express et définir le port
const app = express();
const PORT = process.env.PORT; //utilisation du port défini dans le fichier .env

//chargement certificat et privatekey HTTPS 
const sslKey = fs.readFileSync('../selfsigned.key');
const sslCertificate = fs.readFileSync('../selfsigned.crt');

// configurer CORS : pour autoriser l'interaction avec le serveur depuis l'extérieur
app.use(cors({ origin: 'http://localhost:3000' })); // Autoriser localhost:3000
app.use(express.json()); // Middleware pour parser le JSON

// Importer et utiliser les routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Démarrer le serveur HTTPS
https.createServer({key: sslKey, cert: sslCertificate}, app).listen(PORT, () => {
    console.log(`HTTPS server is running on https://localhost:${PORT}`);
});