import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      {/* CTA pill */}
      <div className="container mx-auto px-4 pt-16">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-orange-500 to-orange-400 px-8 md:px-16 py-10 md:py-12">
          <div className="text-2xl md:text-3xl font-bold max-w-3xl">
            We ensure safe transportation & delivery
          </div>
          <Link to="/contact" className="inline-block mt-6">
            <Button variant="secondary" className="bg-[#14424B] text-white hover:bg-[#0f343a]">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer body */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand + contact */}
          <div>
            <div className="text-left">
              <div className="text-2xl font-bold tracking-tight leading-tight">
                <span className="text-white">ADVANCED</span>
                <br />
                <span className="text-white">FREIGHT</span>
                <br />
                <span className="text-white">BROKERAGE LLC</span>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-gray-300">
              <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-orange-400" /> <a href="tel:+15025302684" className="hover:underline">+1 502-530-2684</a></div>
              <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-orange-400 mt-0.5" />
                <span>18285 Old Houston Rd, Conroe, TX 77302</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 text-gray-300">
              <a aria-label="facebook" href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"><Facebook className="h-4 w-4" /></a>
              <a aria-label="twitter" href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"><Twitter className="h-4 w-4" /></a>
              <a aria-label="linkedin" href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"><Linkedin className="h-4 w-4" /></a>
              <a aria-label="instagram" href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-gray-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/payment-process" className="hover:text-white">Payment Process</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold">Services</h4>
            <ul className="mt-5 space-y-3 text-gray-300">
              <li>Rented Trailer Program</li>
              <li>TWIC Card Assistance</li>
              <li>Insurance Application Assistance</li>
              <li>Factoring Registration</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold">Newsletter</h4>
            <p className="mt-5 text-gray-300 text-sm">Subscribe for updates, offers, and logistics insights</p>
            <div className="mt-4 flex gap-2">
              <Input placeholder="Email Address" className="bg-white/5 border-white/10 text-white placeholder:text-white/60" />
              <Button className="bg-orange-500 hover:bg-orange-600" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-5 flex items-center gap-2 text-gray-200">
              <Mail className="h-4 w-4 text-orange-400" />
              <span>andrew@advfreightbrokerage.com</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          ©2025 Advanced Freight Brokerage LLC. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;