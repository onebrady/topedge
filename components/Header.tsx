"use client";

import { useState, useEffect } from "react";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { locationsData } from "@/lib/data/locationsData";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLocationPage = pathname?.startsWith('/locations') || false;

  useEffect(() => {
    const handleScroll = () => {
      // Only show background after scrolling past the weather bar (32px)
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-elegant" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.webp"
              alt="Top Edge Car Wash"
              width={160}
              height={64}
              priority
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="/#pricing" className={`${isLocationPage && !isScrolled ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors font-medium`}>
              Pricing
            </a>

            {/* Locations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 ${isLocationPage && !isScrolled ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors font-medium outline-none`}>
                Locations
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/locations" className="cursor-pointer">
                    <MapPin className="mr-2 h-4 w-4" />
                    All Locations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {locationsData.map((location) => (
                  <DropdownMenuItem key={location.id} asChild>
                    <Link href={`/locations/${location.slug}`} className="cursor-pointer">
                      {location.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/manage-membership" className={`${isLocationPage && !isScrolled ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors font-medium`}>
              Manage Membership
            </Link>

            <Link href="/contact" className={`${isLocationPage && !isScrolled ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors font-medium`}>
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="default" asChild>
              <Link href="/locations">
                <MapPin className="mr-2 h-4 w-4" />
                Find Location
              </Link>
            </Button>
            <Button variant="default" size="default" className="gradient-primary hover:opacity-90 shadow-glow" asChild>
              <Link href="/contact">
                Join Unlimited
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${isLocationPage && !isScrolled ? 'text-white' : 'text-foreground'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="flex flex-col gap-4 p-6">
              <a href="/#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
                Pricing
              </a>

              {/* Mobile Locations Dropdown */}
              <div className="flex flex-col gap-2">
                <Link href="/locations" className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                  Locations
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <div className="pl-4 flex flex-col gap-2 text-sm">
                  {locationsData.map((location) => (
                    <Link
                      key={location.id}
                      href={`/locations/${location.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/manage-membership" className="text-foreground hover:text-primary transition-colors font-medium">
                Manage Membership
              </Link>

              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              <Button variant="outline" size="default" className="w-full" asChild>
                <Link href="/locations">
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Location
                </Link>
              </Button>
              <Button variant="default" size="default" className="w-full gradient-primary shadow-glow" asChild>
                <Link href="/contact">
                  Join Unlimited
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
