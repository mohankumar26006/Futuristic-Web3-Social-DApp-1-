import { Wallet, DollarSign, TrendingUp, Download } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function CreatorMonetizationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Creator Monetization</h1>
      
      <Card className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-500/30 p-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 mb-2">Total Earnings</p>
            <p className="text-4xl font-bold text-white mb-1">234.5 HELA</p>
            <p className="text-sm text-gray-400">≈ $1,172.50 USD</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10 p-6 text-center">
          <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">156.2</div>
          <div className="text-sm text-gray-400">Tips Received</div>
        </Card>
        
        <Card className="bg-white/5 border-white/10 p-6 text-center">
          <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">78.3</div>
          <div className="text-sm text-gray-400">NFT Sales</div>
        </Card>
        
        <Card className="bg-white/5 border-white/10 p-6 text-center">
          <Wallet className="w-8 h-8 text-teal-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">42</div>
          <div className="text-sm text-gray-400">Pending Payouts</div>
        </Card>
      </div>
    </div>
  );
}
