import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Shield, Truck, Users } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative min-h-[300px] flex items-end">
                <img src="/img_01.jpg" alt="About background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="container mx-auto px-4 py-10 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        <span className="text-white">About Advanced Freight Brokerage</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-white/80">Decades of experience moving freight reliably across North America. We combine technology, trusted carrier relationships, and a relentless customer focus.</p>
                </div>
            </section>

            {/* Values grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border p-6 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Truck className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Nationwide Coverage</h3>
                        <p className="mt-2 text-gray-600">Dry van, reefer, and expedited options on dedicated lanes coast-to-coast.</p>
                    </div>
                    <div className="rounded-xl border p-6 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Safety & Compliance</h3>
                        <p className="mt-2 text-gray-600">Carrier vetting, insurance monitoring, and on-time performance tracking.</p>
                    </div>
                    <div className="rounded-xl border p-6 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">People First</h3>
                        <p className="mt-2 text-gray-600">A dedicated team that knows your freight, your routes, and your priorities.</p>
                    </div>
                    <div className="rounded-xl border p-6 hover:shadow-lg transition-shadow">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Proven Reliability</h3>
                        <p className="mt-2 text-gray-600">Transparent communication and dependable capacity when you need it.</p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="bg-gray-50">
                <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">Our Story</h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            We started with a simple goal: make freight simple, predictable, and stress-free for shippers.
                            Today, we leverage modern tools to provide real-time visibility, proactive exception handling,
                            and a network of dependable carriers—backed by a team that genuinely cares.
                        </p>
                        <ul className="mt-6 space-y-3 text-gray-700">
                            <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-primary" /> Live tracking and status updates</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-primary" /> Dedicated account management</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-primary" /> Optimized routing and cost control</li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-white p-8 border shadow-sm">
                        <h3 className="text-xl font-semibold">Certifications & Memberships</h3>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-lg border p-4 text-sm">FMCSA Compliant</div>
                            <div className="rounded-lg border p-4 text-sm">SmartWay Partner</div>
                            <div className="rounded-lg border p-4 text-sm">TIA Principles</div>
                            <div className="rounded-lg border p-4 text-sm">CTPAT Aware</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
