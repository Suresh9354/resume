import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Code2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { API_BASE } from '../utils/constants';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../utils/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      login(res.data.token, res.data.user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
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
      console.error("Firebase social login error:", err);
      setError(err.response?.data?.message || err.message || 'Social sign-in failed');
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <GlassCard hover={false} className="p-8">
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Welcome back</h2>
        <p className="text-[#9CA3AF] text-sm mb-6">Sign in to continue to your dashboard</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button type="button" variant="secondary" className="w-full" onClick={() => handleSocialLogin(googleProvider)} disabled={loading}>
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </Button>
          <Button type="button" variant="secondary" className="w-full" onClick={() => handleSocialLogin(githubProvider)} disabled={loading}>
            <Code2 className="w-4 h-4" /> GitHub
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#27272A]" /></div>
          <div className="relative flex justify-center text-xs"><span className="px-2 bg-[#161622] text-[#9CA3AF]">or continue with email</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Email</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Password</label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#9CA3AF] cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-[#27272A]" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-[#8B5CF6] hover:text-[#C4B5FD]">Forgot password?</Link>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#9CA3AF]">
          Don&apos;t have an account?{' '}
          <Link to="/register" state={{ from: location.state?.from }} className="text-[#8B5CF6] hover:text-[#C4B5FD] font-medium">Sign up</Link>
        </p>
      </GlassCard>
    </motion.div>
  );
}
