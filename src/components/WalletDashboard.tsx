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
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Copy,
  RefreshCw,
  Send,
  Download,
  CreditCard,
  PieChart,
  BarChart3,
  History,
  Zap,
  Star,
  Gift,
  Target,
  Shield
} from "lucide-react";

export function WalletDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const walletData = {
    address: "0x7a2b8c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    totalBalance: {
      usd: 2847.53,
      change24h: 12.4
    },
    tokens: [
      {
        symbol: "HELA",
        name: "HeLa Token",
        balance: 1234.56,
        usdValue: 2.45,
        change24h: 8.2,
        percentage: 45.2
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: 500.00,
        usdValue: 1.00,
        change24h: 0.1,
        percentage: 35.1
      },
      {
        symbol: "USDT",
        name: "Tether USD",
        balance: 250.00,
        usdValue: 1.00,
        change24h: -0.05,
        percentage: 19.7
      }
    ],
    earnings: {
      tipsReceived: 189.34,
      stakingRewards: 45.67,
      nftRoyalties: 23.45,
      questRewards: 12.89
    },
    recentTransactions: [
      {
        type: "tip_received",
        amount: 5.0,
        token: "HELA",
        from: "alice_crypto",
        timestamp: "2 hours ago",
        txHash: "0xabc123...def456",
        status: "confirmed"
      },
      {
        type: "tip_sent",
        amount: 3.5,
        token: "HELA",
        to: "bob_dev",
        timestamp: "4 hours ago",
        txHash: "0x789abc...123def",
        status: "confirmed"
      },
      {
        type: "post_reward",
        amount: 2.0,
        token: "HELA",
        timestamp: "6 hours ago",
        txHash: "0x456def...789abc",
        status: "confirmed"
      },
      {
        type: "stake_reward",
        amount: 1.25,
        token: "HELA",
        timestamp: "1 day ago",
        txHash: "0x321fed...654cba",
        status: "confirmed"
      },
      {
        type: "nft_sale",
        amount: 45.0,
        token: "HELA",
        timestamp: "2 days ago",
        txHash: "0x987fed...321abc",
        status: "confirmed"
      }
    ],
    socialEarnings: {
      thisWeek: 23.45,
      thisMonth: 89.12,
      allTime: 234.56,
      topTipper: "alice_crypto",
      topPost: "The Future of Web3 Social"
    },
    dfiPosition: {
      totalCollateral: 500.0,
      borrowedAmount: 200.0,
      availableCredit: 300.0,
      healthFactor: 2.5
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "tip_received":
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case "tip_sent":
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case "post_reward":
        return <Zap className="w-4 h-4 text-purple-400" />;
      case "stake_reward":
        return <Star className="w-4 h-4 text-yellow-400" />;
      case "nft_sale":
        return <Gift className="w-4 h-4 text-blue-400" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "tip_received": return "Tip Received";
      case "tip_sent": return "Tip Sent";
      case "post_reward": return "Post Reward";
      case "stake_reward": return "Staking Reward";
      case "nft_sale": return "NFT Sale";
      default: return "Transaction";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Wallet Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your assets, track earnings, and monitor DeFi positions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-background/50 border-white/20"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-teal-500 text-white">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/20 to-teal-500/20 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Total Balance</span>
                </div>
                <Badge className={`${walletData.totalBalance.change24h >= 0 ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
                  {walletData.totalBalance.change24h >= 0 ? '+' : ''}{walletData.totalBalance.change24h}%
                </Badge>
              </div>
              <div className="text-2xl font-bold text-foreground">
                ${walletData.totalBalance.usd.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowDownLeft className="w-5 h-5 text-green-400" />
                <span className="text-sm text-muted-foreground">Tips Received</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {walletData.earnings.tipsReceived} HELA
              </div>
              <div className="text-xs text-muted-foreground">
                This month: +{walletData.socialEarnings.thisMonth} HELA
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-muted-foreground">Staking Rewards</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {walletData.earnings.stakingRewards} HELA
              </div>
              <div className="text-xs text-muted-foreground">
                APY: 12.5%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-muted-foreground">DeFi Health</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {walletData.dfiPosition.healthFactor}x
              </div>
              <div className="text-xs text-green-400">
                Safe Position
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-background/50 border border-white/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="transactions">History</TabsTrigger>
          <TabsTrigger value="social">Social Earnings</TabsTrigger>
          <TabsTrigger value="defi">DeFi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Token Distribution */}
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  <span>Token Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {walletData.tokens.map((token, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white text-sm">
                          {token.symbol[0]}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{token.symbol}</div>
                          <div className="text-sm text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">
                          {token.balance.toLocaleString()} {token.symbol}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${(token.balance * token.usdValue).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Progress value={token.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{token.percentage}% of portfolio</span>
                      <span className={token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-background/50 border-white/20">
                    <Send className="w-5 h-5 mb-1" />
                    <span className="text-sm">Send</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-background/50 border-white/20">
                    <Download className="w-5 h-5 mb-1" />
                    <span className="text-sm">Receive</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-background/50 border-white/20">
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span className="text-sm">Buy</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-background/50 border-white/20">
                    <BarChart3 className="w-5 h-5 mb-1" />
                    <span className="text-sm">Stake</span>
                  </Button>
                </div>
                
                {/* Wallet Address */}
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Wallet Address</div>
                  <div className="flex items-center justify-between">
                    <code className="text-sm text-foreground">
                      {walletData.address.slice(0, 8)}...{walletData.address.slice(-8)}
                    </code>
                    <Button size="sm" variant="ghost">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5 text-purple-400" />
                <span>Transaction History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {walletData.recentTransactions.map((tx, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(tx.type)}
                      <div>
                        <div className="font-medium text-foreground">
                          {getTransactionLabel(tx.type)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tx.timestamp}
                          {(tx.from || tx.to) && (
                            <span> • {tx.from ? `from @${tx.from}` : `to @${tx.to}`}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-medium ${
                        tx.type === 'tip_received' || tx.type === 'post_reward' || tx.type === 'stake_reward' || tx.type === 'nft_sale'
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {tx.type === 'tip_received' || tx.type === 'post_reward' || tx.type === 'stake_reward' || tx.type === 'nft_sale' ? '+' : '-'}
                        {tx.amount} {tx.token}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {tx.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`https://helascan.com/tx/${tx.txHash}`, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Social Earnings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {walletData.socialEarnings.thisWeek}
                    </div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {walletData.socialEarnings.thisMonth}
                    </div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {walletData.socialEarnings.allTime}
                    </div>
                    <div className="text-sm text-muted-foreground">All Time</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Top Tipper</span>
                    <span className="font-medium text-foreground">@{walletData.socialEarnings.topTipper}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Top Earning Post</span>
                    <span className="font-medium text-foreground">{walletData.socialEarnings.topPost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span>Earning Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(walletData.earnings).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium text-foreground">{value} HELA</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="defi" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>DeFi Position</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {walletData.dfiPosition.totalCollateral} HELA
                  </div>
                  <div className="text-sm text-muted-foreground">Total Collateral</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {walletData.dfiPosition.borrowedAmount} USDC
                  </div>
                  <div className="text-sm text-muted-foreground">Borrowed</div>
                </div>
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {walletData.dfiPosition.healthFactor}x
                  </div>
                  <div className="text-sm text-muted-foreground">Health Factor</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Available Credit</span>
                  <span className="font-medium text-foreground">
                    ${walletData.dfiPosition.availableCredit} USDC
                  </span>
                </div>
                <Progress 
                  value={(walletData.dfiPosition.borrowedAmount / (walletData.dfiPosition.borrowedAmount + walletData.dfiPosition.availableCredit)) * 100} 
                  className="h-2" 
                />
                <div className="text-xs text-muted-foreground">
                  Using {((walletData.dfiPosition.borrowedAmount / (walletData.dfiPosition.borrowedAmount + walletData.dfiPosition.availableCredit)) * 100).toFixed(1)}% of available credit
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  Borrow More
                </Button>
                <Button variant="outline" className="flex-1 bg-background/50 border-white/20">
                  Repay
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}