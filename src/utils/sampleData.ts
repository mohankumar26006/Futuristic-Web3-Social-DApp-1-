// comprehensive sample data for hela social
// this would come from backend in production but using static data for demo

export const sampleUsers = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    username: "rajesh_ai",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
    walletAddress: "0x7a2b...4c5d",
    isVerified: true,
    reputation: 1850,
    followers: 12500
  },
  {
    id: "2",
    name: "Priya Sharma",
    username: "priya_dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    walletAddress: "0x9f3e...8a7b",
    isVerified: true,
    reputation: 1650,
    followers: 8900
  },
  {
    id: "3",
    name: "Arjun Patel",
    username: "arjun_fintech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
    walletAddress: "0x2c4d...6e8f",
    isVerified: true,
    reputation: 2100,
    followers: 15600
  },
  {
    id: "4",
    name: "Meera Singh",
    username: "meera_climate",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera",
    walletAddress: "0x5g7h...9i0j",
    isVerified: true,
    reputation: 1420,
    followers: 6800
  },
  {
    id: "5",
    name: "Vikram Desai",
    username: "vikram_web3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    walletAddress: "0x1k2l...3m4n",
    isVerified: true,
    reputation: 1890,
    followers: 11200
  },
  {
    id: "6",
    name: "Anjali Reddy",
    username: "anjali_research",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anjali",
    walletAddress: "0x6o7p...8q9r",
    isVerified: true,
    reputation: 2340,
    followers: 18900
  },
  {
    id: "7",
    name: "Rohan Gupta",
    username: "rohan_crypto",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohan",
    walletAddress: "0x3s4t...5u6v",
    isVerified: true,
    reputation: 1120,
    followers: 4500
  },
  {
    id: "8",
    name: "Kavya Iyer",
    username: "kavya_artist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kavya",
    walletAddress: "0x7w8x...9y0z",
    isVerified: true,
    reputation: 1560,
    followers: 9800
  },
  {
    id: "9",
    name: "Sanjay Mehta",
    username: "sanjay_dao",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sanjay",
    walletAddress: "0x1a2b...3c4d",
    isVerified: false,
    reputation: 890,
    followers: 3200
  },
  {
    id: "10",
    name: "Deepa Nair",
    username: "deepa_health",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=deepa",
    walletAddress: "0x5e6f...7g8h",
    isVerified: true,
    reputation: 1780,
    followers: 10500
  }
];

