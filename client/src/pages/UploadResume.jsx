import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../utils/constants';
import useAnalysisStore, { mapRecordToAnalysis } from '../store/useAnalysisStore';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function UploadResume() {
  const navigate = useNavigate();
  const setAnalysis = useAnalysisStore((s) => s.setAnalysis);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      setFile(null);
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File must be under 5MB.');
      return;
    }
    setFile(selectedFile);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setProgress(0);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post(`${API_BASE}/resume/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / (e.total || 1)));
        },
      });

      const analysis = mapRecordToAnalysis({
        _id: res.data.analysisId,
        ...res.data.analysis,
        fileUrl: res.data.filePath,
        extractedText: res.data.extractedText,
        createdAt: new Date().toISOString(),
      });
      setAnalysis(analysis);
      navigate('/analysis');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Upload failed');
      setLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">Upload Resume</h1>
        <p className="text-[#9CA3AF] mt-1">PDF format, up to 5MB. Secure AI processing.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Drop your resume</CardTitle>
          <CardDescription>We&apos;ll analyze ATS compatibility, skills, and suggestions</CardDescription>
        </CardHeader>

        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div
                className={`m-6 mt-0 border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  dragging ? 'border-[#8B5CF6] bg-[#8B5CF6]/10' : 'border-[#27272A] hover:border-[#8B5CF6]/50 hover:bg-white/5'
                }`}
                onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              >
                <div className="inline-flex p-5 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-4">
                  <UploadCloud className="w-12 h-12 text-[#8B5CF6]" />
                </div>
                <p className="font-medium text-[#F8FAFC] mb-1">{dragging ? 'Drop it here!' : 'Click or drag PDF here'}</p>
                <p className="text-sm text-[#9CA3AF]">Encrypted & private processing</p>
                <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} />
              </div>

              {file && (
                <div className="mx-6 mb-6 flex items-center gap-3 p-4 rounded-xl bg-[#111827]/80 border border-[#27272A]">
                  <FileText className="w-5 h-5 text-[#8B5CF6]" />
                  <span className="text-sm text-[#F8FAFC] flex-1 truncate">{file.name}</span>
                  <button type="button" onClick={() => setFile(null)} className="text-[#9CA3AF] hover:text-[#F8FAFC]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {error && <p className="mx-6 mb-4 text-sm text-red-400">{error}</p>}

              <div className="px-6 pb-6">
                <Button className="w-full" disabled={!file} onClick={handleUpload}>
                  Analyze Resume
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="loading" className="p-12 text-center">
              <div className="inline-block w-12 h-12 rounded-full border-2 border-[#27272A] border-t-[#8B5CF6] animate-spin mb-6" />
              <h4 className="font-semibold text-[#F8FAFC] mb-2">Analyzing your resume...</h4>
              <p className="text-sm text-[#9CA3AF] mb-6">Extracting skills and computing ATS score</p>
              <div className="max-w-xs mx-auto h-2 rounded-full bg-[#27272A] overflow-hidden">
                <motion.div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-sm font-medium text-[#8B5CF6]">{progress}%</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
