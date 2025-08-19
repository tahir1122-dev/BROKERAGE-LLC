import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Prominent hero image with minimal overlay to make image stand out */}
      <div className="absolute inset-0">
        <img
          src="/img_01.jpg"
          alt="Professional freight truck"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-1 gap-12 items-center">
          <div className="max-w-3xl text-gray-900">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Your ADVANCED
              <br /> FREIGHT
              <br /> BROKERAGE LLC
            </h1>

            <p className="text-lg mb-6 leading-relaxed">
              Connecting businesses with reliable transportation solutions across North America.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-800 hover:bg-primary/5 font-semibold px-6 py-3">
                Learn More
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;