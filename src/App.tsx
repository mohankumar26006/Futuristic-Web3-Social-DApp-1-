import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ProfilePage } from "./components/ProfilePage";
import { ExplorePage } from "./components/ExplorePage";
import { NotificationsPage } from "./components/NotificationsPage";
import { SavedPostsPage } from "./components/SavedPostsPage";
import { StoriesPage } from "./components/StoriesPage";
import { TrendingPage } from "./components/TrendingPage";
import { NFTGalleryPage } from "./components/NFTGalleryPage";
import { WalletDashboard } from "./components/WalletDashboard";
import { QuestHub } from "./components/QuestHub";
import { ChallengesPage } from "./components/ChallengesPage";
import { ReputationDashboard } from "./components/ReputationDashboard";
import { AchievementsBadgesPage } from "./components/AchievementsBadgesPage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { DAOGovernancePage } from "./components/DAOGovernancePage";
import { ContentReportingPage } from "./components/ContentReportingPage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { CreatorMonetizationPage } from "./components/CreatorMonetizationPage";
import { YearInReviewPage } from "./components/YearInReviewPage";
import { TokenGatedCommunitiesPage } from "./components/TokenGatedCommunitiesPage";
import { DirectMessagingPage } from "./components/DirectMessagingPage";
import { AdMarketplacePage } from "./components/AdMarketplacePage";
import { LiveActivityFeedPage } from "./components/LiveActivityFeedPage";
import { MultiChainIdentityPage } from "./components/MultiChainIdentityPage";
import { SettingsPage } from "./components/SettingsPage";
import { HelpFAQPage } from "./components/HelpFAQPage";
import { CreatePostModal } from "./components/CreatePostModal";
import { TipModal } from "./components/TipModal";
import { CommentsModal } from "./components/CommentsModal";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

