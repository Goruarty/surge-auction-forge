import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CreditCard, Bell, Palette, Code, Users, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="widget">Widget</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Account Details</h2>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Sarah" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Chen" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="sarah@example.com" />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Chen Consulting" />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="pst">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="bg-gradient-primary">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Billing & Subscription</h2>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">Growth Plan</h3>
                    <p className="text-muted-foreground text-sm">Unlimited auctions + 2% transaction fee</p>
                  </div>
                  <div className="text-2xl font-bold">$99<span className="text-sm text-muted-foreground">/mo</span></div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Change Plan</Button>
                  <Button variant="outline" size="sm" className="text-destructive">Cancel Subscription</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-primary rounded flex items-center justify-center text-primary-foreground text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="font-medium">•••• 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/25</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Update</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Billing History</h3>
                <div className="space-y-2">
                  {[
                    { date: "Feb 1, 2025", amount: "$99.00", status: "Paid" },
                    { date: "Jan 1, 2025", amount: "$99.00", status: "Paid" },
                    { date: "Dec 1, 2024", amount: "$99.00", status: "Paid" },
                  ].map((invoice, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{invoice.date}</div>
                        <div className="text-sm text-muted-foreground">{invoice.status}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{invoice.amount}</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">New Bid Notifications</div>
                  <div className="text-sm text-muted-foreground">Get notified when someone bids on your auctions</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auction Ending Soon</div>
                  <div className="text-sm text-muted-foreground">Alert when auction is ending in 1 hour</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Daily Summary</div>
                  <div className="text-sm text-muted-foreground">Daily report of auction activity</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Analytics</div>
                  <div className="text-sm text-muted-foreground">Weekly performance report</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Marketing Updates</div>
                  <div className="text-sm text-muted-foreground">Product updates and tips</div>
                </div>
                <Switch />
              </div>
              <Button onClick={handleSave} className="bg-gradient-primary">Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Widget Customization */}
        <TabsContent value="widget" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Widget Customization</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input id="primaryColor" type="color" defaultValue="#4F46E5" className="w-20" />
                  <Input defaultValue="#4F46E5" className="flex-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="font">Font Family</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Widget Layout</Label>
                <Select defaultValue="card">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card (Default)</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="wide">Wide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show Bid History</div>
                  <div className="text-sm text-muted-foreground">Display recent bids in widget</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show Viewer Count</div>
                  <div className="text-sm text-muted-foreground">Display number of active viewers</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSave} className="bg-gradient-primary">Save Customization</Button>
            </div>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">API Keys</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Production API Key</Label>
                <div className="flex gap-2">
                  <Input value="sk_live_••••••••••••••••" readOnly className="flex-1 font-mono" />
                  <Button variant="outline">Reveal</Button>
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
              <div>
                <Label>Test API Key</Label>
                <div className="flex gap-2">
                  <Input value="sk_test_••••••••••••••••" readOnly className="flex-1 font-mono" />
                  <Button variant="outline">Reveal</Button>
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
              <Button variant="outline" className="text-destructive">Regenerate Keys</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Webhooks</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input id="webhookUrl" placeholder="https://your-site.com/webhook" />
              </div>
              <div className="space-y-2">
                <Label>Events</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="bidPlaced" defaultChecked />
                    <label htmlFor="bidPlaced" className="text-sm">auction.bid.placed</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auctionEnded" defaultChecked />
                    <label htmlFor="auctionEnded" className="text-sm">auction.ended</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auctionCreated" />
                    <label htmlFor="auctionCreated" className="text-sm">auction.created</label>
                  </div>
                </div>
              </div>
              <Button onClick={handleSave}>Save Webhook</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Team Members</h2>
              </div>
              <Button className="bg-gradient-primary">Invite Member</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Sarah Chen", email: "sarah@example.com", role: "Owner" },
                { name: "Alex Morgan", email: "alex@example.com", role: "Admin" },
                { name: "Jordan Smith", email: "jordan@example.com", role: "Member" },
              ].map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select defaultValue={member.role.toLowerCase()}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    {member.role !== "Owner" && (
                      <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3 text-destructive">Danger Zone</h3>
                <div className="p-4 border border-destructive/50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">Delete Account</div>
                      <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
                    </div>
                    <Button variant="destructive" size="sm">Delete Account</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
