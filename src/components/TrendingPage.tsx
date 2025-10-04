import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PostCard } from "./PostCard";
import { 
  TrendingUp, 
  Flame, 
  Sparkles,
  Clock,
  Heart,
  MessageCircle,
  DollarSign
} from "lucide-react";
import { explorePosts, trendingHashtags } from "../utils/sampleData";

interface TrendingPageProps {
  onTip: (user: any) => void;
  onComment: (post: any) => void;
}

export function TrendingPage({ onTip, onComment }: TrendingPageProps) {
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">("today");

  // get trending posts (highest engagement)
  const trendingPosts = [...explorePosts]
    .sort((a, b) => {
      const engagementA = a.likes + (a.comments * 2) + (a.tips * 5);
      const engagementB = b.likes + (b.comments * 2) + (b.tips * 5);
      return engagementB - engagementA;
    })
    .slice(0, 20); // top 20

  // convert to post format for PostCard
  const formattedPosts = trendingPosts.map(post => ({
    ...post,
    isLiked: false,
    isTipped: false,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
    isConfirmed: true
  }));

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-7 h-7 text-orange-500" />
          <h1 className="text-2xl text-gray-900">Trending Now</h1>
        </div>
        <p className="text-gray-600">Discover what's hot in the HeLa community</p>
      </div>

      {/* time filters */}
      <div className="flex items-center gap-2">
        <Button
          variant={timeFilter === "today" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeFilter("today")}
        >
          <Clock className="w-4 h-4 mr-1" />
          Today
        </Button>
        <Button
          variant={timeFilter === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeFilter("week")}
        >
          This Week
        </Button>
        <Button
          variant={timeFilter === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeFilter("month")}
        >
          This Month
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* main content */}
        <div className="lg:col-span-8 space-y-4">
          {/* trending stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-xs text-gray-600">Total Likes</span>
              </div>
              <div className="text-2xl text-gray-900">
                {formattedPosts.reduce((sum, p) => sum + p.likes, 0).toLocaleString()}
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600">Comments</span>
              </div>
              <div className="text-2xl text-gray-900">
                {formattedPosts.reduce((sum, p) => sum + p.comments, 0).toLocaleString()}
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-600">Tips</span>
              </div>
              <div className="text-2xl text-gray-900">
                {formattedPosts.reduce((sum, p) => sum + p.tips, 0).toLocaleString()}
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-gray-600">Trending</span>
              </div>
              <div className="text-2xl text-gray-900">
                {formattedPosts.length}
              </div>
            </Card>
          </div>

          {/* trending posts */}
          <div className="space-y-4">
            {formattedPosts.map((post, index) => (
              <div key={post.id} className="relative">
                {/* trending rank */}
                <div className="absolute -left-2 top-4 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                    'bg-gradient-to-br from-blue-400 to-purple-500'
                  }`}>
                    <span className="text-white text-sm">{index + 1}</span>
                  </div>
                </div>
                <PostCard
                  post={post}
                  onLike={() => {}}
                  onComment={() => onComment(post)}
                  onTip={() => onTip(post.author)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* trending hashtags */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h3 className="text-gray-900">Trending Hashtags</h3>
            </div>
            <div className="space-y-3">
              {trendingHashtags.map((hashtag, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-500">#{i + 1}</span>
                      <span className="text-gray-900">#{hashtag.tag}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {hashtag.posts.toLocaleString()} posts
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">{hashtag.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* top creators */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="text-gray-900">Hot Creators</h3>
            </div>
            <div className="space-y-3">
              {Array.from(new Set(formattedPosts.slice(0, 5).map(p => p.author))).map((author, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 truncate">{author.name}</div>
                    <div className="text-xs text-gray-500">@{author.username}</div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    <Flame className="w-3 h-3" />
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* categories performance */}
          <Card className="p-4">
            <h3 className="text-gray-900 mb-4">Top Categories</h3>
            <div className="space-y-3">
              {[
                { name: "HealthTech", engagement: 95, color: "bg-red-500" },
                { name: "EdTech", engagement: 88, color: "bg-blue-500" },
                { name: "FinTech", engagement: 82, color: "bg-green-500" },
                { name: "ClimateT ech", engagement: 76, color: "bg-emerald-500" },
                { name: "NFT Art", engagement: 92, color: "bg-purple-500" },
              ].map((category, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.engagement}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${category.color}`}
                      style={{ width: `${category.engagement}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
