import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { FEATURES } from '../utils/constants';
import GlassCard from '../components/ui/GlassCard';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">Everything you need to stand out</h2>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Advanced AI tools designed to optimize every aspect of your resume for modern hiring.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = LucideIcons[feature.icon] || LucideIcons.Sparkles;
            return (
              <GlassCard key={feature.title} className="p-6 h-full">
                <div className="p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 w-fit mb-4">
                  <Icon className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{feature.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
