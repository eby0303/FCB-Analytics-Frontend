
import { NavLink } from 'react-router-dom';
import { Github, Twitter, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fcb-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-display font-bold tracking-tight flex items-center">
                <span className="text-[#004D98]">FC</span>
                <span className="text-[#A50044]">B</span>
                <span className="text-[#FFED02] ml-0.5">•</span>
                <span className="text-white ml-1">Analytics</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm">
              Tracking performance, analyzing statistics, and following Barcelona's journey throughout the season.
            </p>
          </div>
          
          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-fcb-yellow transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/players" className="text-gray-400 hover:text-fcb-yellow transition-colors">
                  Players
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-400 hover:text-fcb-yellow transition-colors">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          
          {/* External links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-3">FC Barcelona</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.fcbarcelona.com/en/" 
                  className="text-gray-400 hover:text-fcb-yellow transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Official Website
                </a>
              </li>
              <li>
                <a 
                  href="https://www.fcbarcelona.com/en/tickets/football" 
                  className="text-gray-400 hover:text-fcb-yellow transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Buy Tickets
                </a>
              </li>
              <li>
                <a 
                  href="https://store.fcbarcelona.com/en/" 
                  className="text-gray-400 hover:text-fcb-yellow transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Official Store
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-3">Connect</h3>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://twitter.com/FCBarcelona" 
                className="bg-white/10 hover:bg-fcb-blue p-2.5 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.instagram.com/fcbarcelona/" 
                className="bg-white/10 hover:bg-fcb-red p-2.5 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/fcbarcelona/" 
                className="bg-white/10 hover:bg-fcb-blue p-2.5 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.youtube.com/fcbarcelona" 
                className="bg-white/10 hover:bg-fcb-red p-2.5 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="mailto:info@fcbanalytics.com" 
                className="bg-white/10 hover:bg-[#FFED02] hover:text-fcb-dark p-2.5 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} FC Barcelona Analytics. This is a fan-created site and is not affiliated with FC Barcelona.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-fcb-yellow transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-fcb-yellow transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-fcb-yellow transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
