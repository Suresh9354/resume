import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

export default function ContactPage() {
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

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-2">Contact Us</h1>
        <p className="text-[#9CA3AF]">We&apos;d love to hear from you. Send us a message.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, title: 'Email', value: 'support@resumeai.com' },
            { icon: MessageSquare, title: 'Live Chat', value: 'Mon–Fri, 9am–6pm EST' },
          ].map(({ icon: Icon, title, value }) => (
            <GlassCard key={title} hover={false} className="p-5">
              <Icon className="w-5 h-5 text-[#8B5CF6] mb-2" />
              <p className="font-medium text-[#F8FAFC] text-sm">{title}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">{value}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard hover={false} className="md:col-span-2 p-8">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">Message sent!</h3>
              <p className="text-[#9CA3AF] text-sm">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#9CA3AF] mb-2 block">Name</label>
                  <Input placeholder="Your name" required />
                </div>
                <div>
                  <label className="text-sm text-[#9CA3AF] mb-2 block">Email</label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="text-sm text-[#9CA3AF] mb-2 block">Subject</label>
                <Input placeholder="How can we help?" required />
              </div>
              <div>
                <label className="text-sm text-[#9CA3AF] mb-2 block">Message</label>
                <textarea
                  className="input-field min-h-[120px] resize-y"
                  placeholder="Your message..."
                  required
                />
              </div>
              <Button type="submit" className="w-full justify-center" disabled={loading}>
                {loading ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
              </Button>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
