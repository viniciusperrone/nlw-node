import 'reflect-metadata';
import express from 'express';

import './database';

import router from './routers/index';

const app = express();

app.use(express.json())
app.use('/', router)

app.listen(3333, () => console.log('Server running on port 3333!'));
