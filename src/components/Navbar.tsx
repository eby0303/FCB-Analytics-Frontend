
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
    { name: 'Predictions', path: '/predictions' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-fcb-dark/90 dark:bg-fcb-dark/90 border-b border-white/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <h1 className="text-xl font-display font-bold tracking-tight flex items-center">
                <span className="text-[#004D98]">FC</span>
                <span className="text-[#A50044]">B</span>
                <span className="text-[#FFED02] ml-0.5">•</span>
                <span className="text-white dark:text-white ml-1">Analytics</span>
              </h1>
            </NavLink>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 text-sm font-medium transition-colors duration-300 hover:text-white dark:hover:text-white ${
                    isActive 
                      ? 'text-white dark:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-fcb-blue after:via-fcb-red after:to-[#FFED02]' 
                      : 'text-gray-300 dark:text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
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
      
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-fcb-dark w-[90vw] max-w-md rounded-lg shadow-lg p-2 text-center mt-40">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `block py-4 text-lg font-medium border-b border-white/10 ${
                    isActive ? 'text-[#FFED02]' : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
