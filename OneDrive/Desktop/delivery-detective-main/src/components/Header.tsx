import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-gray-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-gray-700">info@advancedfreight.com</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-gray-700">123 Logistics Blvd, Transport City, TX 75001</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-gray-700">24/7 Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary">
                ADVANCED FREIGHT
                <div className="text-sm text-secondary-dark font-normal">BROKERAGE LLC</div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center space-x-6">
              <NavLink to="/" className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>Home</NavLink>
              <a href="#services" className="text-gray-700 hover:text-primary font-medium">Services</a>
              <NavLink to="/about" className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>About</NavLink>
              <NavLink to="/payment-process" className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>Payment Process</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>Contact</NavLink>
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center">
              <a href="/agreement">
                <Button className="border px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base">Send Agreement</Button>
              </a>
            </div>

            {/* Mobile: menu toggle + send agreement visible */}
            <div className="flex items-center lg:hidden">
              <a href="/agreement" className="mr-3">
                <Button className="border px-3 py-1.5 text-sm">Send Agreement</Button>
              </a>
              <MobileMenuToggle open={mobileOpen} setOpen={setMobileOpen} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu rendered outside header for stacking */}
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
    </>
  );
};

export default Header;

// Mobile menu components (kept in same file for simplicity)
function MobileMenuToggle({ open, setOpen }: { open: boolean; setOpen: (v: boolean | ((s: boolean) => boolean)) => void }) {
  return (
    <button onClick={() => setOpen((s: boolean) => !s)} aria-label="Toggle menu" className="p-2">
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}

function MobileMenu({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  if (!open) return null;

  return (
    <div className="lg:hidden bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-3">
          <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>Home</NavLink>
          <a href="#services" onClick={() => setOpen(false)} className="text-gray-700 hover:text-primary font-medium">Services</a>
          <NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>About</NavLink>
          <NavLink to="/payment-process" onClick={() => setOpen(false)} className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>Payment Process</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => `font-medium ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}`}>Contact</NavLink>
          <a href="/agreement" className="mt-2" onClick={() => setOpen(false)}>
            <Button className="w-full border px-3 py-2">Send Agreement</Button>
          </a>
        </nav>
      </div>
    </div>
  );
}