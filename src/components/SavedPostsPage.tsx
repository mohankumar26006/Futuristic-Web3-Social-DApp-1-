import { Bookmark, Plus } from "lucide-react";
import { Card } from "./ui/card";

export function SavedPostsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Saved Posts</h1>
      
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-12 text-center">
        <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl text-white mb-2">No saved posts yet</h3>
        <p className="text-gray-400">Posts you bookmark will appear here for easy access</p>
      </Card>
    </div>
  );
}
