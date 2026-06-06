import { motion } from 'framer-motion';
import { Upload, Cpu, TrendingUp } from 'lucide-react';

const steps = [
  { icon: Upload, title: 'Upload', desc: 'Drop your PDF resume securely. We support files up to 5MB.' },
  { icon: Cpu, title: 'Analyze', desc: 'Our AI scans structure, keywords, skills, and ATS compatibility in seconds.' },
  { icon: TrendingUp, title: 'Improve', desc: 'Get your score, missing keywords, and actionable suggestions to land interviews.' },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 border-y border-[#27272A]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">How it works</h2>
          <p className="text-[#9CA3AF] text-lg">Three simple steps to a stronger resume</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 mb-6 relative z-10">
                <step.icon className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest">Step {i + 1}</span>
              <h3 className="text-xl font-semibold text-[#F8FAFC] mt-2 mb-2">{step.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
