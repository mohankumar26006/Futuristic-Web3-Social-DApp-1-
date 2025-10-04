import { Zap, Users, Trophy } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function ChallengesPage() {
  const challenges = [
    {
      id: 1,
      title: "Best Meme Challenge",
      description: "Create the funniest Web3 meme",
      participants: 234,
      prize: "100 HELA",
      endDate: "3 days left"
    },
    {
      id: 2,
      title: "NFT Art Contest",
      description: "Submit your best digital artwork",
      participants: 89,
      prize: "250 HELA + Featured Spot",
      endDate: "1 week left"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="w-8 h-8 text-yellow-400" />
        <h1 className="text-3xl font-bold text-white">Challenges</h1>
      </div>

      <div className="grid gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-medium text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-400 mb-4">{challenge.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {challenge.endDate}
                  </Badge>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="flex items-center space-x-2 text-yellow-400 mb-3">
                  <Trophy className="w-5 h-5" />
                  <span className="text-lg font-medium">{challenge.prize}</span>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Join Challenge
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
