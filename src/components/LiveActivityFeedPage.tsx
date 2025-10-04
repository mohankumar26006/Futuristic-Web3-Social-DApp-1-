import { Heart, MessageSquare, Coins, Trophy, Package, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { liveActivities, sampleUsers } from "../utils/sampleData";
import { useState, useEffect } from "react";

export function LiveActivityFeedPage() {
  const [activities, setActivities] = useState(liveActivities);
  
  // Simulate real-time activity
  useEffect(() => {
    const interval = setInterval(() => {
      const activityTypes = ['like', 'tip', 'comment', 'quest', 'collect'];
      const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const users = Object.values(sampleUsers);
      const user = users[Math.floor(Math.random() * users.length)];
      const target = users[Math.floor(Math.random() * users.length)];
      
      const newActivity = {
        id: `act${Date.now()}`,
        type,
        user,
        target,
        amount: Math.floor(Math.random() * 10) + 1,
        token: "HELA",
        timestamp: "just now",
        transactionHash: `0x${Math.random().toString(16).substr(2, 6)}...${Math.random().toString(16).substr(2, 3)}`,
        quest: type === 'quest' ? 'Complete daily challenge' : undefined
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 49)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-400" />;
      case 'tip': return <Coins className="w-4 h-4 text-yellow-400" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'quest': return <Trophy className="w-4 h-4 text-purple-400" />;
      case 'collect': return <Package className="w-4 h-4 text-teal-400" />;
      default: return null;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'like':
        return (
          <>
            <span className="font-medium">{activity.user.name}</span> liked{' '}
            <span className="font-medium">{activity.target.name}</span>'s post
          </>
        );
      case 'tip':
        return (
          <>
            <span className="font-medium">{activity.user.name}</span> tipped{' '}
            <span className="text-yellow-400">{activity.amount} {activity.token}</span> →{' '}
            <span className="font-medium">{activity.target.name}</span>
          </>
        );
      case 'comment':
        return (
          <>
            <span className="font-medium">{activity.user.name}</span> commented on{' '}
            <span className="font-medium">{activity.target.name}</span>'s post
          </>
        );
      case 'quest':
        return (
          <>
            <span className="font-medium">{activity.user.name}</span> completed quest{' '}
            <span className="text-purple-400">"{activity.quest}"</span>
          </>
        );
      case 'collect':
        return (
          <>
            <span className="font-medium">{activity.user.name}</span> collected{' '}
            <span className="font-medium">{activity.target.name}</span>'s NFT post
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Live Activity Feed</h1>
        <p className="text-muted-foreground mt-1">
          Real-time on-chain activities across HeLa Social
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="text-center">
            <div className="text-2xl font-medium text-red-400">
              {activities.filter(a => a.type === 'like').length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Likes</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="text-center">
            <div className="text-2xl font-medium text-yellow-400">
              {activities.filter(a => a.type === 'tip').length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Tips</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="text-center">
            <div className="text-2xl font-medium text-blue-400">
              {activities.filter(a => a.type === 'comment').length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Comments</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="text-center">
            <div className="text-2xl font-medium text-teal-400">
              {activities.filter(a => a.type === 'collect').length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">NFT Collections</p>
          </div>
        </Card>
      </div>

      {/* Live Feed */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h2 className="text-lg">Live Updates</h2>
          <Badge className="ml-auto bg-green-600/20 text-green-400 border-green-600/30">
            Real-time
          </Badge>
        </div>
        
        <ScrollArea className="h-[600px]">
          <div className="divide-y divide-white/5">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      {getActivityText(activity)}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                      
                      <a
                        href={`https://explorer.hela.network/tx/${activity.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        {activity.transactionHash}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
