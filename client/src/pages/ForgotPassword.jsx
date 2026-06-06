import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <GlassCard hover={false} className="p-8 text-center">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Check your inbox</h2>
          <p className="text-[#9CA3AF] text-sm mb-6">
            We sent a password reset link to <strong className="text-[#F8FAFC]">{email}</strong>
          </p>
          <Link to="/login">
            <Button variant="secondary" className="w-full">
              <ArrowLeft className="w-4 h-4" /> Back to sign in
            </Button>
          </Link>
        </GlassCard>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <GlassCard hover={false} className="p-8">
        <div className="inline-flex p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 mb-4">
          <Mail className="w-6 h-6 text-[#8B5CF6]" />
        </div>
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Forgot password?</h2>
        <p className="text-[#9CA3AF] text-sm mb-6">Enter your email and we&apos;ll send you a reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Email</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
        <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F8FAFC]">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
      </GlassCard>
    </motion.div>
  );
}
