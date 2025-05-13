// Processus principal

const {app, BrowserWindow, ipcMain, Menu, dialog} = require("electron")
const path = require('path');
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

// Créer la fenêtre principale
function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // Acces aux API Node depuis le processus
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname, 'src/js/preload.js')
        }
    })
    window.webContents.openDevTools()
    // Création du menu
    createMenu()
    window.loadFile('src/pages/index.html');
}

// Fonction permettant de créer un menu personnalisé
function createMenu() {
    // Créer un tableau qui va représenter le menu => modèle
    const template = [
        {
            label: 'App',
            submenu: [
                {
                    label: 'Accueil',
                    click: () => window.loadFile('src/pages/index.html')
                },
                {
                    label: 'Versions',
                    click: () => window.loadFile('src/pages/version.html')
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quitter',
                    accelerator: process.platform === "darwin" ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Utilisateur',
            submenu: [
                {
                    label: 'Inscription',
                    click: () => window.loadFile('src/pages/inscription.html')
                }
            ]
        }
    ]
    // Créer le menu à partir du modèle
    const menu = Menu.buildFromTemplate(template)
    // Définir le menu comme étant le menu de l'application
    Menu.setApplicationMenu(menu)
}

// Attendre l'initialisation de l'application au démarrage
app.whenReady().then(() => {
    console.log('Application initialisée')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit
    }
})

// Ecouter sur le canal "get-versions"
ipcMain.handle('get-versions', () => {
    // Renvoyer un objet contenant les versions des outils
    return {
        electron: process.versions.electron,
        node: process.versions.node,
        chrome: process.versions.chrome
    }
})

async function inscription(nom, prenom, email, password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Inscription:' + nom, prenom, email, hashedPassword)
        const [result] = await pool.query('INSERT INTO utilisateurs (nom_utilisateur, prenom_utilisateur, email_utilisateur, mdp_utilisateur, created_at) VALUES (?, ?, ?, ?, now())', [nom, prenom, email, hashedPassword])
        console.log('Inscription avec l\'ID:' + result.insertId)
        return
    } catch (error) {
        console.error('Erreur lors de l\'inscription', error)
        throw error;
    }
}

ipcMain.handle('user:addUser', async (event, nom, prenom, email, password) => {
    try {
        await inscription(nom, prenom, email, password)
        window.loadFile('src/pages/index.html')
    } catch(error) {
        dialog.showErrorBox('Erreur technique', 'Impossible d\'ajouter un utilisateur')
        return [];
    }
})