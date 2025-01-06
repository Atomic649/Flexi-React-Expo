// import mysql, { ConnectionOptions } from "mysql2"

// const connectionConfig: ConnectionOptions = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || "9649"),
//   database: process.env.DB_DATABASE,
// }

// const connection = mysql.createConnection(connectionConfig)

// connection.connect((error: Error | unknown) => {
//   if (error) {
//     console.error("Error connecting to MySQL database: ", error)
//   } else {
//     // console.log('Connected to MySQL database!')
//   }
// })

// export default connection


// filepath: /Volumes/LACIES/Flexi-React-Expo/backend/db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_DATABASE,
});

pool.connect((error, client, release) => {
  if (error) {
    console.error("Error connecting to PostgreSQL database: ", error);
  } else {
    console.log("Connected to PostgreSQL database!");
    release();
  }
});

export default pool;