// 60+ posts for explore/trending/nft pages
export const explorePosts = [
  {
    id: "exp1",
    author: sampleUsers[0],
    content: "Just published our breakthrough AI-powered healthcare diagnostics system! Using blockchain for secure patient data management. This could save thousands of lives in rural India 🏥🔬 #DigitalIndia #HealthTech #AI",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    timestamp: "2h ago",
    likes: 2847,
    comments: 342,
    tips: 156,
    tipAmount: 489.5,
    isNFT: true,
    category: "healthtech",
    hashtags: ["DigitalIndia", "HealthTech", "AI"]
  },
  {
    id: "exp2",
    author: sampleUsers[1],
    content: "🎓 HUGE milestone! Our EdTech platform just reached 1 MILLION students across 500+ government schools! Built on HeLa blockchain for transparent attendance tracking and scholarship distribution. Education is the future! ✨",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    timestamp: "5h ago",
    likes: 3921,
    comments: 567,
    tips: 234,
    tipAmount: 678.3,
    isNFT: true,
    category: "edtech",
    hashtags: ["EdTech", "Education", "Blockchain"]
  },
  {
    id: "exp3",
    author: sampleUsers[2],
    content: "Exciting news! Our FinTech startup just secured ₹2 Crore in funding! 💰 We're building blockchain-based microfinance for farmers. No middlemen, instant loans, transparent interest rates. This is the future of rural banking! 🌾",
    timestamp: "8h ago",
    likes: 5621,
    comments: 891,
    tips: 445,
    tipAmount: 1247.7,
    isNFT: false,
    category: "fintech",
    hashtags: ["FinTech", "Startup", "Agriculture"]
  },
  {
    id: "exp4",
    author: sampleUsers[3],
    content: "🏆 Won GOLD at Smart India Hackathon 2024! Our IoT solution monitors air quality in real-time across smart cities. Now scaling to 50+ cities with all data stored on-chain 🌍📊 #ClimateAction #SmartCities #SIH2024",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800",
    timestamp: "12h ago",
    likes: 4782,
    comments: 623,
    tips: 312,
    tipAmount: 894.9,
    isNFT: true,
    category: "climatetech",
    hashtags: ["ClimateAction", "SmartCities", "SIH2024"]
  },
  {
    id: "exp5",
    author: sampleUsers[4],
    content: "Deployed our first DAO for community governance of Mumbai Tech Park! 🏛️ Blockchain voting, transparent budgets, ZERO corruption. 250+ members already onboarded. The future of governance is here! ⚡",
    timestamp: "1d ago",
    likes: 3456,
    comments: 478,
    tips: 198,
    tipAmount: 567.2,
    isNFT: false,
    category: "governance",
    hashtags: ["Web3India", "DAO", "Governance"]
  },
  {
    id: "exp6",
    author: sampleUsers[5],
    content: "🚀 Our quantum computing research paper got accepted at IIT Delhi symposium! Working on blockchain networks resistant to quantum attacks. India is leading in crypto security! 🔐 #QuantumComputing #Blockchain #Research",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    timestamp: "1d ago",
    likes: 6234,
    comments: 1023,
    tips: 567,
    tipAmount: 1678.4,
    isNFT: true,
    category: "research",
    hashtags: ["QuantumComputing", "Blockchain", "Research"]
  },
  {
    id: "exp7",
    author: sampleUsers[6],
    content: "Built a decentralized supply chain tracker for Indian MSMEs. Every product movement recorded on HeLa blockchain. No more fake products! 📦✅ Pilot launching with 50 manufacturers next month.",
    timestamp: "1d ago",
    likes: 2134,
    comments: 234,
    tips: 89,
    tipAmount: 234.5,
    isNFT: false,
    category: "supplychain",
    hashtags: ["SupplyChain", "MSME", "Web3"]
  },
  {
    id: "exp8",
    author: sampleUsers[7],
    content: "Just minted my new digital art collection 'Blockchain Dreams' 🎨✨ 25 unique NFTs celebrating India's Web3 journey. Auction starts tonight! Reserve price: 5 HELA each. Check them out! 🔥",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    timestamp: "2d ago",
    likes: 4567,
    comments: 678,
    tips: 234,
    tipAmount: 789.3,
    isNFT: true,
    category: "art",
    hashtags: ["NFTArt", "DigitalArt", "CryptoArt"]
  },
  {
    id: "exp9",
    author: sampleUsers[8],
    content: "Our DAO treasury just crossed ₹50 Lakhs! All funds managed transparently on-chain. Next proposal: funding 10 student projects. Democracy in action! 🗳️💪",
    timestamp: "2d ago",
    likes: 2891,
    comments: 345,
    tips: 123,
    tipAmount: 345.6,
    isNFT: false,
    category: "dao",
    hashtags: ["DAO", "Governance", "Community"]
  },
  {
    id: "exp10",
    author: sampleUsers[9],
    content: "Telemedicine DApp live! 🏥 Connecting rural patients with city doctors via blockchain-verified consultations. 500+ consultations in first week. Healthcare for all! 💙",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    timestamp: "2d ago",
    likes: 3782,
    comments: 456,
    tips: 189,
    tipAmount: 567.8,
    isNFT: true,
    category: "healthtech",
    hashtags: ["Telemedicine", "HealthTech", "Rural"]
  },
  {
    id: "exp11",
    author: sampleUsers[0],
    content: "AI model trained on 10M+ medical records (anonymized on blockchain). 95% accuracy in early disease detection. This is the power of ethical AI + blockchain! 🧠⚡",
    timestamp: "3d ago",
    likes: 5234,
    comments: 789,
    tips: 345,
    tipAmount: 1023.4,
    isNFT: false,
    category: "ai",
    hashtags: ["AI", "MachineLearning", "HealthTech"]
  },
  {
    id: "exp12",
    author: sampleUsers[1],
    content: "Live coding session tomorrow! Building a blockchain voting DApp from scratch. 7 PM IST on YouTube. Who's joining? Drop a 🔥 if you're in!",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    timestamp: "3d ago",
    likes: 1892,
    comments: 234,
    tips: 67,
    tipAmount: 178.9,
    isNFT: false,
    category: "education",
    hashtags: ["LiveCoding", "Tutorial", "Web3Dev"]
  },
  {
    id: "exp13",
    author: sampleUsers[2],
    content: "Farmers are earning 40% MORE using our blockchain marketplace! No middlemen = better prices. 2000+ farmers onboarded in Gujarat. Scaling to Maharashtra next! 🌾💚",
    timestamp: "3d ago",
    likes: 4123,
    comments: 512,
    tips: 234,
    tipAmount: 678.5,
    isNFT: false,
    category: "agritech",
    hashtags: ["AgriTech", "Farmers", "Blockchain"]
  },
  {
    id: "exp14",
    author: sampleUsers[3],
    content: "New climate NFT collection dropping! 🌍 Each NFT plants 100 trees + funds carbon offset projects. Art meets impact. Mint now: 2 HELA each. Let's save the planet together! 🌱",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    timestamp: "4d ago",
    likes: 3891,
    comments: 445,
    tips: 198,
    tipAmount: 556.7,
    isNFT: true,
    category: "climate",
    hashtags: ["ClimateNFT", "Sustainability", "Impact"]
  },
  {
    id: "exp15",
    author: sampleUsers[4],
    content: "Web3 gaming tournament this weekend! Prize pool: 1000 HELA tokens. Top 10 players get exclusive NFT badges. Registration open! 🎮🏆 #Web3Gaming #Tournament",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    timestamp: "4d ago",
    likes: 5678,
    comments: 892,
    tips: 345,
    tipAmount: 987.6,
    isNFT: true,
    category: "gaming",
    hashtags: ["Web3Gaming", "Tournament", "Esports"]
  },
  {
    id: "exp16",
    author: sampleUsers[5],
    content: "Published open-source library for HeLa smart contracts! 🎉 Makes DApp development 10x easier. Check it out on GitHub. Contributions welcome! Star if you find it useful ⭐",
    timestamp: "4d ago",
    likes: 2345,
    comments: 178,
    tips: 89,
    tipAmount: 234.5,
    isNFT: false,
    category: "development",
    hashtags: ["OpenSource", "SmartContracts", "Development"]
  },
  {
    id: "exp17",
    author: sampleUsers[6],
    content: "Crypto payments now accepted at 500+ retail stores across Bangalore! Scan QR, pay with HELA, instant confirmation. The future is NOW! 🛍️⚡",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    timestamp: "5d ago",
    likes: 4234,
    comments: 567,
    tips: 234,
    tipAmount: 678.9,
    isNFT: false,
    category: "payments",
    hashtags: ["CryptoPayments", "Adoption", "Retail"]
  },
  {
    id: "exp18",
    author: sampleUsers[7],
    content: "Animated NFT drop! 🎬 30 unique animated artworks. Each tells a story of India's tech revolution. Minting live now. First 100 minters get bonus airdrops! 🎁",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800",
    timestamp: "5d ago",
    likes: 5890,
    comments: 734,
    tips: 456,
    tipAmount: 1234.5,
    isNFT: true,
    category: "nft",
    hashtags: ["AnimatedNFT", "NFTDrop", "CryptoArt"]
  },
  {
    id: "exp19",
    author: sampleUsers[8],
    content: "DAO proposal passed with 95% approval! 🎉 We're funding 5 new community projects. Transparency + democracy = unstoppable! Next vote: expanding to 3 more cities.",
    timestamp: "5d ago",
    likes: 2678,
    comments: 312,
    tips: 145,
    tipAmount: 423.4,
    isNFT: false,
    category: "dao",
    hashtags: ["DAO", "CommunityVote", "Decentralization"]
  },
  {
    id: "exp20",
    author: sampleUsers[9],
    content: "Patient privacy maintained, doctor-patient records verified on-chain. Our healthcare blockchain is processing 10K+ records daily. HIPAA-compliant + decentralized! 🏥🔐",
    timestamp: "5d ago",
    likes: 3456,
    comments: 423,
    tips: 189,
    tipAmount: 534.6,
    isNFT: false,
    category: "healthtech",
    hashtags: ["HealthData", "Privacy", "Blockchain"]
  },
  // continuing with more posts...
  {
    id: "exp21",
    author: sampleUsers[0],
    content: "Presenting at India Blockchain Week next month! Topic: 'AI + Blockchain for Social Good'. Who's attending? Let's connect! 🤝",
    timestamp: "6d ago",
    likes: 1892,
    comments: 234,
    tips: 78,
    tipAmount: 234.5,
    isNFT: false,
    category: "events",
    hashtags: ["BlockchainWeek", "Conference", "Networking"]
  },
  {
    id: "exp22",
    author: sampleUsers[1],
    content: "Student scholarships distributed via smart contracts! No corruption, instant transfer, full transparency. 1000+ students benefited. This is what Web3 can do! 🎓💙",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    timestamp: "6d ago",
    likes: 4123,
    comments: 512,
    tips: 234,
    tipAmount: 689.4,
    isNFT: true,
    category: "education",
    hashtags: ["Scholarship", "Education", "SmartContracts"]
  },
  {
    id: "exp23",
    author: sampleUsers[2],
    content: "Micro-loans approved in UNDER 2 MINUTES via blockchain credit scoring! Traditional banks take 2 weeks. We're disrupting finance for good! 💳⚡",
    timestamp: "6d ago",
    likes: 3789,
    comments: 445,
    tips: 198,
    tipAmount: 556.7,
    isNFT: false,
    category: "fintech",
    hashtags: ["MicroFinance", "InstantLoans", "FinTech"]
  },
  {
    id: "exp24",
    author: sampleUsers[3],
    content: "Carbon credit NFTs are LIVE! 🌍 Companies can offset emissions transparently. Each NFT = 1 ton CO2 offset. Already sold 500 credits. Planet first! 🌱",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800",
    timestamp: "7d ago",
    likes: 4567,
    comments: 589,
    tips: 267,
    tipAmount: 778.9,
    isNFT: true,
    category: "climate",
    hashtags: ["CarbonCredits", "Climate", "Sustainability"]
  },
  {
    id: "exp25",
    author: sampleUsers[4],
    content: "Multi-signature wallet tutorial uploaded! Learn how to secure your DAO treasury properly. Link in bio. Let's make Web3 safer! 🔐📚",
    timestamp: "7d ago",
    likes: 2234,
    comments: 178,
    tips: 89,
    tipAmount: 245.6,
    isNFT: false,
    category: "security",
    hashtags: ["MultiSig", "Security", "Tutorial"]
  },
  {
    id: "exp26",
    author: sampleUsers[5],
    content: "Quantum-resistant encryption implemented in our blockchain! Future-proof security. No quantum computer can break this. Research paper coming soon! 🔬🔐",
    timestamp: "7d ago",
    likes: 5234,
    comments: 734,
    tips: 345,
    tipAmount: 989.5,
    isNFT: false,
    category: "research",
    hashtags: ["Quantum", "Encryption", "Security"]
  },
  {
    id: "exp27",
    author: sampleUsers[6],
    content: "HELA price predictions are crazy! But I'm here for the TECH, not speculation. Building real solutions for real problems. Who's with me? 💪",
    timestamp: "1w ago",
    likes: 3456,
    comments: 567,
    tips: 189,
    tipAmount: 467.8,
    isNFT: false,
    category: "community",
    hashtags: ["HELA", "BUIDLing", "Community"]
  },
  {
    id: "exp28",
    author: sampleUsers[7],
    content: "Generative art NFT collection! 🎨 10,000 unique pieces algorithmically generated. Rare traits include: Golden Blockchain, Quantum Nodes, and Cyber Lotus. Minting starts 8 PM! 🔥",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
    timestamp: "1w ago",
    likes: 6789,
    comments: 892,
    tips: 445,
    tipAmount: 1345.7,
    isNFT: true,
    category: "nft",
    hashtags: ["GenerativeArt", "NFTCollection", "Algorithmmic"]
  },
  {
    id: "exp29",
    author: sampleUsers[8],
    content: "Community treasury report: ₹75L managed, 25 projects funded, 100% transparency. Every transaction verifiable on-chain. This is how organizations should work! 📊✅",
    timestamp: "1w ago",
    likes: 2891,
    comments: 334,
    tips: 134,
    tipAmount: 389.4,
    isNFT: false,
    category: "dao",
    hashtags: ["Treasury", "Transparency", "DAO"]
  },
  {
    id: "exp30",
    author: sampleUsers[9],
    content: "Electronic Health Records on blockchain = game changer! Patients own their data, doctors access with permission, insurance claims automated. We processed 50K records this month! 🏥📈",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    timestamp: "1w ago",
    likes: 4123,
    comments: 512,
    tips: 223,
    tipAmount: 645.8,
    isNFT: true,
    category: "healthtech",
    hashtags: ["EHR", "HealthData", "Blockchain"]
  },
  // Adding 30 more posts to reach 60+
  {
    id: "exp31",
    author: sampleUsers[0],
    content: "Medical AI breakthrough! Our model detects cancer 6 months earlier than traditional methods. All training data stored immutably on-chain for audit trail. Lives will be saved! 🎗️",
    timestamp: "1w ago",
    likes: 7234,
    comments: 923,
    tips: 478,
    tipAmount: 1456.9,
    isNFT: false,
    category: "healthtech",
    hashtags: ["MedicalAI", "Cancer", "Research"]
  },
  {
    id: "exp32",
    author: sampleUsers[1],
    content: "Online exam proctoring with blockchain verification! No cheating possible. 10K+ students took exams last month. Education + integrity! 📝✅",
    timestamp: "1w ago",
    likes: 2678,
    comments: 312,
    tips: 112,
    tipAmount: 334.5,
    isNFT: false,
    category: "edtech",
    hashtags: ["ExamTech", "Education", "AntiCheating"]
  },
  {
    id: "exp33",
    author: sampleUsers[2],
    content: "Invoice financing for SMEs on blockchain! Get paid instantly instead of waiting 90 days. Already processed ₹10 Cr in invoices. Cash flow = business survival! 💼💰",
    timestamp: "1w ago",
    likes: 3345,
    comments: 423,
    tips: 178,
    tipAmount: 523.4,
    isNFT: false,
    category: "fintech",
    hashtags: ["InvoiceFinancing", "SME", "FinTech"]
  },
  {
    id: "exp34",
    author: sampleUsers[3],
    content: "Renewable energy certificates as NFTs! ☀️ Solar farm owners can tokenize and sell their green energy credits. First batch of 1000 certificates sold out in 3 hours! 🔋",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a404?w=800",
    timestamp: "1w ago",
    likes: 4567,
    comments: 534,
    tips: 245,
    tipAmount: 723.6,
    isNFT: true,
    category: "climate",
    hashtags: ["RenewableEnergy", "GreenTech", "NFT"]
  },
  {
    id: "exp35",
    author: sampleUsers[4],
    content: "Play-to-earn game launched! 🎮 Players earn HELA tokens while gaming. Top player made ₹15K last month. Gaming + income = future of work? 🚀",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    timestamp: "2w ago",
    likes: 8923,
    comments: 1234,
    tips: 567,
    tipAmount: 1678.9,
    isNFT: true,
    category: "gaming",
    hashtags: ["PlayToEarn", "GameFi", "Web3Gaming"]
  },
  {
    id: "exp36",
    author: sampleUsers[5],
    content: "Smart contract auditing tool released! Automatically detects 50+ vulnerabilities. Used it on 100+ contracts, found critical bugs in 40%. Secure your code! 🛡️",
    timestamp: "2w ago",
    likes: 3456,
    comments: 412,
    tips: 189,
    tipAmount: 534.7,
    isNFT: false,
    category: "security",
    hashtags: ["SmartContract", "Security", "Auditing"]
  },
  {
    id: "exp37",
    author: sampleUsers[6],
    content: "Loyalty points as tokens! 🎁 Use them across 200+ partner merchants. No more expired points, full portability. Already 50K+ users migrated their points to blockchain!",
    timestamp: "2w ago",
    likes: 2789,
    comments: 334,
    tips: 123,
    tipAmount: 367.8,
    isNFT: false,
    category: "retail",
    hashtags: ["Loyalty", "Tokens", "Retail"]
  },
  {
    id: "exp38",
    author: sampleUsers[7],
    content: "Music NFTs are here! 🎵 My new album available as NFTs. Buyers get exclusive access to unreleased tracks + concert tickets. Support artists directly! 💿✨",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    timestamp: "2w ago",
    likes: 5234,
    comments: 678,
    tips: 334,
    tipAmount: 989.5,
    isNFT: true,
    category: "music",
    hashtags: ["MusicNFT", "Album", "IndieArtist"]
  },
  {
    id: "exp39",
    author: sampleUsers[8],
    content: "Quadratic funding round complete! 🎉 ₹25L distributed to 15 public good projects. Community voted, smart contracts executed. Pure democracy! 🗳️",
    timestamp: "2w ago",
    likes: 2123,
    comments: 245,
    tips: 98,
    tipAmount: 278.9,
    isNFT: false,
    category: "dao",
    hashtags: ["QuadraticFunding", "PublicGoods", "DAO"]
  },
  {
    id: "exp40",
    author: sampleUsers[9],
    content: "Mental health app with blockchain-verified therapy sessions! 🧠 Your data stays private, therapists get verified, insurance claims automated. 2K+ sessions completed! 💙",
    timestamp: "2w ago",
    likes: 3678,
    comments: 456,
    tips: 189,
    tipAmount: 556.7,
    isNFT: false,
    category: "healthtech",
    hashtags: ["MentalHealth", "Therapy", "Privacy"]
  },
  {
    id: "exp41",
    author: sampleUsers[0],
    content: "Drug supply chain tracked on blockchain! Every pill from factory to patient = fully traceable. No more counterfeit medicines. Saving lives through transparency! 💊✅",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800",
    timestamp: "2w ago",
    likes: 4567,
    comments: 567,
    tips: 234,
    tipAmount: 689.4,
    isNFT: true,
    category: "healthtech",
    hashtags: ["Pharma", "SupplyChain", "AntiCounterfeit"]
  },
  {
    id: "exp42",
    author: sampleUsers[1],
    content: "Virtual classrooms with NFT certificates! 🎓 Complete course, earn verifiable credential. Already issued 5K+ certificates. Employers can verify instantly on-chain!",
    timestamp: "2w ago",
    likes: 3123,
    comments: 378,
    tips: 145,
    tipAmount: 423.5,
    isNFT: false,
    category: "edtech",
    hashtags: ["OnlineEducation", "Certificates", "Credentials"]
  },
  {
    id: "exp43",
    author: sampleUsers[2],
    content: "Cross-border remittances in SECONDS! 🌏 Sending money to family abroad? Use our blockchain solution. ₹100 fee instead of ₹500. Processed 1000+ transactions this week!",
    timestamp: "2w ago",
    likes: 4234,
    comments: 512,
    tips: 223,
    tipAmount: 656.8,
    isNFT: false,
    category: "fintech",
    hashtags: ["Remittance", "CrossBorder", "Payments"]
  },
  {
    id: "exp44",
    author: sampleUsers[3],
    content: "Plastic waste tracking NFTs! ♻️ Every kg of plastic collected = 1 NFT = proof of impact. Collected 10 tons this month! Gamifying environmental cleanup! 🌊",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    timestamp: "3w ago",
    likes: 3891,
    comments: 445,
    tips: 198,
    tipAmount: 567.9,
    isNFT: true,
    category: "climate",
    hashtags: ["PlasticWaste", "Recycling", "Impact"]
  },
  {
    id: "exp45",
    author: sampleUsers[4],
    content: "NFT marketplace for indie game assets! 🎨 Developers can buy/sell 3D models, textures, sounds. Royalties paid automatically to creators. 500+ assets listed!",
    timestamp: "3w ago",
    likes: 2678,
    comments: 312,
    tips: 134,
    tipAmount: 389.6,
    isNFT: false,
    category: "gaming",
    hashtags: ["GameDev", "NFTMarketplace", "IndieGames"]
  },
  {
    id: "exp46",
    author: sampleUsers[5],
    content: "Zero-knowledge proof implementation for private transactions! 🔐 Your balance stays hidden, transactions verified. Privacy + transparency = possible! Research paper linked below 👇",
    timestamp: "3w ago",
    likes: 4123,
    comments: 534,
    tips: 267,
    tipAmount: 789.4,
    isNFT: false,
    category: "research",
    hashtags: ["ZeroKnowledge", "Privacy", "Cryptography"]
  },
  {
    id: "exp47",
    author: sampleUsers[6],
    content: "Decentralized food delivery! 🍔 Restaurants keep 95% (vs 70% on centralized apps). Blockchain-based routing, crypto payments. Launched in 3 cities, 200+ restaurants onboard!",
    timestamp: "3w ago",
    likes: 5234,
    comments: 667,
    tips: 289,
    tipAmount: 834.7,
    isNFT: false,
    category: "delivery",
    hashtags: ["FoodTech", "Decentralized", "Restaurants"]
  },
  {
    id: "exp48",
    author: sampleUsers[7],
    content: "Photography NFT collection! 📸 50 exclusive photos from my India tour. Each NFT includes full commercial rights. For creators, by creators. Drops tonight 9 PM! 🌅",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
    timestamp: "3w ago",
    likes: 4567,
    comments: 556,
    tips: 278,
    tipAmount: 823.5,
    isNFT: true,
    category: "photography",
    hashtags: ["Photography", "NFT", "CommercialRights"]
  },
  {
    id: "exp49",
    author: sampleUsers[8],
    content: "On-chain voting for city budget allocation! 🏙️ Citizens vote on where tax money goes. First pilot in Pune with ₹5 Cr budget. Real democracy, real impact! 🗳️",
    timestamp: "3w ago",
    likes: 6234,
    comments: 823,
    tips: 378,
    tipAmount: 1123.6,
    isNFT: false,
    category: "governance",
    hashtags: ["CivicTech", "Democracy", "Budget"]
  },
  {
    id: "exp50",
    author: sampleUsers[9],
    content: "COVID vaccine certificate verification on blockchain! ✅ No fake certificates possible. 1M+ certificates verified. Accepted at airports, offices. Security + convenience! 💉",
    timestamp: "3w ago",
    likes: 7123,
    comments: 912,
    tips: 434,
    tipAmount: 1289.7,
    isNFT: false,
    category: "healthtech",
    hashtags: ["VaccineCertificate", "Verification", "COVID"]
  },
  // Final 10 posts
  {
    id: "exp51",
    author: sampleUsers[0],
    content: "Genomics data marketplace! 🧬 Individuals can sell their DNA data for research, maintain privacy via blockchain. Earn from YOUR data. Already 1K+ contributors!",
    timestamp: "3w ago",
    likes: 3456,
    comments: 423,
    tips: 178,
    tipAmount: 523.4,
    isNFT: false,
    category: "biotech",
    hashtags: ["Genomics", "DataMarketplace", "Privacy"]
  },
  {
    id: "exp52",
    author: sampleUsers[1],
    content: "Skill verification NFTs! Learn coding, get blockchain certificate. Showed my NFT certificates at interview, got hired! The future of resumes is here! 💼✨",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    timestamp: "3w ago",
    likes: 4789,
    comments: 612,
    tips: 267,
    tipAmount: 778.9,
    isNFT: true,
    category: "education",
    hashtags: ["SkillNFT", "Career", "Hiring"]
  },
  {
    id: "exp53",
    author: sampleUsers[2],
    content: "Peer-to-peer lending platform live! 💰 Borrow directly from community, no banks. Interest rates set by market. ₹2 Cr lent in first month! DeFi for India! 🇮🇳",
    timestamp: "3w ago",
    likes: 3912,
    comments: 478,
    tips: 198,
    tipAmount: 589.5,
    isNFT: false,
    category: "defi",
    hashtags: ["P2PLending", "DeFi", "Finance"]
  },
  {
    id: "exp54",
    author: sampleUsers[3],
    content: "Beach cleanup DAO! 🏖️ Every Sunday, we clean beaches and mint NFTs as proof. Sold NFTs fund more cleanups. Circular economy in action! Cleaned 50 beaches! 🌊",
    image: "https://images.unsplash.com/photo-1583852113448-033b8a3f5e1a?w=800",
    timestamp: "4w ago",
    likes: 5123,
    comments: 634,
    tips: 289,
    tipAmount: 856.7,
    isNFT: true,
    category: "environment",
    hashtags: ["BeachCleanup", "Environment", "DAO"]
  },
  {
    id: "exp55",
    author: sampleUsers[4],
    content: "Esports tournament results on-chain! 🏆 No disputes, no manipulation. Prize distribution automated via smart contracts. 1000+ gamers participated. Gaming + transparency! 🎮",
    timestamp: "4w ago",
    likes: 6234,
    comments: 789,
    tips: 356,
    tipAmount: 1045.8,
    isNFT: false,
    category: "esports",
    hashtags: ["Esports", "Tournament", "SmartContracts"]
  },
  {
    id: "exp56",
    author: sampleUsers[5],
    content: "Formal verification tool for smart contracts! 🔍 Mathematically prove your code is bug-free. Prevented 5 major hacks already. Security is NOT optional!",
    timestamp: "4w ago",
    likes: 2789,
    comments: 312,
    tips: 145,
    tipAmount: 423.6,
    isNFT: false,
    category: "security",
    hashtags: ["FormalVerification", "SmartContracts", "Security"]
  },
  {
    id: "exp57",
    author: sampleUsers[6],
    content: "Blockchain-based warranty system! 📱 Buy phone, warranty auto-registered on-chain. No lost receipts, instant claims. Partnered with 50+ electronics stores!",
    timestamp: "4w ago",
    likes: 3345,
    comments: 412,
    tips: 167,
    tipAmount: 489.3,
    isNFT: false,
    category: "retail",
    hashtags: ["Warranty", "Electronics", "Blockchain"]
  },
  {
    id: "exp58",
    author: sampleUsers[7],
    content: "3D animated NFT collection! 🎬 20 unique characters with full rigging. Use them in games, metaverse, videos. Utility NFTs are the future! Mint: 8 HELA each 🔥",
    image: "https://images.unsplash.com/photo-1636955840493-f43a02bfa064?w=800",
    timestamp: "4w ago",
    likes: 7891,
    comments: 945,
    tips: 445,
    tipAmount: 1334.7,
    isNFT: true,
    category: "3dnft",
    hashtags: ["3DNFT", "Metaverse", "UtilityNFT"]
  },
  {
    id: "exp59",
    author: sampleUsers[8],
    content: "Decentralized social media moderation! 🛡️ Community votes on content flags. No single authority. Already moderated 10K+ posts. Democracy + safety! ✅",
    timestamp: "4w ago",
    likes: 2456,
    comments: 334,
    tips: 123,
    tipAmount: 356.8,
    isNFT: false,
    category: "social",
    hashtags: ["Moderation", "Community", "Decentralized"]
  },
  {
    id: "exp60",
    author: sampleUsers[9],
    content: "Clinical trial data on blockchain! 🔬 Immutable records, transparent results, patient privacy maintained. Published 50+ trial results. Trust in science restored! 🏥",
    timestamp: "4w ago",
    likes: 4123,
    comments: 512,
    tips: 223,
    tipAmount: 667.9,
    isNFT: false,
    category: "research",
    hashtags: ["ClinicalTrials", "Research", "Transparency"]
  }
];

