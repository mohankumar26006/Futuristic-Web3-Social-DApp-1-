import { HelpCircle, Search, Book, MessageCircle, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";

export function HelpFAQPage() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account on HeLa Social?",
          a: "Connect your Web3 wallet (MetaMask, WalletConnect, etc.) and complete your profile setup. All your data is stored on-chain."
        },
        {
          q: "What is Demo Mode?",
          a: "Demo Mode lets you explore all features of HeLa Social without connecting a wallet. Perfect for testing and learning!"
        },
        {
          q: "Do I need cryptocurrency to use HeLa Social?",
          a: "You can browse and explore without crypto, but tipping creators and minting NFT posts require HELA tokens."
        }
      ]
    },
    {
      category: "Posts & NFTs",
      questions: [
        {
          q: "How do I mint an NFT post?",
          a: "When creating a post, toggle the 'Mint as NFT' option. Your post will be minted on-chain and can be collected by others."
        },
        {
          q: "What happens when someone collects my NFT post?",
          a: "Collectors own a unique copy of your post. You retain ownership and earn tips when they collect it."
        },
        {
          q: "Can I delete my posts?",
          a: "Regular posts can be deleted, but NFT posts are permanently on-chain. Think carefully before minting!"
        }
      ]
    },
    {
      category: "Tipping & Rewards",
      questions: [
        {
          q: "How does tipping work?",
          a: "Click the tip button on any post, select an amount and token (HELA, USDT, etc.), and confirm the transaction in your wallet."
        },
        {
          q: "What tokens can I tip with?",
          a: "Currently supports HELA, USDT, USDC, and other major tokens on the HeLa blockchain."
        },
        {
          q: "How do I withdraw my tips?",
          a: "Go to your Wallet Dashboard and click 'Withdraw'. Tips are sent directly to your connected wallet."
        }
      ]
    },
    {
      category: "Reputation & Quests",
      questions: [
        {
          q: "What is Reputation Score?",
          a: "A measure of your activity and trustworthiness on HeLa Social. Earn it through posts, tips, quests, and community engagement."
        },
        {
          q: "How do I complete quests?",
          a: "Visit the Quest Hub, select a quest, and complete the required actions (e.g., post 3 times, tip 5 creators)."
        },
        {
          q: "What are Soulbound Badges?",
          a: "Non-transferable NFT badges awarded for achievements. They're permanently tied to your wallet."
        }
      ]
    },
    {
      category: "DAO Governance",
      questions: [
        {
          q: "What is DAO governance?",
          a: "Community members vote on proposals for platform features, moderation, and treasury allocation using reputation or tokens."
        },
        {
          q: "How do I vote on proposals?",
          a: "Go to DAO Governance, browse active proposals, and cast your vote. Your voting power is based on reputation and token holdings."
        },
        {
          q: "Can I create a proposal?",
          a: "Yes! Users with reputation above 50 can create proposals for community consideration."
        }
      ]
    },
    {
      category: "Blockchain & Transactions",
      questions: [
        {
          q: "What is a transaction hash?",
          a: "A unique identifier for your blockchain transaction. Click it to view details on the HeLa explorer."
        },
        {
          q: "Why do I need to confirm transactions?",
          a: "Every on-chain action (posts, tips, votes) requires wallet confirmation to ensure security and ownership."
        },
        {
          q: "What are gas fees?",
          a: "Small fees paid to process blockchain transactions. HeLa Social uses gasless transactions where possible!"
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-teal-600 flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl">Help & FAQ</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about HeLa Social
        </p>
      </div>

      {/* Search */}
      <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all cursor-pointer">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
              <Book className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-medium">Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Detailed guides and tutorials
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all cursor-pointer">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="font-medium">Community Support</h3>
            <p className="text-sm text-muted-foreground">
              Get help from the community
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all cursor-pointer">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-medium">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground">
              Watch step-by-step guides
            </p>
          </div>
        </Card>
      </div>

      {/* FAQs */}
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
        <h2 className="text-xl mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="font-medium text-purple-400 mb-3">{category.category}</h3>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem 
                    key={qIndex} 
                    value={`item-${categoryIndex}-${qIndex}`}
                    className="border border-white/10 rounded-lg px-4 bg-white/5"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </Card>

      {/* Still Need Help */}
      <Card className="p-6 bg-gradient-to-r from-purple-600/20 to-teal-600/20 backdrop-blur-sm border-purple-500/30 text-center">
        <h3 className="text-xl mb-2">Still need help?</h3>
        <p className="text-muted-foreground mb-4">
          Our support team is here to assist you
        </p>
        <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-90">
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Support
        </Button>
      </Card>
    </div>
  );
}
