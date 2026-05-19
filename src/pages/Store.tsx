import { ALL_MERCH } from "@/data/gyms";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function Store() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMerch = ALL_MERCH.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.gymName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = (item: any) => {
    const orders = JSON.parse(localStorage.getItem("gym_orders") || "[]");
    orders.push({
      id: Math.random().toString(36).substr(2, 9),
      gymName: item.gymName,
      productName: item.name,
      date: new Date().toLocaleDateString(),
      status: "Processing"
    });
    localStorage.setItem("gym_orders", JSON.stringify(orders));
    toast.success(`Purchased ${item.name}! Check your profile for status.`);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold mb-2 text-primary">Gym Merch Shop</h1>
            <p className="text-muted-foreground">Exclusive gear from the best gyms in Machakos</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search merchandise..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMerch.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-white/90 px-2 py-1 rounded text-xs font-bold text-primary">
                    {item.gymName}
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold">Ksh {item.price}</span>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" onClick={() => handleBuy(item)}>
                  <ShoppingBag className="h-5 w-5" /> Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredMerch.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold">No items found</h3>
            <p className="text-muted-foreground">We couldn't find any merchandise matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}