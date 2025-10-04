import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import {
  Trophy,
  Target,
  Crown,
  Star,
  Zap,
  Gift,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Heart,
  DollarSign,
  MessageCircle,
  Users,
  Award,
  Flame,
  Sparkles,
  Medal,
  Gem
} from "lucide-react";

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'achievement';
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  progress: number;
  maxProgress: number;
  reward: {
    reputation: number;
    tokens: number;
    badge?: string;
  };
  timeLeft?: string;
  isCompleted: boolean;
  icon: any;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image: string;
  unlockedAt?: string;
  isLocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Leaderboard {
  rank: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  score: number;
  change: number;
}

export function GameficationHub() {
  const [activeTab, setActiveTab] = useState("quests");
  const [playerLevel, setPlayerLevel] = useState(12);
  const [playerXP, setPlayerXP] = useState(2847);
  const [nextLevelXP, setNextLevelXP] = useState(3000);

  const quests: Quest[] = [
    {
      id: "daily1",
      title: "Social Butterfly",
      description: "Like 10 posts from different creators",
      type: "daily",
      difficulty: "easy",
      progress: 7,
      maxProgress: 10,
      reward: { reputation: 50, tokens: 2 },
      timeLeft: "18h 42m",
      isCompleted: false,
      icon: Heart
    },
    {
      id: "daily2",
      title: "Generous Tipper",
      description: "Send tips to 5 different creators",
      type: "daily",
      difficulty: "medium",
      progress: 3,
      maxProgress: 5,
      reward: { reputation: 100, tokens: 5 },
      timeLeft: "18h 42m",
      isCompleted: false,
      icon: DollarSign
    },
    {
      id: "weekly1",
      title: "Content Creator",
      description: "Publish 7 high-quality posts this week",
      type: "weekly",
      difficulty: "hard",
      progress: 4,
      maxProgress: 7,
      reward: { reputation: 500, tokens: 25, badge: "Weekly Creator" },
      timeLeft: "3d 12h",
      isCompleted: false,
      icon: Zap
    },
    {
      id: "achievement1",
      title: "Early Adopter",
      description: "Be among the first 1000 users",
      type: "achievement",
      difficulty: "legendary",
      progress: 1,
      maxProgress: 1,
      reward: { reputation: 1000, tokens: 100, badge: "Pioneer" },
      isCompleted: true,
      icon: Crown
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "ach1",
      title: "First Steps",
      description: "Create your first post",
      rarity: "common",
      image: "https://images.unsplash.com/photo-1528341377499-f0143e637c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY2hpZXZlbWVudHMlMjBiYWRnZXN8ZW58MXx8fHwxNzU4NzQxODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      unlockedAt: "2 days ago",
      isLocked: false
    },
    {
      id: "ach2",
      title: "Tip Master",
      description: "Send 100 tips to other creators",
      rarity: "rare",
      image: "https://images.unsplash.com/photo-1528341377499-f0143e637c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY2hpZXZlbWVudHMlMjBiYWRnZXN8ZW58MXx8fHwxNzU4NzQxODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      unlockedAt: "1 week ago",
      isLocked: false
    },
    {
      id: "ach3",
      title: "Viral Creator",
      description: "Get 1000 likes on a single post",
      rarity: "epic",
      image: "https://images.unsplash.com/photo-1528341377499-f0143e637c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY2hpZXZlbWVudHMlMjBiYWRnZXN8ZW58MXx8fHwxNzU4NzQxODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      progress: 756,
      maxProgress: 1000,
      isLocked: false
    },
    {
      id: "ach4",
      title: "Blockchain Pioneer",
      description: "Complete 50 on-chain transactions",
      rarity: "legendary",
      image: "https://images.unsplash.com/photo-1528341377499-f0143e637c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY2hpZXZlbWVudHMlMjBiYWRnZXN8ZW58MXx8fHwxNzU4NzQxODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      progress: 47,
      maxProgress: 50,
      isLocked: false
    },
    {
      id: "ach5",
      title: "Community Leader",
      description: "Get 10,000 followers",
      rarity: "legendary",
      image: "https://images.unsplash.com/photo-1528341377499-f0143e637c50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY2hpZXZlbWVudHMlMjBiYWRnZXN8ZW58MXx8fHwxNzU4NzQxODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      progress: 892,
      maxProgress: 10000,
      isLocked: false
    },
    {
      id: "ach6",
      title: "Mystery Achievement",
      description: "???",
      rarity: "legendary",
      image: "",
      isLocked: true
    }
  ];

  const leaderboards: { [key: string]: Leaderboard[] } = {
    reputation: [
      { rank: 1, user: { name: "Alice Chen", username: "alice_crypto", avatar: "AC" }, score: 15420, change: 2 },
      { rank: 2, user: { name: "Bob Developer", username: "bob_dev", avatar: "BD" }, score: 12890, change: -1 },
      { rank: 3, user: { name: "Carol Designer", username: "carol_design", avatar: "CD" }, score: 11670, change: 1 },
      { rank: 4, user: { name: "David Kim", username: "david_tech", avatar: "DK" }, score: 9840, change: 0 },
      { rank: 5, user: { name: "Demo User", username: "demouser", avatar: "DU" }, score: 2847, change: 3 }
    ],
    tips: [
      { rank: 1, user: { name: "Carol Designer", username: "carol_design", avatar: "CD" }, score: 2456, change: 1 },
      { rank: 2, user: { name: "Alice Chen", username: "alice_crypto", avatar: "AC" }, score: 2234, change: -1 },
      { rank: 3, user: { name: "Bob Developer", username: "bob_dev", avatar: "BD" }, score: 1890, change: 0 },
      { rank: 4, user: { name: "Demo User", username: "demouser", avatar: "DU" }, score: 189, change: 2 },
      { rank: 5, user: { name: "David Kim", username: "david_tech", avatar: "DK" }, score: 156, change: -1 }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "from-green-400 to-emerald-400";
      case "medium": return "from-yellow-400 to-orange-400";
      case "hard": return "from-red-400 to-pink-400";
      case "legendary": return "from-purple-400 to-indigo-400";
      default: return "from-gray-400 to-gray-500";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "from-gray-400 to-gray-500";
      case "uncommon": return "from-green-400 to-emerald-400";
      case "rare": return "from-blue-400 to-cyan-400";
      case "epic": return "from-purple-400 to-pink-400";
      case "legendary": return "from-yellow-400 to-orange-400";
      default: return "from-gray-400 to-gray-500";
    }
  };

  const completeQuest = (questId: string) => {
    // Mock quest completion
    console.log("Completing quest:", questId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gamification Hub</h1>
          <p className="text-muted-foreground">
            Complete quests, earn achievements, and climb the leaderboards
          </p>
        </div>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/20 to-teal-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">Level {playerLevel}</div>
              <div className="text-sm text-muted-foreground">Player Level</div>
              <Progress value={(playerXP / nextLevelXP) * 100} className="mt-2 h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {playerXP} / {nextLevelXP} XP
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {quests.filter(q => q.isCompleted).length}/{quests.length}
              </div>
              <div className="text-sm text-muted-foreground">Quests Completed</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {achievements.filter(a => !a.isLocked).length}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">#5</div>
              <div className="text-sm text-muted-foreground">Reputation Rank</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-background/50 border border-white/20">
          <TabsTrigger value="quests">Quests</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="quests" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quests.map((quest, index) => {
              const Icon = quest.icon;
              return (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`bg-card/50 backdrop-blur-sm border-white/10 ${quest.isCompleted ? 'ring-2 ring-green-400/50' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${getDifficultyColor(quest.difficulty)}`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{quest.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className={`bg-gradient-to-r ${getDifficultyColor(quest.difficulty)} text-white border-0`}>
                                {quest.difficulty}
                              </Badge>
                              <Badge variant="outline">
                                {quest.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {quest.timeLeft && (
                          <div className="text-right">
                            <Clock className="w-4 h-4 text-muted-foreground inline mb-1" />
                            <div className="text-sm text-muted-foreground">{quest.timeLeft}</div>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{quest.description}</p>
                      
                      {!quest.isCompleted ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{quest.progress} / {quest.maxProgress}</span>
                          </div>
                          <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Completed!</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{quest.reward.reputation} Rep</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Gem className="w-4 h-4 text-purple-400" />
                            <span>{quest.reward.tokens} HELA</span>
                          </span>
                          {quest.reward.badge && (
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                              {quest.reward.badge}
                            </Badge>
                          )}
                        </div>
                        
                        {!quest.isCompleted && quest.progress === quest.maxProgress && (
                          <Button
                            size="sm"
                            onClick={() => completeQuest(quest.id)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          >
                            Claim Reward
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`group cursor-pointer ${achievement.isLocked ? 'opacity-50' : ''}`}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-card/70 transition-all duration-300">
                  <div className="relative">
                    {!achievement.isLocked ? (
                      <div className="aspect-square">
                        <ImageWithFallback
                          src={achievement.image}
                          alt={achievement.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                        <div className="text-6xl">🔒</div>
                      </div>
                    )}
                    
                    {!achievement.isLocked && (
                      <div className="absolute top-2 right-2">
                        <Badge className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white border-0`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    )}
                    
                    {achievement.unlockedAt && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-green-500/80 text-white border-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">
                      {achievement.isLocked ? "???" : achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && !achievement.isLocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.maxProgress}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                      </div>
                    )}
                    
                    {achievement.unlockedAt && (
                      <div className="text-xs text-muted-foreground mt-2">
                        Unlocked {achievement.unlockedAt}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Tabs defaultValue="reputation">
            <TabsList className="grid w-full grid-cols-2 bg-background/50 border border-white/20">
              <TabsTrigger value="reputation">Reputation</TabsTrigger>
              <TabsTrigger value="tips">Tips Earned</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reputation" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span>Reputation Leaderboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboards.reputation.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          entry.user.username === 'demouser' 
                            ? 'bg-gradient-to-r from-purple-500/20 to-teal-500/20 ring-1 ring-purple-400/50' 
                            : 'bg-muted/20 hover:bg-muted/30'
                        } transition-colors`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            entry.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                            entry.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                            entry.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white' :
                            'bg-muted text-foreground'
                          }`}>
                            {entry.rank}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                              {entry.user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{entry.user.name}</div>
                            <div className="text-sm text-muted-foreground">@{entry.user.username}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-foreground">{entry.score.toLocaleString()}</div>
                          <div className={`text-sm flex items-center ${
                            entry.change > 0 ? 'text-green-400' : 
                            entry.change < 0 ? 'text-red-400' : 'text-muted-foreground'
                          }`}>
                            {entry.change > 0 ? '+' : ''}{entry.change}
                            {entry.change !== 0 && (
                              entry.change > 0 ? 
                                <ArrowRight className="w-3 h-3 ml-1 rotate-[-45deg]" /> :
                                <ArrowRight className="w-3 h-3 ml-1 rotate-[45deg]" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tips" className="mt-6">
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span>Tips Earned Leaderboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboards.tips.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          entry.user.username === 'demouser' 
                            ? 'bg-gradient-to-r from-purple-500/20 to-teal-500/20 ring-1 ring-purple-400/50' 
                            : 'bg-muted/20 hover:bg-muted/30'
                        } transition-colors`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            entry.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                            entry.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                            entry.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white' :
                            'bg-muted text-foreground'
                          }`}>
                            {entry.rank}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                              {entry.user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{entry.user.name}</div>
                            <div className="text-sm text-muted-foreground">@{entry.user.username}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-green-400">{entry.score} HELA</div>
                          <div className={`text-sm flex items-center ${
                            entry.change > 0 ? 'text-green-400' : 
                            entry.change < 0 ? 'text-red-400' : 'text-muted-foreground'
                          }`}>
                            {entry.change > 0 ? '+' : ''}{entry.change}
                            {entry.change !== 0 && (
                              entry.change > 0 ? 
                                <ArrowRight className="w-3 h-3 ml-1 rotate-[-45deg]" /> :
                                <ArrowRight className="w-3 h-3 ml-1 rotate-[45deg]" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}