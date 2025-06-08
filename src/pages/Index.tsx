
import MainLayout from "../layout/MainLayout";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ServiceCategories from "../components/ServiceCategories";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import { useEffect } from "react";

const Index = () => {
  // Update page title and meta description
  useEffect(() => {
    document.title = "VoisinAge | Entraide entre seniors et bénévoles";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "VoisinAge: La plateforme d'entraide qui met en relation les seniors, les bénévoles et les familles pour favoriser la solidarité de proximité."
      );
    }
  }, []);

  return (
    <MainLayout>
      <Hero />
      <HowItWorks />
      <ServiceCategories />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
