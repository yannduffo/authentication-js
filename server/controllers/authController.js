//Importations
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

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
  
    try {
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Enregistrer l'utilisateur dans la bdd 
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;',
            [name, email, hashedPassword]
        );

        //récupérer le retour 
        const userCreated = result.rows[0];

        //retour res
        res.status(201).json({
            message: 'User registered sucessfully',
            user: {id: userCreated.id, name: userCreated.name, email: userCreated.email},
        });

    } catch (err) {
        //vérifier si l'erreur est dû à l'unicité obligatoire de l'email (err.code = 23505 est une erreur de contrainte 'UNIQUE')
        if(err.code == '23505'){
            res.status(400).json({
                error: 'EmailAlreadyExists',
                message: 'An account is already created for this email.',
            });
        }

        //pour les autres erreurs
        console.error(err); //afficher l'erreur sur la console du backend
        res.status(500).json({
            error: 'InternalServerError', 
            message: 'Something went wrong.',
        });
    }
};
  
// Connexion
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    //vérifier qu'aucun des champs n'est vide
    if(!email || !password){
        return res.status(400).json({
            error:'MissingFields',
            message:'Email AND password are required',
        });
    }

    try {
        //vérification que l'utilisateur existe
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const userFromDB = result.rows[0];
        
        //si le retour db est vide, on retourne une bad request
        if(!userFromDB){
            return res.status(400).json({
                error: 'EmailDoesNotExists',
                message: 'No user account found for this email',
            });
        }

        //si l'utilisateur existe bien on vérifie le password
        const isMatch = await bcrypt.compare(password, userFromDB.password);
        if(!isMatch){
            //si les password ne sont pas identiques
            return res.status(400).json({
                error: 'WrongPassword',
                message: 'Wrong password',
            });
        }

        //si les password match, on génère un token JWT et on le renvoie dans la réponse OK
        const token = jwt.sign({id: userFromDB.id, email: userFromDB.email, name: userFromDB.name}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({ 
            token,
            message: "Succesfully logged in",
        });

    } catch (err) {
        console.error(err); //afficher l'erreur sur la console du backend
        res.status(500).json({
            error: 'InternalServerError', 
            message: 'Something went wrong.',
        });
    }
};