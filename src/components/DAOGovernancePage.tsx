import { Shield, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface DAOGovernancePageProps {
  userReputation: number;
}

export function DAOGovernancePage({ userReputation }: DAOGovernancePageProps) {
  const proposals = [
    {
      id: 1,
      title: "Increase Minimum Reputation for NFT Minting",
      description: "Propose to increase the minimum reputation required to mint NFT posts from 50 to 100 points.",
      votesFor: 1245,
      votesAgainst: 432,
      status: "Active",
      timeLeft: "2 days"
    },
    {
      id: 2,
      title: "Add New Token for Tipping: USDC",
      description: "Enable USDC as an additional token option for tipping creators.",
      votesFor: 2341,
      votesAgainst: 156,
      status: "Passing",
      timeLeft: "5 days"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-8 h-8 text-purple-400" />
        <h1 className="text-3xl font-bold text-white">DAO Governance</h1>
      </div>

      <Card className="bg-gradient-to-r from-purple-500/20 to-teal-500/20 border-purple-500/30 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 mb-1">Your Voting Power</p>
            <p className="text-3xl font-bold text-white">{userReputation} votes</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Create Proposal
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="bg-white/5 border-white/10 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-medium text-white">{proposal.title}</h3>
                  <Badge className={`${
                    proposal.status === 'Active' 
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      : 'bg-green-500/20 text-green-300 border-green-500/30'
                  }`}>
                    {proposal.status}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-4">{proposal.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{proposal.votesFor} For</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ThumbsDown className="w-4 h-4 text-red-400" />
                      <span className="text-gray-300">{proposal.votesAgainst} Against</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{proposal.timeLeft}</span>
                    </div>
                  </div>
                  <Progress value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-4">
              <Button className="flex-1 bg-green-600/20 border border-green-500/30 text-green-300 hover:bg-green-600/30">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Vote For
              </Button>
              <Button className="flex-1 bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/30">
                <ThumbsDown className="w-4 h-4 mr-2" />
                Vote Against
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
