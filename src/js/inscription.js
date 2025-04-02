// Processus de rendu

var nom = document.getElementById("nom")
var prenom = document.getElementById("prenom")
var email = document.getElementById("email")
var password = document.getElementById("password")
var confirmPassword = document.getElementById("confirmPassword")
const inscription = document.querySelector('#inscription')

document.getElementById('inscription').onclick = async function () {
    if (nom && prenom && email && password) {
        nom =  nom.value
        prenom =  prenom.value
        email =  email.value
        password =  password.value
        inscription = await inscription.add(nom, prenom, email, password)
    }
}