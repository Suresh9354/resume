import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';

export default function HeroSection() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleScanClick = () => {
    if (user) {
      navigate('/upload');
    } else {
      navigate('/login', { state: { from: { pathname: '/upload' } } });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-12 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-sm text-[#C4B5FD] mb-6">
              <Star className="w-4 h-4 fill-[#8B5CF6] text-[#8B5CF6]" />
              Trusted by 10,000+ job seekers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="gradient-text">AI-powered</span>
              <br />
              resume analysis
            </h1>
            <p className="text-lg text-[#9CA3AF] max-w-xl leading-relaxed mb-8">
              Get instant ATS scores, keyword optimization, and personalized career insights. Land more interviews with data-driven resume improvements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to={user ? '/upload' : '/register'}>
                  {user ? 'Upload Resume' : 'Get Started Free'} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" type="button" onClick={handleScanClick}>
                <Play className="w-4 h-4" /> Scan Resume
              </Button>
            </div>
            <div className="flex gap-8 mt-10 pt-10 border-t border-[#27272A]">
              {[
                { value: 94, suffix: '%', label: 'Avg ATS boost' },
                { value: 5, suffix: 's', label: 'Analysis time' },
                { value: 50, suffix: 'K+', label: 'Resumes scanned' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#F8FAFC]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <GlassCard hover={false} className="p-8 purple-glow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Live Preview</p>
                  <h3 className="text-xl font-semibold text-[#F8FAFC] mt-1">Senior Software Engineer</h3>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-[#8B5CF6]">91</p>
                  <p className="text-xs text-[#9CA3AF]">ATS Score</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-[#27272A] overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '91%' }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#9CA3AF]">
                Add &quot;Kubernetes&quot; and quantify impact with metrics to boost your ATS match by ~12%.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
