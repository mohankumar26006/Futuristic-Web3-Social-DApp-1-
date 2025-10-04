import { Film, Camera } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function StoriesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Stories</h1>
      
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-12 text-center">
        <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl text-white mb-2">Share your story</h3>
        <p className="text-gray-400 mb-6">Quick, full-screen posts that disappear after 24 hours</p>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Camera className="w-4 h-4 mr-2" />
          Create Story
        </Button>
      </Card>
    </div>
  );
}
