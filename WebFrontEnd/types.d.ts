import { Express } from 'express';
import multer from 'multer';

declare global {
  namespace Express {
    interface Request {
      file: multer.File;
    }
  }
}
