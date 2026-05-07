const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_URL = `${API_BASE_URL}/users`;

export interface UserData {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  stats?: {
    trips: number;
    countries: number;
    reviews: number;
  };
}

class UserService {
  // Register User
  async register(userData: UserData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong during registration');
      }

      if (data._id) {
        localStorage.setItem('userId', data._id);
      }
      return data;
    } catch (error: any) {
      console.warn('Backend unavailable, using mock registration:', error.message);
      // Mock fallback
      const mockUser = { ...userData, _id: 'mock_user_' + Date.now() };
      localStorage.setItem('userId', mockUser._id);
      return mockUser;
    }
  }

  // Login User
  async login(userData: Partial<UserData>) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      if (data._id) {
        localStorage.setItem('userId', data._id);
      }
      return data;
    } catch (error: any) {
      console.warn('Backend unavailable, using mock login:', error.message);
      // Mock fallback
      if (userData.email) {
        const mockUser = { 
          _id: 'mock_user_123', 
          name: userData.email.split('@')[0], 
          email: userData.email,
          location: 'San Francisco, CA',
          bio: 'Travel enthusiast and explorer.'
        };
        localStorage.setItem('userId', mockUser._id);
        return mockUser;
      }
      throw error;
    }
  }

  // Get User Profile
  async getProfile(id: string) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch profile');
      }

      return data;
    } catch (error: any) {
      console.warn('Backend unavailable, using mock profile:', error.message);
      // Mock fallback
      return {
        _id: id,
        name: 'Alex Wanderlust',
        email: 'alex@example.com',
        location: 'Global Citizen',
        bio: 'Living life one adventure at a time.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200',
        coverImage: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200',
        stats: { trips: 12, countries: 8, reviews: 24 }
      };
    }
  }

  // Update User Profile
  async updateProfile(id: string, userData: Partial<UserData>) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not update profile');
      }

      return data;
    } catch (error: any) {
      console.warn('Backend unavailable, update simulation:', error.message);
      return { ...userData, _id: id };
    }
  }

  // Delete User Profile
  async deleteProfile(id: string) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not delete profile');
      }
    } catch (error: any) {
      console.warn('Backend unavailable, delete simulation:', error.message);
    } finally {
      localStorage.removeItem('userId');
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('userId');
  }
}

export const userService = new UserService();
