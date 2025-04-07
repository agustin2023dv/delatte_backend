// src/configs/corsConfig.ts
import cors from 'cors';

export const corsConfig = cors({
  origin: [
    'http://localhost:8082',
    'http://192.168.1.24:8082',
    'http://localhost:3000',
  ],
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true,
});