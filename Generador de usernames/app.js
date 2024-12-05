const adjectives = ['Blue', 'Happy', 'Sunny', 'Clever', 'Quick', 'Smart', 'Funny', 'Kind', 'Brave', 'Gentle'];
const nouns = ['Cat', 'Dog', 'Bird', 'Fish', 'Fox', 'Bear', 'Lion', 'Tiger', 'Elephant', 'Monkey'];
const colors = ['Red', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 'White', 'Brown', 'Gray'];
const hobbies = ['Gamer', 'Traveler', 'Coder', 'Reader', 'Cook', 'Painter', 'Singer', 'Dancer', 'Athlete', 'Gardener'];

const userNameGenerate = document.getElementById("userName");
const btnNames = document.getElementById("btnNames");
const long = document.getElementById("long");
const copy = document.getElementById("copy");
const lengthWords = document.getElementById("lengthWords");

// Update the displayed length value
long.addEventListener("input", () => {
  lengthWords.textContent = long.value;
});

btnNames.addEventListener("click", function userNamesGenerator(e) {
    e.preventDefault();

    const addColors = document.getElementById("colors").checked;
    const addNouns = document.getElementById("nouns").checked;
    const addAdjectives = document.getElementById("adjectives").checked;
    const addHobbies = document.getElementById("hobbies").checked;
    const addNumber = document.getElementById("number").checked;
    const userWord = document.getElementById("userWord").value;

    if (!addColors && !addNouns && !addAdjectives && !addHobbies) {
        alert("Debes seleccionar al menos una categoría para generar un nombre de usuario");
        return;
    }

    if (userWord === "") {
        alert("Debes escribir una palabra para generar un nombre de usuario");
        return;
    }

    let userName = [];

    if (addColors) userName = userName.concat(colors);
    if (addNouns) userName = userName.concat(nouns);
    if (addAdjectives) userName = userName.concat(adjectives);
    if (addHobbies) userName = userName.concat(hobbies);

    let userNameReturn = "";

    for (let index = 0; index < long.value - 1; index++) {
        const element = Math.floor(Math.random() * userName.length);
        userNameReturn += userName[element];
    }

    if (addNumber) {
        const randomNum = Math.floor(Math.random() * (100000 - 10 + 1) + 10);
        userNameReturn += randomNum;
    }

    userNameGenerate.value = userWord + userNameReturn;
});

copy.addEventListener("click", function copyToClipBoard() {
    userNameGenerate.select();
    document.execCommand("copy");
    alert("Copied the text: " + userNameGenerate.value);
});

