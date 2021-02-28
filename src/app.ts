import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';

import createConnection from './database';

import AppError from './errors/AppError';

createConnection();
import router from './routers/index';

const app = express();

app.use(express.json());
app.use('/', router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  return response.status(500).json({
    status: "Error",
    message: `Internal server erro ${err.message}`
  });
})

export { app };