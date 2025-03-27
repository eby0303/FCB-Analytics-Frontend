
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu when window resizes to larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Players', path: '/players' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-fcb-dark/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <h1 className="text-xl font-display font-bold tracking-tight">
                <span className="text-[#004D98]">FC</span>
                <span className="text-[#A50044]">B</span>
                <span className="text-white ml-1">Analytics</span>
              </h1>
            </NavLink>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 text-sm font-medium transition-colors duration-300 hover:text-white ${
                    isActive 
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-fcb-blue after:to-fcb-red' 
                      : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? 'fixed inset-0 z-40 bg-fcb-dark/95 backdrop-blur-lg animate-fade-in' : 'hidden'
        }`}
      >
        <div className="pt-20 pb-4 px-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `block py-4 text-center text-lg font-medium border-b border-white/10 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
