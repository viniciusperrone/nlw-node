import express from 'express';

import router from './routers/index';

const app = express();

app.use(express.json())
app.use('/users', router)

app.listen(3333, () => console.log('Server running on port 3333!'));
