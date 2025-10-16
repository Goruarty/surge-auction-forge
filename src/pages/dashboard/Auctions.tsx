import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search, Clock, Eye, TrendingUp, MoreHorizontal, Copy, Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import productCoaching from "@/assets/product-coaching.png";

interface Auction {
  id: string;
  title: string;
  description: string;
  image_url: string;
  current_bid: number;
  starting_bid: number;
  end_time: string;
  status: string;
  viewers: number;
  created_at: string;
}

export default function Auctions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast.error("Please sign in to view your auctions");
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from('auctions')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setAuctions(data || []);
    } catch (error: any) {
      console.error("Error fetching auctions:", error);
      toast.error("Failed to load auctions");
    } finally {
      setLoading(false);
    }
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const remaining = end - now;

    if (remaining <= 0) return "Ended";

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const filteredAuctions = auctions.filter(auction => {
    const matchesFilter = filter === "all" || auction.status === filter;
    const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>;
      case "ending_soon":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20 animate-pulse">Ending Soon</Badge>;
      case "scheduled":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Scheduled</Badge>;
      case "ended":
        return <Badge variant="secondary">Ended</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Auctions</h1>
          <p className="text-muted-foreground">Manage all your auction listings</p>
        </div>
        <Button onClick={() => navigate("/dashboard/create")} className="bg-gradient-primary">
          <PlusCircle className="mr-2 w-5 h-5" />
          Create New Auction
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Auctions</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="ending_soon">Ending Soon</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Auctions Grid */}
      {loading ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Loading your auctions...</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-muted">
                <img 
                  src={auction.image_url || productCoaching} 
                  alt={auction.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(auction.status)}
                </div>
              </div>
            <div className="p-6 space-y-4">
              <h3 className="font-semibold text-lg line-clamp-2">{auction.title}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Bid</span>
                  <span className="text-xl font-bold">${auction.current_bid}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((auction.current_bid / auction.starting_bid) * 50, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Started at ${auction.starting_bid}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {getTimeRemaining(auction.end_time)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    {auction.viewers}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" className="flex-1" size="sm">
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 w-4 h-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            </Card>
          ))}
        </div>
      )}

      {filteredAuctions.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No auctions found</p>
          <Button onClick={() => navigate("/dashboard/create")} className="bg-gradient-primary">
            Create Your First Auction
          </Button>
        </Card>
      )}
    </div>
  );
}
