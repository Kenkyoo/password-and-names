document.addEventListener("DOMContentLoaded", () => {
    const randomPasswordGenerate = document.getElementById("randomPassword");
    const btnNames = document.getElementById("btnNames");
    const copy = document.getElementById("copy");
    const strength = document.getElementById("strength");
    const test = document.getElementById("test");

    btnNames.addEventListener("click", (e) => {
        e.preventDefault();
        generateRandomPassword();
    });

    copy.addEventListener("click", copyToClipboard);

    function generateRandomPassword() {
        const longPassword = parseInt(document.getElementById("longPassword").value);
        
        fetch("randompasswords.txt")
            .then(response => response.text())
            .then(data => {
                const wordsArray = data.split(/\s+/);
                const filteredElements = wordsArray.filter(word => word.length === longPassword);

                if (filteredElements.length === 0) {
                    randomPasswordGenerate.value = "";
                    test.textContent = "No hay palabras de esa longitud en el archivo.";
                    return;
                }

                const randomPassword = filteredElements[Math.floor(Math.random() * filteredElements.length)];
                randomPasswordGenerate.value = randomPassword;

                updateStrength(longPassword);
            })
            .catch(error => console.error('Error fetching the passwords:', error));
    }

    function updateStrength(longPassword) {
        if (longPassword < 5) {
            strength.innerHTML = "Débil";
            test.textContent = "La contraseña debería tener al menos 8 caracteres.";
        } else if (longPassword >= 8 && longPassword <= 12) {
            strength.innerHTML = "Normal";
            test.textContent = "La contraseña es aceptable.";
        } else if (longPassword > 12 && longPassword <= 18) {
            strength.innerHTML = "Fuerte";
            test.textContent = "La contraseña es segura.";
        } else {
            strength.innerHTML = "Muy fuerte";
            test.textContent = "La contraseña es muy segura.";
        }
    }

    function copyToClipboard() {
        randomPasswordGenerate.select();
        document.execCommand("copy");
        alert("Copiado al portapapeles: " + randomPasswordGenerate.value);
    }
});

