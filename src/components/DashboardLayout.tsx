import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  BarChart3, 
  Brain,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: ShoppingBag, label: "My Auctions", path: "/dashboard/auctions" },
  { icon: PlusCircle, label: "Create Auction", path: "/dashboard/create" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Brain, label: "Algorithm Insights", path: "/dashboard/algorithm" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-sidebar border-r">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Surge.ai
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-sidebar-accent text-sidebar-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3"
          onClick={() => navigate("/")}
        >
          <LogOut className="w-5 h-5" />
          <span>Back to Home</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Surge.ai
            </h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
