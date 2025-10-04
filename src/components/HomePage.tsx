import { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { Button } from "./ui/button";
import { Plus, TrendingUp, Users, Zap } from "lucide-react";
import { Card } from "./ui/card";

// sample data that would appeal to SIH judges
interface HomePageProps {
  onCreatePost: () => void;
  onTip: (recipient: any) => void;
  onComment: (post: any) => void;
  posts: any[];
  setPosts: (posts: any[]) => void;
  networkStats: any;
  isOnline: boolean;
}

export function HomePage({
  onCreatePost,
  onTip,
  onComment,
  posts,
  setPosts,
  networkStats,
  isOnline
}: HomePageProps) {
  // load sample posts if empty
  useEffect(() => {
    if (posts.length === 0) {
      const samplePosts = [
        {
          id: "1",
          author: {
            name: "Dr. Rajesh Kumar",
            username: "rajesh_ai",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
            walletAddress: "0x7a2b...4c5d",
            isVerified: true
          },
          content: "Just published our research on AI-powered healthcare diagnostics using blockchain for secure patient data. This could revolutionize medical record management in rural India! 🏥🔬 #DigitalIndia #HealthTech",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
          timestamp: "2h ago",
          likes: 234,
          comments: 45,
          tips: 12,
          tipAmount: 45.5,
          isLiked: false,
          isTipped: false,
          isNFT: false,
          transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
          isConfirmed: true
        },
        {
          id: "2",
          author: {
            name: "Priya Sharma",
            username: "priya_dev",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
            walletAddress: "0x9f3e...8a7b",
            isVerified: true
          },
          content: "Excited to announce our EdTech platform has reached 1 million students across 500+ government schools! Built using HeLa blockchain for transparent attendance tracking and scholarship distribution 🎓✨",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
          timestamp: "5h ago",
          likes: 189,
          comments: 32,
          tips: 8,
          tipAmount: 28.3,
          isLiked: false,
          isTipped: false,
          isNFT: true,
          transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
          isConfirmed: true
        },
        {
          id: "3",
          author: {
            name: "Arjun Patel",
            username: "arjun_fintech",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
            walletAddress: "0x2c4d...6e8f",
            isVerified: true
          },
          content: "Our FinTech startup just secured ₹2 Cr funding! We're building blockchain-based microfinance for farmers. No middlemen, instant loans, transparent interest rates. This is the future of rural banking! 🌾💰",
          timestamp: "8h ago",
          likes: 456,
          comments: 78,
          tips: 15,
          tipAmount: 62.7,
          isLiked: false,
          isTipped: false,
          isNFT: false,
          transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
          isConfirmed: true
        },
        {
          id: "4",
          author: {
            name: "Meera Singh",
            username: "meera_climate",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera",
            walletAddress: "0x5g7h...9i0j",
            isVerified: true
          },
          content: "Won Gold Medal at SIH 2024 for our IoT solution to monitor air quality in smart cities! Now scaling to 50 cities with real-time data on blockchain 🌍📊 #ClimateAction #SmartCities",
          image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800",
          timestamp: "12h ago",
          likes: 378,
          comments: 56,
          tips: 10,
          tipAmount: 38.9,
          isLiked: false,
          isTipped: false,
          isNFT: true,
          transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
          isConfirmed: true
        },
        {
          id: "5",
          author: {
            name: "Vikram Desai",
            username: "vikram_web3",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
            walletAddress: "0x1k2l...3m4n",
            isVerified: true
          },
          content: "Just deployed our DAO for community governance of Mumbai's tech parks! Blockchain voting, transparent budgets, zero corruption. 250+ members already onboarded 🏛️⚡ #Web3India #DAOGovernance",
          timestamp: "1d ago",
          likes: 267,
          comments: 41,
          tips: 9,
          tipAmount: 31.2,
          isLiked: false,
          isTipped: false,
          isNFT: false,
          transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
          isConfirmed: true
        },
        {
          id: "6",
          author: {
            name: "Anjali Reddy",
            username: "anjali_research",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anjali",
            walletAddress: "0x6o7p...8q9r",
            isVerified: true
          },
          content: "Our team's quantum computing research paper got accepted at IIT Delhi symposium! Working on secure blockchain networks resistant to quantum attacks. India is leading in crypto security! 🔐🚀",
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
          timestamp: "1d ago",
          likes: 512,
          comments: 89,
          tips: 18,
          tipAmount: 72.4,
          isLiked: false,
          isTipped: false,
          isNFT: true,
          transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
          isConfirmed: true
        }
      ];
      
      setPosts(samplePosts);
    }
  }, []);

  // handle like - actually update the state
  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
      {/* Main feed */}
      <div className="lg:col-span-8 space-y-4">
        {/* Create post button */}
        <Button
          onClick={onCreatePost}
          className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Share Your Innovation
        </Button>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={() => onComment(post)}
              onTip={() => onTip(post.author)}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">Be the first to share your innovation!</p>
            <Button onClick={onCreatePost}>Create Post</Button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        {/* Network stats */}
        <Card className="bg-white border border-gray-200 p-4 sticky top-20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-gray-900">HeLa Network Stats</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Block Height</span>
              <span className="text-gray-900">{networkStats.blockHeight.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TPS</span>
              <span className="text-blue-600">{networkStats.tps.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gas Price</span>
              <span className="text-green-600">{networkStats.gasPrice.toFixed(4)} HELA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">≈ INR</span>
              <span className="text-gray-900">₹{(networkStats.gasPrice * 85).toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Trending topics */}
        <Card className="bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <h3 className="text-gray-900">Trending in SIH</h3>
          </div>
          <div className="space-y-3">
            {[
              { tag: "HealthTech", posts: "2.3K posts" },
              { tag: "EdTech", posts: "1.8K posts" },
              { tag: "FinTech", posts: "1.5K posts" },
              { tag: "SmartCities", posts: "1.2K posts" },
              { tag: "AgriTech", posts: "987 posts" }
            ].map((topic, i) => (
              <div key={i} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
                <div>
                  <div className="text-gray-900">#{topic.tag}</div>
                  <div className="text-xs text-gray-500">{topic.posts}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Who to follow */}
        <Card className="bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-blue-500" />
            <h3 className="text-gray-900">Suggested Innovators</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: "IIT Bombay Research", username: "iitb_research", verified: true },
              { name: "ISRO Tech", username: "isro_official", verified: true },
              { name: "Startup India", username: "startupindia", verified: true }
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                  <div>
                    <div className="text-sm text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">@{user.username}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Follow</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
