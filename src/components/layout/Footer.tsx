import { Dumbbell, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Find My Gym</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              The ultimate platform for fitness enthusiasts in Machakos. Locate, book, and gear up for your fitness journey.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/gyms" className="text-muted-foreground hover:text-primary transition-colors">Find Gyms</Link></li>
              <li><Link to="/store" className="text-muted-foreground hover:text-primary transition-colors">Merch Store</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">Your Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-muted-foreground mb-4">Machakos Town, Kenya</p>
            <div className="flex gap-4">
              <Instagram className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
              <Twitter className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
              <Facebook className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Find My Gym Machakos. All rights reserved.
        </div>
      </div>
    </footer>
  );
}