/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
require('dotenv').config();

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const { Pool } = require('pg');

admin.initializeApp();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

// Configuration de la connexion à Cloud SQL
const pool = new Pool({
    user: process.env.DB_USER, 
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT, 
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.registerUser = functions.https.onRequest((req, res) => {
    corsMiddleware(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }
  
      const { full_name, email, password } = req.body;
  
      // Validation des données
      if (!full_name || !email || !password) {
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
        const result = await pool.query(
          'INSERT INTO user_profiles (firebase_uid, full_name, email, created_at) VALUES ($1, $2, $3, NOW())',
          [userRecord.uid, full_name, email]
        );
  
        // Réponse réussie
        return res.status(201).json({ message: 'Utilisateur créé avec succès.', userId: userRecord.uid });
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        if (error.code === 'auth/email-already-exists') {
          return res.status(400).json({ error: 'L\'email est déjà utilisé.' });
        }
        return res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
      }
    });
  });