export default function App() {
  // auth stuff
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [needsSignup, setNeedsSignup] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  
  // user data
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userReputation, setUserReputation] = useState(1247);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // posts and app state
  const [posts, setPosts] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  
  // modals
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedTipRecipient, setSelectedTipRecipient] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // TODO: get real network stats from blockchain
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 2845692,
    gasPrice: 0.001,
    tps: 1247,
    tvl: 1.2
  });

  // simulate network stats - this would be real blockchain data in production
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      // fake data for demo, TODO: hook up to real HeLa blockchain API
      setNetworkStats(prev => ({
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3) + 1,
        gasPrice: Math.max(0.001, prev.gasPrice + (Math.random() - 0.5) * 0.0005),
        tps: Math.max(500, prev.tps + Math.floor((Math.random() - 0.5) * 200)),
        tvl: Math.max(1.0, prev.tvl + (Math.random() - 0.5) * 0.1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Real-time notifications
  useEffect(() => {
    if (!isLoggedIn || !userProfile) return;

    const interval = setInterval(() => {
      const notificationTypes = ['like', 'tip', 'comment', 'follow', 'mention'];
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      
      const newNotification = {
        id: Date.now(),
        type,
        message: getNotificationMessage(type),
        timestamp: new Date(),
        read: false,
        user: {
          name: `User ${Math.floor(Math.random() * 1000)}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
        }
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 49)]);
      setUnreadCount(prev => prev + 1);
      
      playNotificationSound();
    }, 20000);

    return () => clearInterval(interval);
  }, [isLoggedIn, userProfile]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Connection restored");
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Connection lost");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getNotificationMessage = (type: string) => {
    switch (type) {
      case 'like': return 'liked your post';
      case 'tip': return 'sent you a tip';
      case 'comment': return 'commented on your post';
      case 'follow': return 'started following you';
      case 'mention': return 'mentioned you in a post';
      default: return 'interacted with your content';
    }
  };

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Notification sound not supported');
    }
  };

  const handleLogin = (demoMode: boolean, walletAddress?: string) => {
    console.log('login attempt, demo mode:', demoMode);
    
    if (demoMode) {
      // demo mode - no wallet needed
      setIsDemoMode(true);
      setUserProfile({
        username: "demo_user",
        name: "Demo User",
        bio: "just testing out hela social",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
        walletAddress: "0xDemo...User",
        isVerified: true
      });
      setIsLoggedIn(true);
      toast.success("Welcome to demo mode!", {
        description: "no wallet needed"
      });
    } else {
      // wallet login - check if profile exists
      const hasProfile = Math.random() > 0.5; // TODO: actually check backend
      console.log('has profile:', hasProfile);
      
      if (hasProfile) {
        setUserProfile({
          username: "crypto_enthusiast",
          name: "Crypto Enthusiast",
          bio: "web3 builder",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
          walletAddress: walletAddress || "0x7a2b...4c5d",
          isVerified: true
        });
        setIsLoggedIn(true);
        toast.success("wallet connected!", {
          description: "welcome back"
        });
      } else {
        // new user - needs signup
        setNeedsSignup(true);
        setUserProfile({
          walletAddress: walletAddress || "0x7a2b...4c5d"
        });
      }
    }
  };

  const handleSignup = (username: string, name: string, bio: string, avatar: string) => {
    setUserProfile({
      username,
      name,
      bio,
      avatar,
      walletAddress: userProfile.walletAddress,
      isVerified: false
    });
    setNeedsSignup(false);
    setIsLoggedIn(true);
    toast.success("Profile created on HeLa blockchain!", {
      description: "Your on-chain identity is now live"
    });
  };

  const handleCreatePost = (content: string, image?: string, isNFT?: boolean) => {
    // create new post and add to top of feed
    console.log('creating post, is NFT:', isNFT);
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: userProfile.name,
        username: userProfile.username,
        avatar: userProfile.avatar,
        walletAddress: userProfile.walletAddress,
        isVerified: userProfile.isVerified
      },
      content,
      image,
      isNFT: isNFT || false,
      timestamp: "now",
      likes: 0,
      comments: 0,
      tips: 0,
      tipAmount: 0,
      isLiked: false,
      isTipped: false,
      transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`, // just generating fake hash for demo
      isConfirmed: false
    };

    setPosts(prev => [newPost, ...prev]);
    
    toast.success(
      isNFT ? "NFT Post minted!" : "Post published!", 
      {
        description: isNFT 
          ? "minted on-chain as nft"
          : "posted to hela blockchain"
      }
    );
    
    // fake blockchain confirmation - would be real in production
    setTimeout(() => {
      setPosts(prev => prev.map(post => 
        post.id === newPost.id 
          ? { ...post, isConfirmed: true }
          : post
      ));
      toast.success("Transaction confirmed!");
    }, 3000);
    
    // add reputation points
    setUserReputation(prev => prev + (isNFT ? 15 : 5));
    playNotificationSound();
  };

  const handleTip = (recipient: any) => {
    setSelectedTipRecipient(recipient);
    setShowTipModal(true);
  };

  const handleSendTip = (amount: number, token: string) => {
    toast.success(`Tip sent successfully!`, {
      description: `${amount} ${token} sent to ${selectedTipRecipient?.name}`
    });
    
    setPosts(prev => prev.map(post => {
      if (post.author.walletAddress === selectedTipRecipient?.walletAddress) {
        return {
          ...post,
          tips: post.tips + 1,
          tipAmount: post.tipAmount + amount,
          isTipped: true
        };
      }
      return post;
    }));
    
    setUserReputation(prev => prev + 2);
    playNotificationSound();
  };

  const handleComment = (post: any) => {
    setSelectedPost(post);
    setShowCommentsModal(true);
  };

  // Render login page
  if (!isLoggedIn && !needsSignup) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Render signup page
  if (needsSignup) {
    return <SignupPage onSignup={handleSignup} walletAddress={userProfile.walletAddress} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onCreatePost={() => setShowCreatePost(true)}
            onTip={handleTip}
            onComment={handleComment}
            posts={posts}
            setPosts={setPosts}
            networkStats={networkStats}
            isOnline={isOnline}
          />
        );
      case "profile":
        return (
          <ProfilePage
            userProfile={userProfile}
            isOwnProfile={true}
            userReputation={userReputation}
          />
        );
      case "explore":
        return (
          <ExplorePage
            onTip={handleTip}
            onComment={handleComment}
          />
        );
      case "notifications":
        return (
          <NotificationsPage
            notifications={notifications}
            onMarkAsRead={(id) => {
              setNotifications(prev => 
                prev.map(notif => 
                  notif.id === id ? { ...notif, read: true } : notif
                )
              );
              setUnreadCount(prev => Math.max(0, prev - 1));
            }}
            onMarkAllAsRead={() => {
              setNotifications(prev => 
                prev.map(notif => ({ ...notif, read: true }))
              );
              setUnreadCount(0);
            }}
          />
        );
      case "saved":
        return <SavedPostsPage />;
      case "stories":
        return <StoriesPage />;
      case "trending":
        return <TrendingPage onTip={handleTip} onComment={handleComment} />;
      case "nft-gallery":
        return <NFTGalleryPage userProfile={userProfile} />;
      case "wallet":
        return <WalletDashboard userProfile={userProfile} />;
      case "quests":
        return <QuestHub userReputation={userReputation} />;
      case "challenges":
        return <ChallengesPage />;
      case "reputation":
        return <ReputationDashboard userReputation={userReputation} />;
      case "achievements":
        return <AchievementsBadgesPage userReputation={userReputation} />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "governance":
        return <DAOGovernancePage userReputation={userReputation} />;
      case "reporting":
        return <ContentReportingPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "monetization":
        return <CreatorMonetizationPage />;
      case "year-review":
        return <YearInReviewPage />;
      case "communities":
        return <TokenGatedCommunitiesPage userProfile={userProfile} />;
      case "messages":
        return <DirectMessagingPage />;
      case "ads":
        return <AdMarketplacePage />;
      case "live-feed":
        return <LiveActivityFeedPage />;
      case "multi-chain":
        return <MultiChainIdentityPage userProfile={userProfile} />;
      case "settings":
        return <SettingsPage userProfile={userProfile} onUpdateProfile={setUserProfile} />;
      case "help":
        return <HelpFAQPage />;
      default:
        return (
          <HomePage
            onCreatePost={() => setShowCreatePost(true)}
            onTip={handleTip}
            onComment={handleComment}
            posts={posts}
            setPosts={setPosts}
            networkStats={networkStats}
            isOnline={isOnline}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isDemoMode={isDemoMode}
        userProfile={userProfile}
        userReputation={userReputation}
        notificationCount={unreadCount}
        isOnline={isOnline}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {renderCurrentPage()}
      </main>

      {/* Modals */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onPost={handleCreatePost}
        userAvatar={userProfile?.avatar}
        userName={userProfile?.name}
      />

      {selectedTipRecipient && (
        <TipModal
          isOpen={showTipModal}
          onClose={() => {
            setShowTipModal(false);
            setSelectedTipRecipient(null);
          }}
          onTip={handleSendTip}
          recipient={selectedTipRecipient}
        />
      )}

      {selectedPost && (
        <CommentsModal
          isOpen={showCommentsModal}
          onClose={() => {
            setShowCommentsModal(false);
            setSelectedPost(null);
          }}
          post={selectedPost}
        />
      )}

      {/* Connection Status Indicator */}
      {!isOnline && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md z-50 flex items-center space-x-2 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>Offline - Check your connection</span>
        </div>
      )}

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: 'white',
          },
        }}
      />
    </div>
  );
}
