import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Zap, BarChart3 } from 'lucide-react';
import BackgroundEffects from '../ui/BackgroundEffects';

const highlights = [
  { icon: Shield, text: 'Bank-grade encryption for your resume data' },
  { icon: Zap, text: 'AI analysis in under 5 seconds' },
  { icon: BarChart3, text: 'Industry-standard ATS scoring' },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex relative">
      <BackgroundEffects />
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 border-r border-[#27272A]">
        <div className="max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="p-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30">
              <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <span className="font-bold text-xl text-[#F8FAFC]">AI Resume Analyzer</span>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 gradient-text"
          >
            Land your dream job faster
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#9CA3AF] text-lg leading-relaxed mb-10"
          >
            Join thousands of professionals optimizing their resumes with AI-powered ATS scoring and career insights.
          </motion.p>
          <ul className="space-y-4">
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-[#F8FAFC]"
              >
                <div className="p-2 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                  <Icon className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <span className="text-sm">{text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
