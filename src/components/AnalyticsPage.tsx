import { BarChart3, TrendingUp, Users, Heart } from "lucide-react";
import { Card } from "./ui/card";

export function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">1,234</div>
          <div className="text-sm text-gray-400">Total Posts</div>
        </Card>
        
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">45.2K</div>
          <div className="text-sm text-gray-400">Total Likes</div>
        </Card>
        
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-teal-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">12.4K</div>
          <div className="text-sm text-gray-400">Followers</div>
        </Card>
        
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">456</div>
          <div className="text-sm text-gray-400">Avg. Engagement</div>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10 p-12 text-center">
        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">Detailed analytics charts coming soon...</p>
      </Card>
    </div>
  );
}
