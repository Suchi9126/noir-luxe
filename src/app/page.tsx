import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import DiningExperience from "@/components/DiningExperience";
import FeaturedDishes from "@/components/FeaturedDishes";
import StatsBanner from "@/components/StatsBanner";
import ChefSpotlight from "@/components/ChefSpotlight";
import ParallaxQuote from "@/components/ParallaxQuote";
import Testimonials from "@/components/Testimonials";
import ReservationCTA from "@/components/ReservationCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main style={{ background: "#0A0A0A", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <DiningExperience />
      <FeaturedDishes />
      <StatsBanner />
      <ParallaxQuote />
      <ChefSpotlight />
      <Testimonials />
      <ReservationCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
