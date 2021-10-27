import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
    connectionString: process.env.ELEPHANTSQL_URL
};

const pool = new Pool(databaseConfig);

export default pool;