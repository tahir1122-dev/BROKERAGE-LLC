import { Card, CardContent } from "@/components/ui/card";
import { MapPin, FileText, Truck, CheckCircle, Shield, Clock } from "lucide-react";

const DeliveryProcess = () => {
  const processSteps = [
    {
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: "Quote Request",
      description: "Submit your shipment details for instant pricing"
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Book & Secure",
      description: "Confirm booking with our $99 refundable reservation"
    },
    {
      icon: <Truck className="h-12 w-12 text-primary" />,
      title: "Pickup & Transport",
      description: "Professional pickup and secure transportation"
    },
    {
      icon: <MapPin className="h-12 w-12 text-primary" />,
      title: "Real-time Tracking",
      description: "Monitor your shipment every step of the way"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      title: "Safe Delivery",
      description: "On-time delivery with proof of completion"
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Fee Refund",
      description: "Reservation fee refunded upon delivery"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            One-Stop-Shop: Door-To-Door Delivery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures your freight gets from point A to point B
            with complete transparency and professional handling
          </p>
        </div>
        {/* Door-to-Door images gallery (uses public/d1..d6.jpg) */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Door-To-Door Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Card key={n} className="group overflow-hidden border border-transparent shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <img src={`/d${n}.jpg`} alt={`door-to-door-${n}`} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" />
                <CardContent className="p-2 text-center bg-white group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <p className="text-sm text-gray-700 group-hover:text-white">Door to Door</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center bg-white group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex justify-center mb-6 mt-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-white">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-orange-100">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;