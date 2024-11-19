const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./greetings.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Greetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timeOfDay TEXT,
        language TEXT,
        greetingMessage TEXT,
        tone TEXT
    )`);

    const stmt = db.prepare(`INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES (?, ?, ?, ?)`);
    const greetings = [
        ['Morning', 'English', 'Good Morning', 'Formal'],
        ['Morning', 'English', 'Good Morning Boss', 'Casual'],
        ['Afternoon', 'English', 'Good Afternoon', 'Formal'],
        ['Afternoon', 'English', 'Good Afternoon Boss', 'Casual'],
        ['Evening', 'English', 'Good Evening', 'Formal'],
        ['Evening', 'English', 'Good Evening Boss', 'Casual'],
        ['Morning', 'French', 'Bonjour', 'Formal'],
        ['Morning', 'French', 'Salut', 'Casual'],
        ['Evening', 'Spanish', 'Buenas Noches', 'Formal']
    ];

    greetings.forEach(greeting => {
        db.get(`SELECT 1 FROM Greetings WHERE timeOfDay = ? AND language = ? AND greetingMessage = ? AND tone = ?`, greeting, (err, row) => {
            if (!row) {
                const stmt = db.prepare(`INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES (?, ?, ?, ?)`);
                stmt.run(greeting);
                stmt.finalize();
            }
        });
    });
});

module.exports = db;