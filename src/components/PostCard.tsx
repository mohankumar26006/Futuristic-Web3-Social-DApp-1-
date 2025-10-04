import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Heart, 
  MessageCircle, 
  DollarSign, 
  ExternalLink,
  CheckCircle,
  Share2,
  Bookmark,
  MoreHorizontal
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      username: string;
      avatar: string;
      walletAddress: string;
      isVerified?: boolean;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    tips: number;
    tipAmount: number;
    isLiked: boolean;
    isTipped: boolean;
    isNFT?: boolean;
    transactionHash?: string;
    isConfirmed: boolean;
  };
  onLike: () => void;
  onComment: () => void;
  onTip: () => void;
}

export function PostCard({ 
  post, 
  onLike, 
  onComment, 
  onTip
}: PostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // handle like with animation
  const handleLike = () => {
    onLike();
    if (!post.isLiked) {
      toast.success("Post liked!", {
        description: "Transaction recorded on-chain"
      });
    }
  };

  // handle bookmark
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from saved" : "Saved to bookmarks");
  };

  // handle share
  const handleShare = () => {
    setIsSharing(true);
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsSharing(false), 1000);
  };

  // view on block explorer
  const viewTransaction = () => {
    if (post.transactionHash) {
      window.open(`https://helascan.io/tx/${post.transactionHash}`, '_blank');
    }
  };

  return (
    <Card className="bg-white border border-gray-200 hover:border-gray-300 transition-all">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="w-11 h-11 border-2 border-gray-100">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 truncate">{post.author.name}</span>
                {post.author.isVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                )}
                {post.isNFT && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    NFT
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>@{post.author.username}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="flex-shrink-0">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-3">
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap mb-3">
            {post.content}
          </p>
          {post.image && (
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <ImageWithFallback
                src={post.image}
                alt="Post image"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>

        {/* Blockchain status */}
        {post.transactionHash && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span className="text-green-900">On-chain</span>
              <code className="text-green-700 font-mono">
                {post.transactionHash.substring(0, 10)}...
              </code>
            </div>
            <button
              onClick={viewTransaction}
              className="text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              View
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {/* Like button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`gap-2 ${
                post.isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart 
                className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`}
              />
              <span>{post.likes}</span>
            </Button>

            {/* Comment button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onComment}
              className="gap-2 text-gray-600 hover:text-blue-500"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </Button>

            {/* Tip button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onTip}
              className={`gap-2 ${
                post.isTipped 
                  ? 'text-green-600 hover:text-green-700' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>{post.tips}</span>
              {post.tipAmount > 0 && (
                <span className="text-xs text-green-600">
                  {post.tipAmount} HELA
                </span>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-1">
            {/* Bookmark */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`${
                isBookmarked 
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-600 hover:text-blue-600"
              disabled={isSharing}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Engagement preview */}
        {(post.likes > 0 || post.tips > 0) && (
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
            {post.likes > 0 && <span>{post.likes.toLocaleString()} likes</span>}
            {post.likes > 0 && post.tips > 0 && <span> • </span>}
            {post.tips > 0 && (
              <span className="text-green-600">
                {post.tips} tips (₹{(post.tipAmount * 85).toFixed(2)})
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
