// Processus de rendu

let formSignup = document.querySelector('#form-signup')

formSignup.addEventListener("submit", async (e) => {
    e.preventDefault()
    let nom = document.querySelector("#nom").value
    let prenom = document.querySelector("#prenom").value
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value
    let confirmPassword = document.querySelector("#confirmPassword").value
    try {
        formSignup.classList.add('was-validated')
        if (formSignup.checkValidity()) {
            await user.addUser(nom, prenom, email, password)
        }
    } catch (error) {
        console.error(error)
    }
})