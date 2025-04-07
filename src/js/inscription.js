// Processus de rendu

let formSignup = document.querySelector('#form-signup')

formSignup.addEventListener("submit", async (e) => {
    if (!formSignup.checkValidity()) {
        e.preventDefault()
    }
    let nom = document.querySelector("#nom").value
    let prenom = document.querySelector("#prenom").value
    let email = document.querySelector("#email").value
    try {
        formSignup.classList.add('was-validated')
        if (formSignup.checkValidity() || pattern.test(email)) {
            await user.addUser(nom, prenom, email)
        }
    } catch (error) {
        console.error(error)
    }
})