import Transaction from '../models/Transaction.js';

const createTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, amount, date, category } = req.body;
    const t = await Transaction.create({ user: userId, title, amount, date, category });
    res.status(201).json(t);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const list = await Transaction.find({ user: userId }).sort({ date: -1 });
    res.json(list);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const getTransaction = async (req, res) => {
  try {
    const t = await Transaction.findById(req.params.id);
    if (!t) return res.status(404).json({ error: 'Not found' });
    if (t.user.toString() !== req.userId) return res.status(403).json({ error: 'Forbidden' });
    res.json(t);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const updateTransaction = async (req, res) => {
  try {
    const t = await Transaction.findById(req.params.id);
    if (!t) return res.status(404).json({ error: 'Not found' });
    if (t.user.toString() !== req.userId) return res.status(403).json({ error: 'Forbidden' });
    Object.assign(t, req.body);
    await t.save();
    res.json(t);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const deleteTransaction = async (req, res) => {
  try {
    const t = await Transaction.findById(req.params.id);
    if (!t) return res.status(404).json({ error: 'Not found' });
    if (t.user.toString() !== req.userId) return res.status(403).json({ error: 'Forbidden' });
    await t.remove();
    res.json({ deleted: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export { createTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction };
