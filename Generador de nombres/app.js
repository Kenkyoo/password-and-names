document.addEventListener("DOMContentLoaded", () => {
    const randomNameGenerate = document.getElementById("randomName");
    const btnNames = document.getElementById("btnNames");
    const copy = document.getElementById("copy");

    btnNames.addEventListener("click", (e) => {
        e.preventDefault();
        generateRandomName();
    });

    copy.addEventListener("click", copyToClipboard);

    function generateRandomName() {
        const longWords = parseInt(document.getElementById("longWords").value);

        fetch("namesss.txt")
            .then(response => response.text())
            .then(data => {
                const wordsArray = data.split(/\s+/);

                if (longWords > wordsArray.length) {
                    randomNameGenerate.value = "";
                    alert("No hay suficientes palabras en el archivo para generar un nombre con la cantidad solicitada.");
                    return;
                }

                const randomNames = [];
                for (let i = 0; i < longWords; i++) {
                    const randomIndex = Math.floor(Math.random() * wordsArray.length);
                    randomNames.push(wordsArray[randomIndex]);
                    wordsArray.splice(randomIndex, 1); // Remove the selected word to avoid duplicates
                }

                const generatedName = randomNames.join(' ');
                randomNameGenerate.value = generatedName;
            })
            .catch(error => console.error('Error fetching the names:', error));
    }

    function copyToClipboard() {
        randomNameGenerate.select();
        document.execCommand("copy");
        alert("Copiado al portapapeles: " + randomNameGenerate.value);
    }
});

