import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, ShoppingBag, Target, ExternalLink, Clock, Eye } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const metrics = [
  {
    label: "Total Revenue Today",
    value: "$12,847",
    change: "+23.1%",
    icon: DollarSign,
    trend: "up",
  },
  {
    label: "Active Auctions",
    value: "23",
    change: "+3 new",
    icon: ShoppingBag,
    trend: "up",
  },
  {
    label: "Avg. Revenue Lift",
    value: "+42%",
    change: "vs fixed pricing",
    icon: TrendingUp,
    trend: "up",
  },
  {
    label: "Total Bids Today",
    value: "387",
    change: "+18.2%",
    icon: Target,
    trend: "up",
  },
];

const revenueData = [
  { day: "Mon", actual: 8200, fixed: 6100 },
  { day: "Tue", actual: 9100, fixed: 6400 },
  { day: "Wed", actual: 11200, fixed: 7200 },
  { day: "Thu", actual: 10800, fixed: 7500 },
  { day: "Fri", actual: 13400, fixed: 8100 },
  { day: "Sat", actual: 14200, fixed: 8800 },
  { day: "Sun", actual: 12847, fixed: 7900 },
];

const activeAuctions = [
  { id: 1, name: "Strategy Session with Sarah Chen", currentBid: 287, timeLeft: "4h 23m", bids: 12, status: "Active" },
  { id: 2, name: "Growth Hacking Course 2025", currentBid: 156, timeLeft: "1h 47m", bids: 23, status: "Active" },
  { id: 3, name: "VIP Workshop Seat", currentBid: 734, timeLeft: "23m", bids: 8, status: "Ending Soon" },
  { id: 4, name: "Marketing Consultation Package", currentBid: 425, timeLeft: "6h 12m", bids: 15, status: "Active" },
  { id: 5, name: "Premium Design Review", currentBid: 198, timeLeft: "2h 34m", bids: 19, status: "Active" },
];

const recentActivity = [
  { text: "New bid on 'Coaching Session' - $287 by Alex M.", time: "2 min ago", type: "bid" },
  { text: "Auction ended: 'Workshop Seat' - Won by Jordan K. for $734", time: "15 min ago", type: "win" },
  { text: "New bid on 'Design Review' - $198 by Sam T.", time: "23 min ago", type: "bid" },
  { text: "Price surge detected on 'Growth Course' (+15%)", time: "45 min ago", type: "surge" },
  { text: "New auction started: 'Marketing Package'", time: "1h ago", type: "new" },
];

export default function Overview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <h3 className="text-3xl font-bold">{metric.value}</h3>
                <p className={`text-sm mt-2 ${metric.trend === "up" ? "text-success" : "text-muted-foreground"}`}>
                  {metric.change}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Revenue Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Dynamic pricing vs. traditional fixed pricing
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFixed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorActual)" name="With Surge.ai" />
            <Area type="monotone" dataKey="fixed" stroke="hsl(var(--muted-foreground))" fillOpacity={1} fill="url(#colorFixed)" name="Fixed Pricing" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-success/10 rounded-lg">
          <p className="text-sm font-medium text-success">
            🎉 You've earned $4,234 more (37%) this week with Surge.ai compared to fixed pricing!
          </p>
        </div>
      </Card>

      {/* Active Auctions Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">Active Auctions</h3>
            <p className="text-sm text-muted-foreground">Manage your ongoing auctions</p>
          </div>
          <Button onClick={() => navigate("/dashboard/auctions")}>
            View All
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-semibold text-sm">Product Name</th>
                <th className="pb-3 font-semibold text-sm">Current Bid</th>
                <th className="pb-3 font-semibold text-sm">Time Left</th>
                <th className="pb-3 font-semibold text-sm"># Bids</th>
                <th className="pb-3 font-semibold text-sm">Status</th>
                <th className="pb-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeAuctions.map((auction) => (
                <tr key={auction.id} className="border-b last:border-0">
                  <td className="py-4">{auction.name}</td>
                  <td className="py-4 font-semibold">${auction.currentBid}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {auction.timeLeft}
                    </div>
                  </td>
                  <td className="py-4">{auction.bids}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      auction.status === "Ending Soon" 
                        ? "bg-warning/10 text-warning" 
                        : "bg-success/10 text-success"
                    }`}>
                      {auction.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b last:border-0">
              <div className={`p-2 rounded-full ${
                activity.type === "bid" ? "bg-primary/10" :
                activity.type === "win" ? "bg-success/10" :
                activity.type === "surge" ? "bg-warning/10" :
                "bg-accent/10"
              }`}>
                {activity.type === "bid" && <Target className="w-4 h-4 text-primary" />}
                {activity.type === "win" && <TrendingUp className="w-4 h-4 text-success" />}
                {activity.type === "surge" && <TrendingUp className="w-4 h-4 text-warning" />}
                {activity.type === "new" && <ShoppingBag className="w-4 h-4 text-accent" />}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
