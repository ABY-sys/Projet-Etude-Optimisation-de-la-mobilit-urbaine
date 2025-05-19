// functions/index.js

require('dotenv').config();
const functions = require('firebase-functions');
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const admin = require('firebase-admin');
const cors = require('cors');
const { Pool } = require('pg');

admin.initializeApp();

const corsOptions = {
  origin: 'http://localhost:5174',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

const dbConfig = functions.config().db;
if (!dbConfig || !dbConfig.user) {
  logger.error('Configuration de la base de données manquante');
  throw new Error('Configuration de la base de données manquante');
}


// Configuration de la connexion à Cloud SQL
const pool = new Pool({
  user: functions.config().db.user,
  host: functions.config().db.host,
  database: functions.config().db.name,
  password: functions.config().db.password,
  port: functions.config().db.port,
});


// Fonction d'inscription
exports.registerUser = onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    if (req.method !== 'POST') {
      logger.warn('Method Not Allowed'); // Utilisation de logger
      return res.status(405).send('Method Not Allowed');
    }

    const { full_name, email, password } = req.body;

    // Validation des données
    if (!full_name || !email || !password) {
      logger.error('Tous les champs sont requis.'); // Utilisation de logger
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
      // Création de l'utilisateur dans Firebase
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: full_name,
      });

      // Enregistrement dans Cloud SQL
      await pool.query(
        'INSERT INTO user_profiles (firebase_uid, full_name, email, created_at) VALUES ($1, $2, $3, NOW())',
        [userRecord.uid, full_name, email]
      );

      // Réponse réussie
      logger.info('Utilisateur créé avec succès.', { userId: userRecord.uid }); // Utilisation de logger
      return res.status(201).json({ message: 'Utilisateur créé avec succès.', userId: userRecord.uid });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      logger.error('Erreur lors de l\'inscription:', error); // Utilisation de logger
      if (error.code === 'auth/email-already-exists') {
        return res.status(400).json({ error: 'L\'email est déjà utilisé.' });
      }
      return res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
  });
});
