import { useState, useEffect } from "react";
import { Clock, TrendingUp, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Bid {
  bidder: string;
  amount: number;
  timestamp: Date;
}

interface AuctionData {
  id: string;
  title: string;
  description: string;
  image: string;
  startingBid: number;
  currentBid: number;
  timeRemaining: number;
  bids: Bid[];
  viewers: number;
  aiSuggestedPrice: number;
  surgeMultiplier: number;
}

const FAKE_BIDDERS = ["Alex M.", "Jordan K.", "Sam T.", "Taylor R.", "Casey L.", "Morgan B.", "Jamie P."];

export function AuctionWidget({ auctionData, onBidPlaced }: { auctionData: AuctionData; onBidPlaced?: (amount: number) => void }) {
  const [auction, setAuction] = useState(auctionData);
  const [bidAmount, setBidAmount] = useState("");
  const [userHighBid, setUserHighBid] = useState(0);
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  // Simulate real-time bidding
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to add a bid (15-45 second intervals)
      if (Math.random() > 0.7 && auction.timeRemaining > 0) {
        const randomBidder = FAKE_BIDDERS[Math.floor(Math.random() * FAKE_BIDDERS.length)];
        const bidIncrement = Math.floor(Math.random() * 10 + 1) * 5; // $5-$50
        const newBid = auction.currentBid + bidIncrement;
        
        setAuction(prev => ({
          ...prev,
          currentBid: newBid,
          bids: [
            { bidder: randomBidder, amount: newBid, timestamp: new Date() },
            ...prev.bids.slice(0, 4)
          ],
          viewers: prev.viewers + Math.floor(Math.random() * 3 - 1),
          aiSuggestedPrice: newBid * 1.1,
        }));
      }
    }, Math.random() * 30000 + 15000);

    return () => clearInterval(interval);
  }, [auction]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setAuction(prev => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount)) {
      toast.error("Please enter a valid bid amount");
      return;
    }
    
    if (amount < auction.currentBid + 5) {
      toast.error("Bid must be at least $5 higher than current bid");
      return;
    }

    setIsPlacingBid(true);
    
    setTimeout(() => {
      setAuction(prev => ({
        ...prev,
        currentBid: amount,
        bids: [
          { bidder: "You", amount, timestamp: new Date() },
          ...prev.bids.slice(0, 4)
        ],
        // Auto-extend if bid in last 2 minutes
        timeRemaining: prev.timeRemaining < 120 ? prev.timeRemaining + 120 : prev.timeRemaining,
      }));
      
      setUserHighBid(amount);
      setBidAmount("");
      setIsPlacingBid(false);
      toast.success("Bid placed successfully! 🎉");
      onBidPlaced?.(amount);
    }, 800);
  };

  const isWinning = userHighBid > 0 && userHighBid === auction.currentBid;
  const isUrgent = auction.timeRemaining < 300; // Less than 5 minutes

  return (
    <Card className="w-full max-w-md overflow-hidden shadow-lg">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-secondary">
        <img 
          src={auction.image} 
          alt={auction.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {auction.viewers} watching
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold mb-1">{auction.title}</h3>
          <p className="text-sm text-muted-foreground">{auction.description}</p>
        </div>

        {/* Current Bid */}
        <div className={`p-4 rounded-lg ${isWinning ? "bg-success/10 border-2 border-success" : "bg-gradient-secondary"}`}>
          <div className="text-sm text-muted-foreground mb-1">Current High Bid</div>
          <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ${auction.currentBid}
          </div>
          {isWinning && (
            <div className="text-sm text-success font-medium mt-1 flex items-center gap-1">
              <Zap className="w-4 h-4" />
              You're winning!
            </div>
          )}
        </div>

        {/* AI Insights */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">AI Price:</span>
            <span className="font-semibold">${Math.round(auction.aiSuggestedPrice)}</span>
          </div>
          <div className="text-warning font-medium">
            {auction.surgeMultiplier}x surge
          </div>
        </div>

        {/* Countdown Timer */}
        <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${isUrgent ? "bg-warning/10 animate-pulse-glow" : "bg-muted/50"}`}>
          <Clock className={`w-5 h-5 ${isUrgent ? "text-warning" : "text-muted-foreground"}`} />
          <div>
            <div className="text-xs text-muted-foreground">Time Remaining</div>
            <div className={`text-lg font-bold ${isUrgent ? "text-warning" : ""}`}>
              {formatTime(auction.timeRemaining)}
            </div>
          </div>
        </div>

        {/* Bid Input */}
        {auction.timeRemaining > 0 && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder={`Min $${auction.currentBid + 5}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handlePlaceBid}
                disabled={isPlacingBid}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isPlacingBid ? "Placing..." : "Place Bid"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum bid: ${auction.currentBid + 5}
            </p>
          </div>
        )}

        {/* Bid History */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Recent Bids</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {auction.bids.map((bid, idx) => (
              <div 
                key={idx}
                className={`flex justify-between items-center text-sm p-2 rounded ${bid.bidder === "You" ? "bg-success/10" : "bg-muted/30"}`}
              >
                <span className="font-medium">{bid.bidder}</span>
                <div className="text-right">
                  <div className="font-semibold">${bid.amount}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.floor((Date.now() - bid.timestamp.getTime()) / 1000 / 60)}m ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Powered By Badge */}
        <div className="text-center pt-2 border-t">
          <a 
            href="/" 
            className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            Powered by <span className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Surge.ai</span>
          </a>
        </div>
      </div>
    </Card>
  );
}
