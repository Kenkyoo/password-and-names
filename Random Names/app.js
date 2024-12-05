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
        const longWords = document.getElementById("longWords").value;
        const addNumber = document.getElementById("number").checked;

        fetch("randomwords.txt")
            .then(response => response.text())
            .then(data => {
                const wordsArray = data.split(/\s+/);
                const randomWords = [];

                for (let i = 0; i < longWords; i++) {
                    const randomIndex = Math.floor(Math.random() * wordsArray.length);
                    randomWords.push(wordsArray[randomIndex]);
                }

                if (addNumber) {
                    const randomNum = Math.floor(Math.random() * (100000 - 10 + 1) + 10);
                    randomWords.push(randomNum);
                }

                randomNameGenerate.value = randomWords.join("");
            })
            .catch(error => console.error('Error fetching the words:', error));
    }

    function copyToClipboard() {
        randomNameGenerate.select();
        document.execCommand("copy");
        alert("Copied the text: " + randomNameGenerate.value);
    }
});