// messaging data - 60+ messages
export const sampleConversations = [
  {
    id: "conv1",
    user: sampleUsers[1],
    lastMessage: "That's awesome! When are you launching?",
    timestamp: "2m ago",
    unread: 2,
    online: true
  },
  {
    id: "conv2",
    user: sampleUsers[2],
    lastMessage: "Thanks for the tip! Really appreciate it 💙",
    timestamp: "15m ago",
    unread: 0,
    online: true
  },
  {
    id: "conv3",
    user: sampleUsers[3],
    lastMessage: "Let's collaborate on the climate project",
    timestamp: "1h ago",
    unread: 1,
    online: false
  },
  {
    id: "conv4",
    user: sampleUsers[4],
    lastMessage: "Sent you the DAO proposal draft",
    timestamp: "3h ago",
    unread: 0,
    online: true
  },
  {
    id: "conv5",
    user: sampleUsers[5],
    lastMessage: "Code review done! Looks good 👍",
    timestamp: "5h ago",
    unread: 0,
    online: false
  }
];

export const sampleMessages = [
  { id: "msg1", sender: "them", text: "Hey! Saw your latest post about AI healthcare 🏥", timestamp: "10:30 AM" },
  { id: "msg2", sender: "me", text: "Thanks! Yeah we just hit a major milestone", timestamp: "10:31 AM" },
  { id: "msg3", sender: "them", text: "That's incredible. How many patients so far?", timestamp: "10:32 AM" },
  { id: "msg4", sender: "me", text: "We've processed over 50K medical records!", timestamp: "10:33 AM" },
  { id: "msg5", sender: "them", text: "Wow! 🤯 Are you using HeLa for storage?", timestamp: "10:34 AM" },
  { id: "msg6", sender: "me", text: "Yep, all on-chain. Privacy preserved with encryption", timestamp: "10:35 AM" },
  { id: "msg7", sender: "them", text: "Smart! What about HIPAA compliance?", timestamp: "10:36 AM" },
  { id: "msg8", sender: "me", text: "Fully compliant. We worked with legal team for months", timestamp: "10:37 AM" },
  { id: "msg9", sender: "them", text: "That's the hard part tbh", timestamp: "10:38 AM" },
  { id: "msg10", sender: "me", text: "For sure. But worth it for patient data security", timestamp: "10:39 AM" },
  { id: "msg11", sender: "them", text: "100%. Are you presenting at India Blockchain Week?", timestamp: "10:40 AM" },
  { id: "msg12", sender: "me", text: "Yes! Got a speaking slot on Day 2", timestamp: "10:41 AM" },
  { id: "msg13", sender: "them", text: "Nice! What's your topic?", timestamp: "10:42 AM" },
  { id: "msg14", sender: "me", text: "AI + Blockchain for Social Good", timestamp: "10:43 AM" },
  { id: "msg15", sender: "them", text: "Perfect topic. Very relevant right now", timestamp: "10:44 AM" },
  { id: "msg16", sender: "me", text: "Thanks! Will share slides after", timestamp: "10:45 AM" },
  { id: "msg17", sender: "them", text: "Please do! I'm attending the conference too", timestamp: "10:46 AM" },
  { id: "msg18", sender: "me", text: "Oh awesome! Let's meetup", timestamp: "10:47 AM" },
  { id: "msg19", sender: "them", text: "Definitely! Coffee on Day 1?", timestamp: "10:48 AM" },
  { id: "msg20", sender: "me", text: "Sounds good. I'll DM you the venue", timestamp: "10:49 AM" },
  { id: "msg21", sender: "them", text: "Perfect 👍", timestamp: "10:50 AM" },
  { id: "msg22", sender: "me", text: "BTW, did you see the new DAO proposal?", timestamp: "10:51 AM" },
  { id: "msg23", sender: "them", text: "Not yet. What's it about?", timestamp: "10:52 AM" },
  { id: "msg24", sender: "me", text: "Funding 10 new health tech projects", timestamp: "10:53 AM" },
  { id: "msg25", sender: "them", text: "Oh nice! How much funding?", timestamp: "10:54 AM" },
  { id: "msg26", sender: "me", text: "₹1 Crore total. ₹10L per project", timestamp: "10:55 AM" },
  { id: "msg27", sender: "them", text: "That's generous! When's the vote?", timestamp: "10:56 AM" },
  { id: "msg28", sender: "me", text: "Tomorrow. You should vote", timestamp: "10:57 AM" },
  { id: "msg29", sender: "them", text: "Will do! I support health initiatives", timestamp: "10:58 AM" },
  { id: "msg30", sender: "me", text: "Same. Health is wealth 🏥", timestamp: "10:59 AM" },
  { id: "msg31", sender: "them", text: "Absolutely. Too many people without access", timestamp: "11:00 AM" },
  { id: "msg32", sender: "me", text: "That's why we're building this", timestamp: "11:01 AM" },
  { id: "msg33", sender: "them", text: "Making real impact. Respect! 💪", timestamp: "11:02 AM" },
  { id: "msg34", sender: "me", text: "Thanks! We're all in this together", timestamp: "11:03 AM" },
  { id: "msg35", sender: "them", text: "For sure. Hey, quick question", timestamp: "11:04 AM" },
  { id: "msg36", sender: "me", text: "Shoot", timestamp: "11:05 AM" },
  { id: "msg37", sender: "them", text: "How do you handle blockchain gas fees for users?", timestamp: "11:06 AM" },
  { id: "msg38", sender: "me", text: "We subsidize it for now. Important for adoption", timestamp: "11:07 AM" },
  { id: "msg39", sender: "them", text: "Smart move. Can't expect users to pay gas initially", timestamp: "11:08 AM" },
  { id: "msg40", sender: "me", text: "Exactly. We'll transition to meta-transactions later", timestamp: "11:09 AM" },
  { id: "msg41", sender: "them", text: "Good plan. Are you using any L2 solutions?", timestamp: "11:10 AM" },
  { id: "msg42", sender: "me", text: "Looking into it. HeLa is already pretty fast though", timestamp: "11:11 AM" },
  { id: "msg43", sender: "them", text: "True, sub-second finality is nice", timestamp: "11:12 AM" },
  { id: "msg44", sender: "me", text: "Yeah, transaction confirmation is instant", timestamp: "11:13 AM" },
  { id: "msg45", sender: "them", text: "That's crucial for healthcare use cases", timestamp: "11:14 AM" },
  { id: "msg46", sender: "me", text: "Can't have doctors waiting for confirmations", timestamp: "11:15 AM" },
  { id: "msg47", sender: "them", text: "Exactly! Time = lives in healthcare", timestamp: "11:16 AM" },
  { id: "msg48", sender: "me", text: "That's why we chose HeLa over other chains", timestamp: "11:17 AM" },
  { id: "msg49", sender: "them", text: "Makes sense. Speed + security", timestamp: "11:18 AM" },
  { id: "msg50", sender: "me", text: "And low fees. The trifecta! ⚡", timestamp: "11:19 AM" },
  { id: "msg51", sender: "them", text: "Haha yes! 😄 Anyway, I should get back to coding", timestamp: "11:20 AM" },
  { id: "msg52", sender: "me", text: "Same here. Got a demo tomorrow", timestamp: "11:21 AM" },
  { id: "msg53", sender: "them", text: "Good luck! You'll crush it", timestamp: "11:22 AM" },
  { id: "msg54", sender: "me", text: "Thanks! Sent you 5 HELA as thanks for the chat 💎", timestamp: "11:23 AM", isTip: true, tipAmount: 5 },
  { id: "msg55", sender: "them", text: "Wow thanks! You didn't have to", timestamp: "11:24 AM" },
  { id: "msg56", sender: "me", text: "Of course! Supporting fellow builders", timestamp: "11:25 AM" },
  { id: "msg57", sender: "them", text: "Much appreciated 🙏 Will tip you back soon", timestamp: "11:26 AM" },
  { id: "msg58", sender: "me", text: "No rush! Just keep building cool stuff", timestamp: "11:27 AM" },
  { id: "msg59", sender: "them", text: "Will do! Catch you later", timestamp: "11:28 AM" },
  { id: "msg60", sender: "me", text: "Later! 👋", timestamp: "11:29 AM" },
  { id: "msg61", sender: "them", text: "Oh wait, one more thing", timestamp: "11:30 AM" },
  { id: "msg62", sender: "me", text: "Yeah?", timestamp: "11:31 AM" },
  { id: "msg63", sender: "them", text: "Are you hiring? Friend is looking for blockchain dev role", timestamp: "11:32 AM" },
  { id: "msg64", sender: "me", text: "Actually yes! We're expanding the team", timestamp: "11:33 AM" },
  { id: "msg65", sender: "them", text: "Perfect! I'll send you their resume", timestamp: "11:34 AM" },
  { id: "msg66", sender: "me", text: "Great! Always looking for good devs", timestamp: "11:35 AM" },
  { id: "msg67", sender: "them", text: "They're solid. 5 years Solidity experience", timestamp: "11:36 AM" },
  { id: "msg68", sender: "me", text: "Nice! Have them apply through our website", timestamp: "11:37 AM" },
  { id: "msg69", sender: "them", text: "Will do. Thanks!", timestamp: "11:38 AM" },
  { id: "msg70", sender: "me", text: "No problem! Talk soon", timestamp: "11:39 AM" },
  { id: "msg71", sender: "them", text: "That's awesome! When are you launching?", timestamp: "11:40 AM" }
];

