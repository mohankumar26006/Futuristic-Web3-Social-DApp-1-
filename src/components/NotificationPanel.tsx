import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  X, 
  Check, 
  CheckCheck, 
  Heart, 
  MessageCircle, 
  DollarSign, 
  UserPlus,
  AtSign,
  Bell,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: Date;
  read: boolean;
  user: {
    name: string;
    avatar: string;
  };
  amount?: number;
  token?: string;
  transactionHash?: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationPanel({ 
  notifications, 
  onClose, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationPanelProps) {
  const [filter, setFilter] = useState<string>("all");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-400" />;
      case 'tip': 
      case 'tip_received': return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'follow': return <UserPlus className="w-4 h-4 text-purple-400" />;
      case 'mention': return <AtSign className="w-4 h-4 text-yellow-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like': return 'border-l-red-400';
      case 'tip': 
      case 'tip_received': return 'border-l-green-400';
      case 'comment': return 'border-l-blue-400';
      case 'follow': return 'border-l-purple-400';
      case 'mention': return 'border-l-yellow-400';
      default: return 'border-l-gray-400';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.read;
    if (filter === "tips") return notif.type.includes('tip');
    if (filter === "social") return ['like', 'comment', 'follow', 'mention'].includes(notif.type);
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-card/95 backdrop-blur-sm border-white/10 flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-purple-400" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onMarkAllAsRead}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 mt-3">
              {[
                { key: "all", label: "All" },
                { key: "unread", label: "Unread" },
                { key: "tips", label: "Tips" },
                { key: "social", label: "Social" }
              ].map((tab) => (
                <Button
                  key={tab.key}
                  variant={filter === tab.key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(tab.key)}
                  className={filter === tab.key 
                    ? "bg-purple-500/20 text-purple-300" 
                    : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-4 pt-0">
                <AnimatePresence>
                  {filteredNotifications.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">No notifications yet</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Your activity updates will appear here
                      </p>
                    </motion.div>
                  ) : (
                    filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          group p-3 rounded-lg border-l-4 transition-all cursor-pointer
                          ${getNotificationColor(notification.type)}
                          ${notification.read 
                            ? 'bg-muted/20 hover:bg-muted/30' 
                            : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-400/50'
                          }
                        `}
                        onClick={() => !notification.read && onMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8 ring-1 ring-white/20">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-teal-400 text-white text-xs">
                              {notification.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start space-x-2">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1">
                                <div className="text-sm text-foreground leading-relaxed">
                                  <span className="font-medium">{notification.user.name}</span>
                                  {' '}
                                  <span>{notification.message}</span>
                                  {notification.amount && (
                                    <Badge variant="outline" className="ml-2 text-green-400 border-green-400">
                                      {notification.amount} {notification.token}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTime(notification.timestamp)}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    )}
                                    {notification.transactionHash && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs text-purple-400 hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(`https://helascan.com/tx/${notification.transactionHash}`, '_blank');
                                        }}
                                      >
                                        View Tx
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}