import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { createTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';
const router = express.Router();

router.use(auth); 

router.post('/',auth, createTransaction);
router.get('/',auth, getTransactions);
router.get('/:id',auth, getTransaction);
router.put('/:id',auth, updateTransaction);
router.delete('/:id',auth, deleteTransaction);

export default router;
