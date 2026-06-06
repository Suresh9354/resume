export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const NAV_LINKS = [
  { label: 'Home', to: '/', hash: 'home' },
  { label: 'Features', to: '/', hash: 'features' },
  { label: 'Pricing', to: '/', hash: 'pricing' },
  { label: 'FAQ', to: '/', hash: 'faq' },
  { label: 'Contact', to: '/', hash: 'contact' },
];

/** Shown in navbar; requires login — redirects to login with return path */
export const NAV_APP_LINKS = [
  { label: 'Resume Scanner', to: '/upload', requiresAuth: true },
  { label: 'Dashboard', to: '/dashboard', requiresAuth: true },
];

export const SIDEBAR_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Upload Resume', href: '/upload', icon: 'Upload' },
  { label: 'ATS Reports', href: '/ats-report', icon: 'FileBarChart' },
  { label: 'AI Suggestions', href: '/analysis', icon: 'Sparkles' },
  { label: 'Saved Resumes', href: '/dashboard', icon: 'FolderOpen' },
  { label: 'Profile', href: '/profile', icon: 'User' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
];

export const FEATURES = [
  { title: 'ATS Resume Score', desc: 'Real-time compatibility scoring against industry-standard applicant tracking systems.', icon: 'Gauge' },
  { title: 'AI Keyword Optimization', desc: 'Smart keyword mapping to match job descriptions and boost visibility.', icon: 'Search' },
  { title: 'Resume Grammar Check', desc: 'AI-powered grammar and clarity analysis for professional polish.', icon: 'SpellCheck2' },
  { title: 'Smart Skill Suggestions', desc: 'Discover missing skills and get tailored recommendations.', icon: 'Lightbulb' },
  { title: 'Resume Formatting Analysis', desc: 'Ensure your layout parses correctly across all ATS platforms.', icon: 'Layout' },
  { title: 'AI Career Recommendations', desc: 'Personalized career path insights based on your experience.', icon: 'TrendingUp' },
];

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Perfect for getting started',
    features: ['3 resume scans/month', 'Basic ATS score', 'Keyword analysis', 'Email support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    desc: 'For serious job seekers',
    features: ['Unlimited scans', 'Advanced ATS report', 'AI career insights', 'Priority support', 'PDF export', 'Resume history'],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    desc: 'For teams and recruiters',
    features: ['Everything in Pro', 'Team dashboard', 'Bulk scanning', 'API access', 'Custom branding', 'Dedicated manager'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export const FAQ_ITEMS = [
  { q: 'How accurate is the ATS score?', a: 'Our AI model is trained on resume structure, keywords, and formatting against thousands of real job postings to deliver industry-standard scoring.' },
  { q: 'What file formats are supported?', a: 'We currently support PDF and DOCX formats up to 5MB. PDF is recommended for best parsing accuracy.' },
  { q: 'Is my resume data secure?', a: 'Yes. All uploads are encrypted in transit and at rest. We never share your data with third parties.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. Cancel anytime from your settings page with no hidden fees or penalties.' },
  { q: 'How does AI analysis work?', a: 'We use Google Gemini AI to extract skills, evaluate ATS compatibility, and generate personalized improvement suggestions.' },
];

export const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Software Engineer @ Google', text: 'Landed 3 interviews in 2 weeks after optimizing my resume. The ATS score went from 62 to 91.', avatar: 'SC' },
  { name: 'Marcus Johnson', role: 'Product Manager @ Stripe', text: 'The keyword optimization alone was worth it. Finally understood why my resume was getting filtered.', avatar: 'MJ' },
  { name: 'Elena Rodriguez', role: 'Data Analyst @ Meta', text: 'Beautiful interface and incredibly accurate insights. This is the future of job applications.', avatar: 'ER' },
];

export const COMPANIES = ['Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Stripe', 'Airbnb'];
