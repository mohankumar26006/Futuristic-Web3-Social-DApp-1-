import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Heart, 
  MessageCircle, 
  DollarSign, 
  Zap,
  ExternalLink,
  TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";

interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'tip' | 'post';
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  target?: {
    name: string;
    username: string;
  };
  amount?: number;
  token?: string;
  timestamp: string;
  txHash: string;
}

export function ActivityTicker() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'tip',
      user: {
        name: 'Alice Chen',
        username: 'alice_crypto',
        avatar: 'https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      target: {
        name: 'Bob Smith',
        username: 'bob_dev'
      },
      amount: 5,
      token: 'HELA',
      timestamp: '2m ago',
      txHash: '0xabc123...def456'
    },
    {
      id: '2',
      type: 'like',
      user: {
        name: 'Carol Davis',
        username: 'carol_design',
        avatar: 'https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      target: {
        name: 'Eve Wilson',
        username: 'eve_writer'
      },
      timestamp: '5m ago',
      txHash: '0x789abc...123def'
    },
    {
      id: '3',
      type: 'post',
      user: {
        name: 'David Kim',
        username: 'david_tech',
        avatar: 'https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      timestamp: '8m ago',
      txHash: '0x456def...789abc'
    },
    {
      id: '4',
      type: 'comment',
      user: {
        name: 'Frank Jones',
        username: 'frank_crypto',
        avatar: 'https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      target: {
        name: 'Grace Lee',
        username: 'grace_ai'
      },
      timestamp: '12m ago',
      txHash: '0x321fed...654cba'
    }
  ]);

  // Simulate new activities
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ['like', 'tip', 'comment', 'post'][Math.floor(Math.random() * 4)] as any,
        user: {
          name: ['Alex', 'Sam', 'Jordan', 'Taylor'][Math.floor(Math.random() * 4)] + ' ' + ['Smith', 'Davis', 'Wilson', 'Brown'][Math.floor(Math.random() * 4)],
          username: 'user_' + Math.random().toString(36).substr(2, 6),
          avatar: 'https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        },
        target: Math.random() > 0.3 ? {
          name: ['Chris', 'Morgan', 'Riley', 'Casey'][Math.floor(Math.random() * 4)] + ' ' + ['Johnson', 'Williams', 'Miller', 'Garcia'][Math.floor(Math.random() * 4)],
          username: 'target_' + Math.random().toString(36).substr(2, 6)
        } : undefined,
        amount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 1 : undefined,
        token: 'HELA',
        timestamp: 'now',
        txHash: `0x${Math.random().toString(16).substr(2, 6)}...${Math.random().toString(16).substr(2, 6)}`
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-400" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'tip':
        return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'post':
        return <Zap className="w-4 h-4 text-purple-400" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'like':
        return (
          <span>
            <span className="font-medium">{activity.user.name}</span>
            {' liked '}
            {activity.target && <span className="font-medium">{activity.target.name}</span>}
            {"'s post"}
          </span>
        );
      case 'comment':
        return (
          <span>
            <span className="font-medium">{activity.user.name}</span>
            {' commented on '}
            {activity.target && <span className="font-medium">{activity.target.name}</span>}
            {"'s post"}
          </span>
        );
      case 'tip':
        return (
          <span>
            <span className="font-medium">{activity.user.name}</span>
            {' tipped '}
            <Badge variant="outline" className="text-green-400 border-green-400 mx-1">
              {activity.amount} {activity.token}
            </Badge>
            {' to '}
            {activity.target && <span className="font-medium">{activity.target.name}</span>}
          </span>
        );
      case 'post':
        return (
          <span>
            <span className="font-medium">{activity.user.name}</span>
            {' published a new post'}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span>Live Activity</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-1 p-4 pt-0">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <Avatar className="w-8 h-8 ring-1 ring-white/20">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white text-xs">
                    {activity.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start space-x-2">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <div className="text-sm text-foreground leading-relaxed">
                        {getActivityText(activity)}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                        <button 
                          className="text-xs text-purple-400 hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center"
                          onClick={() => window.open(`https://helascan.com/tx/${activity.txHash}`, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          tx
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}