import HeroSection from "./components/Hero";
import TestimonialSection from "./components/testamonial";
import ContactSection from "./components/Contact";
import Footer from "./components/footer";
import SubHero from "./components/SubHero";
import ComplaintsPage from "./components/Complaint";
import NavBar from "./components/NavBar";
export default function Home() {
  return (
    <>
    <NavBar />
    <HeroSection />
    <SubHero />
    <TestimonialSection />
    <ComplaintsPage />
    <ContactSection />
    <Footer />
    </>
  );
}
