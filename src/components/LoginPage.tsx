import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { 
  Wallet, 
  Mail, 
  QrCode,
  Sparkles,
  Users,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Zap,
  TrendingUp,
  DollarSign,
  Award,
  Flame,
  Heart,
  MessageCircle,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface LoginPageProps {
  onLogin: (demoMode: boolean, walletAddress?: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle wallet connect
  const handleWalletConnect = async () => {
    setIsLoading(true);
    toast.loading("Connecting to wallet...");
    
    setTimeout(() => {
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      toast.dismiss();
      toast.success("Wallet connected successfully!");
      onLogin(false, mockAddress);
      setIsLoading(false);
    }, 1500);
  };

  // handle email login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    
    setIsLoading(true);
    toast.loading("Signing in...");
    
    setTimeout(() => {
      toast.dismiss();
      toast.success("Logged in successfully!");
      onLogin(false, '0x' + Math.random().toString(16).substr(2, 40));
      setIsLoading(false);
    }, 1500);
  };

  // handle QR login
  const handleQRLogin = () => {
    toast.info("Open HeLa Social mobile app to scan QR code", {
      description: "Feature coming soon"
    });
  };

  // handle demo mode
  const handleDemoMode = () => {
    toast.success("Entering demo mode...");
    onLogin(true);
  };

  const loginMethods = [
    {
      id: "wallet",
      title: "Connect Wallet",
      subtitle: "MetaMask, WalletConnect, Coinbase",
      icon: Wallet,
      gradient: "from-orange-400 via-yellow-500 to-orange-600",
      shadowColor: "shadow-orange-500/50"
    },
    {
      id: "email",
      title: "Email Login",
      subtitle: "Sign in with your email account",
      icon: Mail,
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/50"
    },
    {
      id: "qr",
      title: "QR Code",
      subtitle: "Scan with HeLa mobile app",
      icon: QrCode,
      gradient: "from-purple-400 via-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/50"
    },
    {
      id: "demo",
      title: "Demo Mode",
      subtitle: "Explore without login",
      icon: Users,
      gradient: "from-cyan-400 via-cyan-500 to-cyan-600",
      shadowColor: "shadow-cyan-500/50"
    }
  ];

  const handleMethodClick = (method: any) => {
    setSelectedMethod(method.id);
    
    switch (method.id) {
      case "wallet":
        handleWalletConnect();
        break;
      case "qr":
        handleQRLogin();
        break;
      case "demo":
        handleDemoMode();
        break;
      // email stays selected for form
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full">
        {/* Left side - Hero */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16 text-white">
          {/* Logo */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50 transform rotate-6 hover:rotate-12 transition-transform">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl text-white mb-2">HeLa Social</h1>
                <p className="text-lg text-blue-200">Decentralized Social Network</p>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <div className="max-w-2xl text-center mb-12">
            <h2 className="text-6xl lg:text-7xl text-white mb-6 leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Web3 Social
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Connect, Create, and Earn on the blockchain. Own your content, control your data.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Blockchain Secured</h3>
              <p className="text-sm text-blue-200">All data stored on HeLa blockchain</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Earn Rewards</h3>
              <p className="text-sm text-blue-200">Get tipped for quality content</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">NFT Posts</h3>
              <p className="text-sm text-blue-200">Mint your posts as NFTs</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <div className="text-center">
              <div className="text-5xl text-white mb-2">10K+</div>
              <div className="text-sm text-blue-200">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-5xl text-white mb-2">50K+</div>
              <div className="text-sm text-blue-200">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-5xl text-white mb-2">₹2M+</div>
              <div className="text-sm text-blue-200">Tips Given</div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-[600px] bg-white shadow-2xl flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-3xl text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Choose your preferred login method</p>
          </div>

          {/* Login methods */}
          <div className="flex-1 p-8 space-y-4">
            {loginMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handleMethodClick(method)}
                  disabled={isLoading}
                  className={`w-full group relative overflow-hidden rounded-2xl transition-all ${
                    selectedMethod === method.id
                      ? 'ring-4 ring-blue-500 ring-offset-2'
                      : 'hover:scale-105'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative flex items-center gap-6 p-6 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-xl mb-1">{method.title}</div>
                      <div className="text-sm text-white/80">{method.subtitle}</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              );
            })}

            {/* Email Login Form */}
            {selectedMethod === "email" && (
              <Card className="mt-6 p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-base text-gray-900 mb-2 block">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 text-base bg-white border-2 border-gray-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-base text-gray-900 mb-2 block">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 text-base pr-12 bg-white border-2 border-gray-200 focus:border-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <button
                    type="button"
                    className="w-full text-sm text-blue-600 hover:text-blue-700 text-center pt-2"
                  >
                    Forgot password?
                  </button>
                </form>
              </Card>
            )}

            {/* Trust indicators */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Secured by HeLa Blockchain</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Your keys, your data</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Fully decentralized</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Globe className="w-4 h-4" />
                <span>English (US)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}