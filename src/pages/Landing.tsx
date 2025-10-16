import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, Brain, DollarSign, Shield, BarChart3, Palette, ArrowRight, Check, Code } from "lucide-react";
import { AuctionWidget } from "@/components/AuctionWidget";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.png";
import productCoaching from "@/assets/product-coaching.png";

const features = [
  {
    icon: Rocket,
    title: "Live in 5 Minutes",
    description: "Drop-in widget for any online store",
  },
  {
    icon: Brain,
    title: "AI-Powered Pricing",
    description: "Maximize profits on every item automatically",
  },
  {
    icon: DollarSign,
    title: "Sell 3x Faster",
    description: "Turn excess inventory into bidding wars",
  },
  {
    icon: Shield,
    title: "Fair for Everyone",
    description: "Anti-bot tech ensures real shoppers win",
  },
  {
    icon: BarChart3,
    title: "Know What Sells",
    description: "See what customers really want to pay",
  },
  {
    icon: Palette,
    title: "Your Brand, Your Way",
    description: "Customize every color, font, and detail",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    description: "Try it risk-free",
    features: ["First 50 auctions free", "Up to $5,000 in sales", "Basic analytics", "Email support", "Standard widgets"],
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    description: "Perfect for online stores",
    features: ["Unlimited auctions", "1.5% transaction fee", "Advanced analytics", "Priority support", "Custom branding", "Shopify & WooCommerce integrations"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For major retailers",
    features: ["Volume pricing (0.5% fee)", "White-label solution", "Dedicated account manager", "SLA guarantee", "Custom integrations", "Advanced fraud protection"],
  },
];

export default function Landing() {
  const navigate = useNavigate();

  // Note: This auction ID should be replaced with an actual UUID from your database
  const demoAuctionId = "00000000-0000-0000-0000-000000000001";

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
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Rocket className="w-4 h-4" />
              Trusted by 247+ fashion & ecommerce brands
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Let Your Customers{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Decide The Price
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Turn your clearance items, limited drops, and exclusive products into exciting auctions. Watch shoppers compete to buy what they love.
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
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

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">From Shopify to Bidding Wars in Minutes</h2>
            <p className="text-xl text-muted-foreground">Works with any ecommerce platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Embed Our Widget</h3>
              <p className="text-muted-foreground mb-4">Copy and paste our simple code snippet</p>
              <div className="bg-muted p-4 rounded-lg text-left">
                <code className="text-xs">
                  {'<script src="surge.ai/widget.js"></script>'}
                </code>
              </div>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Customers Bid</h3>
              <p className="text-muted-foreground">Watch real-time bidding happen on your products</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-3">3. You Earn More</h3>
              <p className="text-muted-foreground">Track revenue and analytics in your dashboard</p>
            </Card>
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
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Surge.ai
              </div>
              <p className="text-sm text-muted-foreground">
                The API for dynamic pricing and smart auctions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2025 Surge.ai. All rights reserved.</p>
            <p className="text-xs">Democratizing dynamic pricing for every business, from boutiques to global brands.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
