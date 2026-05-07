import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Compass, ShieldCheck } from "lucide-react";
import Button from '../components/Button';
import { AuthFormContext } from '../services/AuthFormService';
import { userService } from '../services/UserService';
import { cn } from "../utils/cn";

const Login: React.FC = () => {
  const authStrategy = AuthFormContext.getStrategy('login');
  const [formState, setFormState] = useState<Record<string, string>>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await userService.login({
        email: formState.email,
        password: formState.password
      });
      navigate("/profile");
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-accent/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
      >
        {/* Left Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2 mb-8 group w-fit">
              <div className="w-8 h-8 bg-primary-accent rounded-lg flex items-center justify-center">
                <Compass className="text-background w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-poppins text-white">Adventurers</span>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
            <p className="text-text-muted">Enter your credentials to continue your journey.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3"
            >
              <ShieldCheck className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary-accent transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formState.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-text-muted focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-all"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary-accent transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={formState.password}
                  onChange={e => handleChange('password', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-text-muted focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary-accent focus:ring-primary-accent focus:ring-offset-background" />
                <span className="text-text-muted group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-primary-accent hover:text-primary-accent/80 font-medium transition-colors">Forgot password?</a>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full py-4 rounded-2xl group"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <p className="mt-8 text-center text-text-muted text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white font-bold hover:text-primary-accent transition-colors">
              Create one now
            </Link>
          </p>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:block relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1517760444937-f6397edcfa8e?auto=format&fit=crop&w=1200" 
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <ShieldCheck key={i} className="w-4 h-4 text-primary-accent" />)}
              </div>
              <p className="text-xl text-white font-medium mb-4 italic">
                "The most beautiful thing in the world is, of course, the world itself."
              </p>
              <p className="text-text-muted text-sm uppercase tracking-widest font-bold">— Wallace Stevens</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;