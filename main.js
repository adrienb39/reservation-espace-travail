// Processus principal

const mysql = require('mysql2/promise')

require('dotenv').config()

// Fenêtre principale
let window;

// Configuration de l'accès à la base de données
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Le nombre maximal de connexions simulatanés dans le pool
    waitForConnections: true,
    queueLimit: 0
}