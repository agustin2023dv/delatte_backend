import express from 'express';
import { corsConfig } from './cors';
import { staticFiles } from './static';
import { authMiddleware } from '@/middlewares/auth.middleware';

export const applyMiddlewares = (app: express.Application): void => {
  app.use(corsConfig);
  app.use(express.json());
  staticFiles(app);
  app.use(authMiddleware);
};
