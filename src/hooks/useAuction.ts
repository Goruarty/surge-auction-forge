import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Bid {
  id: string;
  amount: number;
  created_at: string;
  bidder: {
    display_name: string;
  };
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  image_url: string;
  starting_bid: number;
  current_bid: number;
  end_time: string;
  status: string;
  viewers: number;
  surge_multiplier: number;
  ai_suggested_price: number;
  minimum_increment: number;
}

export function useAuction(auctionId: string) {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchAuction();
    fetchBids();

    // Subscribe to auction updates
    const auctionChannel = supabase
      .channel(`auction-${auctionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'auctions',
          filter: `id=eq.${auctionId}`,
        },
        (payload) => {
          if (payload.new) {
            setAuction(payload.new as Auction);
          }
        }
      )
      .subscribe();

    // Subscribe to new bids
    const bidsChannel = supabase
      .channel(`bids-${auctionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bids',
          filter: `auction_id=eq.${auctionId}`,
        },
        () => {
          fetchBids();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auctionChannel);
      supabase.removeChannel(bidsChannel);
    };
  }, [auctionId]);

  // Update countdown timer
  useEffect(() => {
    if (!auction) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(auction.end_time).getTime();
      const remaining = Math.max(0, Math.floor((end - now) / 1000));
      setTimeRemaining(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [auction]);

  const fetchAuction = async () => {
    try {
      const { data, error } = await supabase
        .from('auctions')
        .select('*')
        .eq('id', auctionId)
        .single();

      if (error) throw error;
      setAuction(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const { data, error } = await supabase
        .from('bids')
        .select(`
          id,
          amount,
          created_at,
          bidder:profiles(display_name)
        `)
        .eq('auction_id', auctionId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setBids(data as any);
    } catch (error: any) {
      console.error('Error fetching bids:', error);
    }
  };

  const placeBid = async (amount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to place a bid",
          variant: "destructive",
        });
        return false;
      }

      if (!auction) return false;

      // Validate bid amount
      const minBid = auction.current_bid > 0 
        ? auction.current_bid + auction.minimum_increment
        : auction.starting_bid;

      if (amount < minBid) {
        toast({
          title: "Bid too low",
          description: `Minimum bid is $${minBid.toFixed(2)}`,
          variant: "destructive",
        });
        return false;
      }

      // Check if auction has ended
      if (timeRemaining <= 0) {
        toast({
          title: "Auction ended",
          description: "This auction has already ended",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('bids')
        .insert({
          auction_id: auctionId,
          bidder_id: user.id,
          amount,
        });

      if (error) throw error;

      toast({
        title: "Bid placed!",
        description: `Your bid of $${amount.toFixed(2)} has been placed`,
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    auction,
    bids,
    loading,
    timeRemaining,
    placeBid,
  };
}
