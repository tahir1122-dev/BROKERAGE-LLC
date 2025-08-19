import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import logisticsCenter from "@/assets/logistics-center.jpg";
import handshake from "@/assets/handshake.jpg";
import warehouseWorker from "@/assets/warehouse-worker.jpg";

const InfoSections = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 space-y-20">
        {/* Dedicated Lane Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <img 
              src={logisticsCenter} 
              alt="Logistics center operations" 
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Is a Dedicated Lane?
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              A dedicated lane is a specialized transportation route between two specific locations 
              that we service regularly with committed capacity and preferred pricing.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Guaranteed capacity and consistent service</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Preferred pricing for regular shipments</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Priority booking and scheduling</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Dedicated account management</span>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-dark">
              Learn More About Dedicated Lanes
            </Button>
          </div>
        </div>

        {/* Reservation Fee Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={handshake} 
              alt="Business partnership" 
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why We Charge a $99 Reservation Fee?
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our reservation fee ensures committed capacity and serious booking intentions, 
              which allows us to provide better service and competitive rates.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Guaranteed truck capacity for your shipment</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Priority scheduling and dispatch</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Reduced risk of last-minute cancellations</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Better rates due to confirmed commitments</span>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-dark">
              Understand Our Fee Structure
            </Button>
          </div>
        </div>

        {/* Refundable Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <img 
              src={warehouseWorker} 
              alt="Warehouse operations" 
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Good News: It's Fully Refundable
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Your reservation fee is completely refundable upon successful completion of your shipment, 
              making it a risk-free commitment to quality service.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">100% refundable upon delivery completion</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">No hidden fees or additional charges</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Quick refund processing within 5 business days</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Transparent billing and refund policies</span>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-dark">
              View Our Refund Policy
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSections;