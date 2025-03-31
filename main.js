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

// Créer le pool de connexion
const pool = mysql.createPool(dbConfig)

// Tester la connexion
async function testConnexion() {
    try {
        // Demander une connexion au pool
        const connexion = await pool.getConnection()
        console.log('Connexion avec la base de donnée établie')
        connexion.release() // On rend la connexion disponible dans le pool
    } catch(error) {
        console.error('Erreur de connexion à la base de données')
    }
}
testConnexion()