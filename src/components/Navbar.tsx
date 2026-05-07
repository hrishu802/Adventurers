import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, User, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { NavService } from '../services/NavService';
import { userService } from '../services/UserService';

const navService = new NavService();

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('userId');
      setIsLoggedIn(!!userId);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location]);

  const handleLogout = () => {
    userService.logout();
    setIsLoggedIn(false);
    navigate('/login');
    setIsProfileOpen(false);
  };

  const navItems = navService.getPrimaryItems().filter(item => 
    item.name !== 'Profile' || isLoggedIn
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-background/80 backdrop-blur-lg py-3 shadow-lg border-b border-white/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary-accent/20 group-hover:scale-110 transition-transform">
            <Compass className="text-background w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-poppins tracking-tight text-white">
            Adventurers
          </span>
        </RouterLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <RouterLink
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary-accent relative group',
                location.pathname === item.path ? 'text-primary-accent' : 'text-text-muted'
              )}
            >
              {item.name}
              <span className={cn(
                'absolute -bottom-1 left-0 h-0.5 bg-primary-accent transition-all duration-300',
                location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
              )} />
            </RouterLink>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <RouterLink 
                to="/login" 
                className="text-sm font-medium text-text-muted hover:text-white transition-colors"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/signup"
                className="px-5 py-2.5 bg-primary-accent text-background font-semibold rounded-2xl hover:bg-primary-accent/90 transition-all shadow-lg shadow-primary-accent/20 hover:scale-105 active:scale-95"
              >
                Join Now
              </RouterLink>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/10"
              >
                <div className="w-8 h-8 bg-secondary-accent rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-background" />
                </div>
                <ChevronDown className={cn('w-4 h-4 text-text-muted transition-transform', isProfileOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden"
                  >
                    <RouterLink
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-sm text-text-muted hover:text-white"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </RouterLink>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-500/10 rounded-xl transition-colors text-sm text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 bg-background/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <RouterLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'text-lg font-medium transition-colors',
                    location.pathname === item.path ? 'text-primary-accent' : 'text-text-muted'
                  )}
                >
                  {item.name}
                </RouterLink>
              ))}
              <hr className="border-white/10" />
              {!isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <RouterLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center py-3 text-text-muted font-medium"
                  >
                    Login
                  </RouterLink>
                  <RouterLink
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center py-3 bg-primary-accent text-background font-bold rounded-2xl"
                  >
                    Join Now
                  </RouterLink>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <RouterLink
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-3 text-text-muted"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </RouterLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-3 text-red-400"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;