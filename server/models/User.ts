import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: 'Unknown Location',
    },
    bio: {
      type: String,
      default: 'Traveler. Explorer. Dreamer.',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200',
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200',
    },
    stats: {
      trips: { type: Number, default: 0 },
      countries: { type: Number, default: 0 },
      reviews: { type: Number, default: 0 },
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
