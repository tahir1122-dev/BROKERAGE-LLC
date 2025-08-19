import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Johnson Manufacturing",
      text: "Advanced Freight has been our go-to logistics partner for over 3 years. Their reliability and competitive pricing have helped us streamline our supply chain operations.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      company: "Rodriguez Distribution",
      text: "The real-time tracking and professional communication sets them apart. We always know where our freight is and when it will arrive.",
      rating: 5
    },
    {
      name: "Emily Chen",
      company: "Tech Solutions Inc",
      text: "Their dedicated lane service has saved us thousands in shipping costs while improving delivery consistency. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from businesses who trust us with their freight
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="text-center">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-primary">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;