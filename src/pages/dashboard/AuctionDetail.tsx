import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Edit, Clock, Eye, TrendingUp, DollarSign } from "lucide-react";
import productCoaching from "@/assets/product-coaching.png";

interface Bid {
  id: string;
  amount: number;
  created_at: string;
  bidder_id: string;
}

interface Auction {
  id: string;
  title: string;
  description: string;
  image_url: string;
  current_bid: number;
  starting_bid: number;
  reserve_price: number;
  buy_now_price: number;
  minimum_increment: number;
  end_time: string;
  start_time: string;
  status: string;
  viewers: number;
  auto_extend_enabled: boolean;
  surge_multiplier: number;
  ai_suggested_price: number;
}

export default function AuctionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAuctionDetails();
      fetchBids();
    }
  }, [id]);

  const fetchAuctionDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('auctions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setAuction(data);
    } catch (error) {
      console.error("Error fetching auction:", error);
      toast.error("Failed to load auction details");
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const { data, error } = await supabase
        .from('bids')
        .select('*')
        .eq('auction_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBids(data || []);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>;
      case "scheduled":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Scheduled</Badge>;
      case "ended":
        return <Badge variant="secondary">Ended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Loading auction details...</p>
        </Card>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">Auction not found</p>
          <Button onClick={() => navigate("/dashboard/auctions")}>
            Back to Auctions
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/dashboard/auctions")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
          <div className="flex items-center gap-2">
            {getStatusBadge(auction.status)}
          </div>
        </div>
        <Button onClick={() => navigate(`/dashboard/auctions/${id}/edit`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Auction
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-muted">
              <img 
                src={auction.image_url || productCoaching} 
                alt={auction.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {auction.description || "No description provided"}
              </p>
            </div>
          </Card>

          {/* Bid History */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Bid History</h3>
            {bids.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No bids yet</p>
            ) : (
              <div className="space-y-3">
                {bids.map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold">${bid.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(bid.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Current Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
                <p className="text-3xl font-bold">${auction.current_bid}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Starting</p>
                  <p className="font-semibold">${auction.starting_bid}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Reserve</p>
                  <p className="font-semibold">${auction.reserve_price || 'N/A'}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Viewers</span>
                </div>
                <span className="font-semibold">{auction.viewers}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Total Bids</span>
                </div>
                <span className="font-semibold">{bids.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Min Increment</span>
                </div>
                <span className="font-semibold">${auction.minimum_increment}</span>
              </div>
            </div>
          </Card>

          {/* Timing */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Timing</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Start Time</p>
                <p className="text-sm">{new Date(auction.start_time).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">End Time</p>
                <p className="text-sm">{new Date(auction.end_time).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Auto-extend: {auction.auto_extend_enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
