export interface LocationData {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  hours: string;
  hoursDetailed: {
    weekday: string;
    weekend: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  status: "Open Now" | "Closes Soon" | "Opens at 8am";
  isOpen: boolean;
  badge?: string;
  description: string;
  features: string[];
  uniqueFeature?: {
    title: string;
    description: string;
  };
  metaTitle: string;
  metaDescription: string;
}

export const locationsData: LocationData[] = [
  {
    id: "port-richey",
    name: "Port Richey",
    slug: "port-richey-florida",
    address: "8326 US Highway 19",
    city: "Port Richey",
    state: "FL",
    zip: "34668",
    phone: "(813) 249-1800",
    email: "info@topedgecarwashes.com",
    hours: "Mon-Sun: 8:00 AM - 8:00 PM",
    hoursDetailed: {
      weekday: "Monday - Saturday: 8:00 AM - 8:00 PM",
      weekend: "Sunday: 8:00 AM - 8:00 PM",
    },
    coordinates: {
      lat: 28.2739,
      lng: -82.7193,
    },
    status: "Open Now",
    isOpen: true,
    badge: "🎉 Founder's Club - First Month FREE",
    description: "Florida's Premier Car Wash Experience in Port Richey",
    features: [
      "Free Vacuums",
      "Members-Only Lane",
      "License Plate Recognition",
      "Light & Music Show",
      "Eco-Friendly",
      "Dual Belt System",
    ],
    uniqueFeature: {
      title: "Founder's Club Exclusive",
      description: "First Month FREE + $10 OFF Every Month for Life",
    },
    metaTitle: "Port Richey Car Wash | Top Edge | First Month FREE",
    metaDescription:
      "Port Richey car wash with Founder's Club: First month FREE + $10/mo off for life! Free vacuums, light show, unlimited washes. Join today at Top Edge!",
  },
  {
    id: "wesley-chapel",
    name: "Wesley Chapel",
    slug: "wesley-chapel-florida",
    address: "28221 State Road 54",
    city: "Wesley Chapel",
    state: "FL",
    zip: "33543",
    phone: "(813) 295-7000",
    email: "info@topedgecarwashes.com",
    hours: "Mon-Sun: 8:00 AM - 8:00 PM",
    hoursDetailed: {
      weekday: "Monday - Saturday: 8:00 AM - 8:00 PM",
      weekend: "Sunday: 8:00 AM - 8:00 PM",
    },
    coordinates: {
      lat: 28.2184,
      lng: -82.3276,
    },
    status: "Open Now",
    isOpen: true,
    badge: "Original Location",
    description: "Wesley Chapel's Premier Express Car Wash",
    features: [
      "Free Vacuums",
      "Members-Only Lane",
      "License Plate Recognition",
      "Light & Music Show",
      "Eco-Friendly",
      "Dual Belt System",
    ],
    metaTitle: "Wesley Chapel Car Wash | Top Edge | Original Location",
    metaDescription:
      "Wesley Chapel's original Top Edge Car Wash! Unlimited washes from $25/mo with license plate recognition, free vacuums, members-only lane. Cancel anytime!",
  },
  {
    id: "tampa",
    name: "Tampa",
    slug: "tampa-florida",
    address: "5416 West Waters Avenue",
    city: "Tampa",
    state: "FL",
    zip: "33634",
    phone: "(813) 295-7000",
    email: "info@topedgecarwashes.com",
    hours: "Mon-Sun: 8:00 AM - 8:00 PM",
    hoursDetailed: {
      weekday: "Monday - Saturday: 8:00 AM - 8:00 PM",
      weekend: "Sunday: 8:00 AM - 8:00 PM",
    },
    coordinates: {
      lat: 28.0203,
      lng: -82.5324,
    },
    status: "Open Now",
    isOpen: true,
    badge: "West Tampa's Premier Car Wash",
    description: "West Tampa's Premier Express Car Wash",
    features: [
      "Free Vacuums",
      "Members-Only Lane",
      "License Plate Recognition",
      "Light & Music Show",
      "Eco-Friendly",
      "Dual Belt System",
    ],
    metaTitle: "Tampa Car Wash | Top Edge | West Waters Avenue",
    metaDescription:
      "Tampa car wash on West Waters Ave! Unlimited washes from $25/mo with license plate recognition, free vacuums, light show, members-only lane. No contracts!",
  },
];

export const pricingPackages = [
  {
    name: "Graphene X4",
    single: 30,
    monthly: 50,
    founderMonthly: 40,
    includes: [
      "Graphene X4 Protection",
      "Ceramic Seal",
      "Hot Shine",
      "Rain Repel",
      "Carnauba Wax",
      "Dry N' Shine",
    ],
    popular: true,
  },
  {
    name: "Diamond",
    single: 25,
    monthly: 45,
    founderMonthly: 35,
    includes: [
      "Ceramic Seal",
      "Rain Repel",
      "Carnauba Wax",
      "Triple Foam",
      "Wheel Cleaner",
      "Tire Shine",
      "Dry N' Shine",
    ],
  },
  {
    name: "Platinum",
    single: 20,
    monthly: 40,
    founderMonthly: 30,
    includes: [
      "Dry N' Shine",
      "Clear Coat",
      "Carnauba Wax",
      "Wheel Cleaner",
      "Tire Shine",
      "Rain Repel",
      "Triple Foam",
    ],
  },
  {
    name: "Gold",
    single: 15,
    monthly: 30,
    founderMonthly: 20,
    includes: [
      "Rain Repel",
      "Carnauba Wax",
      "Triple Foam",
      "Wheel Cleaner",
      "Tire Shine",
      "Dry N' Shine",
    ],
  },
  {
    name: "Silver",
    single: 12,
    monthly: null,
    founderMonthly: null,
    includes: ["Basic Exterior Wash"],
    locationPricing: {
      "Port Richey": {
        single: 10,
        monthly: 20,
      },
      "Wesley Chapel": {
        single: 12,
        monthly: 25,
      },
      "Tampa": {
        single: 12,
        monthly: 25,
      },
    },
  },
];

export const freeAmenities = [
  {
    icon: "Vacuum",
    title: "High-Suction Vacuums",
    description: "Large, shaded vacuum area with powerful suction",
  },
  {
    icon: "Bug",
    title: "Self-Service Bug Cleaning",
    description: "Pre-wash bug prep stations",
  },
  {
    icon: "Sparkles",
    title: "Mat & Rug Cleaners",
    description: "Clean your floor mats while you wait",
  },
  {
    icon: "Spray",
    title: "Air Fresheners & Towels",
    description: "Complimentary finishing touches",
  },
  {
    icon: "Droplets",
    title: "Window Cleaner Dispensers",
    description: "Streak-free window cleaning supplies",
  },
  {
    icon: "Wind",
    title: "Air Guns",
    description: "Clean air vents and hard-to-reach spots",
  },
];
