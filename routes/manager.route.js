
import express from 'express';
import {
  create,
  findOne,
  findAll,
  update,
  remove,
} from '../controllers/manager.controller.js';
const router = express.Router();

router.post('/', create);
router.get('/:id', findOne);
router.get('/', findAll);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;