// Processus de rendu

let formSignup = document.querySelector('#form-signup')

formSignup.addEventListener("submit", async (e) => {
    e.preventDefault()
    let nom = document.querySelector("#nom").value
    let prenom = document.querySelector("#prenom").value
    let email = document.querySelector("#email").value
    try {
        await user.addUser(nom, prenom, email)
    } catch (error) {
        console.error(error)
    }
})