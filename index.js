const express = require('express');
const db = require('./database');
const GreetingRequest = require('./GreetingRequest');
const GreetingResponse = require('./GreetingResponse');
const app = express();
const port = 4040;

app.use(express.json());

app.post('/greet', (req, res) => {
    const { timeOfDay, language, tone } = req.body;
    db.get(
        `SELECT greetingMessage FROM Greetings WHERE timeOfDay = ? AND language = ? AND tone = ?`,
        [timeOfDay, language, tone],
        (err, row) => {
            if (err) {
                res.status(500).send({ error: 'Database error' });
            } else if (row) {
                res.send(new GreetingResponse(row.greetingMessage));
            } else {
                res.status(404).send({ error: 'Greeting not found' });
            }
        }
    );
});

app.get('/timesOfDay', (req, res) => {
    db.all(`SELECT DISTINCT timeOfDay FROM Greetings`, [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(rows.map(row => row.timeOfDay));
        }
    });
});

app.get('/languages', (req, res) => {
    db.all(`SELECT DISTINCT language FROM Greetings`, [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(rows.map(row => row.language));
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});