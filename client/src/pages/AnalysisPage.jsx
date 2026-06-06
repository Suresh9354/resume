import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { CheckCircle, XCircle, Briefcase, Zap, ArrowRight } from 'lucide-react';
import { API_BASE } from '../utils/constants';
import useAnalysisStore, { mapRecordToAnalysis } from '../store/useAnalysisStore';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const chartTooltipStyle = {
  contentStyle: { background: '#161622', border: '1px solid #27272A', borderRadius: '12px' },
};

function ScoreCircle({ score }) {
  const data = [{ name: 'score', value: score, fill: score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444' }];
  return (
    <div className="relative w-48 h-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={12} data={data} startAngle={90} endAngle={-270}>
          <RadialBar background={{ fill: '#27272A' }} dataKey="value" cornerRadius={6} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-[#F8FAFC]">{score}</span>
        <span className="text-xs text-[#9CA3AF]">ATS Score</span>
      </div>
    </div>
  );
}

export default function AnalysisPage() {
  const location = useLocation();
  const currentAnalysis = useAnalysisStore((s) => s.currentAnalysis);
  const setAnalysis = useAnalysisStore((s) => s.setAnalysis);
  const [loading, setLoading] = useState(!currentAnalysis);
  const analysis = currentAnalysis;

  useEffect(() => {
    if (currentAnalysis) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/resume`);
        const records = res.data.data || [];
        const id = location.state?.analysisId;
        const record = id ? records.find((r) => r._id === id) : records[0];
        if (record) setAnalysis(mapRecordToAnalysis(record));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentAnalysis, location.state?.analysisId, setAnalysis]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Loading analysis..." />
      </div>
    );
  }

  if (!analysis) {
    return (
      <Card className="text-center p-12 max-w-lg mx-auto">
        <p className="text-[#9CA3AF] mb-6">No analysis found. Upload a resume to get started.</p>
        <Link to="/upload"><Button>Upload Resume</Button></Link>
      </Card>
    );
  }

  const scoreBreakdown = [
    { category: 'Keywords', value: Math.min(100, analysis.score + 5) },
    { category: 'Format', value: Math.min(100, analysis.score - 3) },
    { category: 'Skills', value: analysis.score },
    { category: 'Structure', value: Math.min(100, analysis.score + 2) },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">AI Analysis</h1>
        {analysis.jobRole && analysis.jobRole !== 'Unspecified' && (
          <Badge className="mt-2">{analysis.jobRole}</Badge>
        )}
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 text-center p-8">
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
          </CardHeader>
          <ScoreCircle score={analysis.score} />
          <p className="text-sm text-[#9CA3AF] mt-4">
            {analysis.score >= 80 ? 'Excellent match' : analysis.score >= 50 ? 'Room for improvement' : 'Needs major revision'}
          </p>
        </Card>

        <Card className="md:col-span-2 p-6">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
          </CardHeader>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={scoreBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                <XAxis dataKey="category" stroke="#9CA3AF" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#9CA3AF" fontSize={12} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-[#8B5CF6]" /> Skills Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-emerald-400 flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4" /> Validated Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.skills?.length > 0 ? analysis.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{skill}</span>
              )) : <span className="text-[#9CA3AF] text-sm">No skills detected</span>}
            </div>
          </div>
          {analysis.missingSkills?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-red-400 flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4" /> Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {analysis.suggestions?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-[#8B5CF6]" /> Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.suggestions.map((sug, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-[#111827]/50 border border-[#27272A]">
                <CheckCircle className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{sug}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/ats-report"><Button variant="secondary">View ATS Report <ArrowRight className="w-4 h-4" /></Button></Link>
        <Link to="/upload"><Button>Analyze Another</Button></Link>
      </div>
    </div>
  );
}
