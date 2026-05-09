import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import FeaturedDishes from "@/components/FeaturedDishes";
import DiningExperience from "@/components/DiningExperience";
import ChefSpotlight from "@/components/ChefSpotlight";
import Testimonials from "@/components/Testimonials";
import ReservationCTA from "@/components/ReservationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#0A0A0A" }}>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <FeaturedDishes />
      <DiningExperience />
      <ChefSpotlight />
      <Testimonials />
      <ReservationCTA />
      <Footer />
    </main>
  );
}
