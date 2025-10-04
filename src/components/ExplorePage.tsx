import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Search, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  DollarSign,
  Filter,
  Grid3x3,
  List,
  Sparkles,
  Award
} from "lucide-react";
import { explorePosts, trendingHashtags } from "../utils/sampleData";

interface ExplorePageProps {
  onTip: (user: any) => void;
  onComment: (post: any) => void;
}

export function ExplorePage({ onTip, onComment }: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // filter posts based on active filter
  const filteredPosts = explorePosts.filter(post => {
    // search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.hashtags?.some(tag => tag.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // category filter
    if (activeFilter === "all") return true;
    if (activeFilter === "nft") return post.isNFT;
    if (activeFilter === "trending") return post.likes > 4000;
    if (activeFilter === "most-liked") return post.likes > 3000;
    if (activeFilter === "most-tipped") return post.tips > 200;
    if (activeFilter === "videos") return post.image && Math.random() > 0.7; // fake video detection
    
    return post.category === activeFilter;
  });

  // sort based on filter
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeFilter === "most-liked") return b.likes - a.likes;
    if (activeFilter === "most-tipped") return b.tipAmount - a.tipAmount;
    if (activeFilter === "trending") return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Explore</h1>
          <p className="text-gray-600">Discover amazing content from the HeLa community</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search posts, users, hashtags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className="whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4 mr-1" />
          All Posts
        </Button>
        <Button
          variant={activeFilter === "trending" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("trending")}
          className="whitespace-nowrap"
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          Trending
        </Button>
        <Button
          variant={activeFilter === "nft" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("nft")}
          className="whitespace-nowrap"
        >
          <Award className="w-4 h-4 mr-1" />
          NFT Posts
        </Button>
        <Button
          variant={activeFilter === "most-liked" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("most-liked")}
          className="whitespace-nowrap"
        >
          <Heart className="w-4 h-4 mr-1" />
          Most Liked
        </Button>
        <Button
          variant={activeFilter === "most-tipped" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("most-tipped")}
          className="whitespace-nowrap"
        >
          <DollarSign className="w-4 h-4 mr-1" />
          Most Tipped
        </Button>
        <Button
          variant={activeFilter === "healthtech" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("healthtech")}
          className="whitespace-nowrap"
        >
          HealthTech
        </Button>
        <Button
          variant={activeFilter === "edtech" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("edtech")}
          className="whitespace-nowrap"
        >
          EdTech
        </Button>
        <Button
          variant={activeFilter === "fintech" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("fintech")}
          className="whitespace-nowrap"
        >
          FinTech
        </Button>
        <Button
          variant={activeFilter === "climatetech" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("climatetech")}
          className="whitespace-nowrap"
        >
          Climate
        </Button>
        <Button
          variant={activeFilter === "art" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("art")}
          className="whitespace-nowrap"
        >
          Art
        </Button>
        <Button
          variant={activeFilter === "gaming" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("gaming")}
          className="whitespace-nowrap"
        >
          Gaming
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* main content */}
        <div className="lg:col-span-9">
          {/* stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-2xl text-gray-900">{sortedPosts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl text-gray-900">
                {sortedPosts.filter(p => p.isNFT).length}
              </div>
              <div className="text-sm text-gray-600">NFT Posts</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl text-gray-900">
                {sortedPosts.reduce((sum, p) => sum + p.likes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl text-green-600">
                {sortedPosts.reduce((sum, p) => sum + p.tipAmount, 0).toFixed(0)} HELA
              </div>
              <div className="text-sm text-gray-600">Total Tips</div>
            </Card>
          </div>

          {/* posts grid or list */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all"
                  onClick={() => {}}
                >
                  {/* image */}
                  {post.image && (
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={post.image}
                        alt="Post"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* overlay on hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2 text-white">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <DollarSign className="w-5 h-5" />
                          <span>{post.tips}</span>
                        </div>
                      </div>

                      {/* nft badge */}
                      {post.isNFT && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            NFT
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  {/* content preview */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 truncate">
                          {post.author.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          @{post.author.username}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.timestamp}</span>
                      {post.tipAmount > 0 && (
                        <span className="text-green-600">
                          ₹{(post.tipAmount * 85).toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            // list view
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <Card key={post.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    {post.image && (
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback
                          src={post.image}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                        <div>
                          <div className="text-gray-900">{post.author.name}</div>
                          <div className="text-sm text-gray-500">@{post.author.username} · {post.timestamp}</div>
                        </div>
                        {post.isNFT && (
                          <Badge className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            NFT
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-900 mb-3 line-clamp-3">{post.content}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">{post.tips} tips (₹{(post.tipAmount * 85).toFixed(0)})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>

        {/* sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {/* trending hashtags */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h3 className="text-gray-900">Trending Hashtags</h3>
            </div>
            <div className="space-y-3">
              {trendingHashtags.map((hashtag, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => setSearchQuery(hashtag.tag)}
                >
                  <div>
                    <div className="text-gray-900">#{hashtag.tag}</div>
                    <div className="text-xs text-gray-500">{hashtag.posts.toLocaleString()} posts</div>
                  </div>
                  <div className="text-xs text-green-600">{hashtag.growth}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* categories */}
          <Card className="p-4">
            <h3 className="text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {[
                { name: "HealthTech", count: 12, color: "bg-red-100 text-red-700" },
                { name: "EdTech", count: 8, color: "bg-blue-100 text-blue-700" },
                { name: "FinTech", count: 10, color: "bg-green-100 text-green-700" },
                { name: "ClimateT ech", count: 6, color: "bg-emerald-100 text-emerald-700" },
                { name: "Art & NFTs", count: 15, color: "bg-purple-100 text-purple-700" },
                { name: "Gaming", count: 7, color: "bg-yellow-100 text-yellow-700" },
                { name: "Research", count: 5, color: "bg-indigo-100 text-indigo-700" }
              ].map((category, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <span className="text-gray-900">{category.name}</span>
                  <Badge className={category.color}>{category.count}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
