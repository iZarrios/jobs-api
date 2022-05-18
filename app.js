//packages
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
//security packages
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

//local
import connectDB from './db/connect.js';
import authRouter from './routes/auth.js';
import jobRouter from './routes/jobs.js';
// local error handler
import notFoundErrorMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import autheticateUserMiddleware from './middleware/authentication.js';
// Swagger
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

//enivorment variables
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();

//json parsing
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // 100 request per 15 minutes
    })
);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

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

const swaggerDoc = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
//routing
app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/jobs/', autheticateUserMiddleware, jobRouter);

app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);

startServer();