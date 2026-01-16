import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Videos from "@/components/Videos";
import PersonalGallery from "@/components/PersonalGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Videos />
      <PersonalGallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
