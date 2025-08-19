import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
// use public image for hero background

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero with image + breadcrumb */}
            <section className="relative min-h-[320px] flex items-end">
                <img src="/img_01.jpg" alt="Freight truck night scene" className="absolute inset-0 w-full h-full object-cover" />
                <div className="container mx-auto px-4 py-10 relative z-10">
                    <div className="text-sm text-white/80"><Link to="/" className="hover:text-white">Home</Link> <span className="mx-1">/</span> Contact</div>
                    <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">Contact Us</h1>
                </div>
            </section>

            {/* Info + Map */}
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Let's Contact For Better Result</h2>
                <p className="mt-2 text-gray-600">You can also reach out to us by phone or email</p>

                <div className="mt-8 grid lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Card className="rounded-2xl">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Address</div>
                                        <div className="font-semibold text-gray-900">12345 Old Houston Rd<br />Conroe, TX 77302</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl">
                            <CardContent className="p-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <a href="tel:+15025302684" className="font-semibold text-gray-900 hover:underline">+1 (502) 530-2684</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <a href="mailto:andrew@freightbrokerage.com" className="font-semibold text-gray-900 hover:underline">andrew@freightbrokerage.com</a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="rounded-2xl overflow-hidden border shadow-sm">
                            <iframe
                                title="Office Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55457.77353091472!2d-95.5193132!3d30.3118761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864735a3d7b6e3a9%3A0x6a1d4f4d4d7f9e31!2sConroe%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000"
                                width="100%"
                                height="340"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact form */}
            <section className="container mx-auto px-4 pb-12">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Contact Advanced Freight Brokerage LLC</h3>
                        <p className="mt-3 text-gray-600">Our team will reach out to you shortly.</p>
                    </div>
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input placeholder="Your Name" required />
                                <Input type="email" placeholder="Your Email" required />
                                <Input placeholder="Your Phone" />
                                <Input placeholder="Company" />
                                <Textarea placeholder="Write your message here..." className="md:col-span-2 min-h-[140px]" required />
                                <div className="md:col-span-2 flex justify-end">
                                    <Button className="bg-primary hover:bg-primary-dark">Send Message</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
