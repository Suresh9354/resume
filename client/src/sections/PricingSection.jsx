import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PRICING_PLANS } from '../utils/constants';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

export default function PricingSection({ showTitle = true }) {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">Simple, transparent pricing</h2>
            <p className="text-[#9CA3AF] text-lg">Start free. Upgrade when you&apos;re ready to accelerate your job search.</p>
          </motion.div>
        )}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                'glass-card p-8 flex flex-col relative',
                plan.highlighted && 'border-[#8B5CF6]/50 purple-glow scale-[1.02]'
              )}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold rounded-full bg-[#8B5CF6] text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-[#F8FAFC]">{plan.name}</h3>
              <p className="text-sm text-[#9CA3AF] mt-1 mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#F8FAFC]">{plan.price}</span>
                <span className="text-[#9CA3AF]">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#9CA3AF]">
                    <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={plan.name === 'Enterprise' ? '/#contact' : '/register'}>
                <Button variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
