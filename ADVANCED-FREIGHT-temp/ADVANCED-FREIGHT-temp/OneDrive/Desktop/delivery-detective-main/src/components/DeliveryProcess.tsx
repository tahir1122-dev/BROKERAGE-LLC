import { Card, CardContent } from "@/components/ui/card";

const DeliveryProcess = () => {
  const processSteps = [
    {
      image: "/d1.jpg",
      title: "Quote Request",
      description: "Submit your shipment details for instant pricing"
    },
    {
      image: "/d2.jpg",
      title: "Book & Secure",
      description: "Confirm booking with our $99 refundable reservation"
    },
    {
      image: "/d3.jpg",
      title: "Pickup & Transport",
      description: "Professional pickup and secure transportation"
    },
    {
      image: "/d4.jpg",
      title: "Real-time Tracking",
      description: "Monitor your shipment every step of the way"
    },
    {
      image: "/d5.jpg",
      title: "Safe Delivery",
      description: "On-time delivery with proof of completion"
    },
    {
      image: "/d6.jpg",
      title: "Fee Refund",
      description: "Reservation fee refunded upon delivery"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
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
        {/* Gallery removed: using images inside each process step card instead of separate image cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-6 sm:p-8 text-center bg-white group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex justify-center mb-4 mt-4">
                  <img src={step.image} alt={`${step.title} image`} className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-md shadow-sm" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-white">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-orange-100">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;