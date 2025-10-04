import { Sparkles, Image as ImageIcon } from "lucide-react";
import { Card } from "./ui/card";

interface NFTGalleryPageProps {
  userProfile: any;
}

export function NFTGalleryPage({ userProfile }: NFTGalleryPageProps) {
  const nftGallery = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1635237755468-5fba69c13f29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZnQlMjBkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc1OTQyMTE2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Digital Dreams #001",
      price: "5.2 HELA"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5NDQwNTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Tech Abstract #042",
      price: "3.8 HELA"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="w-8 h-8 text-purple-400" />
        <h1 className="text-3xl font-bold text-white">NFT Gallery</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nftGallery.map((nft) => (
          <Card key={nft.id} className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer group">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={nft.image} 
                alt={nft.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <p className="font-medium">{nft.title}</p>
                  <p className="text-sm text-teal-300">{nft.price}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
