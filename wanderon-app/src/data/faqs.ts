import type { FAQCategory } from './types';

export const faqs: FAQCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: 'fa-rocket',
    questions: [
      {
        question: 'How does WanderOn work?',
        answer: 'We organize group travel experiences for like-minded people. Simply choose a trip, select your dates, book your slot, and we handle the rest, from accommodation to itinerary planning.',
      },
      {
        question: 'How do I book a trip?',
        answer: 'You can book a trip directly through our website. Just select the destination, choose your preferred dates, and proceed to the payment gateway to secure your spot.',
      },
      {
        question: 'What is the typical group size?',
        answer: 'Our groups usually consist of 12 to 20 travelers to ensure a personalized and fun experience without feeling too crowded.',
      },
      {
        question: 'Can I join solo?',
        answer: 'Absolutely! Over 60% of our travelers join solo. It is a great way to meet new people and make lifelong friends.',
      }
    ]
  },
  {
    id: 'trips-itineraries',
    label: 'Trips & Itineraries',
    icon: 'fa-map',
    questions: [
      {
        question: 'Are the itineraries customizable?',
        answer: 'For our standard group departures, the itineraries are fixed to ensure a smooth experience for everyone. However, if you are booking a private trip for a group, we can customize it.',
      },
      {
        question: 'What is the difficulty level of your treks?',
        answer: 'We offer a range of trips from leisure to challenging treks. Each trip details page specifies the physical fitness required and the difficulty level.',
      },
      {
        question: 'What is included in the trip cost?',
        answer: 'Most of our trips include accommodation, local transportation, permits, a dedicated trip captain, and specified meals. Always check the "Inclusions" section on the specific trip page.',
      }
    ]
  },
  {
    id: 'payments-policies',
    label: 'Payments & Policies',
    icon: 'fa-credit-card',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and popular mobile wallets through our secure payment gateway.',
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Our cancellation policy varies by trip but generally offers tiered refunds based on how early you cancel. Please refer to the specific trip page for exact details.',
      },
      {
        question: 'How long do refunds take?',
        answer: 'Refunds are typically processed within 7-10 business days from the date of cancellation confirmation.',
      }
    ]
  }
];
