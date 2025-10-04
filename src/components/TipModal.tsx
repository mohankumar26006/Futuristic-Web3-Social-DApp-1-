import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  DollarSign, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Heart
} from "lucide-react";
import { useState } from "react";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTip: (amount: number, token: string) => void;
  recipient: {
    name: string;
    username: string;
    avatar: string;
    walletAddress: string;
  };
}

export function TipModal({ isOpen, onClose, onTip, recipient }: TipModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("HELA");
  const [isTipping, setIsTipping] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
  const [txHash, setTxHash] = useState("");

  const tokens = [
    { symbol: "HELA", name: "HeLa Token", balance: "1,234.56", usdValue: "2.45" },
    { symbol: "USDC", name: "USD Coin", balance: "500.00", usdValue: "1.00" },
    { symbol: "USDT", name: "Tether USD", balance: "250.00", usdValue: "1.00" },
  ];

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);
  const amountInUSD = selectedTokenData ? (parseFloat(amount || "0") * parseFloat(selectedTokenData.usdValue)).toFixed(2) : "0.00";

  const handleTip = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsTipping(true);
    setTxStatus('pending');
    
    // Generate fake transaction hash
    const hash = `0x${Math.random().toString(16).substr(2, 64)}`;
    setTxHash(hash);

    // Simulate blockchain transaction
    setTimeout(() => {
      setTxStatus('confirmed');
      setTimeout(() => {
        onTip(parseFloat(amount), selectedToken);
        setAmount("");
        setSelectedToken("HELA");
        setIsTipping(false);
        setTxStatus('idle');
        setTxHash("");
        onClose();
      }, 2000);
    }, 3000);
  };

  const handleClose = () => {
    if (!isTipping) {
      setAmount("");
      setSelectedToken("HELA");
      setTxStatus('idle');
      setTxHash("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card/95 backdrop-blur-lg border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span>Send Tip</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipient info */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-gradient-to-r from-purple-400 to-teal-400">
                <AvatarImage src={recipient.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                  {recipient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{recipient.name}</div>
                <div className="text-sm text-muted-foreground">@{recipient.username}</div>
                <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded mt-1 block">
                  {recipient.walletAddress}
                </code>
              </div>
            </div>
          </div>

          {/* Token selection */}
          <div className="space-y-2">
            <Label htmlFor="token">Select Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken} disabled={isTipping}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-xs text-white">
                          {token.symbol[0]}
                        </div>
                        <span>{token.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{token.balance}</div>
                        <div className="text-xs text-muted-foreground">${(parseFloat(token.balance) * parseFloat(token.usdValue)).toFixed(2)}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-right text-lg pr-16 border-white/20 bg-background/50"
                disabled={isTipping}
                step="0.01"
                min="0"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                {selectedToken}
              </div>
            </div>
            {amount && (
              <div className="text-sm text-muted-foreground text-right">
                ≈ ${amountInUSD} USD
              </div>
            )}
          </div>

          {/* Quick amount buttons */}
          <div className="grid grid-cols-4 gap-2">
            {["1", "5", "10", "25"].map((value) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => setAmount(value)}
                disabled={isTipping}
                className="text-sm"
              >
                {value}
              </Button>
            ))}
          </div>

          {/* Transaction status */}
          {txStatus !== 'idle' && (
            <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                {txStatus === 'pending' ? (
                  <>
                    <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
                    <span className="text-sm">Processing tip transaction...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Tip sent successfully!</span>
                    <Heart className="w-4 h-4 text-red-400 fill-current" />
                  </>
                )}
              </div>
              {txHash && (
                <div className="space-y-1">
                  <code className="text-xs text-muted-foreground block">
                    {txHash}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-green-300 p-0 h-auto"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on HeLaScan
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Fan badge info */}
          {txStatus === 'confirmed' && (
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                  🏆 Fan Badge Earned!
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You've earned a "Supporter" badge for tipping {recipient.name}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isTipping}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTip}
              disabled={!amount || parseFloat(amount) <= 0 || isTipping}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              {isTipping ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Send Tip
                </>
              )}
            </Button>
          </div>

          {/* Gas fee info */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span>Network fee:</span>
              <span className="text-foreground">~0.001 HELA ($0.02)</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>Total cost:</span>
              <span className="text-foreground">
                {amount || "0"} {selectedToken} + fees
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}