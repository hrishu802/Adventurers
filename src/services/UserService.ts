const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_URL = `${API_BASE_URL}/users`;

export interface UserData {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  location?: string;
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
  }

  // Login User
  async login(userData: Partial<UserData>) {
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
  }

  // Get User Profile
  async getProfile(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not fetch profile');
    }

    return data;
  }

  // Update User Profile
  async updateProfile(id: string, userData: Partial<UserData>) {
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
  }

  // Delete User Profile
  async deleteProfile(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not delete profile');
    }

    localStorage.removeItem('userId');
    return data;
  }

  // Logout
  logout() {
    localStorage.removeItem('userId');
  }
}

export const userService = new UserService();
