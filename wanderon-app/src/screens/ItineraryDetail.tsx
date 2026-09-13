import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trips } from "../data/trips";

export default function ItineraryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const trip = trips.find((t) => t.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Trip not found</h1>
        <Link to="/" className="px-6 py-3 bg-brand-dark text-white rounded-full font-semibold">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-[env(safe-area-inset-bottom)] pb-8">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center gap-4 shadow-sm">
        <Link to={`/trip/${slug}`} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 active:scale-95 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div>
          <h1 className="font-display font-bold text-lg text-brand-dark leading-tight truncate max-w-[280px]">
            {trip.title}
          </h1>
          <p className="text-xs text-gray-500 font-medium">Detailed Itinerary</p>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="relative border-l-2 border-brand-cyan/30 ml-4 space-y-10">
          {trip.itinerary?.map((day, idx) => {
            const dayNum = idx + 1;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                key={dayNum}
                className="relative pl-6"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-brand-cyan shadow-sm" />

                {/* Day Header */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-brand-cyan/10 text-brand-cyan mb-2 uppercase tracking-wide">
                    Day {dayNum}
                  </span>
                  <h2 className="font-display font-bold text-xl text-brand-dark leading-tight">
                    {day.title}
                  </h2>
                </div>

                {/* Content */}
                <div className="text-gray-600 leading-relaxed text-sm">
                  <p className="mb-4">{day.description}</p>
                  
                  {day.accommodation && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 mb-4 shadow-sm w-max pr-6">
                      <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                        <i className="fa-solid fa-hotel text-brand-cyan text-sm"></i>
                      </div>
                      <span className="font-semibold text-sm text-gray-800">
                        {day.accommodation}
                      </span>
                    </div>
                  )}

                  {day.image && (
                    <div className="relative h-56 w-full rounded-2xl overflow-hidden mt-4 shadow-sm">
                      <img
                        src={day.image}
                        alt={`Day ${dayNum}`}
                        className="w-full h-full object-cover"
                      />
                      {day.locationTag && (
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-brand-dark shadow-sm flex items-center gap-1.5 uppercase tracking-wide">
                          <i className="fa-solid fa-location-dot text-brand-cyan"></i>
                          {day.locationTag}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
