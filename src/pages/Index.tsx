import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import InfoSections from "@/components/InfoSections";
import Stats from "@/components/Stats";
import DeliveryProcess from "@/components/DeliveryProcess";
import OrderTracking from "@/components/OrderTracking";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <InfoSections />
      <Stats />
      <DeliveryProcess />
      <OrderTracking />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
