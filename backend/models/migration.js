import pool from './pool';

//POOL CONNECT

pool.on('connect', () => {
    console.log('connected to database');
});

//CREATE USER TABLE
const createSensorTable = () => {
    const sensorCreateQuery = `CREATE TABLE IF NOT EXISTS dataCollected (
        COD_ID SERIAL PRIMARY KEY NOT NULL,
        SENSOR_NAME VARCHAR(15) NOT NULL,
        ESTADO integer NOT NULL,
        CORRENTE decimal NOT NULL,
        TENSAO integer NOT NULL,
        POTENCIA decimal NOT NULL
    )`;

    pool.query(sensorCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const createUserTable = () => {
    const sensorUserQuery = `CREATE TABLE IF NOT EXISTS users (
        COD_ID SERIAL PRIMARY KEY NOT NULL,
        NOME VARCHAR(50) NOT NULL,
        SOBRENOME VARCHAR(50) NOT NULL,
        EMAIL VARCHAR(250) NOT NULL,
        PASSWORD VARCHAR(250) NOT NULL
    )`;

    pool.query(sensorUserQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

//DROP USER TABLE
const dropSensorTable = () => {
    const sensorDropQuery = 'DROP TABLE IF EXISTS dataCollected ';
    pool.query(sensorDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropUserTable = () => {
    const sensorDropQuery = 'DROP TABLE IF EXISTS users ';
    pool.query(sensorDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export {
    createSensorTable,
    dropSensorTable,
    createUserTable,
    dropUserTable
};

require('make-runnable');