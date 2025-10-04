import { Bell, Home, Compass, TrendingUp, Wallet, Trophy, Settings, User, MessageCircle, Sparkles, Users, Zap, Globe, Search, Menu, Plus, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { languages } from "../utils/sampleData";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isDemoMode: boolean;
  userProfile: any;
  userReputation: number;
  notificationCount: number;
  isOnline: boolean;
}

export function Header({
  currentPage,
  onPageChange,
  isDemoMode,
  userProfile,
  userReputation,
  notificationCount,
  isOnline
}: HeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "trending", label: "Trending", icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl text-gray-900">
                HeLa Social
              </h1>
              {isDemoMode && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Demo Mode
                </span>
              )}
            </div>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts, people, hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-full text-base focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  variant="ghost"
                  size="lg"
                  className={`relative h-12 px-6 ${
                    currentPage === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="ml-2 hidden xl:inline">{item.label}</span>
                </Button>
              );
            })}

            {/* Notifications */}
            <Button
              onClick={() => onPageChange("notifications")}
              variant="ghost"
              size="lg"
              className="relative h-12 w-12"
            >
              <Bell className="w-6 h-6" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white h-6 w-6 flex items-center justify-center p-0 text-xs rounded-full">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>

            {/* Messages */}
            <Button
              onClick={() => onPageChange("messages")}
              variant="ghost"
              size="lg"
              className="relative h-12 w-12"
            >
              <MessageCircle className="w-6 h-6" />
              <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white h-6 w-6 flex items-center justify-center p-0 text-xs rounded-full">
                3
              </Badge>
            </Button>

            {/* Create Post */}
            <Button
              onClick={() => {}}
              className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="lg" className="h-12 w-12">
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 max-h-96 overflow-y-auto">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={selectedLanguage === lang.code ? "bg-blue-50" : ""}
                  >
                    <span className="flex-1">{lang.name}</span>
                    <span className="text-sm text-gray-500">{lang.nativeName}</span>
                    {selectedLanguage === lang.code && (
                      <span className="ml-2 text-blue-600">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reputation */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-base text-gray-900">{userReputation}</span>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-12 w-12 rounded-full p-0">
                  <Avatar className="w-12 h-12 border-2 border-blue-500">
                    <AvatarImage src={userProfile?.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={userProfile?.avatar} />
                      <AvatarFallback>{userProfile?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-base text-gray-900">{userProfile?.name}</div>
                      <div className="text-sm text-gray-500">@{userProfile?.username}</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onPageChange("profile")} className="py-3">
                  <User className="w-5 h-5 mr-3" />
                  <span className="text-base">My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPageChange("wallet")} className="py-3">
                  <Wallet className="w-5 h-5 mr-3" />
                  <span className="text-base">Wallet</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPageChange("settings")} className="py-3">
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="text-base">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-3 text-red-600">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="text-base">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="lg"
            className="lg:hidden h-12 w-12"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setShowMobileMenu(false);
                    }}
                    variant="ghost"
                    className={`w-full justify-start h-12 text-base ${
                      currentPage === item.id ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}