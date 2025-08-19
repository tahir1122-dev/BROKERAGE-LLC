import { Card, CardContent } from "@/components/ui/card";
import { Truck, Refrigerator, Package, Clock } from "lucide-react";

const Services = () => {
  const services = [
    {
      img: "/service 2.jpeg",
      title: "Rented Trailer Program",
      description: "Rented trailer options to get you moving quickly without upfront purchase costs."
    },
    {
      img: "/service 3.jpeg",
      title: "TWIC Card Assistance",
      description: "Assistance with TWIC and security credentials for high-paying restricted loads."
    },
    {
      img: "/service 4.jpeg",
      title: "Insurance Application",
      description: "Help with commercial trucking insurance applications and trusted partner introductions."
    },
    {
      img: "/servive 1.jpg",
      title: "Factoring Registration",
      description: "Fast factoring setup so you get paid quickly and maintain cash flow."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive freight brokerage solutions tailored to meet your transportation needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`group border border-transparent shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-orange-300 ${index === 1 ? 'lg:col-span-1 lg:transform scale-105 shadow-2xl' : ''}`}>
              {/* use an img tag to ensure the asset from public/ loads reliably */}
              <img
                src={encodeURI(service.img)}
                alt={service.title}
                className="w-full h-44 object-cover rounded-t-md"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <CardContent className="p-6 text-center bg-white group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-orange-100">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>

    </section>
  );
};

export default Services;