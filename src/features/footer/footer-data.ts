export interface FooterLink  {
  label: string;
  href: string;
};

export interface FooterColumn  {
  title: string;
  links: FooterLink[];
};

export interface SocialIcon  {
  name: string;
  href: string;
  icon: string;
};

// Footer data based on Figma design
export const footerColumns: FooterColumn[] = [
  {
    title: "LINKS",
    links: [
      { label: "Recipes", href: "#" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "LEGAL & SUPPORT",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "MAIN CATEGORIES",
    links: [
      { label: "Popular", href: "#" },
      { label: "Ingredients", href: "#" },
      { label: "Meals & Dishes", href: "#" },
      { label: "Diets", href: "#" },
      { label: "Occasions", href: "#" },
    ],
  },
];

export const socialIcons: SocialIcon[] = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Twitter", href: "#", icon: "twitter" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "Pinterest", href: "#", icon: "pinterest" },
];
  