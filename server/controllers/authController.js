//Importations
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simulation d'une base de données en mémoire
const users = [];
console.log(users);

// Registering
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validation simple
    if (!name || !email || !password) {
        //si problème dans la registration : réponse server "bad request"
        return res.status(400).json({ 
            error: 'MissingFields',
            message: 'Every fields are required.',
        });
    }
  
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Enregistrer l'utilisateur
    users.push({ name, email, password: hashedPassword });
    //envoie de la réponse server "ok" (201 pour certifier qu'un élément à bien été "Created")
    res.status(201).json({ 
        message: 'User registered successfully' 
    });
};
  
// Connexion
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(400).json({ 
            error: 'Invalid email',
            message: 'No user account found for this email.'
        });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ 
            error: 'Invalid password',
            message: 'Wrong password.'
        });
    }

    // Générer un token JWT et renvoyer une réponse OK 200
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ 
        token,
        message: "Succesfully logged in" 
    });
};