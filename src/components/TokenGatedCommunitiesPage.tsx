import { Users, Lock, TrendingUp, MessageSquare } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { sampleCommunities } from "../utils/sampleData";

interface TokenGatedCommunitiesPageProps {
  userProfile: any;
}

export function TokenGatedCommunitiesPage({ userProfile }: TokenGatedCommunitiesPageProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Communities</h1>
          <p className="text-muted-foreground mt-1">
            Join exclusive communities powered by NFTs and reputation
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90">
          <Users className="w-4 h-4 mr-2" />
          Create Community
        </Button>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleCommunities.map((community) => (
          <Card 
            key={community.id}
            className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all"
          >
            {/* Cover Image */}
            <div 
              className="h-32 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${community.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-xl text-white">{community.name}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{community.members} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{community.posts} posts</span>
                </div>
              </div>

              {/* Recent Post */}
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={community.postedBy.avatar} 
                    alt={community.postedBy.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm">{community.postedBy.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{community.recentPost}</p>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90"
              >
                Join Community
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
