import { Link2, CheckCircle, ExternalLink, Plus } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface MultiChainIdentityPageProps {
  userProfile: any;
}

export function MultiChainIdentityPage({ userProfile }: MultiChainIdentityPageProps) {
  const connectedChains = [
    {
      id: "1",
      name: "Ethereum",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      address: "0x742d...35a3",
      ens: "helauser.eth",
      reputation: 85,
      verified: true
    },
    {
      id: "2",
      name: "Polygon",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
      address: "0x742d...35a3",
      ens: null,
      reputation: 78,
      verified: true
    },
    {
      id: "3",
      name: "HeLa Chain",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=hela",
      address: userProfile.walletAddress,
      ens: null,
      reputation: 95,
      verified: true
    }
  ];

  const availableChains = [
    { name: "Arbitrum", logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png" },
    { name: "Optimism", logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png" },
    { name: "Base", logo: "https://cryptologos.cc/logos/coinbase-coin-logo.png" }
  ];

  const unifiedReputation = Math.round(
    connectedChains.reduce((sum, chain) => sum + chain.reputation, 0) / connectedChains.length
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Multi-Chain Identity</h1>
        <p className="text-muted-foreground mt-1">
          Connect your identities across different blockchains
        </p>
      </div>

      {/* Unified Reputation */}
      <Card className="p-6 bg-gradient-to-r from-purple-600/20 to-teal-600/20 backdrop-blur-sm border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl">Unified Reputation Score</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Aggregated across all connected chains
            </p>
          </div>
          <div className="text-4xl font-bold text-purple-400">
            {unifiedReputation}
          </div>
        </div>
        
        <Progress value={unifiedReputation} className="h-2" />
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          {connectedChains.map((chain) => (
            <div key={chain.id} className="text-center">
              <p className="text-sm text-muted-foreground">{chain.name}</p>
              <p className="text-lg font-medium text-purple-400">{chain.reputation}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Connected Chains */}
      <div>
        <h2 className="text-xl mb-4">Connected Chains</h2>
        <div className="space-y-3">
          {connectedChains.map((chain) => (
            <Card 
              key={chain.id}
              className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={chain.logo} 
                    alt={chain.name}
                    className="w-12 h-12 rounded-full bg-white/10 p-2"
                  />
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{chain.name}</h3>
                      {chain.verified && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 mt-1">
                      <code className="text-sm text-muted-foreground">
                        {chain.address}
                      </code>
                      {chain.ens && (
                        <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                          {chain.ens}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Reputation</p>
                    <p className="text-lg font-medium text-purple-400">{chain.reputation}</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-white/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Chains */}
      <div>
        <h2 className="text-xl mb-4">Connect More Chains</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableChains.map((chain) => (
            <Card 
              key={chain.name}
              className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <img 
                  src={chain.logo} 
                  alt={chain.name}
                  className="w-16 h-16 rounded-full bg-white/10 p-3"
                />
                <h3 className="font-medium">{chain.name}</h3>
                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Connect
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cross-Chain Activity */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <h2 className="text-xl mb-4">Cross-Chain Activity</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-sm">Total Cross-Chain Transactions</p>
                <p className="text-xs text-muted-foreground">All connected chains</p>
              </div>
            </div>
            <p className="text-lg font-medium">247</p>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-600/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <p className="text-sm">Verified Credentials</p>
                <p className="text-xs text-muted-foreground">Across all platforms</p>
              </div>
            </div>
            <p className="text-lg font-medium">{connectedChains.filter(c => c.verified).length}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
