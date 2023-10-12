//-------------------------------------1------------------------------------------
document.getElementById('length').addEventListener('input', calculate);
document.getElementById('width').addEventListener('input', calculate);

function calculate() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);

    if (!isNaN(length) && !isNaN(width)) {
        let perimeter = 2 * (length + width);
        let area = length * width;
        let diagonal = Math.sqrt(Math.pow(length, 2) + Math.pow(width, 2));
        document.getElementById('perimeter').innerText = `Perimeter: ${perimeter}`;
        document.getElementById('area').innerText = `Area: ${area}`;
        document.getElementById('diagonal').innerText = `Diagonal: ${diagonal}`;
    }
}

//-------------------------------------2------------------------------------------
function sendMessage(inputId, user) {
    let messageInput = document.getElementById(inputId)
    let message = messageInput.value
    let chatDiv = document.querySelector('.chat-middle .chat-box')

    if (message.trim() !== "") {
        let messageElement = document.createElement('p')

        messageElement.innerHTML = `<br><strong>${user}</strong></br> ${message}`

        if (user === 'user1') {
            messageElement.classList.add('user1-message')
        } else {
            messageElement.classList.add('user2-message')
        }

        chatDiv.appendChild(messageElement)
        messageInput.value = ""
    }
}

//-------------------------------------3------------------------------------------
function transliterate() {
    const ukrainianText = document.getElementById('ukrainianText').value;
    const transliteratedTextElement = document.getElementById('transliteratedText');
    const notAppropriateMessage = document.getElementById('notAppropriate');

    if (containsUkrainianCharacters(ukrainianText)) {
        notAppropriateMessage.innerText = '';
        transliteratedTextElement.value = transliterateUkrainian(ukrainianText);
    } else {
        notAppropriateMessage.innerText = 'Введіть текст українською мовою';
        transliteratedTextElement.value = '';
    }
}
function containsUkrainianCharacters(text) {
    const ukrainianRegex = /[а-яґєії]/i;

    return ukrainianRegex.test(text);
}

function transliterateUkrainian(text) {
    const ukrainianToLatinMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie', 'ж': 'zh', 'з': 'z',
        'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
        'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ь': "'", 'ю': 'u', 'я': 'ia',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z',
        'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
        'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
        'Ь': "'", 'Ю': 'Yu', 'Я': 'Ya'
    };
    return text.split('').map(char => {
        return ukrainianToLatinMap[char] || char;
    }).join('');
}

//-------------------------------------4------------------------------------------
function getDayOfWeek(year, month, day) {
    let a = Math.floor((14 - month) / 12)
    let y = year - a
    let m = month + 12 * a - 2
    return (day + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + Math.floor((31 * m) / 12)) % 7
}

function dayResult(selectedDate) {
    let date = new Date(selectedDate)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let currentDate = new Date()
    let resultElement = document.getElementById("result")
    if (date <= currentDate) {
        let dayOfWeekNumber = getDayOfWeek(year, month, day)

        let allDaysOfWeekStr = ["неділю", "понеділок", "вівторок", "середу", "четвер", "п'ятницю", "суботу"]
        let dayOfWeekStr = allDaysOfWeekStr[dayOfWeekNumber]

        resultElement.textContent = `Ви народились у ${dayOfWeekStr}`
    } else {
        resultElement.textContent = "Ви ще не народились :("
    }
}

document.getElementById("dateForm").addEventListener("submit", function (e) {
    e.preventDefault()
    let selectedDate = document.getElementById("datePicker").value
    dayResult(selectedDate)
});
