export interface TravelStyle {
  id: 'suv' | 'rented' | 'own';
  label: string;
  price: number;
  originalPrice?: number;
  inclusions: string[];
  icon?: string;
  description?: string;
}

export interface BatchDate {
  id: string;
  startDate: string;
  endDate: string;
  label: string;
  slotsTotal: number;
  slotsFilled: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  accommodation: string;
  image: string;
  locationTag: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
  image?: string;
  extendedDescription?: string;
}

export interface RouteStop {
  name: string;
  nights?: number;
}

export interface PackItem {
  name: string;
}

export interface PackCategory {
  id: string;
  label: string;
  icon?: string;
  items: PackItem[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CancellationTier {
  period: string;
  refund: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  tripName: string;
  travelMonth: string;
}

export interface TripStats {
  slotsFilled: number;
  genderRatio: string;
  soloPercent: number;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destination: string;
  location: string;
  dropLocation?: string;
  images: string[];
  duration: string;
  durationDays: number;
  durationCategory: '1-3' | '3-5' | '5-7' | '7+';
  month: string;
  date: string;
  price: number;
  originalPrice?: number;
  type?: 'domestic' | 'international';
  tag?: string;
  tagClass?: string;
  soldOut: boolean;
  popularity: number;
  travelStyles: TravelStyle[];
  batchDates: BatchDate[];
  stats: TripStats;
  highlights: Highlight[];
  route: RouteStop[];
  itinerary: ItineraryDay[];
  generalInclusions: string[];
  exclusions: string[];
  packList: PackCategory[];
  thingsToKnow: string[];
  faqs: FAQ[];
  cancellationPolicy: CancellationTier[];
  reviews: Review[];
  similarTripIds: string[];
  ageLimit?: string;
  medicalAdvisory?: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  packageCount: number;
  startingPrice: string;
  type: 'domestic' | 'international';
}

export interface FAQCategory {
  id: string;
  label: string;
  icon: string;
  questions: FAQ[];
}

export interface SiteStats {
  totalTrips: string;
  happyTravelers: string;
  googleRating: string;
  googleReviews: string;
  tripAdvisorRating: string;
  tripAdvisorReviews: string;
  facebookRating: string;
  facebookReviews: string;
}
