import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import {
  Shield,
  Flag,
  Users,
  Vote,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  AlertTriangle,
  Scale,
  Gavel,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Target
} from "lucide-react";

interface ModerationCase {
  id: string;
  type: 'spam' | 'harassment' | 'misinformation' | 'inappropriate';
  reportedContent: {
    postId: string;
    content: string;
    author: {
      name: string;
      username: string;
      avatar: string;
    };
    reportedAt: string;
  };
  reporter: {
    name: string;
    username: string;
    reputation: number;
  };
  reason: string;
  status: 'pending' | 'voting' | 'resolved' | 'dismissed';
  votingDeadline?: string;
  votes: {
    guilty: number;
    innocent: number;
    abstain: number;
    totalVoters: number;
    userVote?: 'guilty' | 'innocent' | 'abstain';
  };
  juryPool: number;
  minimumReputation: number;
  stakingRequired: number;
}

interface ProposalCase {
  id: string;
  title: string;
  description: string;
  proposer: {
    name: string;
    username: string;
    reputation: number;
  };
  type: 'policy' | 'feature' | 'economic' | 'governance';
  votes: {
    for: number;
    against: number;
    abstain: number;
    totalVoters: number;
    userVote?: 'for' | 'against' | 'abstain';
  };
  deadline: string;
  status: 'active' | 'passed' | 'failed' | 'pending';
  minimumTokens: number;
}

