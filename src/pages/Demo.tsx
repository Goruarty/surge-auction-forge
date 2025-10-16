import { Button } from "@/components/ui/button";
import { AuctionWidget } from "@/components/AuctionWidget";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import productCoaching from "@/assets/product-coaching.png";
import productCourse from "@/assets/product-course.png";
import productWorkshop from "@/assets/product-workshop.png";

const demoAuctions = [
  {
    id: "demo-1",
    title: "1-on-1 Strategy Session with Sarah Chen",
    description: "Limited availability - 3 spots remaining",
    image: productCoaching,
    startingBid: 150,
    currentBid: 287,
    timeRemaining: 15780,
    bids: [
      { bidder: "Alex M.", amount: 287, timestamp: new Date(Date.now() - 120000) },
      { bidder: "Jordan K.", amount: 275, timestamp: new Date(Date.now() - 300000) },
      { bidder: "Sam T.", amount: 260, timestamp: new Date(Date.now() - 600000) },
      { bidder: "Taylor R.", amount: 245, timestamp: new Date(Date.now() - 900000) },
    ],
    viewers: 47,
    aiSuggestedPrice: 315,
    surgeMultiplier: 1.4,
  },
  {
    id: "demo-2",
    title: "Limited Edition Course: Growth Hacking 2025",
    description: "Exclusive beta access",
    image: productCourse,
    startingBid: 99,
    currentBid: 156,
    timeRemaining: 6420,
    bids: [
      { bidder: "Morgan B.", amount: 156, timestamp: new Date(Date.now() - 180000) },
      { bidder: "Casey L.", amount: 145, timestamp: new Date(Date.now() - 420000) },
      { bidder: "Jamie P.", amount: 132, timestamp: new Date(Date.now() - 720000) },
    ],
    viewers: 23,
    aiSuggestedPrice: 175,
    surgeMultiplier: 1.6,
  },
  {
    id: "demo-3",
    title: "VIP Workshop Seat - Only 5 Available",
    description: "Premium networking event",
    image: productWorkshop,
    startingBid: 499,
    currentBid: 734,
    timeRemaining: 1392,
    bids: [
      { bidder: "Alex M.", amount: 734, timestamp: new Date(Date.now() - 60000) },
      { bidder: "Sam T.", amount: 710, timestamp: new Date(Date.now() - 240000) },
      { bidder: "Jordan K.", amount: 685, timestamp: new Date(Date.now() - 480000) },
      { bidder: "Taylor R.", amount: 660, timestamp: new Date(Date.now() - 720000) },
    ],
    viewers: 89,
    aiSuggestedPrice: 820,
    surgeMultiplier: 2.1,
  },
];

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Surge.ai
          </div>
          <Button onClick={() => navigate("/dashboard")} className="bg-gradient-primary">
            Go to Dashboard
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Live Widget Demo</h1>
          <p className="text-xl text-muted-foreground">
            These are real, working auction widgets. Try placing a bid!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {demoAuctions.map((auction) => (
            <div key={auction.id} className="animate-fade-in">
              <AuctionWidget auctionData={auction} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Add This to Your Site?</h3>
            <p className="text-muted-foreground mb-6">
              It's as simple as copying and pasting a few lines of code. Start your free trial today.
            </p>
            <Button size="lg" onClick={() => navigate("/dashboard")} className="bg-gradient-primary">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
