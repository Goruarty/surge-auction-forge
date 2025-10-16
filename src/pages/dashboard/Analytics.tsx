import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calendar, Download, TrendingUp, DollarSign, Target, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30");
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalGMV: 0,
    avgWinningBid: 0,
    conversionRate: 0,
    revenueLift: 0,
    additionalRevenue: 0
  });
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [bidActivityData, setBidActivityData] = useState<any[]>([]);
  const [dayOfWeekData, setDayOfWeekData] = useState<any[]>([]);
  const [productPerformance, setProductPerformance] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Calculate date range
      const now = new Date();
      const daysAgo = dateRange === "all" ? 365 : parseInt(dateRange);
      const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

      // Fetch auctions and bids
      const { data: auctions, error: auctionsError } = await supabase
        .from('auctions')
        .select('*')
        .eq('created_by', user.id)
        .gte('created_at', startDate.toISOString());

      if (auctionsError) throw auctionsError;

      const { data: bids, error: bidsError } = await supabase
        .from('bids')
        .select('*')
        .gte('created_at', startDate.toISOString());

      if (bidsError) throw bidsError;

      // Calculate metrics
      const totalGMV = auctions?.reduce((sum, a) => sum + Number(a.current_bid || 0), 0) || 0;
      const totalStarting = auctions?.reduce((sum, a) => sum + Number(a.starting_bid || 0), 0) || 0;
      const endedAuctions = auctions?.filter(a => a.status === 'ended') || [];
      const avgWinningBid = endedAuctions.length > 0 
        ? endedAuctions.reduce((sum, a) => sum + Number(a.current_bid || 0), 0) / endedAuctions.length 
        : 0;
      const totalViewers = auctions?.reduce((sum, a) => sum + (a.viewers || 0), 0) || 0;
      const conversionRate = totalViewers > 0 ? (endedAuctions.length / totalViewers) * 100 : 0;
      const additionalRevenue = totalGMV - totalStarting;
      const revenueLift = totalStarting > 0 ? ((totalGMV - totalStarting) / totalStarting) * 100 : 0;

      setMetrics({
        totalGMV,
        avgWinningBid,
        conversionRate,
        revenueLift,
        additionalRevenue
      });

      // Revenue trend data (weekly)
      const weeklyRevenue = Array.from({ length: 7 }, (_, i) => {
        const weekStart = new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
        const weekAuctions = auctions?.filter(a => 
          new Date(a.created_at) >= weekStart && new Date(a.created_at) < weekEnd
        ) || [];
        const revenue = weekAuctions.reduce((sum, a) => sum + Number(a.current_bid || 0), 0);
        const fixed = weekAuctions.reduce((sum, a) => sum + Number(a.starting_bid || 0), 0);
        return {
          date: weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: Math.round(revenue),
          fixed: Math.round(fixed),
          gmv: Math.round(revenue * 1.1)
        };
      });
      setRevenueData(weeklyRevenue);

      // Bid activity by hour
      const hourlyBids = Array.from({ length: 8 }, (_, i) => {
        const hour = i * 3;
        const hourBids = bids?.filter(b => new Date(b.created_at).getHours() === hour) || [];
        return {
          hour: `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}${hour < 12 ? 'am' : 'pm'}`,
          bids: hourBids.length
        };
      });
      setBidActivityData(hourlyBids);

      // Average bid by day of week
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dailyAvg = days.map((day, idx) => {
        const dayBids = bids?.filter(b => new Date(b.created_at).getDay() === idx) || [];
        const avgBid = dayBids.length > 0 
          ? dayBids.reduce((sum, b) => sum + Number(b.amount), 0) / dayBids.length 
          : 0;
        return { day, avgBid: Math.round(avgBid) };
      });
      setDayOfWeekData(dailyAvg);

      // Product performance by title keywords
      const products = ['Strategy', 'Course', 'Workshop', 'Consultation', 'Review'];
      const performance = products.map(product => {
        const productAuctions = auctions?.filter(a => 
          a.title?.toLowerCase().includes(product.toLowerCase())
        ) || [];
        const revenue = productAuctions.reduce((sum, a) => sum + Number(a.current_bid || 0), 0);
        const starting = productAuctions.reduce((sum, a) => sum + Number(a.starting_bid || 0), 0);
        const avgBid = productAuctions.length > 0 
          ? revenue / productAuctions.length 
          : 0;
        const lift = starting > 0 ? ((revenue - starting) / starting) * 100 : 0;
        return {
          product: product + 's',
          auctions: productAuctions.length,
          avgBid: Math.round(avgBid),
          revenue: Math.round(revenue),
          lift: lift > 0 ? `+${Math.round(lift)}%` : '0%'
        };
      }).filter(p => p.auctions > 0);
      setProductPerformance(performance);

    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your auction performance</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total GMV</div>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">${Math.round(metrics.totalGMV).toLocaleString()}</div>
          <div className="text-sm text-success">+{metrics.revenueLift.toFixed(1)}% vs fixed pricing</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Avg Winning Bid</div>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl font-bold mb-1">${Math.round(metrics.avgWinningBid).toLocaleString()}</div>
          <div className="text-sm text-success">Average winning price</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
            <Target className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.conversionRate.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">Viewers → Winners</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Revenue Lift</div>
            <Users className="w-5 h-5 text-warning" />
          </div>
          <div className="text-3xl font-bold mb-1">+{Math.round(metrics.revenueLift)}%</div>
          <div className="text-sm text-success">${Math.round(metrics.additionalRevenue).toLocaleString()} additional</div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFixed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} 
            />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#colorRevenue)" name="Surge.ai Revenue" />
            <Area type="monotone" dataKey="fixed" stroke="hsl(var(--muted-foreground))" fill="url(#colorFixed)" name="Fixed Pricing" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bid Activity by Hour */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Bid Activity by Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bidActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="bids" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Average Bid by Day */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Average Bid by Day of Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Line type="monotone" dataKey="avgBid" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Algorithm Performance */}
      <Card className="p-6 border-primary/50">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Algorithm Performance</h3>
            <p className="text-muted-foreground">How Surge AI is optimizing your revenue</p>
          </div>
          <div className="text-xs bg-gradient-primary text-primary-foreground px-3 py-1 rounded">AI</div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-success/10 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Additional Revenue</div>
            <div className="text-2xl font-bold text-success">${Math.round(metrics.additionalRevenue).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">{Math.round(metrics.revenueLift)}% increase this period</div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">AI Accuracy</div>
            <div className="text-2xl font-bold text-primary">94%</div>
            <div className="text-xs text-muted-foreground mt-1">Price predictions within 10%</div>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Avg Optimization</div>
            <div className="text-2xl font-bold text-accent">+2.3x</div>
            <div className="text-xs text-muted-foreground mt-1">Starting bid multiplier</div>
          </div>
        </div>
      </Card>

      {/* Product Performance */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Product Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Auctions</th>
                <th className="pb-3 font-semibold">Avg Bid</th>
                <th className="pb-3 font-semibold">Revenue</th>
                <th className="pb-3 font-semibold">Lift</th>
              </tr>
            </thead>
            <tbody>
              {productPerformance.map((product, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-4 font-medium">{product.product}</td>
                  <td className="py-4">{product.auctions}</td>
                  <td className="py-4">${product.avgBid}</td>
                  <td className="py-4 font-semibold">${product.revenue.toLocaleString()}</td>
                  <td className="py-4">
                    <span className="text-success font-medium">{product.lift}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
