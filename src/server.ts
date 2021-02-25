import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => res.send('Hello router!'));

app.listen(3333, () => console.log('Server running on port 3333!'));
