import 'reflect-metadata';
import express from 'express';

import createConnection from './database';

createConnection();
import router from './routers/index';

const app = express();

app.use(express.json())
app.use('/', router)

export { app };