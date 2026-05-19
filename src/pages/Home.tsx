import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GYMS } from "@/data/gyms";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/ab1a5981-906f-42c3-b33c-1c1321856c38/machakos-gym-hero-a1022072-1779179187658.webp"
            alt="Gym Hero"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Find Your Strength in <span className="text-primary">Machakos</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover the best gyms, book professional sessions, and gear up with exclusive merchandise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search gyms by name or area..."
                className="pl-10 h-12 bg-white/90 border-0 focus-visible:ring-primary"
              />
            </div>
            <Link to="/gyms">
              <Button size="lg" className="h-12 px-8">
                Explore All Gyms
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["General", "Crossfit", "Yoga", "Bodybuilding"].map((cat) => (
              <Card key={cat} className="hover:border-primary cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg">{cat}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gyms */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Gyms</h2>
              <p className="text-muted-foreground">Top rated fitness centers in Machakos County</p>
            </div>
            <Link to="/gyms" className="text-primary font-medium flex items-center gap-1 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GYMS.slice(0, 3).map((gym) => (
              <motion.div
                key={gym.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-52">
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">{gym.category}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold">{gym.name}</CardTitle>
                      <div className="flex items-center gap-1 text-yellow-500 font-bold">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{gym.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{gym.location}</span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {gym.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/gyms/${gym.id}`} className="w-full">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join hundreds of members in Machakos who have found their perfect gym environment with us.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="font-bold px-10">
              Join Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}