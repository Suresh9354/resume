import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import AuthContext from '../../context/AuthContext';
import { Button } from '../ui/Button';
import NavLinkItem from './NavLinkItem';
import { NAV_LINKS, NAV_APP_LINKS } from '../../utils/constants';
import { cn } from '../../utils/cn';

const linkClass = 'px-4 py-2 text-sm font-medium transition-colors text-[#9CA3AF] hover:text-[#F8FAFC]';
const linkClassMobile = 'block px-4 py-3 rounded-xl text-[#F8FAFC] hover:bg-white/5 transition-colors';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname, location.hash]);

  const allLinks = [...NAV_LINKS, ...NAV_APP_LINKS];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="p-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-shadow">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#F8FAFC] hidden sm:inline">
              AI Resume Analyzer
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {allLinks.map((link) => (
              <NavLinkItem
                key={`${link.label}-${link.to}`}
                link={link}
                className={linkClass}
              />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {user ? (
              <Button asChild variant="primary" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild variant="primary" size="sm">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-[#9CA3AF] hover:text-[#F8FAFC]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-[#27272A] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1 max-h-[70vh] overflow-y-auto">
              {allLinks.map((link) => (
                <NavLinkItem
                  key={`mobile-${link.label}-${link.to}`}
                  link={link}
                  className={linkClassMobile}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <div className="pt-4 flex flex-col gap-2 border-t border-[#27272A] mt-4">
                {user ? (
                  <Button asChild variant="primary" className="w-full">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/login">Log In</Link>
                    </Button>
                    <Button asChild variant="primary" className="w-full">
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
