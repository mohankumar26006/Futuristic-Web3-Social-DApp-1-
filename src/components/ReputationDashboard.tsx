import { Award, TrendingUp, Users, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface ReputationDashboardProps {
  userReputation: number;
}

export function ReputationDashboard({ userReputation }: ReputationDashboardProps) {
  const nextMilestone = 1500;
  const progress = (userReputation / nextMilestone) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Award className="w-8 h-8 text-yellow-400" />
        <h1 className="text-3xl font-bold text-white">Reputation Dashboard</h1>
      </div>

      <Card className="bg-gradient-to-r from-purple-500/20 to-teal-500/20 border-purple-500/30 backdrop-blur-sm p-8 mb-6">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">
            {userReputation}
          </div>
          <p className="text-gray-300">Reputation Score</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress to next milestone</span>
            <span className="text-purple-300">{nextMilestone} points</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10 p-6 text-center">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">142</div>
          <div className="text-sm text-gray-400">Posts Created</div>
        </Card>
        
        <Card className="bg-white/5 border-white/10 p-6 text-center">
          <Users className="w-8 h-8 text-teal-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">856</div>
          <div className="text-sm text-gray-400">Followers</div>
        </Card>
        
        <Card className="bg-white/5 border-white/10 p-6 text-center">
          <TrendingUp className="w-8 h-8 text-pink-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">234.5</div>
          <div className="text-sm text-gray-400">HELA Earned</div>
        </Card>
      </div>
    </div>
  );
}
