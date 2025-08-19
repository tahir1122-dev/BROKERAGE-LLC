import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, Shield } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      number: "12K+",
      label: "Loads Delivered",
      description: "Successfully completed shipments"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      number: "6K+",
      label: "Satisfied Customers",
      description: "Trusted business partnerships"
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      number: "35K+",
      label: "Miles Covered",
      description: "Coast to coast coverage"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      number: "0.4M+",
      label: "Insurance Coverage",
      description: "Comprehensive cargo protection"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Track Record</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence in freight brokerage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-300 text-sm">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;