import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calendar, Download, TrendingUp, DollarSign, Target, Users } from "lucide-react";

const revenueData = [
  { date: "Jan 1", revenue: 3200, fixed: 2400, gmv: 3520 },
  { date: "Jan 8", revenue: 4100, fixed: 2800, gmv: 4510 },
  { date: "Jan 15", revenue: 5300, fixed: 3200, gmv: 5830 },
  { date: "Jan 22", revenue: 6800, fixed: 3900, gmv: 7480 },
  { date: "Jan 29", revenue: 7200, fixed: 4100, gmv: 7920 },
  { date: "Feb 5", revenue: 8500, fixed: 4600, gmv: 9350 },
  { date: "Feb 12", revenue: 9100, fixed: 4900, gmv: 10010 },
];

const bidActivityData = [
  { hour: "12am", bids: 5 },
  { hour: "3am", bids: 2 },
  { hour: "6am", bids: 8 },
  { hour: "9am", bids: 45 },
  { hour: "12pm", bids: 67 },
  { hour: "3pm", bids: 82 },
  { hour: "6pm", bids: 95 },
  { hour: "9pm", bids: 73 },
];

const dayOfWeekData = [
  { day: "Mon", avgBid: 245 },
  { day: "Tue", avgBid: 289 },
  { day: "Wed", avgBid: 312 },
  { day: "Thu", avgBid: 298 },
  { day: "Fri", avgBid: 267 },
  { day: "Sat", avgBid: 223 },
  { day: "Sun", avgBid: 198 },
];

const productPerformance = [
  { product: "Strategy Sessions", auctions: 15, avgBid: 287, revenue: 4305, lift: "+42%" },
  { product: "Courses", auctions: 23, avgBid: 156, revenue: 3588, lift: "+38%" },
  { product: "Workshops", auctions: 8, avgBid: 734, revenue: 5872, lift: "+51%" },
  { product: "Consultations", auctions: 12, avgBid: 425, revenue: 5100, lift: "+35%" },
  { product: "Reviews", auctions: 19, avgBid: 198, revenue: 3762, lift: "+29%" },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30");

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
          <div className="text-3xl font-bold mb-1">$48,452</div>
          <div className="text-sm text-success">+32.4% vs fixed pricing</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Avg Winning Bid</div>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl font-bold mb-1">$312</div>
          <div className="text-sm text-success">+28.1% vs starting</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
            <Target className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-bold mb-1">18.7%</div>
          <div className="text-sm text-muted-foreground">Viewers → Winners</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Revenue Lift</div>
            <Users className="w-5 h-5 text-warning" />
          </div>
          <div className="text-3xl font-bold mb-1">+37%</div>
          <div className="text-sm text-success">$12,847 additional</div>
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
            <div className="text-2xl font-bold text-success">$4,234</div>
            <div className="text-xs text-muted-foreground mt-1">37% increase this month</div>
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
