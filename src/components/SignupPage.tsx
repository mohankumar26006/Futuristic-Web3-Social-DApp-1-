import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { User, Image as ImageIcon, Sparkles } from "lucide-react";

interface SignupPageProps {
  onSignup: (username: string, name: string, bio: string, avatar: string) => void;
  walletAddress: string;
}

export function SignupPage({ onSignup, walletAddress }: SignupPageProps) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleGenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !name) return;

    setIsCreating(true);
    // Simulate blockchain transaction
    setTimeout(() => {
      const finalAvatar = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
      onSignup(username, name, bio, finalAvatar);
      setIsCreating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-teal-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent mb-3">
            Create Your On-Chain Identity
          </h1>
          <p className="text-gray-400">
            Your profile will be permanently stored on the HeLa blockchain
          </p>
        </div>

        <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Wallet Address Display */}
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <Label className="text-sm text-purple-300 mb-2 block">Connected Wallet</Label>
            <p className="text-white font-mono text-sm">{walletAddress}</p>
          </div>

          {/* Avatar Selection */}
          <div className="mb-6">
            <Label className="text-white mb-3 block">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-purple-500/50" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 border-2 border-white/10 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <Input
                  type="url"
                  placeholder="Enter image URL or generate AI avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                <Button
                  type="button"
                  onClick={handleGenerateAvatar}
                  variant="outline"
                  className="w-full bg-transparent border-teal-500/50 text-teal-300 hover:bg-teal-500/10"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Avatar
                </Button>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="mb-6">
            <Label htmlFor="username" className="text-white mb-2 block">
              Username *
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, '_'))}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-400 mt-1">This will be your unique identifier on-chain</p>
          </div>

          {/* Display Name */}
          <div className="mb-6">
            <Label htmlFor="name" className="text-white mb-2 block">
              Display Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <Label htmlFor="bio" className="text-white mb-2 block">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell the world about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={280}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{bio.length}/280 characters</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isCreating || !username || !name}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Creating Profile on Blockchain...
              </>
            ) : (
              <>
                <User className="w-5 h-5 mr-2" />
                Create Profile on Blockchain
              </>
            )}
          </Button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Your profile will be minted as an on-chain identity NFT
          </p>
        </form>
      </div>
    </div>
  );
}
