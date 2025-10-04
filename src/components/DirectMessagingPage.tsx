import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  DollarSign,
  Smile,
  Paperclip,
  Image as ImageIcon
} from "lucide-react";
import { sampleConversations, sampleMessages, sampleUsers } from "../utils/sampleData";
import { toast } from "sonner@2.0.3";

export function DirectMessagingPage() {
  const [selectedConv, setSelectedConv] = useState(sampleConversations[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");

  // send message
  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      id: `msg${Date.now()}`,
      sender: "me",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setMessage("");
    
    // simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        "That's great!",
        "Interesting point",
        "I agree!",
        "Tell me more",
        "Thanks for sharing",
        "Looking forward to it!"
      ];
      const reply = {
        id: `msg${Date.now() + 1}`,
        sender: "them",
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  // send quick tip
  const handleQuickTip = (amount: number) => {
    const tipMsg = {
      id: `msg${Date.now()}`,
      sender: "me",
      text: `Sent ${amount} HELA 💎`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTip: true,
      tipAmount: amount
    };
    setMessages([...messages, tipMsg]);
    toast.success(`Sent ${amount} HELA to ${selectedConv.user.name}`);
  };

  // filter conversations
  const filteredConversations = sampleConversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-120px)]">
      <Card className="h-full flex overflow-hidden">
        {/* conversations list */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
          </div>

          {/* conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConv.id === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conv.user.avatar} />
                      <AvatarFallback>
                        {conv.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-900 truncate">{conv.user.name}</span>
                      <span className="text-xs text-gray-500">{conv.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <Badge className="bg-blue-500 text-white ml-2">{conv.unread}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* chat area */}
        <div className="flex-1 flex flex-col">
          {/* chat header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConv.user.avatar} />
                  <AvatarFallback>
                    {selectedConv.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {selectedConv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <div className="text-gray-900">{selectedConv.user.name}</div>
                <div className="text-xs text-gray-500">
                  {selectedConv.online ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-2 ${
                    msg.sender === 'me'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  } ${(msg as any).isTip ? 'border-2 border-green-500' : ''}`}
                >
                  <p className="break-words">{msg.text}</p>
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </div>
                  {(msg as any).isTip && (
                    <div className="mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      💎 Tip sent: {(msg as any).tipAmount} HELA
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* typing indicator */}
            {selectedConv.online && Math.random() > 0.7 && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* quick tip buttons */}
          <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-2">
            <span className="text-sm text-gray-600">Quick Tip:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickTip(1)}
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <DollarSign className="w-3 h-3 mr-1" />
              1 HELA
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickTip(2)}
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <DollarSign className="w-3 h-3 mr-1" />
              2 HELA
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickTip(5)}
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <DollarSign className="w-3 h-3 mr-1" />
              5 HELA
            </Button>
          </div>

          {/* input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Smile className="w-5 h-5 text-gray-500" />
              </Button>
              <Button variant="ghost" size="sm">
                <Paperclip className="w-5 h-5 text-gray-500" />
              </Button>
              <Button variant="ghost" size="sm">
                <ImageIcon className="w-5 h-5 text-gray-500" />
              </Button>
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              💡 Tip: Send crypto tips directly in chat with quick buttons above
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
