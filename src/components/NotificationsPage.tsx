import { Heart, MessageSquare, Coins, Trophy, Clock, CheckCheck, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { sampleNotifications } from "../utils/sampleData";

interface NotificationsPageProps {
  notifications?: any[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

export function NotificationsPage({ 
  notifications = sampleNotifications,
  onMarkAsRead,
  onMarkAllAsRead 
}: NotificationsPageProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'comment': return <MessageSquare className="w-5 h-5 text-blue-400" />;
      case 'like': return <Heart className="w-5 h-5 text-red-400" />;
      case 'tip': return <Coins className="w-5 h-5 text-yellow-400" />;
      case 'badge': return <Trophy className="w-5 h-5 text-purple-400" />;
      case 'pending': return <Clock className="w-5 h-5 text-orange-400" />;
      case 'quest': return <Trophy className="w-5 h-5 text-teal-400" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationText = (notif: any) => {
    switch (notif.type) {
      case 'comment':
        return (
          <>
            <span className="font-medium">{notif.user.name}</span> commented: "{notif.message}"
          </>
        );
      case 'like':
        return (
          <>
            <span className="font-medium">{notif.user.name}</span> liked your post "{notif.postContent}"
          </>
        );
      case 'tip':
        if (notif.target) {
          return (
            <>
              <span className="font-medium">{notif.user.name}</span> tipped{' '}
              <span className="text-yellow-400">{notif.amount} {notif.token}</span> →{' '}
              <span className="font-medium">{notif.target.name}</span>
            </>
          );
        }
        return (
          <>
            <span className="font-medium">{notif.user.name}</span> tipped you{' '}
            <span className="text-yellow-400">{notif.amount} {notif.token}</span>
          </>
        );
      case 'badge':
        return <>You earned <span className="font-medium text-purple-400">{notif.badge}</span>!</>;
      case 'pending':
        return (
          <>
            Pending tip from <span className="font-medium">{notif.user.name}</span>{' '}
            ({notif.amount} {notif.token})
          </>
        );
      case 'quest':
        return <>Quest Completed: <span className="font-medium text-teal-400">"{notif.quest}"</span></>;
      default:
        return null;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} new` : 'all caught up!'}
          </p>
        </div>
        {unreadCount > 0 && onMarkAllAsRead && (
          <Button
            variant="outline"
            onClick={onMarkAllAsRead}
            className="border-white/10 hover:bg-white/5"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="divide-y divide-white/5">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-purple-500/5' : ''
                }`}
                onClick={() => onMarkAsRead && !notif.read && onMarkAsRead(notif.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !notif.read ? 'bg-purple-600/20' : 'bg-white/10'
                  }`}>
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      {getNotificationText(notif)}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {notif.timestamp}
                      </span>

                      {notif.transactionHash && (
                        <a
                          href={`https://explorer.hela.network/tx/${notif.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {notif.transactionHash}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {!notif.read && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
