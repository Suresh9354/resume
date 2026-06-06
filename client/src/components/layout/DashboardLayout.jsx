import { useState, useContext, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, LogOut, Bell, ChevronDown } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import { SIDEBAR_LINKS } from '../../utils/constants';
import { SIDEBAR_ICON_MAP } from '../../utils/sidebarIcons';
import { cn } from '../../utils/cn';
import BackgroundEffects from '../ui/BackgroundEffects';

export default function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login', { replace: true });
  };

  const SidebarContent = () => (
    <>
      <Link to="/" className="flex items-center gap-2 px-4 py-6 border-b border-[#27272A]">
        <div className="p-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30">
          <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
        </div>
        <span className="font-bold text-[#F8FAFC]">Resume AI</span>
      </Link>
      <nav className="flex-1 p-4 space-y-1">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = SIDEBAR_ICON_MAP[link.icon] || Sparkles;
          const active = location.pathname === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/30'
                  : 'text-[#9CA3AF] hover:text-[#F8FAFC] hover:bg-white/5'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen flex relative">
      <BackgroundEffects />
      <aside className="hidden lg:flex lg:w-64 flex-col fixed inset-y-0 left-0 z-40 bg-[#0B0B12]/90 border-r border-[#27272A] backdrop-blur-xl">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 w-64 z-50 flex flex-col bg-[#161622] border-r border-[#27272A] lg:hidden"
            >
              <button
                type="button"
                className="absolute top-4 right-4 p-2 text-[#9CA3AF]"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 glass-nav px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            className="lg:hidden p-2 text-[#9CA3AF] hover:text-[#F8FAFC]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 lg:flex-none" />
          <div className="flex items-center gap-3">
            <button type="button" className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F8FAFC] hover:bg-white/5" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-sm font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:block text-sm font-medium text-[#F8FAFC] max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF] hidden sm:block" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-48 glass-card py-2 shadow-xl"
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-[#9CA3AF] hover:text-[#F8FAFC] hover:bg-white/5" onClick={() => setUserMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-[#9CA3AF] hover:text-[#F8FAFC] hover:bg-white/5" onClick={() => setUserMenuOpen(false)}>
                      Settings
                    </Link>
                    <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2">
                      <LogOut size={16} /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
