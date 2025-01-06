import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Create a new express application instance
const app = express();

// Express middleware
app.use(express.json());

// Parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use Cors
app.use(cors());

// Use Static Files
app.use("/uploads", express.static("uploads"));
app.use("/uploads/images", express.static("uploads/images"));

// --------------IMPORT ROUTES-----------------




// --------------USE ROUTES-----------------



//---------- Start the server ----------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

