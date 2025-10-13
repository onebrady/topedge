# Top Edge Car Washes - Homepage Redesign Development Plan

**Last Updated:** 2025-09-30
**Website:** https://topedgecarwashes.com/
**Primary Goals:**
- Convert first-time visitors into Unlimited Club members
- Enable existing customers to manage/upgrade memberships
- Drive local traffic to all three Tampa Bay locations
- Showcase unique differentiators in competitive market

---

## Strategic Overview

### Conversion Priorities
1. **New Customer Acquisition** - Unlimited membership sign-ups
2. **Customer Retention** - Easy account management and upgrades
3. **Location Awareness** - Drive traffic to operational and upcoming locations
4. **Brand Differentiation** - Highlight unique features (light show, eco-friendly, dual belt system)

### Design Philosophy
- **Mobile-First:** 60%+ of traffic comes from mobile devices
- **Conversion-Focused:** Clear CTAs throughout the page
- **Transparency:** Upfront pricing and no hidden fees
- **Visual Hierarchy:** Prioritize membership conversion while maintaining accessibility

---

## Page Structure (Top to Bottom)

### Page-Top Essentials (Sticky/Global Navigation)

**Announcement Bar** *(Optional - Conditional Display)*
- Weather-triggered promotions: "Rain this week? Wash free for 3 days with Unlimited"
- Special offers or new location announcements
- **Height:** 40px (collapsible)

**Header Navigation** *(Sticky on scroll)*
- **Logo:** Top Edge Car Wash (clickable home link)
- **Primary CTAs:**
  - "Find a Location" (dropdown or geo-autocomplete)
  - "Join Unlimited" (primary conversion)
  - "Manage Membership" (for existing customers)
- **Secondary Navigation:**
  - Pricing
  - Locations
  - Contact
- **Mobile Menu:** Hamburger with overlay
  - Locations (Wesley Chapel, Tampa, Port Richey + Coming Soon)
  - Fundraising
  - Careers
  - Customer Feedback
  - Social Links

---

## Section 1: Hero Section
**Height:** 80vh (minimum 600px)
**Priority:** CRITICAL

### Purpose
Instantly communicate value proposition and route users to primary conversion paths

### Content Elements

**Headline (H1):**
- Option A: "Shine Fast. Free Vacuums. Three Tampa Bay Locations."
- Option B: "Florida's Premier Car Wash Experience"
- Option C: "Where Car Wash Meets Entertainment"
- **Recommendation:** Test A/B between Option A (location-focused) and Option B (experience-focused)

**Subheadline:**
- "Exterior express wash with license-plate recognition. Join the Unlimited Club and wash every day."
- Alternative: "Eco-friendly technology with a unique light & music show for the whole family"

**Primary CTAs:**
- `[Find a Location]` - Geo-autocomplete/location selector (jumps to Section 2)
- `[Join Unlimited]` - Direct to membership signup
- `[View Pricing]` - Scrolls to pricing section

**Secondary CTA:**
- "Manage My Membership" (text link)

**Hero Media:**
- Short video loop (15-20 seconds) of tunnel with light show and belt conveyor
- Fallback: High-quality static image per location
- **Mobile:** Static image optimized for mobile bandwidth

**Trust Indicators (Badges):**
- ✓ Locally Owned
- ✓ Members-Only Lane
- ✓ Free Vacuums & Air
- ✓ Eco-Friendly Technology

**Design Notes:**
- Full-width background video/image
- Overlay gradient for text readability
- Center-aligned content on mobile, left or center-aligned on desktop

---

## Section 2: Membership CTA Banner
**Height:** 60px (mobile) / 80px (desktop)
**Priority:** VERY HIGH

### Purpose
Immediate conversion opportunity before user scrolls - capture high-intent visitors

### Content Elements

**Banner Message:**
- "🎯 **Unlimited Washes Starting at $25/month** | No Contract • Members-Only Lane • No Stickers"

**CTA Button:**
- `[Sign Up Now]` - Prominent, contrasting color

**Secondary Text:**
- "Cancel anytime online" (builds trust, reduces friction)

**Design Notes:**
- Bright, attention-grabbing background color (contrast with hero)
- Sticky behavior on scroll (optional - test)
- Mobile: Stack text and button vertically for readability

---

## Section 3: Quick Location Selector
**Height:** Variable (300-400px)
**Priority:** HIGH

### Purpose
Reduce friction for first-time visits and drive immediate traffic to locations

### Content Elements

**Section Header:**
- "Find Your Nearest Top Edge"

