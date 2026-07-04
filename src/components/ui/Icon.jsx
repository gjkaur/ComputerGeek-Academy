import {
  ArrowRight,
  Award,
  BarChart,
  BarChart3,
  Brain,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Cloud,
  Code,
  Cpu,
  FlaskConical,
  GraduationCap,
  Headphones,
  LineChart,
  Quote,
  Send,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
} from 'lucide-react';

const icons = {
  ArrowRight,
  Award,
  BarChart,
  BarChart3,
  Brain,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Cloud,
  Code,
  Cpu,
  FlaskConical,
  GraduationCap,
  Headphones,
  LineChart,
  Quote,
  Send,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
};

export default function Icon({ name, className = 'w-6 h-6', ...props }) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} {...props} />;
}