// trending hashtags
export const trendingHashtags = [
  { tag: "HealthTech", posts: 3420, growth: "+24%" },
  { tag: "EdTech", posts: 2891, growth: "+18%" },
  { tag: "FinTech", posts: 2567, growth: "+15%" },
  { tag: "SmartCities", posts: 1923, growth: "+32%" },
  { tag: "NFTArt", posts: 1789, growth: "+12%" },
  { tag: "DAOGovernance", posts: 1654, growth: "+28%" },
  { tag: "ClimateAction", posts: 1432, growth: "+22%" },
  { tag: "Web3Gaming", posts: 1287, growth: "+19%" },
  { tag: "DeFi", posts: 1156, growth: "+17%" },
  { tag: "AgriTech", posts: 987, growth: "+25%" }
];

// language options for selector
export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "Urdu", nativeName: "اردو" }
];

// sample posts for profile page
export const samplePosts = explorePosts.slice(0, 6);

// top creators for leaderboard
export const topCreators = [
  {
    rank: 1,
    user: sampleUsers[0],
    posts: 45,
    tipsReceived: 234.5,
    badge: "Gold",
    reputation: 2450
  },
  {
    rank: 2,
    user: sampleUsers[1],
    posts: 38,
    tipsReceived: 189.2,
    badge: "Silver",
    reputation: 2180
  },
  {
    rank: 3,
    user: sampleUsers[2],
    posts: 42,
    tipsReceived: 201.8,
    badge: "Silver",
    reputation: 2350
  },
  {
    rank: 4,
    user: sampleUsers[3],
    posts: 31,
    tipsReceived: 156.4,
    badge: "Bronze",
    reputation: 1920
  },
  {
    rank: 5,
    user: sampleUsers[4],
    posts: 35,
    tipsReceived: 167.9,
    badge: "Bronze",
    reputation: 2050
  },
  {
    rank: 6,
    user: sampleUsers[5],
    posts: 52,
    tipsReceived: 278.3,
    badge: "Gold",
    reputation: 2890
  },
  {
    rank: 7,
    user: sampleUsers[6],
    posts: 28,
    tipsReceived: 134.2,
    badge: "Bronze",
    reputation: 1680
  },
  {
    rank: 8,
    user: sampleUsers[7],
    posts: 33,
    tipsReceived: 145.7,
    badge: "Bronze",
    reputation: 1850
  }
];

