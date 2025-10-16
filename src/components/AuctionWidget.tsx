import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, TrendingUp, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuction } from "@/hooks/useAuction";
import { supabase } from "@/integrations/supabase/client";

interface AuctionWidgetProps {
  auctionId: string;
}

export function AuctionWidget({ auctionId }: AuctionWidgetProps) {
  const navigate = useNavigate();
  const { auction, bids, loading, timeRemaining, placeBid } = useAuction(auctionId);
  const [bidAmount, setBidAmount] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userHighBid, setUserHighBid] = useState(0);
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
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

  const handlePlaceBid = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to place a bid");
      setTimeout(() => navigate("/auth"), 1000);
      return;
    }

    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount)) {
      toast.error("Please enter a valid bid amount");
      return;
    }
    
    const minBid = auction!.current_bid > 0 
      ? auction!.current_bid + auction!.minimum_increment
      : auction!.starting_bid;
    
    if (amount < minBid) {
      toast.error(`Bid must be at least $${minBid.toFixed(2)}`);
      return;
    }

    setIsPlacingBid(true);
    
    const success = await placeBid(amount);
    
    if (success) {
      setUserHighBid(amount);
      setBidAmount("");
      toast.success("Bid placed successfully! 🎉");
    }
    
    setIsPlacingBid(false);
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 animate-pulse">
        <div className="h-64 bg-muted rounded-lg mb-4" />
        <div className="h-6 bg-muted rounded mb-2" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </Card>
    );
  }

  if (!auction) {
    return (
      <Card className="w-full max-w-md mx-auto p-6">
        <p className="text-center text-muted-foreground">Auction not found</p>
      </Card>
    );
  }

  const isWinning = userHighBid > 0 && userHighBid === auction.current_bid;
  const isUrgent = timeRemaining < 300; // Less than 5 minutes

  return (
    <Card className="w-full max-w-md overflow-hidden shadow-lg">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-secondary">
        {auction.image_url && (
          <img 
            src={auction.image_url} 
            alt={auction.title}
            className="w-full h-full object-cover"
          />
        )}
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
            ${auction.current_bid.toFixed(2)}
          </div>
          {isWinning && (
            <div className="text-sm text-success font-medium mt-1 flex items-center gap-1">
              <Zap className="w-4 h-4" />
              You're winning!
            </div>
          )}
        </div>

        {/* AI Insights */}
        {auction.ai_suggested_price && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">AI Price:</span>
              <span className="font-semibold">${auction.ai_suggested_price.toFixed(2)}</span>
            </div>
            <div className="text-warning font-medium">
              {auction.surge_multiplier.toFixed(1)}x surge
            </div>
          </div>
        )}

        {/* Countdown Timer */}
        <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${isUrgent ? "bg-warning/10 animate-pulse-glow" : "bg-muted/50"}`}>
          <Clock className={`w-5 h-5 ${isUrgent ? "text-warning" : "text-muted-foreground"}`} />
          <div>
            <div className="text-xs text-muted-foreground">Time Remaining</div>
            <div className={`text-lg font-bold ${isUrgent ? "text-warning" : ""}`}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Bid Input */}
        {timeRemaining > 0 && auction.status === 'active' && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder={`Min $${(auction.current_bid > 0 ? auction.current_bid + auction.minimum_increment : auction.starting_bid).toFixed(2)}`}
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
            {!isAuthenticated && (
              <p className="text-xs text-muted-foreground text-center">
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-xs" 
                  onClick={() => navigate("/auth")}
                >
                  Sign in
                </Button>
                {" "}to place a bid
              </p>
            )}
          </div>
        )}

        {/* Bid History */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Recent Bids</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {bids.length > 0 ? (
              bids.map((bid) => (
                <div 
                  key={bid.id}
                  className="flex justify-between items-center text-sm p-2 rounded bg-muted/30"
                >
                  <span className="font-medium">{bid.bidder.display_name}</span>
                  <div className="text-right">
                    <div className="font-semibold">${bid.amount.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor((Date.now() - new Date(bid.created_at).getTime()) / 1000 / 60)}m ago
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">No bids yet - be the first!</p>
            )}
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
