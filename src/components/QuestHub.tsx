import { Trophy, Target, CheckCircle, Clock, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { sampleQuests } from "../utils/sampleData";

interface QuestHubProps {
  userReputation: number;
}

export function QuestHub({ userReputation }: QuestHubProps) {
  const completedQuests = sampleQuests.filter(q => q.status === 'completed');
  const inProgressQuests = sampleQuests.filter(q => q.status === 'in_progress');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl">Quests</h1>
            <p className="text-muted-foreground">
              complete quests to earn stuff
            </p>
          </div>
        </div>
      </div>

      {/* Quest Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed Quests</p>
              <p className="text-2xl font-medium mt-1">{completedQuests.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-medium mt-1">{inProgressQuests.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-600/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Quests</p>
              <p className="text-2xl font-medium mt-1">{sampleQuests.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* In Progress Quests */}
      {inProgressQuests.length > 0 && (
        <div>
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-400" />
            In Progress
          </h2>
          <div className="space-y-3">
            {inProgressQuests.map((quest) => (
              <Card 
                key={quest.id}
                className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{quest.title}</h3>
                      <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">
                        In Progress
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 ml-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{quest.progress}/{quest.total}</span>
                  </div>
                  <Progress 
                    value={(quest.progress / quest.total) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Reward: </span>
                    <span className="text-purple-400 font-medium">{quest.reward}</span>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90"
                  >
                    Continue
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div>
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Completed
          </h2>
          <div className="space-y-3">
            {completedQuests.map((quest) => (
              <Card 
                key={quest.id}
                className="p-4 bg-white/5 backdrop-blur-sm border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{quest.title}</h3>
                      <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm text-muted-foreground">Reward</p>
                    <p className="text-sm font-medium text-purple-400">{quest.reward}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
