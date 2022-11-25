
import express from 'express';
import {
  contact,
  newsletters,
} from '../controllers/global.controller.js';
const router = express.Router();

router.post('/contact', contact);
router.post('/newsletters', newsletters);

export default router;