**Location Search:**
- Auto-detect city/ZIP input field
- OR
- Display 3 location cards side-by-side (mobile: vertical stack)

**Location Cards (3 Operational + Coming Soon Section):**

Each card includes:
- **Location Name:** Wesley Chapel | Tampa | Port Richey
- **Address:** Full street address
- **Hours:** Operating hours or [Hours link]
- **Status Badge:** "Open Now" / "Closes at 8pm" / etc.
- **CTAs:**
  - `[Get Directions]` (opens Google Maps)
  - `[Choose This Location]` (personalizes experience)

**Coming Soon Section:**
- Separate subsection below operational locations
- "Expanding Across Tampa Bay - New Locations Coming Soon!"
- Email capture: "Be the first to know when we open near you"
- Future location teaser (if available)

**Design Notes:**
- Interactive map integration (Google Maps embed) - optional
- Location cards with hover states
- Mobile: Swipeable card carousel

---

## Section 4: Pricing Snapshot
**Height:** Variable (500-600px)
**Priority:** HIGH

### Purpose
Make value obvious, funnel users to Unlimited membership

### Content Elements

**Section Header:**
- "Simple Pricing, No Hidden Fees"

**Two-Column Layout:**

**Left Column: Unlimited Club (Highlighted)**
- **Badge:** "MOST POPULAR" or "BEST VALUE"
- **Price:** "Starting at $25/mo" *(Note: Full pricing details to be added)*
- **Key Benefits (Bullets):**
  - Wash every day
  - No long-term contract
  - License Plate Recognition - no stickers
  - Members-Only express lane
  - Cancel anytime
- **CTA:** `[Join Unlimited]`

**Right Column: Single Wash Options**
- **Pricing Tiers:** 3-4 wash levels with included extras *(Note: Pricing details to be added)*
- **Comparison:** Side-by-side feature comparison
- **Break-Even Messaging:** "Wash 2x per month? Unlimited pays for itself"
- **CTA:** `[See Full Pricing]` → Opens detailed comparison modal/page

**Additional Elements:**
- `[Compare Plan Benefits]` - Opens detailed feature comparison table
- `[Manage Membership]` - Link for existing members

**Design Notes:**
- Visual emphasis on Unlimited column (border, shadow, different background)
- Mobile: Stack columns vertically with Unlimited first

---

## Section 5: What You Get (Features/Differentiators)
**Height:** 50px per icon row (flexible grid)
**Priority:** HIGH

### Purpose
Justify the choice in 20 seconds - address key customer concerns

### Content Elements

**Section Header:**
- "Why Top Edge Stands Out"

**6 Icon Cards (2×3 grid on desktop, vertical on mobile):**

1. **Belt Conveyor System**
   - Icon: Belt/conveyor illustration
   - Headline: "Safer, Easier Entry"
   - Copy: "Dual belt system protects wheels - no track damage"

2. **License Plate Recognition**
   - Icon: Camera/license plate
   - Headline: "Automatic Check-In"
   - Copy: "No windshield stickers, no cards - just drive through"

3. **Top-Tier Chemistry**
   - Icon: Water droplet/shield
   - Headline: "Premium Protection"
   - Copy: "Rain-repellent, shine enhancer, and protective coating"

4. **Free Vacuums & Air**
   - Icon: Vacuum/air gun
   - Headline: "Complete Interior Finish"
   - Copy: "High-suction vacuums and air stations at every location"

5. **Eco-Friendly Technology**
   - Icon: Leaf/recycle symbol
   - Headline: "Advanced Water Recycling"
   - Copy: "Biodegradable chemicals and sustainable practices"

6. **Members-Only Lane**
   - Icon: Fast-forward/express lane
   - Headline: "Skip the Wait"
   - Copy: "In and out fast with dedicated member entrance"

**Optional 7th Card:**
- **Entertainment Experience**
  - Icon: Music/lights
  - Headline: "Light & Music Show"
  - Copy: "Unique tunnel experience the whole family will love"

**Design Notes:**
- Consistent icon style (outline or filled)
- Hover states with subtle animation
- Mobile: Single column, full-width cards

---

## Section 6: Why Unlimited? (ROI & Education)
**Height:** Variable (400-500px)
**Priority:** MEDIUM-HIGH

### Purpose
Convert hesitant users by demonstrating value and addressing objections

### Content Elements

**Section Header:**
- "The Unlimited Advantage"

**Value Proposition:**
- "If you wash 2×/month, Unlimited pays for itself."

**ROI Calculator Widget** *(Recommended for competitive differentiation)*
- **Input:** "How often do you wash your car?" (slider or dropdown)
- **Input:** Local single-wash price (pre-filled based on your pricing)
- **Output:** "You'll save $XX per year with Unlimited"
- **CTA:** `[Start Saving - Join for $25/mo]`

