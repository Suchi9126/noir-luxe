export type BrandTheme = {
  accentColor: string;
  accentColorDark: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textMuted: string;
  fontDisplay: string;
  fontBody: string;
  heroOverlay: string;
  sectionSpacing: "compact" | "balanced" | "spacious" | "generous";
  buttonStyle: string;
  cardStyle: string;
};

export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  type: string;
  accentColor: string;
  accentColorDark: string;
  bgColor: string;
  phone: string;
  location: string;
  instagram: string;
  website: string;
  offerBanner: string;
  heroImage: string;
  galleryImages: string[];
  menuHighlights: Array<{
    name: string;
    desc: string;
    price: string;
    image: string;
  }>;
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  whatsappActions: Array<{
    label: string;
    emoji?: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
  marqueeItems: string[];
  theme: BrandTheme;
};
