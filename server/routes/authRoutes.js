/*
* authRoutes.js
* Création des routes register et login et mise en lien avec les controleurs
*/

//Importations
const express = require("express")
const { registerUser, loginUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

//déclaration du router 
const router = express.Router();

// Route pour l'inscription
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

// Route protégée pour la page home
router.get('/home', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted to home page.', user: req.user });
});

module.exports = router;