import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Contacts list will be here' });
});

console.log('📦 contacts route loaded');

export default router;
