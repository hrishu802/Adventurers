import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Compass, CheckCircle2 } from "lucide-react";
import Button from '../components/Button';
import { AuthFormContext } from '../services/AuthFormService';
import { userService } from '../services/UserService';

const Signup: React.FC = () => {
  const authStrategy = AuthFormContext.getStrategy('signup');
  const [formState, setFormState] = useState<Record<string, string>>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await userService.register({
        name: formState.name,
        email: formState.email,
        password: formState.password
      });
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary-accent/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary-accent/10 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex-row-reverse"
      >
        {/* Right Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2 mb-8 group w-fit">
              <div className="w-8 h-8 bg-secondary-accent rounded-lg flex items-center justify-center">
                <Compass className="text-background w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-poppins text-white">Adventurers</span>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-3">Join the Adventure</h1>
            <p className="text-text-muted">Create your account and start exploring the world today.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formState.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-text-muted focus:outline-none focus:border-secondary-accent focus:ring-1 focus:ring-secondary-accent transition-all"
                />
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary-accent transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formState.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-text-muted focus:outline-none focus:border-secondary-accent focus:ring-1 focus:ring-secondary-accent transition-all"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary-accent transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={formState.password}
                  onChange={e => handleChange('password', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-text-muted focus:outline-none focus:border-secondary-accent focus:ring-1 focus:ring-secondary-accent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-text-muted">
              <input type="checkbox" required className="w-4 h-4 rounded border-white/10 bg-white/5 text-secondary-accent focus:ring-secondary-accent focus:ring-offset-background" />
              <span>I agree to the <a href="#" className="text-secondary-accent hover:underline">Terms of Service</a> and <a href="#" className="text-secondary-accent hover:underline">Privacy Policy</a></span>
            </div>

            <Button 
              type="submit" 
              variant="accent" 
              className="w-full py-4 rounded-2xl group"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <p className="mt-8 text-center text-text-muted text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-bold hover:text-secondary-accent transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Left Side - Visual */}
        <div className="hidden lg:block relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200" 
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Why join us?</h3>
              <ul className="space-y-3">
                {[
                  "Exclusive travel deals for members",
                  "Save and share your dream itineraries",
                  "24/7 priority support for all trips",
                  "Community of like-minded explorers"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-muted text-sm">
                    <CheckCircle2 className="w-5 h-5 text-secondary-accent shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;