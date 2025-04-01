// Processus de rendu

const electronVersion = document.querySelector("#electron-version")
const nodeVersion = document.querySelector("#node-version")
const chromiumVersion = document.querySelector("#chromium-version")

async function lesVersions() {
    // Appel de la fonction getVersions exposée par le preload
    const v = await versions.getVersions()

    electronVersion.textContent = v.electron
    nodeVersion.textContent = v.node
    chromiumVersion.textContent = v.chrome
}

lesVersions()