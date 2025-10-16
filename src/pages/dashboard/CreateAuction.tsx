import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Upload, Eye, Code } from "lucide-react";
import { AuctionWidget } from "@/components/AuctionWidget";
import { toast } from "sonner";
import productCoaching from "@/assets/product-coaching.png";

export default function CreateAuction() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    reservePrice: "",
    buyNowPrice: "",
    duration: "24",
    autoExtend: true,
    minIncrement: "5",
    dynamicPricing: true,
    aggressiveness: 50,
  });

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [algorithmOpen, setAlgorithmOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Auction created successfully! 🎉");
  };

  const previewAuction = {
    id: "preview",
    title: formData.title || "Your Auction Title",
    description: formData.description || "Your auction description will appear here",
    image: productCoaching,
    startingBid: parseInt(formData.startingBid) || 0,
    currentBid: parseInt(formData.startingBid) || 0,
    timeRemaining: parseInt(formData.duration) * 3600 || 86400,
    bids: [],
    viewers: 0,
    aiSuggestedPrice: (parseInt(formData.startingBid) || 0) * 1.2,
    surgeMultiplier: 1.0,
  };

  const embedCode = `<script src="https://surge.ai/widget.js"></script>
<div data-surge-auction="${formData.title.toLowerCase().replace(/\s+/g, '-')}" 
     data-starting-bid="${formData.startingBid}"></div>`;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Auction</h1>
        <p className="text-muted-foreground">Set up your product auction in minutes</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Name *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 1-on-1 Coaching Session"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you're offering..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pricing */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Pricing</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startingBid">Starting Bid ($) *</Label>
                  <Input
                    id="startingBid"
                    type="number"
                    placeholder="100"
                    value={formData.startingBid}
                    onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reservePrice">Reserve Price ($)</Label>
                  <Input
                    id="reservePrice"
                    type="number"
                    placeholder="Optional"
                    value={formData.reservePrice}
                    onChange={(e) => setFormData({ ...formData, reservePrice: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="buyNowPrice">Buy Now Price ($)</Label>
                  <Input
                    id="buyNowPrice"
                    type="number"
                    placeholder="Optional"
                    value={formData.buyNowPrice}
                    onChange={(e) => setFormData({ ...formData, buyNowPrice: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            {/* Duration */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Duration</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="duration">Auction Duration</Label>
                  <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">1 day</SelectItem>
                      <SelectItem value="72">3 days</SelectItem>
                      <SelectItem value="168">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Advanced Settings */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <Card className="p-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h2 className="text-xl font-semibold">Advanced Settings</h2>
                  <ChevronDown className={`w-5 h-5 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Auto-Extend</Label>
                      <p className="text-sm text-muted-foreground">Add 2 minutes if bid in last 2 minutes</p>
                    </div>
                    <Switch
                      checked={formData.autoExtend}
                      onCheckedChange={(checked) => setFormData({ ...formData, autoExtend: checked })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="minIncrement">Minimum Bid Increment ($)</Label>
                    <Input
                      id="minIncrement"
                      type="number"
                      value={formData.minIncrement}
                      onChange={(e) => setFormData({ ...formData, minIncrement: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <label htmlFor="verified" className="text-sm">Restrict to verified users only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="buyNow" />
                      <label htmlFor="buyNow" className="text-sm">Enable "Buy Now" option</label>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Algorithm Settings */}
            <Collapsible open={algorithmOpen} onOpenChange={setAlgorithmOpen}>
              <Card className="p-6 border-primary/50">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Surge Algorithm Settings</h2>
                    <span className="text-xs bg-gradient-primary text-primary-foreground px-2 py-1 rounded">AI</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${algorithmOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Dynamic Pricing</Label>
                      <p className="text-sm text-muted-foreground">Let AI optimize pricing based on demand</p>
                    </div>
                    <Switch
                      checked={formData.dynamicPricing}
                      onCheckedChange={(checked) => setFormData({ ...formData, dynamicPricing: checked })}
                    />
                  </div>

                  {formData.dynamicPricing && (
                    <>
                      <div className="space-y-3">
                        <Label>Aggressiveness: {formData.aggressiveness < 33 ? "Conservative" : formData.aggressiveness < 66 ? "Moderate" : "Aggressive"}</Label>
                        <Slider
                          value={[formData.aggressiveness]}
                          onValueChange={(value) => setFormData({ ...formData, aggressiveness: value[0] })}
                          min={0}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>+10-30% from base</span>
                          <span>+20-50% from base</span>
                          <span>+40-100% from base</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Factors to Consider</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="time" defaultChecked />
                            <label htmlFor="time" className="text-sm">Time remaining</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="viewers" defaultChecked />
                            <label htmlFor="viewers" className="text-sm">Number of viewers</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="velocity" defaultChecked />
                            <label htmlFor="velocity" className="text-sm">Bid velocity</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="historical" defaultChecked />
                            <label htmlFor="historical" className="text-sm">Historical data</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="dayOfWeek" />
                            <label htmlFor="dayOfWeek" className="text-sm">Day of week</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="timeOfDay" />
                            <label htmlFor="timeOfDay" className="text-sm">Time of day</label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" className="bg-gradient-primary flex-1">
                Create Auction
              </Button>
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
            </div>
          </div>

          {/* Preview - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Live Preview
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreviewOpen(!previewOpen)}
                  >
                    {previewOpen ? "Hide" : "Show"}
                  </Button>
                </div>
                {previewOpen && (
                  <div className="scale-90 origin-top">
                    <AuctionWidget auctionData={previewAuction} />
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Embed Code
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-xs overflow-x-auto">
                    <code>{embedCode}</code>
                  </pre>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Copy Code
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
