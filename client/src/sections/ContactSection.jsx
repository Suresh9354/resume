import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

export default function ContactSection() {
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
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">Get in Touch</h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
            Have questions or need support? We&apos;d love to hear from you. Send us a message and we&apos;ll reply shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4 lg:col-span-1">
            {[
              { icon: Mail, title: 'Email Support', value: 'support@resumeai.com' },
              { icon: MessageSquare, title: 'Live Chat Support', value: 'Mon–Fri, 9am–6pm EST' },
            ].map(({ icon: Icon, title, value }) => (
              <GlassCard key={title} hover={false} className="p-6">
                <div className="p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 w-fit mb-4">
                  <Icon className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h4 className="font-semibold text-[#F8FAFC] text-base">{title}</h4>
                <p className="text-sm text-[#9CA3AF] mt-2">{value}</p>
              </GlassCard>
            ))}
          </div>

          <GlassCard hover={false} className="lg:col-span-2 p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full text-emerald-400 mb-4 border border-emerald-500/20">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">Message Sent Successfully</h3>
                <p className="text-sm text-[#9CA3AF] max-w-sm mx-auto">
                  Thank you for reaching out! We&apos;ll review your message and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-[#9CA3AF] mb-2 block">Name</label>
                    <Input placeholder="Your name" required className="text-[#F8FAFC]" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#9CA3AF] mb-2 block">Email Address</label>
                    <Input type="email" placeholder="you@example.com" required className="text-[#F8FAFC]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#9CA3AF] mb-2 block">Subject</label>
                  <Input placeholder="How can we help?" required className="text-[#F8FAFC]" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#9CA3AF] mb-2 block">Message</label>
                  <textarea
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#9CA3AF]/50 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] min-h-[140px] resize-y transition-all"
                    placeholder="Describe your inquiry..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full justify-center gap-2 py-3" disabled={loading}>
                  {loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
