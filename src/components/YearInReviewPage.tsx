import { Sparkles, Trophy, Heart, DollarSign } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function YearInReviewPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">Your 2025 Journey</h1>
        <p className="text-gray-400">A look back at your amazing year on HeLa Social</p>
      </div>

      <div className="space-y-4 mb-6">
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 p-8 text-center">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <div className="text-5xl font-bold text-white mb-2">1,234</div>
          <div className="text-gray-300">Posts Created</div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/5 border-white/10 p-6 text-center">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">45.2K</div>
            <div className="text-sm text-gray-400">Likes Received</div>
          </Card>
          
          <Card className="bg-white/5 border-white/10 p-6 text-center">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">234.5</div>
            <div className="text-sm text-gray-400">HELA Earned</div>
          </Card>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
        <Sparkles className="w-4 h-4 mr-2" />
        Mint as NFT
      </Button>
    </div>
  );
}
