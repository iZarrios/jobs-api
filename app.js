//packages
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

//local 

//enivorment variables
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'));