import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin 
} from "react-icons/fa";
import {
  ArrowUp, 
  Compass, 
  Mail, 
  Send 
} from "lucide-react";
import { FooterService } from '../services/FooterService';
import Button from "./Button";

const footerService = new FooterService();

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <RouterLink to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 bg-primary-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary-accent/20">
                <Compass className="text-background w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-poppins tracking-tight text-white">
                Adventurers
              </span>
            </RouterLink>
            <p className="text-text-muted leading-relaxed">
              Crafting unforgettable journeys for the modern explorer. Discover the world's most hidden gems with our curated travel experiences.
            </p>
            <div className="flex items-center gap-4">
              {[FaInstagram, FaTwitter, FaFacebook, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted hover:text-primary-accent hover:bg-white/10 transition-colors border border-white/10"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerService.getLinks().map((link) => (
                <li key={link.label}>
                  <RouterLink
                    to={link.path || "/"}
                    className="text-text-muted hover:text-primary-accent transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-accent mr-0 group-hover:mr-2 transition-all" />
                    {link.label}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-muted">
                <Mail className="w-5 h-5 text-primary-accent shrink-0" />
                <span>hello@adventurers.com</span>
              </li>
              <li className="text-text-muted leading-relaxed">
                123 Travel Street, Adventure Bay,<br />
                World Explorer HQ
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-text-muted mb-6 text-sm">
              Get the latest updates and exclusive travel deals.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-primary-accent transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary-accent rounded-lg flex items-center justify-center text-background hover:scale-110 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Adventurers. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-primary-accent hover:text-background transition-all border border-white/10 group"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;