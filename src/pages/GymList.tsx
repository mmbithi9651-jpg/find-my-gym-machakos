import { useState } from "react";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { GYMS } from "@/data/gyms";

export default function GymList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "General", "Crossfit", "Yoga", "Bodybuilding"];

  const filteredGyms = GYMS.filter((gym) => {
    const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         gym.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || gym.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Your Gym</h1>
            <p className="text-muted-foreground">Showing {filteredGyms.length} gyms in Machakos</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Name or location..."
                className="pl-10 h-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {filteredGyms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGyms.map((gym) => (
              <Card key={gym.id} className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow bg-white">
                <div className="relative h-48">
                  <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 left-4 bg-primary">{gym.category}</Badge>
                </div>
                <CardHeader className="pb-2">
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
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {gym.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link to={`/gyms/${gym.id}`} className="w-full">
                    <Button variant="default" className="w-full">View Gym Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold">No gyms found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            <Button variant="link" onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}