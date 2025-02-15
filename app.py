from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Bible book data (same as your Tkinter app)
book_max_chapters_verses = {
# Old Testament
    "Genesis": {"chapters": 50, "verses": 1533},
    "Exodus": {"chapters": 40, "verses": 1213},
    "Leviticus": {"chapters": 27, "verses": 859},
    "Numbers": {"chapters": 36, "verses": 1288},
    "Deuteronomy": {"chapters": 34, "verses": 959},
    "Joshua": {"chapters": 24, "verses": 658},
    "Judges": {"chapters": 21, "verses": 618},
    "Ruth": {"chapters": 4, "verses": 85},
    "1 Samuel": {"chapters": 31, "verses": 810},
    "2 Samuel": {"chapters": 24, "verses": 695},
    "1 Kings": {"chapters": 22, "verses": 816},
    "2 Kings": {"chapters": 25, "verses": 719},
    "1 Chronicles": {"chapters": 29, "verses": 942},
    "2 Chronicles": {"chapters": 36, "verses": 822},
    "Ezra": {"chapters": 10, "verses": 280},
    "Nehemiah": {"chapters": 13, "verses": 406},
    "Esther": {"chapters": 10, "verses": 167},
    "Job": {"chapters": 42, "verses": 1070},
    "Psalms": {"chapters": 150, "verses": 2461},
    "Proverbs": {"chapters": 31, "verses": 915},
    "Ecclesiastes": {"chapters": 12, "verses": 222},
    "Song of Solomon": {"chapters": 8, "verses": 117},
    "Isaiah": {"chapters": 66, "verses": 1292},
    "Jeremiah": {"chapters": 52, "verses": 1364},
    "Lamentations": {"chapters": 5, "verses": 154},
    "Ezekiel": {"chapters": 48, "verses": 1273},
    "Daniel": {"chapters": 12, "verses": 357},
    "Hosea": {"chapters": 14, "verses": 197},
    "Joel": {"chapters": 3, "verses": 73},
    "Amos": {"chapters": 9, "verses": 146},
    "Obadiah": {"chapters": 1, "verses": 21},
    "Jonah": {"chapters": 4, "verses": 48},
    "Micah": {"chapters": 7, "verses": 105},
    "Nahum": {"chapters": 3, "verses": 47},
    "Habakkuk": {"chapters": 3, "verses": 56},
    "Zephaniah": {"chapters": 3, "verses": 53},
    "Haggai": {"chapters": 2, "verses": 38},
    "Zechariah": {"chapters": 14, "verses": 211},
    "Malachi": {"chapters": 4, "verses": 55},

    # New Testament
    "Matthew": {"chapters": 28, "verses": 1071},
    "Mark": {"chapters": 16, "verses": 678},
    "Luke": {"chapters": 24, "verses": 1151},
    "John": {"chapters": 21, "verses": 879},
    "Acts": {"chapters": 28, "verses": 1007},
    "Romans": {"chapters": 16, "verses": 433},
    "1 Corinthians": {"chapters": 16, "verses": 437},
    "2 Corinthians": {"chapters": 13, "verses": 257},
    "Galatians": {"chapters": 6, "verses": 149},
    "Ephesians": {"chapters": 6, "verses": 155},
    "Philippians": {"chapters": 4, "verses": 104},
    "Colossians": {"chapters": 4, "verses": 95},
    "1 Thessalonians": {"chapters": 5, "verses": 89},
    "2 Thessalonians": {"chapters": 3, "verses": 47},
    "1 Timothy": {"chapters": 6, "verses": 113},
    "2 Timothy": {"chapters": 4, "verses": 83},
    "Titus": {"chapters": 3, "verses": 46},
    "Philemon": {"chapters": 1, "verses": 25},
    "Hebrews": {"chapters": 13, "verses": 303},
    "James": {"chapters": 5, "verses": 108},
    "1 Peter": {"chapters": 5, "verses": 105},
    "2 Peter": {"chapters": 3, "verses": 61},
    "1 John": {"chapters": 5, "verses": 105},
    "2 John": {"chapters": 1, "verses": 13},
    "3 John": {"chapters": 1, "verses": 15},
    "Jude": {"chapters": 1, "verses": 25},
    "Revelation": {"chapters": 22, "verses": 404},
}

# Fetch verse from the API
def fetch_verse(book, chapter, verse):
    url = f"https://bible-api.com/{book}+{chapter}:{verse}?translation=web"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get("text", "Verse not found.")
    except requests.exceptions.RequestException as e:
        return f"Error fetching verse: {e}"

@app.route('/')
def home():
    return render_template('index.html', books=list(book_max_chapters_verses.keys()))

@app.route('/get_verse', methods=['POST'])
def get_verse():
    data = request.json
    book = data['book']
    chapter = data['chapter']
    verse = data['verse']
    verse_text = fetch_verse(book, chapter, verse)
    return jsonify({"text": verse_text})

@app.route('/get_chapters', methods=['POST'])
def get_chapters():
    book = request.json['book']
    return jsonify({"chapters": list(range(1, book_max_chapters_verses[book]['chapters'] + 1))})

@app.route('/get_verses', methods=['POST'])
def get_verses():
    book = request.json['book']
    return jsonify({"verses": list(range(1, book_max_chapters_verses[book]['verses'] + 1))})

if __name__ == '__main__':
    app.run(debug=True)
