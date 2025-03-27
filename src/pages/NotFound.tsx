
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-fcb-dark">
      <div className="glass-card p-12 rounded-xl max-w-lg mx-auto text-center">
        <div className="inline-block mx-auto mb-6">
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 rounded-full bg-fcb-blue animate-pulse-subtle"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-display text-5xl font-bold">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold mb-4 text-gradient">Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-fcb-blue to-fcb-red text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
