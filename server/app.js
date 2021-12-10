const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const { port, dbConfig} = require('./config')
const petsRoute = require('./routes/v1/pets');
const medsRoute = require('./routes/v1/medications');
const logsRoute = require('./routes/v1/logs');
const prescRoute = require('./routes/v1/prescriptions');



const main = async () => {
    const app = express();
    try {
        const connection = await mysql.createConnection(dbConfig);
        const createTablePets = `
        CREATE TABLE IF NOT EXISTS pets(
        id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name VARCHAR(20) NOT NULL,
        dob DATE,
        client_email TEXT NOT NULL,
        archived BOOLEAN NOT NULL        
        )`;
        
        const createTableLogs = `
        CREATE TABLE IF NOT EXISTS logs(
        id INTEGER AUTO_INCREMENT NOT NULL,
        pet_id  INTEGER NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (pet_id) REFERENCES pets (id)
        )`;

        const createTableMedications = `
        CREATE TABLE IF NOT EXISTS medications(
        id INTEGER AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        PRIMARY KEY (id)
        )`;

        const createTablePrescriptions = `
        CREATE TABLE IF NOT EXISTS prescriptions (
        id INTEGER AUTO_INCREMENT NOT NULL,
        medication_id INTEGER NOT NULL,
        pet_id INTEGER NOT NULL,
        comment TEXT,
        PRIMARY KEY (id),
        timestamp TIMESTAMP NOT NULL DEFAULT
        CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (medication_id) REFERENCES medications (id),
        FOREIGN KEY (pet_id) REFERENCES pets (id) 
        )`;

        const createTableUsers =`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER AUTO_INCREMENT NOT NULL,
            email VARCHAR(200) NOT NULL,
            password TEXT NOT NULL,
            PRIMARY KEY (id)
        )`
        await connection.query(createTablePets);
        await connection.query(createTableLogs);
        await connection.query(createTableMedications);
        await connection.query(createTablePrescriptions);
        await connection.query(createTableUsers);
        
        app.use(express.json());

        app.use(cors());

        app.mysql = connection;

        app.use('/pets', petsRoute);
        app.use('/meds', medsRoute);
        app.use('/logs', logsRoute);
        app.use('/prescriptions', prescRoute);

        app.get('*', (req, res) => {
            res.status(404).send({ error: 'Page not found'})
        })
    
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`)
        })
        
    } catch (error) {
        console.error(error,"Something wrong with database")
    }
};

main();