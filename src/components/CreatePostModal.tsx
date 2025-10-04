import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Image, 
  Smile, 
  Zap, 
  Upload,
  X,
  CheckCircle,
  Clock,
  Gem,
  Sparkles
} from "lucide-react";
import { useState } from "react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string, image?: string) => void;
  userAvatar: string;
  userName: string;
}

export function CreatePostModal({ 
  isOpen, 
  onClose, 
  onPost, 
  userAvatar,
  userName 
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
  const [txHash, setTxHash] = useState<string>("");
  const [mintAsNFT, setMintAsNFT] = useState(false);

  const maxChars = 280;
  const remainingChars = maxChars - content.length;

  const handleImageUpload = () => {
    // Simulate image upload - in real app would handle file selection
    const images = [
      "https://images.unsplash.com/photo-1728597579051-2a48e8f7365c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwZ3JhZGllbnQlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NTg3NDExNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1732111816779-aeec50f788ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBibG9ja2NoYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTg3NDExNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ];
    setSelectedImage(images[Math.floor(Math.random() * images.length)]);
  };

  const handlePost = async () => {
    if (!content.trim()) return;

    setIsPosting(true);
    setTxStatus('pending');
    
    // Generate fake transaction hash
    const hash = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`;
    setTxHash(hash);

    // Simulate blockchain transaction
    setTimeout(() => {
      setTxStatus('confirmed');
      setTimeout(() => {
        onPost(content, selectedImage || undefined);
        setContent("");
        setSelectedImage(null);
        setIsPosting(false);
        setTxStatus('idle');
        setTxHash("");
        onClose();
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    if (!isPosting) {
      setContent("");
      setSelectedImage(null);
      setTxStatus('idle');
      setTxHash("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-lg border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span>Create On-Chain Post</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 ring-2 ring-gradient-to-r from-purple-400 to-teal-400">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-foreground">{userName}</div>
              <div className="text-sm text-muted-foreground">Posting to HeLa Blockchain</div>
            </div>
          </div>

          {/* Content input */}
          <div className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening on-chain?"
              className="min-h-32 text-lg border-white/20 bg-background/50 resize-none focus:ring-purple-400"
              maxLength={maxChars}
              disabled={isPosting}
            />
            
            {/* Character count */}
            <div className="flex justify-between items-center">
              <div className={`text-sm ${remainingChars < 20 ? 'text-red-400' : 'text-muted-foreground'}`}>
                {remainingChars} characters remaining
              </div>
              {remainingChars < 0 && (
                <Badge variant="destructive">
                  Over limit by {Math.abs(remainingChars)}
                </Badge>
              )}
            </div>
          </div>

          {/* Image preview */}
          {selectedImage && (
            <div className="relative rounded-xl overflow-hidden">
              <ImageWithFallback
                src={selectedImage}
                alt="Post image"
                className="w-full max-h-64 object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                disabled={isPosting}
              >
                <X className="w-4 h-4" />
              </Button>
              <Badge className="absolute bottom-2 left-2 bg-purple-500/80 text-white">
                Stored on IPFS
              </Badge>
            </div>
          )}

          {/* Transaction status */}
          {txStatus !== 'idle' && (
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-400/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                {txStatus === 'pending' ? (
                  <>
                    <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
                    <span className="text-sm">Publishing to HeLa blockchain...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Transaction confirmed!</span>
                  </>
                )}
              </div>
              {txHash && (
                <code className="text-xs text-muted-foreground block">
                  Transaction: {txHash}
                </code>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {/* Media options */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleImageUpload}
                disabled={isPosting}
                className="text-purple-400 hover:text-purple-300"
              >
                <Image className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={isPosting}
                className="text-purple-400 hover:text-purple-300"
              >
                <Smile className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2 ml-4">
                <input
                  type="checkbox"
                  id="mint-nft"
                  checked={mintAsNFT}
                  onChange={(e) => setMintAsNFT(e.target.checked)}
                  disabled={isPosting}
                  className="rounded border-white/20 bg-background/50"
                />
                <label htmlFor="mint-nft" className="text-sm text-muted-foreground flex items-center">
                  <Gem className="w-4 h-4 mr-1 text-purple-400" />
                  Mint as NFT
                </label>
              </div>
            </div>

            {/* Post button */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={handleClose}
                disabled={isPosting}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePost}
                disabled={!content.trim() || remainingChars < 0 || isPosting}
                className={`${
                  mintAsNFT 
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600" 
                    : "bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600"
                } text-white`}
              >
                {isPosting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    {mintAsNFT ? "Minting NFT..." : "Publishing..."}
                  </>
                ) : (
                  <>
                    {mintAsNFT ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Mint NFT Post
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Publish On-Chain
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Gas fee info */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span>Estimated gas fee:</span>
              <span className="text-foreground">
                ~{mintAsNFT ? "0.015" : "0.002"} HELA (${mintAsNFT ? "0.38" : "0.05"})
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>Network:</span>
              <span className="text-green-400">HeLa Mainnet</span>
            </div>
            {mintAsNFT && (
              <div className="flex items-center justify-between mt-1">
                <span>NFT Royalty:</span>
                <span className="text-purple-400">5% to creator</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}