**Benefit Badges:**
- ✓ Skip the pay line
- ✓ Wash after every rain or pollen storm
- ✓ No contracts - cancel anytime
- ✓ Works at all Tampa Bay locations
- ✓ Add additional vehicles easily

**Social Proof Integration:**
- "Join 1,000+ Tampa Bay members" (if data available)

**Design Notes:**
- Calculator makes the section interactive and engaging
- Use in competitive market to demonstrate transparency
- A/B test calculator vs. static messaging

---

## Section 7: How It Works (3-Step Process)
**Height:** Variable (350-450px)
**Priority:** MEDIUM

### Purpose
Set expectations, show speed and ease of service

### Content Elements

**Section Header:**
- "Getting Your Wash is Easy"

**3-Step Process (Horizontal on desktop, vertical on mobile):**

**Step 1: Roll Onto the Belt**
- Numbered icon: "1"
- Image: Car entering tunnel/belt system
- Copy: "Our dual belt system gently guides your vehicle - safer than traditional tracks"

**Step 2: Enjoy the Tunnel Experience**
- Numbered icon: "2"
- Image: Interior tunnel with light show
- Copy: "Sit back and enjoy our unique light & music show while we wash"

**Step 3: Free Vacuums & Finish**
- Numbered icon: "3"
- Image: Vacuum plaza/customer using vacuum
- Copy: "Complete your clean with complimentary vacuums, air guns, and towels"

**Additional Information:**
- "Large vehicles welcome" - Link/popover to height/width specifications
- Average time: "In and out in under 10 minutes"

**Design Notes:**
- Visual timeline/progress indicator
- Photos should show real Top Edge locations
- Include video option for Step 2 (light show)

---

## Section 8: Social Proof (Reviews + UGC)
**Height:** 40px (compact) to 500px (expanded carousel)
**Priority:** MEDIUM

### Purpose
Reduce anxiety with authentic customer testimonials

### Content Elements

**Section Header:**
- "What Tampa Bay Drivers Are Saying"

**Review Carousel:**
- Google/Yelp review snippets (3-6 featured)
- Average star rating per location
- Customer name, location, and star rating
- Excerpt of review (1-2 sentences)
- Link: `[See All Reviews]` → Links to Google Business Profile or dedicated testimonials page

**User-Generated Content:**
- 3-6 Instagram tiles/reels embedded
- Focus: Family-friendly content, light show experience, clean cars
- Hashtag: #TopEdgeExperience (or branded hashtag)

**Trust Indicators:**
- "4.8★ Average Rating Across All Locations" (if applicable)
- "500+ Five-Star Reviews"

**Design Notes:**
- Auto-rotating carousel with manual controls
- Pull live reviews via API if possible
- Mobile: Single review visible, swipe to advance

---

## Section 9: Amenities & Full Feature List
**Height:** Variable (expandable accordion or full list)
**Priority:** LOW-MEDIUM

### Purpose
Provide detailed information for users who need more before converting

### Content Elements

**Section Header:**
- "Everything Included with Every Wash"

**Free Extras (Bulleted List or Icon Grid):**
- High-suction vacuums
- Air guns for wheels and interior
- Microfiber towels
- Bug prep station (where available)
- Mat cleaning areas
- Tire shine (select packages)

**Technology Features:**
- License plate recognition system
- Mobile app integration (if available)
- Membership management portal
- Email/SMS wash reminders

**Operational Details:**
- Vehicle size accommodations (height/width chart)
- Accepted payment methods
- Accessibility features

**Design Notes:**
- Accordion format keeps section compact
- Expandable detail for interested users
- Not critical to conversion but builds trust

---

## Section 10: Community & Fundraising
**Height:** 300-400px
**Priority:** MEDIUM

### Purpose
Local roots messaging, B2B outreach, community engagement

### Content Elements

**Two-Column Layout:**

**Left: Community Story**
- Image: Local owners or team photo
- Headline: "Locally Owned, Tampa Bay Proud"
- Copy: Brief story about local ownership, community involvement
- Values: Family-owned, community-focused, environmental stewardship

**Right: Fundraising Program**
- Headline: "Support Your Organization"
- Copy: "Schools, sports teams, and nonprofits can earn funds through our Wash-to-Give program"
- Benefits of program
- **CTA:** `[Apply for a Wash-to-Give Event]`

**Additional CTAs:**
- Fleet/Business Inquiries
- Partnership opportunities

