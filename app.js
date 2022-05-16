//packages
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

//local
import connectDB from './db/connect.js';
import authRouter from './routes/auth.js';
import jobRouter from './routes/jobs.js';
// local error handler
import notFoundErrorMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
//enivorment variables

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();

//json parsing
app.use(express.json());

//routing
app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

const startServer = async() => {
    try {
        await connectDB(MONGO_URI);
        app.listen(port, () => {
            console.log(`connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs/:id', jobRouter);

app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);

startServer();