var transcript = ''
let colorText = ''

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.info').style.display = 'none'
})

function runSpeechRecognition() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    let recognition = new SpeechRecognition()

    recognition.onresult = function (event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript = event.results[i][0].transcript
        }
    }

    recognition.continuous = true
    recognition.start()
}

runSpeechRecognition()

let couleurs = [
    {nom: "rouge", code: "#ff0000"},
    {nom: "bleu", code: "#0000ff"},
    {nom: "vert", code: "#008000"},
    {nom: "jaune", code: "#ffff00"},
    {nom: "orange", code: "#ff8000"},
    {nom: "violet", code: "#743eb0"},
    {nom: "rose", code: "#fa3799"},
    {nom: "noir", code: "#000000"},
    {nom: "blanc", code: "#ffffff"},
    {nom: "marron", code: "#804000"},
    {nom: "gris", code: "#808080"}
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let started = false

let btnStart = document.querySelector(".start")

btnStart.addEventListener("click", () => {
    started = true
    game()
    btnStart.style.display = "none"
})

let time = document.querySelector(".time")
let point = document.querySelector(".point")
let text = document.querySelector(".text")
let color = document.querySelector(":root")

let baseTime = 2000
let basePoint = 0

async function game() {

    time.innerHTML = baseTime / 100
    point.innerHTML = basePoint

    await sleep(200)
    generateColor()

    while(started) {
        baseTime-= 1
        time.innerHTML = baseTime / 100
        point.innerHTML = basePoint
        await sleep(10)

        checkColor()

        if (baseTime <= 0) {
            started = false
        }
    }

    btnStart.style.display = "block"
    btnStart.innerHTML = "REJOUER"
    baseTime = 2000
    basePoint = 0
    text.innerHTML = ""
}

function generateColor() {
    let colorText = Math.floor(Math.random() * couleurs.length)

    text.innerHTML = couleurs[colorText].nom
    color.style.setProperty("--color", choisirCouleurExclue(couleurs[colorText]))

    text.style = generateRandomStyle()
}

function choisirCouleurExclue(couleurExclue) {
    const couleursDisponibles = JSON.parse(JSON.stringify(couleurs))
    const couleursFiltrees = couleursDisponibles.filter(couleur => couleur.nom !== couleurExclue.nom)
    const indiceCouleur = Math.floor(Math.random() * couleursFiltrees.length)

    colorText = couleursFiltrees[indiceCouleur].nom
    return couleursFiltrees[indiceCouleur].code
}

function generateRandomStyle() {
    const leftPercentage = Math.random() * 60 + 20
    const topPercentage = Math.random() * 60 + 20

    return `left: ${leftPercentage}%; top: ${topPercentage}%`
}

function checkColor() {
    if (transcript.trim() == colorText) {
        baseTime += 100
        basePoint += 1
        generateColor()
    }
}