**Design Notes:**
- Humanize the brand
- Differentiate from national chains
- Builds local loyalty

---

## Section 11: FAQs (Accordion)
**Height:** Variable (expandable)
**Priority:** MEDIUM

### Purpose
Preempt support tickets, address common objections

### Content Elements

**Section Header:**
- "Frequently Asked Questions"

**Sample FAQs (6-8 accordions):**

1. **How do I change or cancel my membership?**
   - Answer with link to `[Manage Membership]` portal

2. **Can I use my Unlimited membership on multiple vehicles?**
   - Explain single vs. multi-vehicle policies

3. **What are your hours? Do you have holiday schedules?**
   - Link to location-specific hours or display table

4. **What's included in each wash level?**
   - Link to detailed pricing comparison

5. **Will license plate recognition work with specialty plates or frames?**
   - Technical explanation and troubleshooting

6. **Is my membership valid at all locations?**
   - Confirm multi-location access

7. **What if I'm not satisfied with my wash?**
   - Satisfaction guarantee policy

8. **Do you offer gift cards?**
   - Link to gift card purchase

**Design Notes:**
- Accordion keeps page length manageable
- Schema markup for SEO
- Search function for FAQs (optional)

---

## Section 12: Secondary CTAs / Lead Capture
**Height:** 30px (compact banner)
**Priority:** MEDIUM

### Purpose
Final conversion opportunity for users who haven't acted yet

### Content Elements

**CTA Button Group:**
- `[Join Unlimited Today]` (primary)
- `[Buy Gift Cards]`
- `[Fleet/Business Inquiries]`

**Email/SMS Opt-In Widget:**
- Headline: "Get Rain-Day Promos & Member Deals"
- Input: Email or phone number
- Double opt-in compliance
- Privacy policy link

**Design Notes:**
- Simple, uncluttered design
- Clear value proposition for email signup
- Mobile: Stack vertically

---

## Section 13: Footer
**Height:** Variable (multi-column)
**Priority:** LOW (but required)

### Content Elements

**Multi-Column Layout:**

**Column 1: Locations**
- Wesley Chapel (address, hours, phone, directions link)
- Tampa (address, hours, phone, directions link)
- Port Richey (address, hours, phone, directions link)
- "More locations coming soon!"

**Column 2: Quick Links**
- Pricing
- Manage Membership
- Join Unlimited
- Gift Cards
- Fundraising

**Column 3: Company**
- About Us
- Careers
- Customer Feedback
- Contact
- Press/Media

**Column 4: Connect**
- Social media icons/links (Facebook, Instagram, TikTok, etc.)
- Newsletter signup
- Mobile app download (if applicable)

**Bottom Bar:**
- Copyright © 2025 Top Edge Car Washes
- Privacy Policy
- Terms of Service
- Accessibility Statement
- Trademark attributions

**Design Notes:**
- Mobile: Single column, stacked
- Sitemap format for SEO
- ADA compliance links

---

## Mobile Optimization Notes

### Critical Mobile Considerations

1. **Touch Targets:** Minimum 44×44px for all buttons/links
2. **Font Sizes:** Minimum 16px to prevent auto-zoom on iOS
3. **Sticky Elements:** Header collapses to minimal height on scroll
4. **Image Optimization:** WebP format with fallbacks, lazy loading
5. **Form Fields:** Large, easy-to-tap inputs with appropriate keyboard types
6. **Page Speed:** Target <3s load time on 4G

### Mobile-Specific Adjustments

- **Hero:** Shorter height (60vh), static image instead of video
- **CTAs:** Full-width or stacked buttons, more generous padding
- **Carousels:** Swipeable with clear indicators
- **Navigation:** Hamburger menu with smooth slide-in animation
- **Location Selector:** Geo-location auto-detect on mobile
- **Pricing:** Vertical stack with Unlimited at top

---

## Performance & Technical Requirements

### Page Speed Goals
- **Mobile:** <3s First Contentful Paint
- **Desktop:** <2s First Contentful Paint
- **Lighthouse Score:** 90+ across all metrics

### Technical Stack Recommendations
- Responsive framework (Bootstrap, Tailwind, or custom)
- Lazy loading for images and videos
- Minified CSS/JS
- CDN for static assets
- Optimized images (WebP with fallbacks)

### Tracking & Analytics

**Primary Conversion Events:**
- `join_unlimited_click` - Any "Join Unlimited" CTA click
- `select_location` - Location selected from finder
- `view_pricing` - Pricing section viewed
- `manage_membership_click` - Existing member login
- `directions_click` - Google Maps directions requested
- `calculator_used` - ROI calculator interaction
- `email_signup` - Newsletter/promo opt-in

