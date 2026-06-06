import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { scrollToSection, isNavLinkActive } from '../../utils/navigation';
import { cn } from '../../utils/cn';

/**
 * Smart nav link: route pages, hash sections on landing, auth-gated app links.
 */
export default function NavLinkItem({ link, className, onClick }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const active = isNavLinkActive(link, location.pathname, location.hash);

  const handleHashClick = (e) => {
    e.preventDefault();
    onClick?.();
    scrollToSection(link.hash, navigate, location.pathname);
  };

  const handleAuthClick = (e) => {
    e.preventDefault();
    onClick?.();
    navigate('/login', { state: { from: { pathname: link.to } } });
  };

  if (link.hash) {
    return (
      <a
        href={`/#${link.hash}`}
        onClick={handleHashClick}
        className={cn(className, active && '!text-[#F8FAFC]')}
      >
        {link.label}
      </a>
    );
  }

  if (link.requiresAuth && !user) {
    return (
      <a
        href={link.to}
        onClick={handleAuthClick}
        className={cn(className, location.pathname === link.to && '!text-[#F8FAFC]')}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      to={link.to}
      onClick={onClick}
      className={cn(className, location.pathname === link.to && '!text-[#F8FAFC]')}
    >
      {link.label}
    </Link>
  );
}
