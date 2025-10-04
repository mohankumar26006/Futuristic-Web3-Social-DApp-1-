import { Trophy, TrendingUp, Coins, Star, Crown, Medal } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { topCreators, topTippers } from "../utils/sampleData";

export function LeaderboardPage() {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold': return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30';
      case 'Silver': return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 'Bronze': return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
      default: return 'bg-purple-600/20 text-purple-400 border-purple-600/30';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Medal className="w-5 h-5 text-orange-400" />;
      default: return <span className="text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 flex items-center justify-center mx-auto">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-3xl">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top creators and supporters on HeLa Social
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="creators" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
          <TabsTrigger value="creators">Top Creators</TabsTrigger>
          <TabsTrigger value="tippers">Top Tippers</TabsTrigger>
        </TabsList>

        {/* Top Creators */}
        <TabsContent value="creators" className="space-y-3 mt-6">
          {topCreators.map((creator) => (
            <Card 
              key={creator.rank}
              className={`p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all ${
                creator.rank <= 3 ? 'border-2 border-purple-500/30' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-12 flex items-center justify-center">
                  {getRankIcon(creator.rank)}
                </div>

                {/* Avatar */}
                <img
                  src={creator.user.avatar}
                  alt={creator.user.name}
                  className={`w-12 h-12 rounded-full ${
                    creator.user.isNFT ? 'ring-2 ring-purple-500' : ''
                  }`}
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{creator.user.name}</span>
                    {creator.user.isVerified && (
                      <span className="text-blue-400">✓</span>
                    )}
                    <Badge className={getBadgeColor(creator.badge)}>
                      {creator.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    @{creator.user.username}
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{creator.posts}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-yellow-400">{creator.tipsReceived} HELA</p>
                    <p className="text-xs text-muted-foreground">Tips Received</p>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="md:hidden text-right">
                  <p className="text-sm font-medium text-yellow-400">{creator.tipsReceived} HELA</p>
                  <p className="text-xs text-muted-foreground">{creator.posts} posts</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Top Tippers */}
        <TabsContent value="tippers" className="space-y-3 mt-6">
          {topTippers.map((tipper, index) => (
            <Card 
              key={index}
              className={`p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all ${
                index < 3 ? 'border-2 border-purple-500/30' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-12 flex items-center justify-center">
                  {getRankIcon(index + 1)}
                </div>

                {/* Avatar */}
                <img
                  src={tipper.user.avatar}
                  alt={tipper.user.name}
                  className={`w-12 h-12 rounded-full ${
                    tipper.user.isNFT ? 'ring-2 ring-purple-500' : ''
                  }`}
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{tipper.user.name}</span>
                    {tipper.user.isVerified && (
                      <span className="text-blue-400">✓</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    @{tipper.user.username}
                  </p>
                </div>

                {/* Tips Given */}
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium text-yellow-400">{tipper.tipsGiven} HELA</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Tips Given</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Your Position */}
      <Card className="p-4 bg-gradient-to-r from-purple-600/20 to-teal-600/20 backdrop-blur-sm border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your Position</p>
            <p className="text-xl font-medium mt-1">Rank #12</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tips Received</p>
            <p className="text-xl font-medium text-yellow-400 mt-1">25 HELA</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
