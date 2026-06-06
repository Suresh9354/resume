import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Upload, FileText, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { API_BASE } from '../utils/constants';
import useAnalysisStore, { mapRecordToAnalysis } from '../store/useAnalysisStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const chartTooltipStyle = {
  contentStyle: { background: '#161622', border: '1px solid #27272A', borderRadius: '12px' },
  labelStyle: { color: '#9CA3AF' },
  itemStyle: { color: '#F8FAFC' },
};

export default function Dashboard() {
  const setAnalysis = useAnalysisStore((s) => s.setAnalysis);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/resume`);
        setRecords(res.data.data || []);
      } catch (err) {
        console.error('Failed to load resumes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const avgScore = records.length
    ? Math.round(records.reduce((s, r) => s + (r.score || 0), 0) / records.length)
    : 0;
  const latest = records[0] ? mapRecordToAnalysis(records[0]) : null;

  const scoreTrend = [...records]
    .reverse()
    .slice(-6)
    .map((r, i) => ({
      name: `Scan ${i + 1}`,
      score: r.score || 0,
    }));

  const skillsData = (latest?.skills || []).slice(0, 6).map((skill) => ({
    skill: skill.length > 12 ? `${skill.slice(0, 10)}…` : skill,
    count: 1,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const metrics = [
    { label: 'Total Scans', value: records.length, icon: FileText, color: 'text-[#8B5CF6]' },
    { label: 'Avg ATS Score', value: `${avgScore}%`, icon: Award, color: 'text-emerald-400' },
    { label: 'Latest Score', value: latest ? `${latest.score}%` : '—', icon: TrendingUp, color: 'text-amber-400' },
    { label: 'Skills Found', value: latest?.skills?.length || 0, icon: Upload, color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">Dashboard</h1>
        <p className="text-[#9CA3AF] mt-1">Track your resume performance and recent uploads</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">{m.label}</p>
                  <p className="text-2xl font-bold text-[#F8FAFC] mt-1">{m.value}</p>
                </div>
                <m.icon className={`w-8 h-8 ${m.color} opacity-80`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Trend</CardTitle>
            <CardDescription>Your ATS scores over recent scans</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {scoreTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={scoreTrend}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis domain={[0, 100]} stroke="#9CA3AF" fontSize={12} />
                  <Tooltip {...chartTooltipStyle} />
                  <Area type="monotone" dataKey="score" stroke="#8B5CF6" fill="url(#scoreGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[#9CA3AF] text-sm">Upload a resume to see trends</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
            <CardDescription>From your latest analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {skillsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={skillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="skill" type="category" width={80} stroke="#9CA3AF" fontSize={11} />
                  <Tooltip {...chartTooltipStyle} />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[#9CA3AF] text-sm">No skills data yet</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Your latest resume analyses</CardDescription>
          </div>
          <Link to="/upload">
            <Button size="sm"><Upload className="w-4 h-4" /> Upload</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#9CA3AF] mb-4">No resumes uploaded yet</p>
              <Link to="/upload"><Button>Upload Your First Resume</Button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {records.slice(0, 5).map((record) => {
                const item = mapRecordToAnalysis(record);
                return (
                  <Link
                    key={item.id}
                    to="/analysis"
                    state={{ analysisId: item.id }}
                    onClick={() => setAnalysis(item)}
                    className="flex items-center justify-between p-4 rounded-xl border border-[#27272A] hover:border-[#8B5CF6]/30 hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-[#8B5CF6]/10">
                        <FileText className="w-5 h-5 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#F8FAFC]">{item.jobRole}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={item.score >= 80 ? 'success' : item.score >= 50 ? 'warning' : 'outline'}>
                        {item.score}% ATS
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
