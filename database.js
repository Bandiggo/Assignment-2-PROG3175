const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE Greetings (
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
        ['Morning', 'French', 'Bonjour', 'Formal'],
        ['Morning', 'French', 'Salut', 'Casual'],
        ['Evening', 'Spanish', 'Buenas Noches', 'Formal']
    ];

    greetings.forEach(greeting => stmt.run(greeting));
    stmt.finalize();
});

module.exports = db;