import { TrendingUp, Eye, MousePointerClick, DollarSign } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function AdMarketplacePage() {
  const adSlots = [
    {
      id: "1",
      position: "Home Feed - Top",
      impressions: 125000,
      clicks: 3200,
      ctr: "2.56%",
      price: "150 HELA/day",
      status: "available"
    },
    {
      id: "2",
      position: "Explore Page - Banner",
      impressions: 98000,
      clicks: 2100,
      ctr: "2.14%",
      price: "120 HELA/day",
      status: "booked"
    },
    {
      id: "3",
      position: "Profile - Sidebar",
      impressions: 56000,
      clicks: 1400,
      ctr: "2.50%",
      price: "80 HELA/day",
      status: "available"
    },
    {
      id: "4",
      position: "NFT Gallery - Top",
      impressions: 45000,
      clicks: 1200,
      ctr: "2.67%",
      price: "100 HELA/day",
      status: "available"
    }
  ];

  const activeAds = [
    {
      id: "ad1",
      brand: "CryptoWallet Pro",
      creative: "Secure your assets with CryptoWallet Pro",
      impressions: 45231,
      clicks: 1156,
      spent: "340 HELA",
      revenue: "85 HELA"
    },
    {
      id: "ad2",
      brand: "NFT Marketplace",
      creative: "Discover rare NFTs on the leading marketplace",
      impressions: 32145,
      clicks: 892,
      spent: "280 HELA",
      revenue: "70 HELA"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Ad Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Transparent advertising with creator revenue sharing
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90">
          <DollarSign className="w-4 h-4 mr-2" />
          List Ad Space
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl mt-1">155 HELA</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Impressions</p>
              <p className="text-2xl mt-1">77.4K</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-600/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-teal-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Clicks</p>
              <p className="text-2xl mt-1">2.0K</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg CTR</p>
              <p className="text-2xl mt-1">2.47%</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Available Ad Slots */}
      <div>
        <h2 className="text-xl mb-4">Available Ad Slots</h2>
        <div className="space-y-3">
          {adSlots.map((slot) => (
            <Card 
              key={slot.id}
              className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{slot.position}</h3>
                    <Badge 
                      variant={slot.status === "available" ? "default" : "secondary"}
                      className={slot.status === "available" 
                        ? "bg-green-600/20 text-green-400 border-green-600/30" 
                        : "bg-gray-600/20 text-gray-400"
                      }
                    >
                      {slot.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{(slot.impressions / 1000).toFixed(0)}K impressions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MousePointerClick className="w-4 h-4" />
                      <span>{slot.clicks} clicks</span>
                    </div>
                    <div>
                      <span>CTR: {slot.ctr}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-lg font-medium text-purple-400">{slot.price}</p>
                  </div>
                  {slot.status === "available" && (
                    <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90">
                      Book Slot
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      <div>
        <h2 className="text-xl mb-4">Active Campaigns</h2>
        <div className="space-y-3">
          {activeAds.map((ad) => (
            <Card 
              key={ad.id}
              className="p-4 bg-white/5 backdrop-blur-sm border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <h3 className="font-medium">{ad.brand}</h3>
                  <p className="text-sm text-muted-foreground">{ad.creative}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div>
                      <Eye className="w-4 h-4 inline mr-1" />
                      {(ad.impressions / 1000).toFixed(1)}K
                    </div>
                    <div>
                      <MousePointerClick className="w-4 h-4 inline mr-1" />
                      {ad.clicks}
                    </div>
                    <div>
                      Spent: {ad.spent}
                    </div>
                    <div className="text-green-400">
                      Your Revenue: {ad.revenue}
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="border-white/10">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