**Secondary Events:**
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page
- Video plays (hero video)
- FAQ expansions
- Gift card clicks

---

## Content Checklist (Assets Needed)

### Copy
- [ ] Finalized headline options (H1)
- [ ] Membership pricing tiers *(Note: Starting at $25/mo - full details pending)*
- [ ] Single wash pricing *(Note: Details pending)*
- [ ] Complete amenities list per location
- [ ] FAQ answers (6-8 questions)
- [ ] About/community story copy
- [ ] Trust badges/certifications text

### Images (High-Resolution)
- [ ] Hero image/video: Tunnel with light show (15-20s loop)
- [ ] Exterior shots of all 3 locations
- [ ] Interior tunnel experience
- [ ] Vacuum plaza/amenities area
- [ ] Customers using services (happy families)
- [ ] Team/owner photos for community section
- [ ] Before/after car wash shots (6-8 images)
- [ ] Belt conveyor system close-up
- [ ] License plate recognition camera

### Reviews & Social Proof
- [ ] 6-10 customer testimonials with permission
- [ ] Google Business Profile ratings per location
- [ ] Instagram posts/reels (6-8 pieces of UGC)
- [ ] Any industry awards or recognitions

### Technical
- [ ] Location addresses, hours, phone numbers (all 3 locations)
- [ ] Google Maps embed codes or API integration
- [ ] Social media profile links
- [ ] Membership management portal URL
- [ ] Gift card purchase link
- [ ] Vehicle size specifications (height/width limits)

---

## Design Priorities Summary

### Critical (Must-Have)
1. Hero Section with clear CTAs
2. Membership CTA Banner
3. Quick Location Selector
4. Pricing Snapshot
5. Mobile-responsive layout

### High Priority
1. What You Get (Features)
2. Social Proof
3. How It Works
4. Sticky navigation with Manage Membership access

### Medium Priority
1. Why Unlimited (ROI section)
2. Community & Fundraising
3. FAQs
4. Secondary CTA/Email capture

### Low Priority (Nice-to-Have)
1. ROI Calculator widget *(Recommended for competitive market)*
2. Detailed amenities accordion
3. Instagram feed integration
4. Live chat widget

---

## A/B Testing Recommendations

Once launched, test these variations:

1. **Hero Headline:** Location-focused vs. Experience-focused
2. **Primary CTA:** "Join Unlimited" vs. "Start Membership"
3. **Membership Banner:** Sticky vs. Static positioning
4. **ROI Calculator:** With vs. Without (measure impact on conversions)
5. **Pricing Display:** Table vs. Cards layout
6. **Social Proof Position:** Above or below pricing

---

## Competitive Differentiation Strategy

### Key Differentiators to Emphasize
1. **Unique Light & Music Show** - Entertainment experience (not just a car wash)
2. **Eco-Friendly Technology** - Advanced water recycling, biodegradable chemicals
3. **Dual Belt System** - Safer than traditional track systems
4. **No Stickers** - License plate recognition (cleaner windshield)
5. **Local Ownership** - Tampa Bay family business vs. national chains
6. **Members-Only Lane** - Exclusive, faster service
7. **Free Vacuums & Amenities** - Complete service included

### Messaging Strategy
- Lead with experience and entertainment (emotional connection)
- Support with technology and convenience (rational decision)
- Close with community and values (brand loyalty)

---

## Next Steps

1. **Review & Approve** this development plan
2. **Gather Content Assets** from checklist above
3. **Finalize Pricing Details** (membership tiers + single wash options)
4. **Create Wireframes** based on this structure
5. **Design Visual Mockups** (desktop + mobile)
6. **Develop & Test** responsive website
7. **Set Up Analytics** tracking for all conversion events
8. **Launch & Optimize** with A/B testing

---

## Notes & Considerations

- **ROI Calculator Recommendation:** In a competitive market, this interactive element can differentiate your site and demonstrate transparency. It also increases time-on-page and engagement. Recommended to include.

- **Coming Soon Locations:** Balance promotion of expansion with focus on operational locations. Use separate section to avoid confusion.

- **Member Account Access:** Make "Manage Membership" easily accessible in header for existing customers - reduces support calls and improves retention.

- **Pricing Transparency:** Note that full pricing details are pending - this is critical for conversion and should be prioritized in asset gathering.

- **Video Content:** Hero video loop is powerful for showcasing the unique light show experience - this is your key differentiator from competitors.

---

**Document Version:** 1.0
**Created:** 2025-09-30
**Status:** Ready for Review
