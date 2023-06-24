import visitorsRouter from '@routes/visitors';
import { Express } from 'express';

export default function (app: Express) {
  app.use('/api/visitors', visitorsRouter);
}
