document.addEventListener("DOMContentLoaded", function() {
    updateChapters();
});

document.getElementById("book").addEventListener("change", function() {
    updateChapters();
});

document.getElementById("chapter").addEventListener("change", function() {
    updateVerses();
});

function updateChapters() {
    let book = document.getElementById("book").value;
    
    fetch('/get_chapters', {
        method: 'POST',
        body: JSON.stringify({ book: book }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        let chapterDropdown = document.getElementById("chapter");
        chapterDropdown.innerHTML = "";
        data.chapters.forEach(chapter => {
            let option = document.createElement("option");
            option.value = chapter;
            option.textContent = chapter;
            chapterDropdown.appendChild(option);
        });
        updateVerses();
    });
}

function updateVerses() {
    let book = document.getElementById("book").value;
    let chapter = document.getElementById("chapter").value;
    
    fetch('/get_verses', {
        method: 'POST',
        body: JSON.stringify({ book: book }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        let verseDropdown = document.getElementById("verse");
        verseDropdown.innerHTML = "";
        data.verses.forEach(verse => {
            let option = document.createElement("option");
            option.value = verse;
            option.textContent = verse;
            verseDropdown.appendChild(option);
        });
    });
}

function fetchVerse() {
    let book = document.getElementById("book").value;
    let chapter = document.getElementById("chapter").value;
    let verse = document.getElementById("verse").value;

    fetch('/get_verse', {
        method: 'POST',
        body: JSON.stringify({ book: book, chapter: chapter, verse: verse }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("verse-display").textContent = data.text;
    });
}