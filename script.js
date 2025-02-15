document.addEventListener("DOMContentLoaded", function() {
    populateBooks();
    document.body.style.backgroundImage = "url('Backround.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
});

const bookMaxChaptersVerses = {
    "Genesis": { chapters: 50, verses: 1533 },
    "Exodus": { chapters: 40, verses: 1213 },
    "Leviticus": { chapters: 27, verses: 859 },
    "Numbers": { chapters: 36, verses: 1288 },
    "Deuteronomy": { chapters: 34, verses: 959 },
    "Joshua": { chapters: 24, verses: 658 },
    "Judges": { chapters: 21, verses: 618 },
    "Ruth": { chapters: 4, verses: 85 },
    "1 Samuel": { chapters: 31, verses: 810 },
    "2 Samuel": { chapters: 24, verses: 695 },
    "1 Kings": { chapters: 22, verses: 816 },
    "2 Kings": { chapters: 25, verses: 719 },
    "1 Chronicles": { chapters: 29, verses: 942 },
    "2 Chronicles": { chapters: 36, verses: 822 },
    "Ezra": { chapters: 10, verses: 280 },
    "Nehemiah": { chapters: 13, verses: 406 },
    "Esther": { chapters: 10, verses: 167 },
    "Job": { chapters: 42, verses: 1070 },
    "Psalms": { chapters: 150, verses: 2461 },
    "Proverbs": { chapters: 31, verses: 915 },
    "Ecclesiastes": { chapters: 12, verses: 222 },
    "Song of Solomon": { chapters: 8, verses: 117 },
    "Isaiah": { chapters: 66, verses: 1292 },
    "Jeremiah": { chapters: 52, verses: 1364 },
    "Lamentations": { chapters: 5, verses: 154 },
    "Ezekiel": { chapters: 48, verses: 1273 },
    "Daniel": { chapters: 12, verses: 357 },
    "Matthew": { chapters: 28, verses: 1071 },
    "Mark": { chapters: 16, verses: 678 },
    "Luke": { chapters: 24, verses: 1151 },
    "John": { chapters: 21, verses: 879 },
    "Acts": { chapters: 28, verses: 1007 },
    "Romans": { chapters: 16, verses: 433 },
    "1 Corinthians": { chapters: 16, verses: 437 },
    "2 Corinthians": { chapters: 13, verses: 257 },
    "Revelation": { chapters: 22, verses: 404 }
};

function populateBooks() {
    let bookDropdown = document.getElementById("book");
    Object.keys(bookMaxChaptersVerses).forEach(book => {
        let option = document.createElement("option");
        option.value = book;
        option.textContent = book;
        bookDropdown.appendChild(option);
    });
    updateChapters();
}

function updateChapters() {
    let book = document.getElementById("book").value;
    let chapterDropdown = document.getElementById("chapter");
    chapterDropdown.innerHTML = "";
    for (let i = 1; i <= bookMaxChaptersVerses[book].chapters; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        chapterDropdown.appendChild(option);
    }
    updateVerses();
}

function updateVerses() {
    let book = document.getElementById("book").value;
    let verseDropdown = document.getElementById("verse");
    verseDropdown.innerHTML = "";
    for (let i = 1; i <= bookMaxChaptersVerses[book].verses; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        verseDropdown.appendChild(option);
    }
}

function fetchVerse() {
    let book = document.getElementById("book").value;
    let chapter = document.getElementById("chapter").value;
    let verse = document.getElementById("verse").value;
    let url = `https://bible-api.com/${book}+${chapter}:${verse}?translation=web`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("verse-display").textContent = data.text || "Verse not found.";
        })
        .catch(error => {
            document.getElementById("verse-display").textContent = "Error fetching verse.";
        });
}
