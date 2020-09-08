import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(Routes);
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () => console.log('server is running on port 3333'));
