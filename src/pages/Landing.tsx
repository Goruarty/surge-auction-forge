import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, Brain, DollarSign, Shield, BarChart3, Palette, ArrowRight, Check, Code, TrendingUp, Clock, TrendingDown, Zap, Users, Mail } from "lucide-react";
import { AuctionWidget } from "@/components/AuctionWidget";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.png";

const problems = [
  {
    icon: DollarSign,
    title: "Limited Drops Sell Out Instantly",
    description: "Your exclusive sneaker drop sells out in 30 seconds at $200. Resellers flip them for $600. You left $400 per pair on the table.",
  },
  {
    icon: Clock,
    title: "Premium Time Undervalued",
    description: "You charge $150/hour for coaching. Your calendar fills months ahead. Some clients would gladly pay $300 for priority access.",
  },
  {
    icon: TrendingDown,
    title: "Peak Demand Goes Uncaptured",
    description: "Your restaurant's Saturday 7pm slots gone instantly. Tuesday nights sit empty. No way to balance demand and capture premium pricing.",
  },
];

const features = [
  {
    icon: Rocket,
    title: "Deploy in 3 Lines of Code",
    description: "Copy, paste, done. Works on Shopify, WordPress, custom sites, anywhere. No developer needed.",
  },
  {
    icon: Brain,
    title: "AI Pricing Engine",
    description: "Our algorithm analyzes demand signals, bid velocity, viewer count, and historical data to predict optimal prices in real-time.",
  },
  {
    icon: DollarSign,
    title: "Increase Revenue by 40%+",
    description: "Proven across 247+ businesses. Capture the value that currently goes to resellers and scalpers. See revenue lift in first week.",
  },
  {
    icon: Shield,
    title: "Military-Grade Bot Protection",
    description: "Advanced fraud detection stops bots, sniping, and fake bids. Only real customers compete fairly.",
  },
  {
    icon: BarChart3,
    title: "Revenue Dashboard",
    description: "Track every auction, bid, and dollar earned. See exactly how much more you're making vs. fixed pricing.",
  },
  {
    icon: Palette,
    title: "Your Brand, Your Rules",
    description: "Customize colors, fonts, bid rules, and price caps. Set reserve prices. Control everything from your dashboard.",
  },
];

const useCases = [
  {
    emoji: "👟",
    title: "Limited Edition Drops",
    subtitle: "Streetwear, sneakers, collectibles, art prints",
    example: "+43% revenue on sneaker launches",
  },
  {
    emoji: "🎓",
    title: "Creator Services",
    subtitle: "Coaching, consulting, 1-on-1 sessions, course access",
    example: "2.1x higher hourly rates for coaches",
  },
  {
    emoji: "🎫",
    title: "Event Tickets",
    subtitle: "VIP access, workshops, conferences, meet-and-greets",
    example: "Sold out 3x faster, 38% more revenue",
  },
  {
    emoji: "🍽️",
    title: "Restaurant Reservations",
    subtitle: "Peak time slots, chef's table, holiday bookings",
    example: "Saturday nights now earn 2x more",
  },
  {
    emoji: "💻",
    title: "SaaS Beta Access",
    subtitle: "Early access, priority support, feature requests",
    example: "$47K earned during beta phase",
  },
  {
    emoji: "📸",
    title: "Professional Services",
    subtitle: "Photography, design, agency project slots",
    example: "Booked 6 months ahead at premium rates",
  },
];

