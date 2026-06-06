import { useState, useContext, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Code2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { API_BASE } from '../utils/constants';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { cn } from '../utils/cn';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../utils/firebase';

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-500', 'bg-amber-500', 'bg-yellow-500', 'bg-emerald-500'];
  return { score, label: labels[Math.min(score, 3) - 1] || 'Weak', color: colors[Math.min(score, 3) - 1] || 'bg-red-500' };
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const passwordsMatch = confirmPassword && password === confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!terms) {
      setError('Please accept the terms and conditions');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
      login(res.data.token, res.data.user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const { user: firebaseUser } = result;
      
      const userEmail = firebaseUser.email || `${firebaseUser.uid}@social.auth.com`;
      const userName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || `user_${firebaseUser.uid.substring(0, 5)}`;

      const res = await axios.post(`${API_BASE}/auth/firebase-login`, {
        email: userEmail,
        name: userName,
        uid: firebaseUser.uid
      });
      
      login(res.data.token, res.data.user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Firebase social register error:", err);
      setError(err.response?.data?.message || err.message || 'Social sign-in failed');
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <GlassCard hover={false} className="p-8">
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Create your account</h2>
        <p className="text-[#9CA3AF] text-sm mb-6">Start optimizing your resume for free</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button type="button" variant="secondary" className="w-full" onClick={() => handleSocialLogin(googleProvider)} disabled={loading}>Google</Button>
          <Button type="button" variant="secondary" className="w-full" onClick={() => handleSocialLogin(githubProvider)} disabled={loading}><Code2 className="w-4 h-4" /> GitHub</Button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Full Name</label>
            <Input type="text" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Email</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Password</label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={cn('h-1 flex-1 rounded-full', i <= strength.score ? strength.color : 'bg-[#27272A]')} />
                  ))}
                </div>
                <p className="text-xs text-[#9CA3AF]">Strength: {strength.label}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Confirm Password</label>
            <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>
          <label className="flex items-start gap-2 text-sm text-[#9CA3AF] cursor-pointer">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1 rounded border-[#27272A]" required />
            <span>I agree to the <Link to="/faq" className="text-[#8B5CF6]">Terms of Service</Link> and Privacy Policy</span>
          </label>
          <Button type="submit" className="w-full" disabled={loading || !passwordsMatch}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#9CA3AF]">
          Already have an account?{' '}
          <Link to="/login" state={{ from: location.state?.from }} className="text-[#8B5CF6] hover:text-[#C4B5FD] font-medium">Sign in</Link>
        </p>
      </GlassCard>
    </motion.div>
  );
}
