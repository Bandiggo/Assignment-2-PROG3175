require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Greetings (
        id SERIAL PRIMARY KEY,
        timeOfDay TEXT,
        language TEXT,
        greetingMessage TEXT,
        tone TEXT
    )
`;

const insertGreetingQuery = `
    INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT DO NOTHING
`;

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

(async () => {
    const client = await pool.connect();
    try {
        await client.query(createTableQuery);

        for (const greeting of greetings) {
            await client.query(insertGreetingQuery, greeting);
        }
        console.log('Database setup complete.');
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        client.release();
    }
})().catch(err => console.error('Error connecting to the database', err.stack));

module.exports = pool;