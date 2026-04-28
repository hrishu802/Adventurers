import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/:id')
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile);

export default router;
