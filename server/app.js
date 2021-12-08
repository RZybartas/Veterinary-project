import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { config } from "dotenv";

import petsRoute from "./routes/v1/pets.js";
import medsRoute from "./routes/v1/medications.js";
import logsRoute from "./routes/v1/logs.js";
import prescRoute from "./routes/v1/prescriptions.js"

config();


const main = async () => {
    const app = express();
    
    
    try {
        const {
            PORT,
            MYSQL_HOST,
            MYSQL_PORT,
            MYSQL_USER,
            MYSQL_PW,
            MYSQL_DB,
        }= process.env;
        
        
        
        const connection = await mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PW,
            database: MYSQL_DB,
            port: MYSQL_PORT
        });
        
        

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
        )`

        const createTableMedications = `
        CREATE TABLE IF NOT EXISTS medications(
        id INTEGER AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        PRIMARY KEY (id)
        )`

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
        await connection.query(createTablePets);
        await connection.query(createTableLogs);
        await connection.query(createTableMedications);
        await connection.query(createTablePrescriptions);
        
        app.use(express.json());

        app.use(cors());

        app.mysql = connection;

        app.use('/pets', petsRoute);
        app.use('/meds', medsRoute);
        app.use('/logs', logsRoute);
        app.use('/prescriptions', prescRoute)
    
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
        
    } catch (error) {
        console.error(error,"Something wrong with database")
    }
};

main();