const testimonials = [
  {
    quote: "We were selling out limited sneaker drops in seconds and watching resellers flip them for 3x. With Surge.ai, we capture that value ourselves. 43% revenue increase in first month.",
    author: "Sarah Chen",
    role: "Founder @ CloudStep Footwear",
  },
  {
    quote: "I was charging $150 for coaching sessions and my calendar was full for months. Now my prime slots auction for $280-320. I make more, and clients who really want my time can get it.",
    author: "Marcus Rodriguez",
    role: "Business Coach",
  },
  {
    quote: "Our VIP conference tickets used to sell out instantly at $499. We had no idea if we were underpricing. Auctions showed us the true market value was $650-750. Extra $40K revenue from 200 tickets.",
    author: "Jessica Park",
    role: "Event Organizer",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Try it risk-free",
    features: ["First 100 auctions free", "3% transaction fee", "Basic analytics", "Email support", "Surge.ai branding"],
    cta: "Start Free",
  },
  {
    name: "Growth",
    price: "$99",
    period: "/month",
    description: "Perfect for growing businesses",
    features: ["Unlimited auctions", "2% transaction fee", "Advanced analytics", "Priority support", "Remove branding", "Custom styling"],
    popular: true,
    cta: "Start Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For high-volume businesses",
    features: ["White-label solution", "1.5% transaction fee", "Dedicated account manager", "API access", "Custom integrations", "SLA guarantee"],
    cta: "Contact Sales",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  // Using a real auction ID from your database
  const demoAuctionId = "9a354d99-619b-4903-bef9-8c53557ed8fe";

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Surge.ai
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
            <Button variant="outline" onClick={() => navigate("/demo")}>Live Demo</Button>
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth")} className="bg-gradient-primary">
              Start Free Trial
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Pricing Infrastructure for the Internet
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Surge.ai is the API for auctions and dynamic pricing. Add intelligent price discovery to any business in 3 lines of code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/demo")}
                className="bg-gradient-primary text-lg px-8 shadow-glow"
              >
                See Live Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8"
              >
                Start Free Trial
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Join 247 businesses already using Surge.ai</span>
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <img 
              src={heroImage} 
              alt="Surge.ai Dashboard" 
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Static Pricing Costs You Thousands</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {problems.map((problem, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <problem.icon className="w-12 h-12 text-destructive mb-4" />
                <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xl text-muted-foreground italic">
            The solution? Let the market decide what your product is worth.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground">Powerful features built for modern businesses</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Real Shoppers. Real Bids. Real Revenue.</h2>
            <p className="text-xl text-muted-foreground">Watch a live auction happening right now</p>
          </div>
          <div className="flex justify-center">
            <AuctionWidget auctionId={demoAuctionId} />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built For Every Business With Limited Inventory</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{useCase.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{useCase.subtitle}</p>
                <p className="text-sm font-medium text-primary">{useCase.example}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Businesses Love Surge.ai</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Add Our Widget to Your Site</h3>
              <p className="text-muted-foreground mb-4">Works on any platform. Takes 2 minutes.</p>
              <div className="bg-muted p-4 rounded-lg text-left">
                <code className="text-xs block mb-1">
                  {'<script src="https://surge.ai/widget.js"></script>'}
                </code>
                <code className="text-xs block">
                  {'<div data-surge-auction="your-product-id"></div>'}
                </code>
              </div>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Customers Bid in Real-Time</h3>
              <p className="text-muted-foreground">Transparent pricing. Fair competition. No bots or scalpers.</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Watch Revenue Increase</h3>
              <div className="text-muted-foreground mb-2">Revenue dashboard comparing:</div>
              <div className="flex justify-center gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Fixed Price</div>
                  <div className="font-semibold">$12,450</div>
                </div>
                <div>
                  <div className="text-muted-foreground">With Surge.ai</div>
                  <div className="font-semibold text-success">$17,890</div>
                </div>
              </div>
              <div className="text-success font-bold mt-2">(+43%)</div>
            </Card>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Start Free. Scale Forever.</h2>
            <p className="text-xl text-muted-foreground">Only pay when you make money</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`p-8 ${plan.popular ? "border-2 border-primary shadow-glow" : ""} relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-success" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? "bg-gradient-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate("/auth")}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Average customer earns $8,400 more in first 90 days
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Stop Leaving Money on the Table</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 247 businesses capturing true market value with Surge.ai. Set up your first auction in 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="bg-gradient-primary text-lg px-8 shadow-glow"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-lg px-8"
            >
              Book a Demo
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Surge.ai
              </div>
              <p className="text-sm text-muted-foreground">
                Pricing infrastructure for the internet
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#how-it-works" className="hover:text-primary">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
                <li><a href="#use-cases" className="hover:text-primary">Use Cases</a></li>
                <li><a href="/demo" className="hover:text-primary">Live Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">API Reference</a></li>
                <li><a href="#" className="hover:text-primary">Integration Guides</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">Terms & Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@surge.ai" className="hover:text-primary">hello@surge.ai</a>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">© 2025 Surge.ai. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Surge.ai — Pricing infrastructure for the internet</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
