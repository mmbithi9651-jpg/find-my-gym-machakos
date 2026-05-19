import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, ShoppingBag, LogOut, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Booking {
  id: string;
  gymName: string;
  sessionName: string;
  date: string;
  status: string;
}

interface Order {
  id: string;
  gymName: string;
  productName: string;
  date: string;
  status: string;
}

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("gym_user");
    if (!userData) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(userData));
    setBookings(JSON.parse(localStorage.getItem("gym_bookings") || "[]"));
    setOrders(JSON.parse(localStorage.getItem("gym_orders") || "[]"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("gym_user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const clearHistory = (type: "bookings" | "orders") => {
    if (type === "bookings") {
      localStorage.removeItem("gym_bookings");
      setBookings([]);
    } else {
      localStorage.removeItem("gym_orders");
      setOrders([]);
    }
    toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} history cleared`);
  };

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Info */}
          <div className="w-full md:w-1/3">
            <Card className="bg-white">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm py-2 border-b">
                    <span className="text-muted-foreground font-medium">Location</span>
                    <span>Machakos, KE</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b">
                    <span className="text-muted-foreground font-medium">Member Since</span>
                    <span>{new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6 text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6 bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">Premium Membership</CardTitle>
                <CardDescription className="text-primary-foreground/70">Access all gyms in Machakos with one pass.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">Upgrade Now</Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings" className="gap-2">
                  <Calendar className="h-4 w-4" /> My Bookings
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2">
                  <ShoppingBag className="h-4 w-4" /> My Orders
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Upcoming Sessions</h3>
                  {bookings.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => clearHistory("bookings")}>Clear History</Button>
                  )}
                </div>
                
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="bg-white">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded text-primary">
                              <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-bold">{booking.sessionName}</h4>
                              <p className="text-sm text-muted-foreground">{booking.gymName} • {booking.date}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {booking.status}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
                      <p className="text-muted-foreground">You don't have any bookings yet.</p>
                      <Button variant="link" onClick={() => navigate("/gyms")}>Explore Gyms</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Store Orders</h3>
                  {orders.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => clearHistory("orders")}>Clear History</Button>
                  )}
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="bg-white">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-secondary/10 rounded text-secondary-foreground">
                              <ShoppingBag className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-bold">{order.productName}</h4>
                              <p className="text-sm text-muted-foreground">From {order.gymName} • {order.date}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {order.status}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
                      <p className="text-muted-foreground">You haven't purchased any merchandise yet.</p>
                      <Button variant="link" onClick={() => navigate("/store")}>Visit Store</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}