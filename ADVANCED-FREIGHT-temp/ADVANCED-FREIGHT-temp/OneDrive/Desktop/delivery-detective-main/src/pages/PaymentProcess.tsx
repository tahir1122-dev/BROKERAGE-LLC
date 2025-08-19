import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Lock, Shield, CreditCard, Banknote, Phone, Mail, ArrowRight } from "lucide-react";
// use public image for hero background

const PaymentProcess = () => {
    const [agree, setAgree] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!agree) {
            toast({ title: "Please accept the terms", description: "You must agree to continue.", variant: "destructive" as any });
            return;
        }
        toast({ title: "Redirecting to secure payment", description: "This is a demo flow—no real charge will be made." });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative min-h-[300px] flex items-end">
                <img src="/img_01.jpg" alt="Payment background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="container mx-auto px-4 py-10 relative z-10">
                    <div className="text-sm text-white/80"><Link to="/" className="hover:text-white">Home</Link> <span className="mx-1">/</span> Payment Process</div>
                    <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">Payment Process</h1>
                    <p className="mt-3 text-white/80 max-w-2xl">Pay invoices securely through our encrypted checkout. We support cards, ACH, and wire.</p>
                </div>
            </section>

            {/* Steps */}
            <section className="container mx-auto px-4 pt-10 pb-2">
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2"><span className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span> Enter Details</div>
                    <div className="flex items-center gap-2 opacity-80"><span className="h-6 w-6 rounded-full bg-primary/70 text-white flex items-center justify-center text-xs">2</span> Review</div>
                    <div className="flex items-center gap-2 opacity-70"><span className="h-6 w-6 rounded-full bg-primary/50 text-white flex items-center justify-center text-xs">3</span> Pay</div>
                </div>
            </section>

            {/* Main content */}
            <section className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Billing details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="first">First name</Label>
                                    <Input id="first" required placeholder="John" />
                                </div>
                                <div>
                                    <Label htmlFor="last">Last name</Label>
                                    <Input id="last" required placeholder="Doe" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" required placeholder="you@company.com" />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" placeholder="(555) 123-4567" />
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" placeholder="Company LLC" />
                                </div>

                                <div>
                                    <Label htmlFor="invoice">Invoice #</Label>
                                    <Input id="invoice" placeholder="INV-2025-001" />
                                </div>
                                <div>
                                    <Label htmlFor="amount">Amount (USD)</Label>
                                    <Input id="amount" type="number" min="0" step="0.01" required placeholder="0.00" />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Payment method</Label>
                                    <div className="mt-2 grid sm:grid-cols-3 gap-3">
                                        <Button type="button" variant="outline" className="justify-start gap-2"><CreditCard className="h-4 w-4" /> Credit/Debit Card</Button>
                                        <Button type="button" variant="outline" className="justify-start gap-2"><Banknote className="h-4 w-4" /> ACH</Button>
                                        <Button type="button" variant="outline" className="justify-start gap-2"><Banknote className="h-4 w-4" /> Wire</Button>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="reason">Payment reason</Label>
                                    <Select>
                                        <SelectTrigger id="reason" className="mt-2">
                                            <SelectValue placeholder="Select reason" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="freight">Freight Charges</SelectItem>
                                            <SelectItem value="detention">Detention/Layover</SelectItem>
                                            <SelectItem value="accessorial">Accessorial Fees</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="md:col-span-2 flex items-start gap-3 pt-2">
                                    <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
                                    <Label htmlFor="agree" className="text-sm text-gray-600">
                                        I agree to the <a className="underline" href="#">Terms</a> and <a className="underline" href="#">Privacy Policy</a>.
                                    </Label>
                                </div>

                                <div className="md:col-span-2 flex justify-end pt-2">
                                    <Button type="submit" className="bg-primary hover:bg-primary-dark">Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Secure checkout</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-700 space-y-3">
                            <div className="flex items-start gap-3"><Lock className="h-5 w-5 text-primary mt-0.5" /> All payments are encrypted and processed securely. We never store card details.</div>
                            <div className="flex items-start gap-3"><CreditCard className="h-5 w-5 text-primary mt-0.5" /> Major cards supported. ACH and wire available for larger invoices.</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Need help?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-gray-700">
                            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> <a href="tel:+15025302684" className="hover:underline">+1 (502) 530-2684</a></div>
                            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> <a href="mailto:andrew@advfreightbrokerage.com" className="hover:underline">andrew@advfreightbrokerage.com</a></div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PaymentProcess;
