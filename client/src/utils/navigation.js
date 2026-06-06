/**
 * Scroll to a landing-page section by id.
 * Works from home (instant) or other routes (navigate home first).
 */
export function scrollToSection(sectionId, navigate, pathname) {
  const scroll = () => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (pathname === '/') {
    scroll();
    window.history.replaceState(null, '', `/#${sectionId}`);
    return;
  }

  navigate('/', { state: { scrollTo: sectionId } });
}

export function isNavLinkActive(link, pathname, hash) {
  if (link.hash) {
    return pathname === '/' && hash === `#${link.hash}`;
  }
  if (link.to === '/') {
    return pathname === '/' && !hash;
  }
  return pathname === link.to;
}
