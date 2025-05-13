// Processus de rendu

const bcrypt = require('bcrypt');
const saltRounds = 10;
let formSignup = document.querySelector('#form-signup')

formSignup.addEventListener("submit", async (e) => {
    e.preventDefault()
    let nom = document.querySelector("#nom").value
    let prenom = document.querySelector("#prenom").value
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value
    let confirmPassword = document.querySelector("#confirmPassword").value
    try {
        const hashPassword = async (plainPassword) => {
            try {
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(plainPassword, salt);
                console.log('Mot de passe haché :', hashedPassword);
                return hashedPassword;
            } catch (error) {
                console.error('Erreur lors du hachage du mot de passe :', error);
                throw error;
            }
        };
        formSignup.classList.add('was-validated')
        if (formSignup.checkValidity()) {
            await user.addUser(nom, prenom, email, hashPassword(password))
        }
    } catch (error) {
        console.error(error)
    }
})