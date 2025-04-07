// Processus de rendu

let formSignup = document.querySelector('#form-signup')

formSignup.addEventListener("submit", async (e) => {
    e.preventDefault()
    let nom = document.querySelector("#nom")
    try {
        await user.addUser(nom.value)
    } catch (error) {
        console.error(error)
    }
})