export function DAOModerationHub() {
  const [activeTab, setActiveTab] = useState("moderation");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [newReport, setNewReport] = useState("");

  const userReputation = 1247;
  const userTokens = 1234.56;
  const isEligibleJuror = userReputation >= 500;

  const moderationCases: ModerationCase[] = [
    {
      id: "case1",
      type: "spam",
      reportedContent: {
        postId: "post123",
        content: "🚀🚀🚀 AMAZING NEW CRYPTO PROJECT!!! 100X GUARANTEED!!! JOIN NOW OR MISS OUT FOREVER!!! 🚀🚀🚀 [suspicious-link.com]",
        author: {
          name: "Spam Account",
          username: "crypto_gains_999",
          avatar: "SA"
        },
        reportedAt: "2 hours ago"
      },
      reporter: {
        name: "Alice Chen",
        username: "alice_crypto",
        reputation: 2456
      },
      reason: "Clear spam content promoting suspicious cryptocurrency projects with misleading claims",
      status: "voting",
      votingDeadline: "22 hours",
      votes: {
        guilty: 12,
        innocent: 2,
        abstain: 1,
        totalVoters: 15,
        userVote: undefined
      },
      juryPool: 25,
      minimumReputation: 500,
      stakingRequired: 10
    },
    {
      id: "case2",
      type: "harassment",
      reportedContent: {
        postId: "post456",
        content: "This person is clearly an idiot and doesn't deserve to be on this platform. Everyone should block them immediately.",
        author: {
          name: "Toxic User",
          username: "angry_trader",
          avatar: "TU"
        },
        reportedAt: "1 day ago"
      },
      reporter: {
        name: "Bob Developer",
        username: "bob_dev",
        reputation: 1890
      },
      reason: "Personal attack and harassment against another user",
      status: "resolved",
      votes: {
        guilty: 18,
        innocent: 3,
        abstain: 2,
        totalVoters: 23
      },
      juryPool: 25,
      minimumReputation: 500,
      stakingRequired: 10
    },
    {
      id: "case3",
      type: "misinformation",
      reportedContent: {
        postId: "post789",
        content: "The HeLa blockchain is actually controlled by a single entity and all transactions are fake. Don't trust anything you see here.",
        author: {
          name: "Conspiracy User",
          username: "truth_seeker_2024",
          avatar: "CU"
        },
        reportedAt: "6 hours ago"
      },
      reporter: {
        name: "Carol Designer",
        username: "carol_design",
        reputation: 3210
      },
      reason: "Spreading false information about the blockchain infrastructure",
      status: "pending",
      votes: {
        guilty: 0,
        innocent: 0,
        abstain: 0,
        totalVoters: 0
      },
      juryPool: 25,
      minimumReputation: 750,
      stakingRequired: 25
    }
  ];

  const proposals: ProposalCase[] = [
    {
      id: "prop1",
      title: "Increase Minimum Reputation for Content Moderation Jury",
      description: "Propose to increase the minimum reputation requirement from 500 to 750 for participating in content moderation decisions. This will ensure higher quality and more experienced community members are making moderation decisions.",
      proposer: {
        name: "Alice Chen",
        username: "alice_crypto",
        reputation: 2456
      },
      type: "governance",
      votes: {
        for: 234,
        against: 89,
        abstain: 23,
        totalVoters: 346,
        userVote: undefined
      },
      deadline: "5 days",
      status: "active",
      minimumTokens: 100
    },
    {
      id: "prop2",
      title: "Implement NFT Post Rewards System",
      description: "Create a system where viral posts can be automatically minted as NFTs with revenue sharing between the original creator and the community treasury.",
      proposer: {
        name: "David Kim",
        username: "david_tech",
        reputation: 1890
      },
      type: "feature",
      votes: {
        for: 445,
        against: 123,
        abstain: 67,
        totalVoters: 635,
        userVote: "for"
      },
      deadline: "2 days",
      status: "active",
      minimumTokens: 50
    }
  ];

  const handleVote = (caseId: string, vote: 'guilty' | 'innocent' | 'abstain' | 'for' | 'against') => {
    console.log(`Voting ${vote} on case ${caseId}`);
    // Mock voting logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-400 border-yellow-400";
      case "voting": return "text-blue-400 border-blue-400";
      case "resolved": return "text-green-400 border-green-400";
      case "dismissed": return "text-gray-400 border-gray-400";
      case "active": return "text-purple-400 border-purple-400";
      case "passed": return "text-green-400 border-green-400";
      case "failed": return "text-red-400 border-red-400";
      default: return "text-gray-400 border-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "spam": return <Target className="w-4 h-4" />;
      case "harassment": return <AlertTriangle className="w-4 h-4" />;
      case "misinformation": return <Eye className="w-4 h-4" />;
      case "inappropriate": return <Flag className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">DAO Governance</h1>
          <p className="text-muted-foreground">
            Community-driven content moderation and platform governance
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Your Reputation</div>
            <div className="text-xl font-bold text-foreground">{userReputation}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Voting Power</div>
            <div className="text-xl font-bold text-purple-400">{userTokens} HELA</div>
          </div>
          <Badge className={`${isEligibleJuror ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
            {isEligibleJuror ? 'Eligible Juror' : 'Not Eligible'}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {moderationCases.filter(c => c.status === 'voting').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Cases</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {moderationCases.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved Cases</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <Vote className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {proposals.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Proposals</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <div className="text-sm text-muted-foreground">Active Jurors</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-background/50 border border-white/20">
          <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
          <TabsTrigger value="proposals">Governance Proposals</TabsTrigger>
          <TabsTrigger value="report">Report Content</TabsTrigger>
        </TabsList>

        <TabsContent value="moderation" className="space-y-4">
          {moderationCases.map((case_, index) => (
            <motion.div
              key={case_.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(case_.type)}
                      <div>
                        <CardTitle className="capitalize">
                          {case_.type} Report - Case #{case_.id.slice(-3)}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={getStatusColor(case_.status)}>
                            {case_.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Reported {case_.reportedContent.reportedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {case_.votingDeadline && (
                      <div className="text-right">
                        <Clock className="w-4 h-4 text-muted-foreground inline mr-1" />
                        <span className="text-sm text-muted-foreground">{case_.votingDeadline} left</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Reported Content */}
                  <div className="p-3 bg-red-500/10 border border-red-400/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white text-xs">
                          {case_.reportedContent.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">@{case_.reportedContent.author.username}</span>
                    </div>
                    <p className="text-sm text-foreground">{case_.reportedContent.content}</p>
                  </div>
                  
                  {/* Report Details */}
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Reported by:</span>
                      <span className="text-foreground ml-1">
                        @{case_.reporter.username} (Rep: {case_.reporter.reputation})
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Reason:</span>
                      <span className="text-foreground ml-1">{case_.reason}</span>
                    </div>
                  </div>
                  
                  {/* Voting Section */}
                  {case_.status === 'voting' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{case_.votes.guilty}</div>
                          <div className="text-sm text-muted-foreground">Guilty</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{case_.votes.innocent}</div>
                          <div className="text-sm text-muted-foreground">Innocent</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-400">{case_.votes.abstain}</div>
                          <div className="text-sm text-muted-foreground">Abstain</div>
                        </div>
                      </div>
                      
                      <Progress 
                        value={(case_.votes.totalVoters / case_.juryPool) * 100} 
                        className="h-2" 
                      />
                      <div className="text-sm text-muted-foreground text-center">
                        {case_.votes.totalVoters} / {case_.juryPool} jurors voted
                      </div>
                      
                      {isEligibleJuror && !case_.votes.userVote && (
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => handleVote(case_.id, 'guilty')}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                          >
                            <ThumbsDown className="w-4 h-4 mr-2" />
                            Vote Guilty
                          </Button>
                          <Button
                            onClick={() => handleVote(case_.id, 'innocent')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Vote Innocent
                          </Button>
                          <Button
                            onClick={() => handleVote(case_.id, 'abstain')}
                            variant="outline"
                            className="flex-1"
                          >
                            Abstain
                          </Button>
                        </div>
                      )}
                      
                      {case_.votes.userVote && (
                        <div className="text-center">
                          <Badge className="bg-blue-500 text-white">
                            You voted: {case_.votes.userVote}
                          </Badge>
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span>Minimum Reputation: {case_.minimumReputation}</span>
                          <span>Staking Required: {case_.stakingRequired} HELA</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {case_.status === 'resolved' && (
                    <div className="p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-medium">Case Resolved</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Community voted: {case_.votes.guilty > case_.votes.innocent ? 'Guilty' : 'Innocent'}
                        ({case_.votes.guilty} vs {case_.votes.innocent} votes)
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://helascan.com/post/${case_.reportedContent.postId}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Original Post
                    </Button>
                    
                    <div className="text-xs text-muted-foreground">
                      Case ID: {case_.id}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="proposals" className="space-y-4">
          {proposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{proposal.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        <Badge variant="outline">
                          {proposal.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          by @{proposal.proposer.username}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Clock className="w-4 h-4 text-muted-foreground inline mr-1" />
                      <span className="text-sm text-muted-foreground">{proposal.deadline} left</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{proposal.description}</p>
                  
                  {/* Voting Results */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{proposal.votes.for}</div>
                        <div className="text-sm text-muted-foreground">For</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{proposal.votes.against}</div>
                        <div className="text-sm text-muted-foreground">Against</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-400">{proposal.votes.abstain}</div>
                        <div className="text-sm text-muted-foreground">Abstain</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>For ({((proposal.votes.for / proposal.votes.totalVoters) * 100).toFixed(1)}%)</span>
                        <span>{proposal.votes.for} votes</span>
                      </div>
                      <Progress 
                        value={(proposal.votes.for / proposal.votes.totalVoters) * 100} 
                        className="h-2 bg-muted" 
                      />
                    </div>
                    
                    <div className="text-sm text-muted-foreground text-center">
                      {proposal.votes.totalVoters} total votes
                    </div>
                    
                    {userTokens >= proposal.minimumTokens && !proposal.votes.userVote && proposal.status === 'active' && (
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleVote(proposal.id, 'for')}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Vote For
                        </Button>
                        <Button
                          onClick={() => handleVote(proposal.id, 'against')}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                        >
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          Vote Against
                        </Button>
                        <Button
                          onClick={() => handleVote(proposal.id, 'abstain')}
                          variant="outline"
                          className="flex-1"
                        >
                          Abstain
                        </Button>
                      </div>
                    )}
                    
                    {proposal.votes.userVote && (
                      <div className="text-center">
                        <Badge className="bg-blue-500 text-white">
                          You voted: {proposal.votes.userVote}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Minimum Tokens: {proposal.minimumTokens} HELA</span>
                        <span>Proposed by: Rep {proposal.proposer.reputation}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="w-5 h-5 text-red-400" />
                <span>Report Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium text-yellow-400">Important Guidelines</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Only report content that violates community guidelines</li>
                  <li>• False reports may result in reputation penalties</li>
                  <li>• Your report will be reviewed by community jurors</li>
                  <li>• Minimum reputation of {userReputation >= 100 ? '100' : '100 (you need ' + (100 - userReputation) + ' more)'} required to report</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Post URL or ID
                  </label>
                  <input 
                    type="text"
                    placeholder="https://helasocial.com/post/abc123 or abc123"
                    className="w-full p-3 border border-white/20 rounded-lg bg-background/50 text-foreground"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Violation Type
                  </label>
                  <select className="w-full p-3 border border-white/20 rounded-lg bg-background/50 text-foreground">
                    <option>Select violation type</option>
                    <option>Spam</option>
                    <option>Harassment</option>
                    <option>Misinformation</option>
                    <option>Inappropriate Content</option>
                    <option>Copyright Violation</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Detailed Report
                  </label>
                  <Textarea
                    value={newReport}
                    onChange={(e) => setNewReport(e.target.value)}
                    placeholder="Provide detailed explanation of why this content violates community guidelines..."
                    className="min-h-32 border-white/20 bg-background/50"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-sm text-muted-foreground">
                    Your Reputation: {userReputation} (Minimum: 100)
                  </div>
                  <Button
                    disabled={userReputation < 100 || !newReport.trim()}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white"
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}