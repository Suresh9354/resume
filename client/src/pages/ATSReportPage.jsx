import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import { Download, FileJson, Printer, AlertTriangle } from 'lucide-react';
import useAnalysisStore from '../store/useAnalysisStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Card';

const categories = [
  { subject: 'Keywords', key: 'keywords' },
  { subject: 'Formatting', key: 'format' },
  { subject: 'Skills', key: 'skills' },
  { subject: 'Experience', key: 'experience' },
  { subject: 'Structure', key: 'structure' },
];

export default function ATSReportPage() {
  const analysis = useAnalysisStore((s) => s.currentAnalysis);

  if (!analysis) {
    return (
      <Card className="text-center p-12 max-w-lg mx-auto">
        <p className="text-[#9CA3AF] mb-6">No ATS report available. Run an analysis first.</p>
        <Link to="/upload"><Button>Upload Resume</Button></Link>
      </Card>
    );
  }

  const base = analysis.score;
  const breakdownScores = {
    keywords: Math.min(100, base + 8),
    format: Math.min(100, base - 5),
    skills: Math.min(100, base + 3),
    experience: Math.min(100, base - 2),
    structure: Math.min(100, base + 1),
  };

  const radarData = categories.map((c) => ({
    subject: c.subject,
    score: breakdownScores[c.key],
    fullMark: 100,
  }));

  const radialData = Object.entries(breakdownScores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    fill: value >= 80 ? '#10B981' : value >= 50 ? '#8B5CF6' : '#F59E0B',
  }));

  const missingKeywords = analysis.missingSkills?.length
    ? analysis.missingSkills
    : ['Leadership', 'Agile', 'CI/CD', 'Cloud Architecture'].filter(
        (k) => !analysis.skills?.some((s) => s.toLowerCase().includes(k.toLowerCase()))
      );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">ATS Report</h1>
          <p className="text-[#9CA3AF] mt-1">Detailed breakdown for {analysis.jobRole}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => {}}><Download className="w-4 h-4" /> PDF</Button>
          <Button variant="secondary" size="sm" onClick={() => {}}><FileJson className="w-4 h-4" /> JSON</Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="w-4 h-4" /> Print</Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Scores</CardTitle>
            <CardDescription>Individual ATS dimension ratings</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#27272A" />
                <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" fontSize={12} />
                <Radar name="Score" dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {radialData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                      <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" data={[{ value: item.value, fill: item.fill }]}>
                        <RadialBar background={{ fill: '#27272A' }} dataKey="value" cornerRadius={4} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-[#9CA3AF]">{item.name}</p>
                  <p className="font-bold text-[#F8FAFC]">{item.value}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Missing Keywords
          </CardTitle>
          <CardDescription>Add these to improve ATS match rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw) => (
              <Badge key={kw} variant="warning">{kw}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link to="/analysis"><Button variant="secondary">Back to Analysis</Button></Link>
      </div>
    </div>
  );
}
