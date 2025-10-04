import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { motion } from "motion/react";
import { 
  Heart, 
  DollarSign, 
  Reply, 
  MoreHorizontal,
  Clock,
  CheckCircle,
  ExternalLink,
  Smile,
  Send,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    walletAddress: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  tips: number;
  tipAmount: number;
  isLiked: boolean;
  isTipped: boolean;
  transactionHash?: string;
  isConfirmed: boolean;
  replies?: Comment[];
  isExpanded?: boolean;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postAuthor: string;
  postContent: string;
}

export function CommentsModal({ 
  isOpen, 
  onClose, 
  postId, 
  postAuthor, 
  postContent 
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Alice Chen",
        username: "alice_crypto",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        walletAddress: "0x7a2b...4c5d",
        isVerified: true
      },
      content: "This is exactly what the Web3 space needs! The transparency and direct creator monetization is revolutionary. 🚀",
      timestamp: "2 hours ago",
      likes: 23,
      tips: 5,
      tipAmount: 12.5,
      isLiked: false,
      isTipped: false,
      transactionHash: "0xabc123...def456",
      isConfirmed: true,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Bob Developer",
            username: "bob_dev",
            avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            walletAddress: "0x9f8e...2a1b"
          },
          content: "Absolutely agree! The on-chain verification adds so much trust to the platform.",
          timestamp: "1 hour ago",
          likes: 8,
          tips: 2,
          tipAmount: 3.0,
          isLiked: true,
          isTipped: false,
          transactionHash: "0x789abc...123def",
          isConfirmed: true
        }
      ],
      isExpanded: true
    },
    {
      id: "2",
      author: {
        name: "Carol Designer",
        username: "carol_design",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        walletAddress: "0x3c4d...7e8f",
        isVerified: true
      },
      content: "The UI/UX is incredible! Love how smooth the Web3 interactions feel. This is how social media should work in the future. 🎨✨",
      timestamp: "4 hours ago",
      likes: 45,
      tips: 12,
      tipAmount: 28.5,
      isLiked: false,
      isTipped: true,
      transactionHash: "0x456def...789abc",
      isConfirmed: false,
      replies: [],
      isExpanded: false
    },
    {
      id: "3",
      author: {
        name: "David Kim",
        username: "david_tech",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        walletAddress: "0x5e6f...8c9d"
      },
      content: "Great post! Looking forward to seeing how this platform evolves. The reputation system is particularly interesting.",
      timestamp: "6 hours ago",
      likes: 12,
      tips: 3,
      tipAmount: 7.5,
      isLiked: false,
      isTipped: false,
      transactionHash: "0x321fed...654cba",
      isConfirmed: true,
      replies: [],
      isExpanded: false
    }
  ]);

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId 
              ? {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                }
              : reply
          )
        };
      }
      return comment;
    }));
  };

  const handleTip = (commentId: string) => {
    // Mock tipping functionality
    console.log("Tipping comment:", commentId);
  };

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Demo User",
        username: "demouser",
        avatar: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        walletAddress: "0xDemo...User"
      },
      content: newComment,
      timestamp: "now",
      likes: 0,
      tips: 0,
      tipAmount: 0,
      isLiked: false,
      isTipped: false,
      transactionHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
      isConfirmed: false,
      replies: [],
      isExpanded: false
    };

    if (replyTo) {
      // Add as reply
      setComments(comments.map(comment => {
        if (comment.id === replyTo) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newCommentObj],
            isExpanded: true
          };
        }
        return comment;
      }));
    } else {
      // Add as top-level comment
      setComments([newCommentObj, ...comments]);
    }

    setNewComment("");
    setReplyTo(null);
  };

  const toggleReplies = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, isExpanded: !comment.isExpanded }
        : comment
    ));
  };

  const renderComment = (comment: Comment, depth = 0) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${depth > 0 ? 'ml-6 mt-3' : 'mb-4'}`}
    >
      <div className={`p-4 rounded-lg ${depth > 0 ? 'bg-muted/20' : 'bg-muted/30'} hover:bg-muted/40 transition-colors`}>
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 ring-2 ring-gradient-to-r from-purple-400 to-teal-400">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                {comment.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">{comment.author.name}</span>
                {comment.author.isVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
                <span className="text-muted-foreground text-sm">@{comment.author.username}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{comment.timestamp}</span>
                <span>•</span>
                <code className="bg-muted px-1 rounded">{comment.author.walletAddress}</code>
                {comment.isConfirmed ? (
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Confirmed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Comment Content */}
        <p className="text-foreground leading-relaxed mb-3">{comment.content}</p>

        {/* Comment Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(comment.id)}
              className={`flex items-center space-x-1 ${
                comment.isLiked ? 'text-red-400 hover:text-red-300' : 'text-muted-foreground hover:text-red-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </Button>

            {/* Tip */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleTip(comment.id)}
              className={`flex items-center space-x-1 ${
                comment.isTipped ? 'text-green-400 hover:text-green-300' : 'text-muted-foreground hover:text-green-400'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>{comment.tips}</span>
              {comment.tipAmount > 0 && (
                <Badge variant="outline" className="text-green-400 border-green-400 ml-1">
                  {comment.tipAmount} HELA
                </Badge>
              )}
            </Button>

            {/* Reply */}
            {depth === 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReply(comment.id)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-blue-400"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </Button>
            )}

            {/* Toggle Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleReplies(comment.id)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-purple-400"
              >
                {comment.isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span>{comment.replies.length} replies</span>
              </Button>
            )}
          </div>

          {/* View Transaction */}
          {comment.transactionHash && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`https://helascan.com/tx/${comment.transactionHash}`, '_blank')}
              className="text-purple-400 hover:text-purple-300"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Reply Input */}
        {replyTo === comment.id && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                  DU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Reply to @${comment.author.username}...`}
                  className="min-h-20 border-white/20 bg-background/50 resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-gradient-to-r from-purple-500 to-teal-500 text-white"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.isExpanded && (
        <div className="mt-3">
          {comment.replies.map(reply => renderComment(reply, depth + 1))}
        </div>
      )}
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card/95 backdrop-blur-lg border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Reply className="w-5 h-5 text-purple-400" />
            <span>Comments</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Post */}
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-teal-500/10 border border-purple-400/20 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Original post by @{postAuthor}</div>
            <p className="text-foreground">{postContent}</p>
          </div>

          {/* Add Comment */}
          {!replyTo && (
            <div className="flex space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg2OTU5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white">
                  DU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts on-chain..."
                  className="min-h-24 border-white/20 bg-background/50 resize-none"
                />
                <div className="flex items-center justify-between mt-3">
                  <Button variant="ghost" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim()}
                    className="bg-gradient-to-r from-purple-500 to-teal-500 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Comment On-Chain
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <ScrollArea className="h-96">
            <div className="space-y-1">
              {comments.map(comment => renderComment(comment))}
            </div>
          </ScrollArea>

          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Reply className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No comments yet</h3>
              <p>Be the first to share your thoughts on this post!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}