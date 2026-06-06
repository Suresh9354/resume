import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { User, Mail, Calendar, FileText } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { API_BASE } from '../utils/constants';
import { mapRecordToAnalysis } from '../store/useAnalysisStore';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  useEffect(() => {
    axios.get(`${API_BASE}/resume`).then((res) => {
      setRecords(res.data.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">Profile</h1>
        <p className="text-[#9CA3AF] mt-1">Manage your account and view resume history</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-2xl font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-[#F8FAFC]">{user?.name}</p>
              <p className="text-sm text-[#9CA3AF]">{user?.email}</p>
            </div>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-2"><User className="w-4 h-4" /> Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-2"><Mail className="w-4 h-4" /> Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit">{saved ? 'Saved!' : 'Save Changes'}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resume History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSpinner text="Loading history..." />
          ) : records.length === 0 ? (
            <p className="text-[#9CA3AF] text-sm text-center py-8">No resumes uploaded yet</p>
          ) : (
            <div className="space-y-3">
              {records.map((record) => {
                const item = mapRecordToAnalysis(record);
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-[#27272A]">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#8B5CF6]" />
                      <div>
                        <p className="text-sm font-medium text-[#F8FAFC]">{item.jobRole}</p>
                        <p className="text-xs text-[#9CA3AF] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}
                        </p>
                      </div>
                    </div>
                    <Badge variant={item.score >= 80 ? 'success' : 'warning'}>{item.score}%</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
