import express from 'express';
import routes from '@routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();

app.use(cors());
app.use(bodyParser({ limit: '50mb' }));
routes(app);

export const handler = serverless(app);
