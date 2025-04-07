// Processus de rendu

let formSignup = document.querySelector('#form-signup')

formSignup.addEventListener("submit", async (e) => {
    e.preventDefault()
    let nom = document.querySelector("#nom").value
    let prenom = document.querySelector("#prenom").value
    let email = document.querySelector("#email").value
    const erreurMessageEmail = document.querySelector("#erreur-message-email");
    try {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!pattern.test(email)) {
            erreurMessageEmail.classList.add('d-block', 'text-danger')
            erreurMessageEmail.textContent = "Email invalide"
            return
        } else {
            erreurMessageEmail.classList.remove('d-block')
            erreurMessageEmail.classList.add('d-none')
        }

        await user.addUser(nom, prenom, email)
    } catch (error) {
        console.error(error)
    }
})