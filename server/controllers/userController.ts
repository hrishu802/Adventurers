import { Request, Response } from 'express';
import User from '../models/User.js';

// @desc    Register a new user (Create)
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password, // In a real app, hash this password!
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        avatar: user.avatar,
        coverImage: user.coverImage,
        stats: user.stats,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get profile (Read/Login)
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // In a real app, use bcrypt.compare to check hashed password
    if (user && user.password === password) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        avatar: user.avatar,
        coverImage: user.coverImage,
        stats: user.stats,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile by ID (Read)
// @route   GET /api/users/:id
// @access  Public
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        avatar: user.avatar,
        coverImage: user.coverImage,
        stats: user.stats,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile (Update)
// @route   PUT /api/users/:id
// @access  Public
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Update basic info
      user.name = req.body.name !== undefined ? req.body.name : user.name;
      user.email = req.body.email !== undefined ? req.body.email : user.email;
      user.location = req.body.location !== undefined ? req.body.location : user.location;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.avatar = req.body.avatar !== undefined ? req.body.avatar : user.avatar;
      user.coverImage = req.body.coverImage !== undefined ? req.body.coverImage : user.coverImage;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        coverImage: updatedUser.coverImage,
        stats: updatedUser.stats,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user profile (Delete)
// @route   DELETE /api/users/:id
// @access  Public
export const deleteUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
