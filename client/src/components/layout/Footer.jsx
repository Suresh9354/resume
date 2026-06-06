import { Link } from 'react-router-dom';
import { Sparkles, Share2, Code2, Globe, Mail } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import NavLinkItem from './NavLinkItem';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', to: '/', hash: 'features' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Resume Scanner', to: '/upload', requiresAuth: true },
    { label: 'Dashboard', to: '/dashboard', requiresAuth: true },
  ],
  Company: [
    { label: 'Contact', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'About', to: '/', hash: 'features' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/faq' },
    { label: 'Terms of Service', to: '/faq' },
  ],
};

const footerLinkClass = 'text-sm text-[#9CA3AF] hover:text-[#C4B5FD] transition-colors';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[#27272A]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30">
                <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <span className="font-bold text-lg text-[#F8FAFC]">AI Resume Analyzer</span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 max-w-sm">
              AI-powered resume analysis platform. Get ATS scores, keyword optimization, and career insights instantly.
            </p>
            <div className="flex gap-3">
              {[Share2, Code2, Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-[#161622] border border-[#27272A] text-[#9CA3AF] hover:text-[#8B5CF6] hover:border-[#8B5CF6]/30 transition-all"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-[#F8FAFC] mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <NavLinkItem link={link} className={footerLinkClass} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-[#F8FAFC] mb-4">Newsletter</h4>
            <p className="text-sm text-[#9CA3AF] mb-4">Get career tips and product updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Email address" className="text-sm" type="email" />
              <Button size="sm" type="button">Join</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#27272A] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#9CA3AF]">
            &copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
          </p>
          <p className="text-sm text-[#9CA3AF]">Built with AI. Designed for careers.</p>
        </div>
      </div>
    </footer>
  );
}
