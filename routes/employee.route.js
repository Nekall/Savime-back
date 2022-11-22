
import express from 'express';
import {
  create,
  findOne,
  findAll,
  update,
  remove,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/employee.controller.js';
const router = express.Router();

router.post('/', create);
router.get('/:id', findOne);
router.get('/', findAll);
router.put('/:id', update);
router.delete('/:id', remove);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.post('/login', login);

export default router;