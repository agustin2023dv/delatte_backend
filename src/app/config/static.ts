import express from 'express';
import path from 'path';

export const staticFiles = (app: express.Application) => {
  app.use("/uploads", express.static(path.join(__dirname, "../../../../uploads")));
};
