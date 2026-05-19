import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import GymList from "@/pages/GymList";
import GymDetail from "@/pages/GymDetail";
import Store from "@/pages/Store";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gyms" element={<GymList />} />
            <Route path="/gyms/:id" element={<GymDetail />} />
            <Route path="/store" element={<Store />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;