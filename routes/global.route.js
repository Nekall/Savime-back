
import express from 'express';
import {
  contact,
  newsletters,
  jwtTokenVerification
} from '../controllers/global.controller.js';
const router = express.Router();

router.post('/contact', contact);
router.post('/newsletters', newsletters);
router.post('/verification', jwtTokenVerification)

export default router;