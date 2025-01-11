/*
* authRoutes.js
* Création des routes register, login et home puis mise en lien avec les controleurs
*/

//Importations
const express = require("express")
const { registerUser, loginUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

//déclaration du router 
const router = express.Router();

// Route "register"
router.post('/register', registerUser);

// Route "login"
router.post('/login', loginUser);

// Route protégée "home"
router.get('/home', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted to home page.', user: req.user });
});

module.exports = router;