import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock, ShoppingBag, Map, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GYMS } from "@/data/gyms";
import { toast } from "sonner";

export default function GymDetail() {
  const { id } = useParams<{ id: string }>();
  const gym = GYMS.find((g) => g.id === id);

  if (!gym) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Gym not found</h2>
        <Link to="/gyms">
          <Button variant="link">Back to list</Button>
        </Link>
      </div>
    );
  }

  const handleBooking = (sessionName: string) => {
    const bookings = JSON.parse(localStorage.getItem("gym_bookings") || "[]");
    bookings.push({
      id: Math.random().toString(36).substr(2, 9),
      gymName: gym.name,
      sessionName,
      date: new Date().toLocaleDateString(),
      status: "Confirmed"
    });
    localStorage.setItem("gym_bookings", JSON.stringify(bookings));
    toast.success(`Successfully booked ${sessionName} at ${gym.name}!`);
  };

  const handleMerchBuy = (merchName: string) => {
    const orders = JSON.parse(localStorage.getItem("gym_orders") || "[]");
    orders.push({
      id: Math.random().toString(36).substr(2, 9),
      gymName: gym.name,
      productName: merchName,
      date: new Date().toLocaleDateString(),
      status: "Processing"
    });
    localStorage.setItem("gym_orders", JSON.stringify(orders));
    toast.success(`Added ${merchName} to your orders!`);
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${gym.coordinates.lat},${gym.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/gyms" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Gyms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <img
                src={gym.image}
                alt={gym.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-primary">{gym.category}</Badge>
                <Badge variant="secondary" className="bg-white/90 text-black">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                  {gym.rating}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{gym.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{gym.location}</span>
                </div>
              </div>
              <Button size="lg" className="gap-2" onClick={openDirections}>
                <Map className="h-5 w-5" /> Get Directions
              </Button>
            </div>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {gym.description}
            </p>

            <Tabs defaultValue="sessions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sessions">Workout Sessions</TabsTrigger>
                <TabsTrigger value="merch">Gym Merchandise</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sessions" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gym.sessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-4">
                        <CardTitle className="text-lg">{session.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Clock className="h-4 w-4" /> {session.time}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold">Ksh {session.price}</span>
                          <Button onClick={() => handleBooking(session.name)}>Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="merch" className="mt-8">
                {gym.merch.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gym.merch.map((item) => (
                      <Card key={item.id} className="overflow-hidden flex">
                        <div className="w-1/3 h-full">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-2/3 p-4">
                          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                          <p className="text-xs text-muted-foreground mb-4">{item.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Ksh {item.price}</span>
                            <Button size="sm" variant="outline" onClick={() => handleMerchBuy(item.name)}>
                              <ShoppingBag className="h-4 w-4 mr-2" /> Buy
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No merchandise available for this gym yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Gym Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-muted-foreground">05:00 AM - 09:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Saturday</span>
                  <span className="text-muted-foreground">06:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Sunday</span>
                  <span className="text-muted-foreground">08:00 AM - 12:00 PM</span>
                </div>
                <hr className="my-4" />
                <div className="space-y-2">
                  <h4 className="font-bold">Contact Info</h4>
                  <p className="text-sm text-muted-foreground">+254 700 123 456</p>
                  <p className="text-sm text-muted-foreground">info@findmygymmachakos.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}