// top tippers for leaderboard
export const topTippers = [
  {
    rank: 1,
    user: sampleUsers[2],
    tipsGiven: 312.5,
    recipientsHelped: 45,
    badge: "Diamond Supporter"
  },
  {
    rank: 2,
    user: sampleUsers[0],
    tipsGiven: 267.8,
    recipientsHelped: 38,
    badge: "Gold Supporter"
  },
  {
    rank: 3,
    user: sampleUsers[4],
    tipsGiven: 234.2,
    recipientsHelped: 32,
    badge: "Gold Supporter"
  },
  {
    rank: 4,
    user: sampleUsers[1],
    tipsGiven: 189.6,
    recipientsHelped: 28,
    badge: "Silver Supporter"
  },
  {
    rank: 5,
    user: sampleUsers[5],
    tipsGiven: 178.4,
    recipientsHelped: 25,
    badge: "Silver Supporter"
  }
];

// live activities for activity feed
export const liveActivities = [
  {
    id: "act1",
    type: "tip",
    user: sampleUsers[0],
    target: sampleUsers[1],
    amount: 5,
    token: "HELA",
    timestamp: "2s ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act2",
    type: "like",
    user: sampleUsers[2],
    target: sampleUsers[0],
    postId: "exp1",
    timestamp: "5s ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act3",
    type: "comment",
    user: sampleUsers[3],
    target: sampleUsers[1],
    postId: "exp2",
    timestamp: "12s ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act4",
    type: "quest",
    user: sampleUsers[4],
    questName: "Post your first NFT",
    timestamp: "23s ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act5",
    type: "nft",
    user: sampleUsers[5],
    target: sampleUsers[0],
    postId: "exp1",
    timestamp: "34s ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act6",
    type: "tip",
    user: sampleUsers[6],
    target: sampleUsers[3],
    amount: 3,
    token: "HELA",
    timestamp: "45s ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act7",
    type: "follow",
    user: sampleUsers[7],
    target: sampleUsers[2],
    timestamp: "56s ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act8",
    type: "tip",
    user: sampleUsers[1],
    target: sampleUsers[4],
    amount: 7,
    token: "HELA",
    timestamp: "1m ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act9",
    type: "like",
    user: sampleUsers[8],
    target: sampleUsers[5],
    postId: "exp6",
    timestamp: "1m ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "act10",
    type: "comment",
    user: sampleUsers[9],
    target: sampleUsers[6],
    postId: "exp7",
    timestamp: "2m ago",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  }
];

