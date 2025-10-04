import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Edit3, 
  ExternalLink, 
  Trophy,
  Heart,
  MessageCircle,
  Coins,
  Users,
  CheckCircle,
  Star,
  Package
} from "lucide-react";
import { sampleUsers, samplePosts } from "../utils/sampleData";

interface ProfilePageProps {
  userProfile: any;
  isOwnProfile?: boolean;
  userReputation: number;
}

export function ProfilePage({ userProfile, isOwnProfile = true, userReputation }: ProfilePageProps) {
  // Use FT's data
  const profileData = sampleUsers.ft;
  const userPosts = samplePosts.filter(p => p.author.id === profileData.id);

  // recent stuff user did
  const recentActivity = [
    {
      type: "post",
      content: "Launching HeLa Social Alpha!",
      time: "2h ago",
      txHash: "0x7a2b4c5d8e9f1a3b6c7d9e2f4a5b8c1d3e6f9a2b"
    },
    {
      type: "like",
      target: "@devuser",
      content: "NFT post",
      time: "4h ago",
      txHash: "0x8b3c5d6e9f2a4b7c8d1e3f5a6b9c2d4e7f1a3b5c"
    },
    {
      type: "tip",
      amount: 5,
      target: "@cryptoqueen",
      time: "6h ago",
      txHash: "0x9c4d6e7f1a3b5c8d2e4f6a7b1c3d5e8f2a4b6c9d"
    },
    {
      type: "quest",
      content: "Post your first NFT",
      time: "8h ago",
      txHash: "0xa1d5e7f2a4b6c9d3e5f7a8b2c4d6e9f3a5b7c1d4"
    },
    {
      type: "collect",
      target: "@nftqueen",
      time: "10h ago",
      txHash: "0xb2e6f8a3b5c7d1e4f6a9b3c5d7e1f4a6b8c2d5e7"
    },
    {
      type: "dao",
      content: "voted on dao proposal",
      time: "12h ago",
      txHash: "0xc3f7a9b4c6d8e2f5a7b1c4d6e8f2a5b7c9d3e6f8"
    }
  ];

  const fanBadges = [
    { name: "Early Supporter", icon: "🌟", rarity: "Rare" },
    { name: "Top Supporter", icon: "👑", rarity: "Legendary" },
    { name: "100+ Tips Received", icon: "💎", rarity: "Epic" },
    { name: "Top Collector", icon: "🎨", rarity: "Rare" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'like': return <Heart className="w-4 h-4 text-red-400" />;
      case 'tip': return <Coins className="w-4 h-4 text-yellow-400" />;
      case 'quest': return <Trophy className="w-4 h-4 text-purple-400" />;
      case 'collect': return <Package className="w-4 h-4 text-teal-400" />;
      case 'dao': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  const getBadgeColor = (badge: string) => {
    if (badge === 'Gold') return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30';
    if (badge === 'Silver') return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
    return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600"></div>

        <div className="px-6 pb-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-32 h-32 rounded-full border-4 border-background bg-background"
              />
              
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl">{profileData.name}</h1>
                  {profileData.isVerified && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                  <Badge className={getBadgeColor(profileData.badge)}>
                    {profileData.badge} Badge
                  </Badge>
                </div>
                <p className="text-muted-foreground">@{profileData.username}</p>
                <code className="text-sm text-purple-400">{profileData.walletAddress}</code>
              </div>
            </div>

            {isOwnProfile ? (
              <Button variant="outline" className="border-white/10">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90">
                  Follow
                </Button>
                <Button variant="outline" className="border-white/10">
                  Message
                </Button>
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="mb-4">{profileData.bio}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-2xl font-medium">18</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-medium">65</p>
              <p className="text-sm text-muted-foreground">Likes</p>
            </div>
            <div>
              <p className="text-2xl font-medium text-yellow-400">25 HELA</p>
              <p className="text-sm text-muted-foreground">Tips Earned</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{userReputation}/100</p>
              <p className="text-sm text-muted-foreground">Reputation</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{profileData.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="badges">Fan Badges</TabsTrigger>
        </TabsList>

        {/* Recent Activity */}
        <TabsContent value="activity" className="space-y-3 mt-4">
          {recentActivity.map((activity, index) => (
            <Card key={index} className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  {activity.type === 'post' && (
                    <p className="text-sm">
                      Post: <span className="font-medium">"{activity.content}"</span>
                    </p>
                  )}
                  {activity.type === 'like' && (
                    <p className="text-sm">
                      Liked <span className="font-medium">{activity.target}</span> {activity.content}
                    </p>
                  )}
                  {activity.type === 'tip' && (
                    <p className="text-sm">
                      Tipped <span className="text-yellow-400">{activity.amount} HELA</span> →{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                  )}
                  {activity.type === 'quest' && (
                    <p className="text-sm">
                      Completed Quest: <span className="font-medium text-purple-400">"{activity.content}"</span>
                    </p>
                  )}
                  {activity.type === 'collect' && (
                    <p className="text-sm">
                      Collected NFT post: <span className="font-medium">{activity.target}</span>
                    </p>
                  )}
                  {activity.type === 'dao' && (
                    <p className="text-sm">
                      <span className="font-medium">{activity.content}</span>
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <a
                      href={`https://explorer.hela.network/tx/${activity.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <code>{activity.txHash.slice(0, 10)}...{activity.txHash.slice(-6)}</code>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Posts */}
        <TabsContent value="posts" className="space-y-3 mt-4">
          {userPosts.map((post) => (
            <Card key={post.id} className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="space-y-3">
                {post.image && (
                  <img src={post.image} alt="" className="w-full rounded-lg" />
                )}
                <p>{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Coins className="w-4 h-4" />
                    <span>{post.tipAmount} HELA</span>
                  </div>
                  {post.isNFT && (
                    <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                      NFT
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Fan Badges */}
        <TabsContent value="badges" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fanBadges.map((badge, index) => (
              <Card key={index} className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 flex items-center justify-center text-2xl">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{badge.name}</h3>
                    <Badge 
                      className={
                        badge.rarity === 'Legendary' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' :
                        badge.rarity === 'Epic' ? 'bg-purple-600/20 text-purple-400 border-purple-600/30' :
                        'bg-blue-600/20 text-blue-400 border-blue-600/30'
                      }
                    >
                      {badge.rarity}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
