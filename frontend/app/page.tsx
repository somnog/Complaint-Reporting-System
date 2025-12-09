import HeroSection from "./components/Hero";
import TestimonialSection from "./components/testamonial";
import ContactSection from "./components/Contact";
import Footer from "./components/footer";
import SubHero from "./components/SubHero";
export default function Home() {
  return (
    <>
    <HeroSection />
    <SubHero />
    <TestimonialSection />
    <ContactSection />
    <Footer />
    </>
  );
}
