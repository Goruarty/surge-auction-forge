import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Clock, BarChart3, Target, Zap, AlertCircle, CheckCircle, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const demandSignals = [
  { label: "Current Viewers", value: "47", status: "High", icon: Users, color: "text-success" },
  { label: "Bid Velocity", value: "3 bids/10min", status: "Increasing", icon: TrendingUp, color: "text-warning" },
  { label: "Time Remaining", value: "4h 23m", status: "Peak window", icon: Clock, color: "text-primary" },
  { label: "Historical Avg", value: "$245", status: "Normal", icon: BarChart3, color: "text-muted-foreground" },
  { label: "Reserve Price", value: "$200", status: "Set", icon: Target, color: "text-accent" },
  { label: "Market Trend", value: "+15%", status: "This week", icon: Activity, color: "text-success" },
];

const priceTimelineData = [
  { time: "T-24h", price: 150, label: "Low demand" },
  { time: "T-12h", price: 175, label: "Increasing interest" },
  { time: "T-6h", price: 200, label: "High demand detected" },
  { time: "T-2h", price: 225, label: "Peak bidding window" },
  { time: "Now", price: 287, label: "Current winning bid" },
];

const optimizationTips = [
  {
    icon: Target,
    title: "Peak Performance Day",
    description: "Your auctions perform best on Tuesday-Thursday",
    impact: "+34% higher bids",
  },
  {
    icon: Clock,
    title: "Optimal Start Time",
    description: "Start auctions at 10am for maximum engagement",
    impact: "+28% more bidders",
  },
  {
    icon: TrendingUp,
    title: "Average Multiplier",
    description: "Your items sell for 2.3x starting bid on average",
    impact: "Industry: 1.8x",
  },
  {
    icon: Zap,
    title: "Reserve Price Strategy",
    description: "Set reserves at 1.5x starting bid for optimal results",
    impact: "92% success rate",
  },
];

export default function Algorithm() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            Algorithm Insights
          </h1>
          <p className="text-muted-foreground">Understanding how Surge AI optimizes your pricing</p>
        </div>
        <Badge className="bg-gradient-primary text-lg px-4 py-2">AI Powered</Badge>
      </div>

      {/* How It Works */}
      <Card className="p-8 bg-gradient-secondary">
        <h2 className="text-2xl font-semibold mb-6 text-center">Real-Time Pricing Engine</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Demand Signals</h3>
            <p className="text-sm text-muted-foreground">Viewers, bids, time, market data</p>
          </div>
          <div className="text-muted-foreground">→</div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">AI Model</h3>
            <p className="text-sm text-muted-foreground">Machine learning optimization</p>
          </div>
          <div className="text-muted-foreground">→</div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-semibold mb-2">Price Recommendation</h3>
            <p className="text-sm text-muted-foreground">Dynamic, real-time pricing</p>
          </div>
        </div>
      </Card>

      {/* Demand Signals */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Live Demand Signals</h2>
        <p className="text-muted-foreground mb-6">Real-time data feeding into the pricing algorithm</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demandSignals.map((signal, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <signal.icon className={`w-6 h-6 ${signal.color}`} />
                <Badge variant="secondary" className="text-xs">{signal.status}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-1">{signal.label}</div>
              <div className="text-2xl font-bold">{signal.value}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Algorithm Output */}
      <Card className="p-6 border-primary/50">
        <h2 className="text-2xl font-semibold mb-6">Current Algorithm Output</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Recommended Start</span>
            </div>
            <div className="text-3xl font-bold">$180</div>
          </div>
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Predicted Final</span>
            </div>
            <div className="text-3xl font-bold">$280-$320</div>
          </div>
          <div className="p-4 bg-success/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Confidence</span>
            </div>
            <div className="text-3xl font-bold">87%</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted-foreground">Suggested Reserve</span>
            </div>
            <div className="text-3xl font-bold">$240</div>
          </div>
        </div>
      </Card>

      {/* Price Adjustment Timeline */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Price Adjustment Timeline</h2>
        <p className="text-muted-foreground mb-6">How recommended pricing evolves based on demand signals</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={priceTimelineData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card p-3 rounded-lg border shadow-lg">
                      <p className="font-semibold">${payload[0].value}</p>
                      <p className="text-xs text-muted-foreground">{payload[0].payload.label}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {priceTimelineData.map((point, idx) => (
            <div key={idx} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{point.time}</div>
              <div className="text-lg font-bold mb-1">${point.price}</div>
              <div className="text-xs text-muted-foreground">{point.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Optimization Tips */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Optimization Tips</h2>
        <p className="text-muted-foreground mb-6">Personalized insights based on your auction history</p>
        <div className="grid md:grid-cols-2 gap-6">
          {optimizationTips.map((tip, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <tip.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-success">
                    <TrendingUp className="w-4 h-4" />
                    {tip.impact}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <Card className="p-8 bg-gradient-primary text-primary-foreground">
        <div className="text-center max-w-2xl mx-auto">
          <Zap className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">AI Performance This Month</h3>
          <p className="text-lg mb-6 opacity-90">
            Surge AI has increased your revenue by <span className="font-bold">$4,234 (37%)</span> compared to fixed pricing
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-1">94%</div>
              <div className="text-sm opacity-75">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">2.3x</div>
              <div className="text-sm opacity-75">Avg Price Multiplier</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">387</div>
              <div className="text-sm opacity-75">Optimized Bids</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}
