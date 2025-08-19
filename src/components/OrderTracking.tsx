import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Truck, CheckCircle } from "lucide-react";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  // Mock tracking data
  const mockTrackingData = {
    trackingNumber: "AFL123456789",
    status: "In Transit",
    origin: "Dallas, TX",
    destination: "Los Angeles, CA",
    estimatedDelivery: "Dec 25, 2024",
    currentLocation: "Phoenix, AZ",
    progress: 65,
    timeline: [
      { status: "Order Placed", date: "Dec 20, 2024 08:30 AM", location: "Dallas, TX", completed: true },
      { status: "Picked Up", date: "Dec 21, 2024 10:15 AM", location: "Dallas, TX", completed: true },
      { status: "In Transit", date: "Dec 22, 2024 02:45 PM", location: "Phoenix, AZ", completed: true },
      { status: "Out for Delivery", date: "Dec 25, 2024 (Estimated)", location: "Los Angeles, CA", completed: false },
      { status: "Delivered", date: "Dec 25, 2024 (Estimated)", location: "Los Angeles, CA", completed: false }
    ]
  };

  const handleTrack = () => {
    if (trackingNumber) {
      // if user provided a full tracking number, use it; otherwise generate one
      if (!trackingNumber.startsWith("AFL")) {
        const generated = `AFL${Date.now().toString(36).toUpperCase().slice(-9)}`;
        mockTrackingData.trackingNumber = generated;
        localStorage.setItem("lastTrackingId", generated);
      } else {
        mockTrackingData.trackingNumber = trackingNumber;
        localStorage.setItem("lastTrackingId", trackingNumber);
      }
      setTrackingResult(mockTrackingData);
    }
  };

  return (
    <section id="tracking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Track Your Shipment</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time tracking for complete visibility of your freight shipments
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Enter Tracking Number</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter tracking number (e.g., AFL123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleTrack} className="bg-primary hover:bg-primary-dark">
                  <Search className="h-4 w-4 mr-2" />
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>

          {trackingResult && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">
                      Tracking: {trackingResult.trackingNumber}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="bg-primary text-white">
                        {trackingResult.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Last generated ID: <span className="font-mono">{localStorage.getItem('lastTrackingId')}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Estimated Delivery</div>
                    <div className="text-lg font-semibold">{trackingResult.estimatedDelivery}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-gray-600">From</div>
                        <div className="font-semibold">{trackingResult.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-gray-600">To</div>
                        <div className="font-semibold">{trackingResult.destination}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-gray-600">Current Location</div>
                        <div className="font-semibold">{trackingResult.currentLocation}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-gray-600">Progress</div>
                        <div className="font-semibold">{trackingResult.progress}% Complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${trackingResult.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipment Timeline</h3>
                  <div className="space-y-4">
                    {trackingResult.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {event.completed ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <div className="h-6 w-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {event.status}
                          </div>
                          <div className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                            {event.date} • {event.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;