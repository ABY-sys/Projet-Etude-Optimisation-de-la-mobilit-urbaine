// functions/index.js

require('dotenv').config();
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const admin = require('firebase-admin');
const { Pool } = require('pg');

admin.initializeApp();


const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};


// Vérification de la configuration de la base de données
if (!dbConfig.user || !dbConfig.host || !dbConfig.database || !dbConfig.password || !dbConfig.port) {
  logger.error('Configuration de la base de données manquante');
  throw new Error('Configuration de la base de données manquante');
}

// Affichage de la configuration de la base de données pour le débogage
console.log('DB Config:', dbConfig);

// Configuration de la connexion à Cloud SQL
const pool = new Pool(dbConfig);

// Fonction d'inscription
exports.registerUser = onRequest({ cors: true }, async(req, res) => {
    // Add CORS headers
    res.set('Access-Control-Allow-Origin', '*'); // Allow all origins for development.  For production, specify your frontend's origin.
    res.set('Access-Control-Allow-Methods', 'POST'); // Specify allowed methods
    res.set('Access-Control-Allow-Headers', 'Content-Type'); // Specify allowed headers

    if (req.method === 'OPTIONS') {
      // Handle preflight requests
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      logger.warn('Method Not Allowed');
      return res.status(405).send('Method Not Allowed');
    }

    const { full_name, email, uid } = req.body;  // Récupérer l'UID depuis le frontend

    if (!full_name || !email || !uid) {  // Vérifier que l'UID est bien passé
      logger.error('Tous les champs sont requis (y compris l\'UID).');
      return res.status(400).json({ error: 'Tous les champs sont requis (y compris l\'UID).' });
    }

    try {
      const client = await pool.connect();
      console.log('Connexion réussie à la base de données');

      // Enregistrement dans Cloud SQL
      await client.query(
        'INSERT INTO user_profiles (firebase_uid, full_name, email, created_at) VALUES ($1, $2, $3, NOW())',
        [uid, full_name, email]  // Utiliser l'UID reçu
      );
      client.release();

      logger.info('Utilisateur enregistré dans la base de données.', { userId: uid });
      return res.status(201).json({ message: 'Utilisateur enregistré avec succès dans la base de données.', userId: uid });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement dans la base de données:', error);
      logger.error('Erreur lors de l\'enregistrement dans la base de données:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'enregistrement dans la base de données.' });
    }
});
