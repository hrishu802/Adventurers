import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Calendar, 
  Settings, 
  Heart, 
  Briefcase, 
  Edit3, 
  LogOut, 
  Camera,
  Globe,
  Star,
  CheckCircle2,
  Trash2,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';
import Button from '../components/Button';
import { userService, UserData } from '../services/UserService';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'settings'>('bookings');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    bio: '',
    avatar: '',
    coverImage: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }
      try {
        const data = await userService.getProfile(userId);
        setUser(data);
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    userService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Cover Image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src={user.coverImage || "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200"} 
          className="w-full h-full object-cover"
          alt="Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="absolute bottom-8 right-8 p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-white/20 transition-all"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center shadow-2xl"
            >
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl">
                  <img 
                    src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200"} 
                    className="w-full h-full object-cover"
                    alt="Avatar"
                  />
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute -bottom-2 -right-2 p-2 bg-primary-accent text-background rounded-xl shadow-lg border-4 border-background"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-text-muted text-sm mb-6">{user.email}</p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-primary-accent" />
                  {user.location || "Earth Explorer"}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-secondary-accent" />
                  Joined 2024
                </div>
              </div>

              <p className="text-text-muted text-sm italic mb-8 px-4 leading-relaxed">
                "{user.bio || "No bio yet. Start your story today!"}"
              </p>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
                <div>
                  <p className="text-lg font-bold text-white">12</p>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Trips</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">8</p>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Countries</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">24</p>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Reviews</p>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full mt-8 rounded-2xl"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </Button>
            </motion.div>

            {/* Achievement / Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6"
            >
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-secondary-accent" />
                Badges
              </h3>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-accent/10 flex items-center justify-center text-primary-accent" title="First Trip">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary-accent/10 flex items-center justify-center text-secondary-accent" title="Reviewer">
                  <Edit3 className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Tabs */}
              <div className="flex border-b border-white/5 bg-white/[0.02]">
                {[
                  { id: 'bookings', label: 'My Bookings', icon: Briefcase },
                  { id: 'saved', label: 'Wishlist', icon: Heart },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-5 text-sm font-bold transition-all relative group",
                      activeTab === tab.id ? "text-primary-accent" : "text-text-muted hover:text-white"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-primary-accent rounded-full" 
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'bookings' && (
                    <motion.div
                      key="bookings"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">Upcoming Journeys</h3>
                        <span className="text-xs text-text-muted bg-white/5 px-3 py-1 rounded-full border border-white/10">3 Total</span>
                      </div>

                      {[1, 2, 3].map((i) => (
                        <div key={i} className="group flex items-center gap-6 p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary-accent/30 hover:bg-white/5 transition-all">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                            <img 
                              src={`https://images.unsplash.com/photo-${i === 1 ? '1537996194471-e657df975ab4' : i === 2 ? '1530122037265-a5f1f91d3b99' : '1493976040374-85c8e12f0c0e'}?auto=format&fit=crop&w=400`} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              alt="Trip"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-lg mb-1 truncate">
                              {i === 1 ? 'Bali Tropical Escape' : i === 2 ? 'Swiss Alps Adventure' : 'Kyoto Cultural Tour'}
                            </h4>
                            <p className="text-text-muted text-sm mb-3">Oct 15 - Oct 25, 2025</p>
                            <div className="flex items-center gap-3">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                i === 3 ? "bg-green-500/10 text-green-400" : "bg-primary-accent/10 text-primary-accent"
                              )}>
                                {i === 3 ? 'Completed' : 'Confirmed'}
                              </span>
                            </div>
                          </div>
                          <Button variant="outlined" size="sm" className="hidden sm:flex rounded-xl">Details</Button>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'saved' && (
                    <motion.div
                      key="saved"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                      {[1, 2].map((i) => (
                        <div key={i} className="group relative rounded-[2rem] overflow-hidden border border-white/10 aspect-square">
                          <img 
                            src={i === 1 ? 'https://images.unsplash.com/photo-1516483638261-f4082823b185' : 'https://images.unsplash.com/photo-1531366936337-77b5a414e21a'} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt="Saved"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <h4 className="text-white font-bold text-lg">{i === 1 ? 'Santorini Sunset' : 'Northern Lights'}</h4>
                            <p className="text-primary-accent font-bold">$150</p>
                          </div>
                          <button className="absolute top-4 right-4 p-2.5 bg-red-500 text-white rounded-xl shadow-lg">
                            <Heart className="w-4 h-4 fill-white" />
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="text-white font-bold mb-4">Account Preferences</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                              <p className="text-white font-medium">Email Notifications</p>
                              <p className="text-text-muted text-xs">Receive updates about your bookings</p>
                            </div>
                            <div className="w-12 h-6 bg-primary-accent rounded-full relative p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-background rounded-full absolute right-1" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5 space-y-4">
                        <h3 className="text-red-400 font-bold mb-4">Danger Zone</h3>
                        <div className="flex flex-wrap gap-4">
                          <Button variant="outlined" className="border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
                            Delete Account
                          </Button>
                          <Button variant="ghost" onClick={handleLogout} className="text-text-muted rounded-xl gap-2">
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Modal (Simplified for UI Demo) */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-background border border-white/10 rounded-[2.5rem] shadow-2xl p-8 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-accent/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-text-muted hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user.name}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-primary-accent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Location</label>
                  <input 
                    type="text" 
                    defaultValue={user.location || ""}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-primary-accent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Bio</label>
                  <textarea 
                    defaultValue={user.bio || ""}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-primary-accent transition-all resize-none"
                  />
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="primary" className="flex-1 rounded-2xl">Save Changes</Button>
                  <Button variant="ghost" onClick={() => setIsEditModalOpen(false)} className="flex-1 rounded-2xl">Cancel</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
