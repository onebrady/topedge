import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I change or cancel my membership?",
    answer: "You can easily manage, change, or cancel your membership anytime through our online portal. No phone calls required! Simply log in to your account and make changes instantly. No cancellation fees or penalties.",
  },
  {
    question: "Can I use my Unlimited membership on multiple vehicles?",
    answer: "Each Unlimited membership is tied to a specific license plate. If you have multiple vehicles, you can easily add additional memberships at a discounted rate through your account dashboard.",
  },
  {
    question: "What are your hours? Do you have holiday schedules?",
    answer: "Most locations are open Monday-Saturday 8am-8pm and Sunday 9am-7pm. Hours may vary by location and during holidays. Check our Locations page or call your nearest location for specific hours.",
  },
  {
    question: "Will license plate recognition work with specialty plates or frames?",
    answer: "Our advanced camera system works with most license plates, including specialty plates. For best results, ensure your plate is clean and visible. Decorative frames are fine as long as they don't obstruct the plate number.",
  },
  {
    question: "Is my membership valid at all locations?",
    answer: "Yes! Your Unlimited membership works at all three Tampa Bay locations: Wesley Chapel, Tampa, and Port Richey. Wash at any location, any time.",
  },
  {
    question: "What if I'm not satisfied with my wash?",
    answer: "We stand behind our service 100%. If you're not satisfied with your wash, let us know immediately and we'll rewash your vehicle at no charge. Your satisfaction is our priority.",
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes! Gift cards are available for purchase at any location or through our website. They make perfect gifts and never expire.",
  },
  {
    question: "What's included in each wash level?",
    answer: "All washes include our premium cleaning process, free vacuums, and air stations. Higher tiers include additional protective coatings, rain-repellent, tire shine, and enhanced drying. See our Pricing page for detailed comparisons.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Top Edge Car Wash
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
