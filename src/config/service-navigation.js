import {
  ChartBarIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  RocketLaunchIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

/**
 * Shared service links for desktop and mobile navigation.
 * Keep this list as the single source of truth for both menus.
 */
const serviceNavigation = [
  {
    name: "Digital Marketing",
    description: "Maximizing online presence through strategic promotion.",
    href: "/services/digital-marketing",
    icon: SpeakerWaveIcon,
  },
  {
    name: "PPC Service",
    description: "Effective Advertising Through Pay-Per-Click",
    href: "/services/ppc-service",
    icon: CurrencyDollarIcon,
  },
  {
    name: "SMO Service",
    description: "Boosting Online Presence through SMO Services",
    href: "/services/smo-service",
    icon: ChartBarIcon,
  },
  {
    name: "SEO Service",
    description: "Boosting online presence through expert optimization",
    href: "/services/seo-service",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Social Marketing",
    description: "Promoting Brands Through Social Media Engagement.",
    href: "/services/social-marketing",
    icon: RocketLaunchIcon,
  },
  {
    name: "Website Optimization",
    description: "Maximizing website performance for optimal results.",
    href: "/services/website-optimization",
    icon: CommandLineIcon,
  },
  {
    name: "Web Development",
    description: "Creating dynamic websites with coding expertise.",
    href: "/services/web-development",
    icon: CodeBracketIcon,
  },
];

export default serviceNavigation;
