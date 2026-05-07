import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Star, 
  Calendar, 
  CreditCard, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  Info,
  Clock,
  ShieldCheck,
  CreditCard as CardIcon
} from "lucide-react";
import { cn } from "../utils/cn";
import Button from '../components/Button';
import { BookingService } from '../services/BookingService';
import { PaymentContext, PaymentType } from '../strategies/PaymentStrategy';

const Buy: React.FC = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentType, setPaymentType] = useState<PaymentType>('card');
  const [isLoading, setIsLoading] = useState(false);
  
  const bookingService = new BookingService();
  const paymentStrategy = PaymentContext.getStrategy(paymentType);

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Info className="w-10 h-10 text-text-muted" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">No package selected</h2>
        <p className="text-text-muted mb-8 max-w-md">Please select an adventure from our catalog to proceed with booking.</p>
        <Button variant="primary" onClick={() => navigate('/packages')}>Browse Adventures</Button>
      </div>
    );
  }

  const imageUrl = data.image || data.img || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200';

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Immersive Header */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={imageUrl} className="w-full h-full object-cover" alt="Adventure" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Explorer
              </button>
              <h1 className="text-4xl md:text-6xl font-bold font-poppins text-white mb-4">
                {data.title || data.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5 text-primary-accent" />
                  <span className="font-medium">{data.location || 'Global Destination'}</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-accent">
                  <Star className="w-5 h-5 fill-secondary-accent" />
                  <span className="font-bold">{data.rating || '4.8'} (Excellent)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-accent/10 rounded-xl flex items-center justify-center">
                  <Info className="w-4 h-4 text-primary-accent" />
                </div>
                Overview
              </h3>
              <p className="text-text-muted leading-relaxed text-lg mb-8">
                {data.description || data.desc || "Experience the vacation of your dreams with this exclusive package. Enjoy curated activities, premium accommodations, and stress-free planning."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/5">
                {[
                  { icon: Clock, label: "Duration", value: "7 Days / 6 Nights" },
                  { icon: ShieldCheck, label: "Support", value: "24/7 Priority" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary-accent">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">{item.label}</p>
                      <p className="text-white font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Highlights / Itinerary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary-accent/10 rounded-xl flex items-center justify-center">
                  <Star className="w-4 h-4 text-secondary-accent" />
                </div>
                Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.highlights || ['Guided Tours', 'Premium Accommodation', 'Meals Included', 'Free Cancellations', 'Local Transportation', 'Entry Fees']).map((h: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-text-muted group">
                    <div className="w-2 h-2 bg-primary-accent rounded-full group-hover:scale-150 transition-transform" />
                    <span className="group-hover:text-white transition-colors">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sticky Booking Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl"
              >
                <div className="bg-white/[0.03] p-8 border-b border-white/5 text-center">
                  <p className="text-text-muted text-sm uppercase tracking-widest mb-2 font-bold">Total Price</p>
                  <h3 className="text-5xl font-bold text-white">
                    ${data.price}
                    <span className="text-sm text-text-muted ml-2 font-normal">/ person</span>
                  </h3>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {step === 'details' && (
                      <motion.form 
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleDetailsSubmit}
                        className="space-y-6"
                      >
                        <h4 className="text-white font-bold mb-2">Traveler Information</h4>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="Full Name" 
                            required 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary-accent transition-all"
                          />
                          <input 
                            type="email" 
                            placeholder="Email Address" 
                            required 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary-accent transition-all"
                          />
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-text-muted ml-1">Departure Date</label>
                            <input 
                              type="date" 
                              required 
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary-accent transition-all"
                            />
                          </div>
                        </div>
                        <Button variant="primary" type="submit" className="w-full py-4 rounded-2xl group shadow-2xl shadow-primary-accent/20">
                          Confirm Details
                          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.form>
                    )}

                    {step === 'payment' && (
                      <motion.form 
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handlePaymentSubmit}
                        className="space-y-6"
                      >
                        <h4 className="text-white font-bold mb-4">Secure Payment</h4>
                        <div className="flex gap-4 mb-6">
                          {['card', 'paypal'].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setPaymentType(t as any)}
                              className={cn(
                                "flex-1 py-3 rounded-2xl border transition-all text-sm font-bold flex items-center justify-center gap-2",
                                paymentType === t 
                                  ? "bg-secondary-accent/10 border-secondary-accent/30 text-secondary-accent" 
                                  : "bg-white/5 border-white/5 text-text-muted hover:bg-white/10"
                              )}
                            >
                              {t === 'card' ? <CardIcon className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full bg-blue-500" />}
                              {t === 'card' ? 'Card' : 'PayPal'}
                            </button>
                          ))}
                        </div>

                        {paymentType === 'card' && (
                          <div className="space-y-4">
                            <input 
                              type="text" 
                              placeholder="Card Number" 
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-secondary-accent transition-all"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <input 
                                type="text" 
                                placeholder="MM/YY" 
                                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-secondary-accent transition-all"
                              />
                              <input 
                                type="text" 
                                placeholder="CVV" 
                                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-secondary-accent transition-all"
                              />
                            </div>
                          </div>
                        )}

                        <Button 
                          variant="accent" 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full py-4 rounded-2xl shadow-2xl shadow-secondary-accent/20"
                        >
                          {isLoading ? "Processing..." : `Pay $${data.price}`}
                        </Button>
                        <button 
                          type="button" 
                          onClick={() => setStep('details')}
                          className="w-full text-center text-text-muted text-xs hover:text-white transition-colors"
                        >
                          Edit traveler details
                        </button>
                      </motion.form>
                    )}

                    {step === 'success' && (
                      <motion.div 
                        key="success"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-8"
                      >
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                        <p className="text-text-muted text-sm mb-8 leading-relaxed">
                          Your adventure is secured. We've sent your itinerary and confirmation to your email.
                        </p>
                        <Button variant="primary" className="w-full rounded-2xl" onClick={() => navigate('/')}>
                          Return Home
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-primary-accent shrink-0" />
                <div>
                  <p className="text-white text-sm font-bold mb-1">Secure Transaction</p>
                  <p className="text-text-muted text-xs">Your data is protected by industry-standard encryption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;