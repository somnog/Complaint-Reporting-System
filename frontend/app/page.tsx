import HeroSection from "./components/Hero";
import TestimonialSection from "./components/testamonial";
import ContactSection from "./components/Contact";
import Footer from "./components/footer";
import SubHero from "./components/SubHero";
import ComplaintsPage from "./components/Complaint";
import NavBar from "./components/NavBar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Complaint | Raise Your Tone",
  description:
    "a digital platform designed to strengthen communication between Somali citizens and government authorities. It provides a reliable, transparent, and organized way for the public to submit complaints, give feedback, and track the progress of their cases.",
};
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
