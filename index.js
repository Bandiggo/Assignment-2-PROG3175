const express = require('express');
const path = require('path');
const pool = require('./database');
const GreetingRequest = require('./GreetingRequest');
const GreetingResponse = require('./GreetingResponse');
const app = express();
const port = 4040;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/greet', async (req, res) => {
    const { timeOfDay, language, tone } = req.body;
    try {
        const result = await pool.query(
            `SELECT greetingMessage FROM Greetings WHERE timeOfDay = $1 AND language = $2 AND tone = $3`,
            [timeOfDay, language, tone]
        );
        if (result.rows.length > 0) {
            res.send(new GreetingResponse(result.rows[0].greetingmessage));
        } else {
            res.status(404).send({ error: 'Greeting not found' });
        }
    } catch (err) {
        console.error('Database error:', err.stack);
        res.status(500).send({ error: 'Database error', details: err.stack });
    }
});

app.get('/timesOfDay', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT timeOfDay FROM Greetings`);
        res.send(result.rows.map(row => row.timeofday));
    } catch (err) {
        console.error('Database error:', err.stack);
        res.status(500).send({ error: 'Database error', details: err.stack });
    }
});

app.get('/languages', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT language FROM Greetings`);
        res.send(result.rows.map(row => row.language));
    } catch (err) {
        console.error('Database error:', err.stack);
        res.status(500).send({ error: 'Database error', details: err.stack });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;