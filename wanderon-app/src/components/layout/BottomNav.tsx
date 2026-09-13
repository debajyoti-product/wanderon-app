import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      iconSolid: 'fa-solid fa-house', 
      iconOutline: 'fa-solid fa-house text-gray-400' 
    },
    { 
      path: '/categories',
      label: 'Categories', 
      iconSolid: 'fa-solid fa-layer-group', 
      iconOutline: 'fa-solid fa-layer-group text-gray-400' 
    },
    { 
      path: '/bookings', 
      label: 'My Trips', 
      iconSolid: 'fa-solid fa-suitcase-rolling', 
      iconOutline: 'fa-solid fa-suitcase-rolling text-gray-400' 
    },
    { 
      path: '/profile', 
      label: 'Profile', 
      iconSolid: 'fa-solid fa-user', 
      iconOutline: 'fa-regular fa-user' 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] safe-area-bottom">
      <div className="flex justify-around items-center px-2 pt-3 pb-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <MotionLink
              key={item.path}
              to={item.path}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
                isActive ? 'text-brand-cyan' : 'text-gray-400'
              }`}
            >
              <motion.div 
                initial={false}
                animate={{ scale: isActive ? 1.15 : 1 }}
                className="text-xl"
              >
                <i className={isActive ? item.iconSolid : item.iconOutline}></i>
              </motion.div>
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </MotionLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
