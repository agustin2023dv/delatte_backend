import express from 'express';
import { corsConfig } from './cors';
import { staticFiles } from './static';

export const applyMiddlewares = (app: express.Application): void => {
  app.use(corsConfig);
  app.use(express.json());
  staticFiles(app);
};
