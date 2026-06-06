import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../sections/HeroSection';
import TrustedCompanies from '../sections/TrustedCompanies';
import FeaturesSection from '../sections/FeaturesSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import PricingSection from '../sections/PricingSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';
import { Button } from '../components/ui/Button';
import AuthContext from '../context/AuthContext';

export default function LandingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return null; // Prevent visual flash of landing page sections before redirect
  }

  return (
    <>
      <HeroSection />
      <TrustedCompanies />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 purple-glow"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">Ready to land your dream job?</h2>
            <p className="text-[#9CA3AF] mb-8 max-w-xl mx-auto">
              Join thousands of professionals who improved their ATS scores and got more interviews.
            </p>
            <Link to="/register">
              <Button size="lg">
                Start Free Today <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
