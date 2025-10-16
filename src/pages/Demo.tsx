import { Button } from "@/components/ui/button";
import { AuctionWidget } from "@/components/AuctionWidget";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import productCoaching from "@/assets/product-coaching.png";
import productCourse from "@/assets/product-course.png";
import productWorkshop from "@/assets/product-workshop.png";

// Note: These auction IDs should be replaced with actual UUIDs from your database
// For now, the widget will show "Auction not found" until you create real auctions
const demoAuctionIds = [
  "00000000-0000-0000-0000-000000000001",
  "00000000-0000-0000-0000-000000000002", 
  "00000000-0000-0000-0000-000000000003"
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
          {demoAuctionIds.map((auctionId, idx) => (
            <div key={auctionId} className="animate-fade-in">
              <AuctionWidget auctionId={auctionId} />
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
