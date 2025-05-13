// Processus de rendu

let formSignup = document.querySelector('#form-signup')

formSignup.addEventListener("submit", async (e) => {
    e.preventDefault()
    let nom = document.querySelector("#nom").value
    let prenom = document.querySelector("#prenom").value
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value
    let confirmPassword = document.querySelector("#confirmPassword").value
    let error = document.querySelector('#error')
    try {
        if (password != confirmPassword) {
            error.textContent = 'Les mots de passe ne correspondent pas'
            error.classList.add('text-danger')
        } else {
            formSignup.classList.add('was-validated')
            error.textContent = ''
            if (formSignup.checkValidity()) {
                await user.addUser(nom, prenom, email, password)
            }
        }
    } catch (error) {
        console.error(error)
    }
})