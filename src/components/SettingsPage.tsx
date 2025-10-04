import { User, Bell, Lock, Palette, Globe, Shield } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

interface SettingsPageProps {
  userProfile: any;
  onUpdateProfile: (profile: any) => void;
}

export function SettingsPage({ userProfile, onUpdateProfile }: SettingsPageProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl">Profile Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              defaultValue={userProfile.username}
              className="mt-1 bg-white/5 border-white/10"
            />
          </div>
          
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              defaultValue={userProfile.name}
              className="mt-1 bg-white/5 border-white/10"
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              defaultValue={userProfile.bio}
              className="mt-1 bg-white/5 border-white/10"
            />
          </div>
          
          <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Likes & Comments</p>
              <p className="text-sm text-muted-foreground">
                Get notified when someone likes or comments on your posts
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tips Received</p>
              <p className="text-sm text-muted-foreground">
                Get notified when you receive tips
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Followers</p>
              <p className="text-sm text-muted-foreground">
                Get notified when someone follows you
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">DAO Proposals</p>
              <p className="text-sm text-muted-foreground">
                Get notified about new governance proposals
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl">Privacy & Security</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Private Profile</p>
              <p className="text-sm text-muted-foreground">
                Only approved followers can see your posts
              </p>
            </div>
            <Switch />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Wallet Address</p>
              <p className="text-sm text-muted-foreground">
                Display your wallet address on your profile
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Allow Direct Messages</p>
              <p className="text-sm text-muted-foreground">
                Anyone can send you direct messages
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl">Appearance</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Use dark theme across the app
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Compact Mode</p>
              <p className="text-sm text-muted-foreground">
                Show more content on screen
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Wallet Settings */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl">Wallet & Blockchain</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Connected Wallet</Label>
            <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10">
              <code className="text-sm">{userProfile.walletAddress}</code>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Gasless Transactions</p>
              <p className="text-sm text-muted-foreground">
                Use meta-transactions for gas-free interactions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="bg-white/10" />
          
          <Button 
            variant="outline" 
            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            Disconnect Wallet
          </Button>
        </div>
      </Card>
    </div>
  );
}