// sample notifications
export const sampleNotifications = [
  {
    id: "notif1",
    type: "comment",
    user: sampleUsers[1],
    message: "commented: \"Love your NFT post! 💎\"",
    timestamp: "5m ago",
    read: false,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif2",
    type: "like",
    user: sampleUsers[2],
    message: "liked your post \"Minted NFT\"",
    timestamp: "12m ago",
    read: false,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif3",
    type: "tip",
    user: sampleUsers[3],
    message: "tipped 3 HELA → your post",
    timestamp: "25m ago",
    read: true,
    amount: 3,
    token: "HELA",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif4",
    type: "badge",
    message: "You earned Gold Reputation Badge!",
    timestamp: "1h ago",
    read: true,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif5",
    type: "pending",
    user: sampleUsers[0],
    message: "Pending tip from @ft._venomm",
    timestamp: "2h ago",
    read: false,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif6",
    type: "comment",
    user: sampleUsers[4],
    message: "commented: \"Check my NFT collectibles! 🎮\"",
    timestamp: "3h ago",
    read: true,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif7",
    type: "tip",
    user: sampleUsers[7],
    message: "tipped 2 HELA → @priya_dev",
    timestamp: "5h ago",
    read: true,
    amount: 2,
    token: "HELA",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif8",
    type: "quest",
    message: "Quest Completed: \"Tip 3 creators\"",
    timestamp: "6h ago",
    read: true,
    reward: "10 HELA",
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif9",
    type: "follow",
    user: sampleUsers[5],
    message: "started following you",
    timestamp: "8h ago",
    read: true,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  },
  {
    id: "notif10",
    type: "like",
    user: sampleUsers[6],
    message: "liked your post",
    timestamp: "12h ago",
    read: true,
    transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`
  }
];

// sample quests for quest hub
export const sampleQuests = [
  {
    id: "quest1",
    title: "Post your first NFT",
    description: "Mint your first post as an NFT",
    requirement: "Mint 1 NFT post",
    reward: "Gold Badge + 50 HELA",
    progress: 1,
    total: 1,
    status: "completed",
    category: "nft",
    xp: 100
  },
  {
    id: "quest2",
    title: "Tip 3 creators",
    description: "Support creators by tipping HELA tokens",
    requirement: "Give tips to 3 different creators",
    reward: "Silver Badge + 25 HELA",
    progress: 2,
    total: 3,
    status: "in-progress",
    category: "community",
    xp: 75
  },
  {
    id: "quest3",
    title: "Get 5 likes",
    description: "Create engaging content",
    requirement: "Receive 5 likes on your posts",
    reward: "Bronze Badge + 10 HELA",
    progress: 5,
    total: 5,
    status: "completed",
    category: "engagement",
    xp: 50
  },
  {
    id: "quest4",
    title: "Comment 3 posts",
    description: "Engage with the community",
    requirement: "Comment on 3 different posts",
    reward: "Community Token + 5 HELA",
    progress: 1,
    total: 3,
    status: "in-progress",
    category: "engagement",
    xp: 30
  },
  {
    id: "quest5",
    title: "Participate in DAO vote",
    description: "Vote on a DAO proposal",
    requirement: "Cast 1 vote on-chain",
    reward: "Governance Badge + 30 HELA",
    progress: 1,
    total: 1,
    status: "completed",
    category: "governance",
    xp: 80
  },
  {
    id: "quest6",
    title: "Join Community",
    description: "Join a token-gated community",
    requirement: "Become member of 1 community",
    reward: "Community Badge + 15 HELA",
    progress: 1,
    total: 1,
    status: "completed",
    category: "community",
    xp: 60
  },
  {
    id: "quest7",
    title: "Create NFT post",
    description: "Share your creativity as NFT",
    requirement: "Upload and mint NFT post",
    reward: "Creator Badge + 40 HELA",
    progress: 0,
    total: 1,
    status: "available",
    category: "nft",
    xp: 90
  },
  {
    id: "quest8",
    title: "Complete 1 Quest",
    description: "Complete any quest",
    requirement: "Finish any quest",
    reward: "Achievement Token + 20 HELA",
    progress: 1,
    total: 1,
    status: "completed",
    category: "milestone",
    xp: 70
  },
  {
    id: "quest9",
    title: "Daily Post",
    description: "Post content daily",
    requirement: "Post text or image",
    reward: "Daily Streak + 2 HELA",
    progress: 1,
    total: 1,
    status: "completed",
    category: "daily",
    xp: 20
  },
  {
    id: "quest10",
    title: "Tip Leader",
    description: "Support a top creator",
    requirement: "Tip top creator 3 HELA",
    reward: "Patron Badge + Special NFT",
    progress: 0,
    total: 1,
    status: "available",
    category: "community",
    xp: 100
  }
];

// sample communities for token-gated communities page
export const sampleCommunities = [
  {
    id: "comm1",
    name: "NFT Collectors",
    description: "Exclusive community for NFT enthusiasts and collectors",
    members: 1250,
    coverImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
    requirement: "Own 1+ HeLa NFT",
    category: "nft",
    isJoined: true,
    posts: 342,
    recentActivity: [
      { user: sampleUsers[0], action: "shared NFT artwork", time: "2h ago" },
      { user: sampleUsers[7], action: "posted new collection", time: "5h ago" }
    ]
  },
  {
    id: "comm2",
    name: "HeLa Developers",
    description: "Community for developers building on HeLa blockchain",
    members: 850,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    requirement: "100+ Reputation",
    category: "tech",
    isJoined: true,
    posts: 567,
    recentActivity: [
      { user: sampleUsers[1], action: "shared smart contract tutorial", time: "1h ago" },
      { user: sampleUsers[0], action: "posted code review", time: "3h ago" }
    ]
  },
  {
    id: "comm3",
    name: "Music Fans",
    description: "For music lovers and artists on Web3",
    members: 520,
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    requirement: "50+ Reputation",
    category: "music",
    isJoined: false,
    posts: 234,
    recentActivity: [
      { user: sampleUsers[3], action: "shared new track", time: "4h ago" }
    ]
  },
  {
    id: "comm4",
    name: "Crypto Education",
    description: "Learn and teach about cryptocurrency and blockchain",
    members: 430,
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    requirement: "Public",
    category: "education",
    isJoined: false,
    posts: 189,
    recentActivity: [
      { user: sampleUsers[2], action: "posted beginner guide", time: "6h ago" }
    ]
  },
  {
    id: "comm5",
    name: "Gaming NFT",
    description: "Web3 gaming community and NFT game assets",
    members: 680,
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    requirement: "Own Gaming NFT",
    category: "gaming",
    isJoined: false,
    posts: 445,
    recentActivity: [
      { user: sampleUsers[4], action: "shared game tournament", time: "2h ago" }
    ]
  },
  {
    id: "comm6",
    name: "AI Artists",
    description: "AI-generated art and creative NFTs",
    members: 390,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    requirement: "Creator Badge",
    category: "art",
    isJoined: false,
    posts: 312,
    recentActivity: [
      { user: sampleUsers[7], action: "posted AI artwork", time: "1h ago" }
    ]
  },
  {
    id: "comm7",
    name: "DAO Enthusiasts",
    description: "Discuss DAO governance and decentralized organizations",
    members: 275,
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    requirement: "Governance Badge",
    category: "governance",
    isJoined: true,
    posts: 156,
    recentActivity: [
      { user: sampleUsers[8], action: "created proposal", time: "3h ago" }
    ]
  }
];
