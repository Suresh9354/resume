import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../utils/constants';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';

export default function FAQSection({ compact = false }) {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">Frequently asked questions</h2>
          {!compact && (
            <p className="text-[#9CA3AF]">Everything you need to know about AI Resume Analyzer</p>
          )}
        </motion.div>
        <Accordion items={FAQ_ITEMS} />
        {!compact && (
          <div className="text-center mt-10">
            <p className="text-[#9CA3AF] text-sm mb-4">Still have questions?</p>
            <Link to="/#contact">
              <Button variant="secondary">Contact Support</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
