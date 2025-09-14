import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from '#routes/auth.routes.js';
import { securityMiddleware } from '#middleware/security.middleware.js';

const app = express();

//middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);
app.use(securityMiddleware);

// route managment
app.get('/', (req, res) => {
  logger.info('Hello From acquisitions');
  res.status(200).send('Hello From acquisitions');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    upTime: process.uptime(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'application api running Ok !!' });
});

app.use('/api/auth/', authRouter);

export default app;
