import { motion } from 'framer-motion';
import { COMPANIES } from '../utils/constants';

export default function TrustedCompanies() {
  return (
    <section className="py-12 border-y border-[#27272A]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-[#9CA3AF] mb-8">
          Trusted by professionals from top companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {COMPANIES.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-lg md:text-xl font-semibold text-[#9CA3AF]/60 hover:text-[#9CA3AF] transition-colors"
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
