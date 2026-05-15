import { Router } from 'express';

const router = Router();

// Mock endpoints for the MVP
router.get('/', (req, res) => {
  res.json({ message: 'List of modules' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Module created' });
});

export default router;
