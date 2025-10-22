import { LocationData } from '@/lib/data/locationsData'

export function generateLocalBusinessSchema(location: LocationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoWash',
    name: `Top Edge Car Wash - ${location.name}`,
    image: `https://topedgecarwashes.com/assets/location-exterior.jpg`,
    '@id': `https://topedgecarwashes.com/locations/${location.slug}`,
    url: `https://topedgecarwashes.com/locations/${location.slug}`,
    telephone: location.phone,
    email: location.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/TopEdgeCarWashWesleyChapel/',
      'https://www.instagram.com/topedgecarwashwesleychapel/',
    ],
    amenityFeature: location.features.map((feature) => ({
      '@type': 'LocationFeatureSpecification',
      name: feature,
      value: true,
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Top Edge Car Washes',
    url: 'https://topedgecarwashes.com',
    logo: 'https://topedgecarwashes.com/assets/logo.png',
    description:
      "Experience Florida's premier car wash with unlimited plans starting at $25/month. License plate recognition, members-only lanes, and free vacuums at 3 Tampa Bay locations.",
    email: 'info@topedgecarwashes.com',
    telephone: '(813) 295-7000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wesley Chapel',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/TopEdgeCarWashWesleyChapel/',
      'https://www.instagram.com/topedgecarwashwesleychapel/',
    ],
  }
}

export function generateProductSchema(packageName: string, monthlyPrice: number, features: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${packageName} - Monthly Unlimited Wash Club`,
    description: `Unlimited car washes with ${features.join(', ')}`,
    brand: {
      '@type': 'Brand',
      name: 'Top Edge Car Washes',
    },
    offers: {
      '@type': 'Offer',
      price: monthlyPrice.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: monthlyPrice.toString(),
        priceCurrency: 'USD',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitCode: 'MON',
        },
      },
    },
    additionalProperty: features.map((feature) => ({
      '@type': 'PropertyValue',
      name: feature,
    })),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateReviewSchema(
  reviews: { author: string; rating: number; text: string; date?: string }[]
) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
    },
    reviewBody: review.text,
    datePublished: review.date || new Date().toISOString().split('T')[0],
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Top Edge Car Washes',
    },
  }))
}

export function generateAggregateRatingSchema(
  averageRating: number,
  reviewCount: number,
  bestRating: number = 5
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Top Edge Car Washes',
    url: 'https://topedgecarwashes.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: bestRating.toString(),
      worstRating: '1',
    },
  }
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Car Wash Fundraising Program',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Top Edge Car Washes',
      url: 'https://topedgecarwashes.com',
    },
    description: 'Raise funds for your organization with no upfront costs. 50% commission on all sales, easy online platform, weekly payouts. Perfect for schools, sports teams, nonprofits, and community groups.',
    serviceType: 'Fundraising Program',
    areaServed: {
      '@type': 'City',
      name: 'Tampa Bay',
    },
    offers: {
      '@type': 'Offer',
      description: '50% commission on all car wash sales',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  }
}
