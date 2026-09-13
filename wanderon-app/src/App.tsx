import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLayout from "./components/layout/AppLayout";
import PageTransition from "./components/layout/PageTransition";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Results from "./screens/Results";
import TripDetail from "./screens/TripDetail";
import ItineraryDetail from "./screens/ItineraryDetail";
import Profile from "./screens/Profile";
import Categories from "./screens/Categories";
import Trips from "./screens/Trips";

function App() {
  const location = useLocation();
  
  return (
    <div className="mobile-wrapper @container w-full min-h-screen max-w-[400px] mx-auto bg-white relative shadow-2xl sm:border sm:border-gray-300 overflow-x-clip">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
            <Route path="/results" element={<PageTransition><Results /></PageTransition>} />
            <Route path="/categories" element={<PageTransition><Categories /></PageTransition>} />
            <Route path="/bookings" element={<PageTransition><Trips /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
          </Route>
          {/* Trip detail has its own layout (no bottom nav) */}
          <Route path="/trip/:slug" element={<PageTransition><TripDetail /></PageTransition>} />
          <Route path="/trip/:slug/itinerary" element={<PageTransition><ItineraryDetail /></PageTransition>} />
        </Routes>
      </AnimatePresence>{" "}
    </div>
  );
}

export default App;

