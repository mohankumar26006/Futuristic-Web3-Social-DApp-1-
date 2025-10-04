import { Award, Medal, Trophy, Star } from "lucide-react";
import { Card } from "./ui/card";

interface AchievementsBadgesPageProps {
  userReputation: number;
}

export function AchievementsBadgesPage({ userReputation }: AchievementsBadgesPageProps) {
  const badges = [
    { id: 1, name: "Early Adopter", icon: Star, color: "text-purple-400", unlocked: true },
    { id: 2, name: "Top Tipper", icon: Trophy, color: "text-yellow-400", unlocked: true },
    { id: 3, name: "Content Creator", icon: Medal, color: "text-teal-400", unlocked: true },
    { id: 4, name: "Community Leader", icon: Award, color: "text-pink-400", unlocked: false }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Achievements & Badges</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <Card key={badge.id} className={`bg-white/5 border-white/10 p-6 text-center ${!badge.unlocked && 'opacity-40'}`}>
              <Icon className={`w-12 h-12 ${badge.color} mx-auto mb-3`} />
              <p className="text-white font-medium text-sm">{badge.name}</p>
              {badge.unlocked && (
                <p className="text-xs text-green-400 mt-2">Unlocked</p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
