
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Players', path: '/players' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-fcb-dark/90 dark:bg-fcb-dark/90 border-b border-white/10 dark:border-white/10 light:bg-white/90 light:border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <h1 className="text-xl font-display font-bold tracking-tight flex items-center">
                <span className="text-[#004D98]">FC</span>
                <span className="text-[#A50044]">B</span>
                <span className="text-[#FFED02] ml-0.5">•</span>
                <span className="text-white dark:text-white light:text-fcb-dark ml-1">Analytics</span>
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
                  `relative px-1 py-2 text-sm font-medium transition-colors duration-300 hover:text-white dark:hover:text-white light:hover:text-fcb-dark ${
                    isActive 
                      ? 'text-white dark:text-white light:text-fcb-dark after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-fcb-blue after:via-fcb-red after:to-[#FFED02]' 
                      : 'text-gray-300 dark:text-gray-300 light:text-gray-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-fcb-dark/10 text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-fcb-dark transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 dark:bg-white/10 light:bg-fcb-dark/10 text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-fcb-dark transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
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
      
      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-fcb-dark dark:bg-fcb-dark light:bg-white">
          <div className="fixed inset-0 bg-black/95 dark:bg-black/95 light:bg-white/95">
            <div className="pt-20 pb-4 px-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `block py-4 text-center text-lg font-medium border-b border-white/10 dark:border-white/10 light:border-gray-200 ${
                      isActive ? 'text-[#FFED02] dark:text-[#FFED02] light:text-fcb-blue' : 'text-gray-300 dark:text-gray-300 light:text-gray-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
