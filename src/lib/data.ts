export const SERVICES = [
  {
    slug: "web-development",
    n: "01",
    name: "Web Development",
    blurb: "Fast, accessible, framework-grade websites and web apps.",
    long: "We design and build websites and web applications that load fast, rank well and hold up under real traffic, from marketing sites to full product platforms.",
    deliverables: [
      "Custom design & front-end build",
      "CMS / headless integration",
      "Performance & accessibility audit",
      "Post-launch support window",
    ],
    tags: ["Next.js", "Headless CMS", "E-commerce", "Web apps"],
    gradient: "from-[#00AEEF] to-[#0033A0]",
  },
  {
    slug: "app-development",
    n: "02",
    name: "App Development",
    blurb: "Native-feeling iOS and Android apps, built to scale.",
    long: "From MVP to App Store launch, we build cross-platform and native apps that feel fast, look sharp, and are built to scale with your user base.",
    deliverables: [
      "Product & UX architecture",
      "Cross-platform or native build",
      "App Store / Play Store submission",
      "Crash monitoring & analytics setup",
    ],
    tags: ["iOS", "Android", "React Native", "App Store"],
    gradient: "from-[#0033A0] to-[#00AEEF]",
  },
  {
    slug: "digital-marketing",
    n: "03",
    name: "Digital Marketing",
    blurb: "Campaigns across search, social and paid that compound.",
    long: "We run full-funnel marketing across paid, social, email and CRO, with a bias toward channels that compound instead of campaigns that burn out.",
    deliverables: [
      "Channel strategy & audience mapping",
      "Paid social & search campaigns",
      "Email & lifecycle flows",
      "Monthly performance reporting",
    ],
    tags: ["PPC", "Social", "Email", "CRO"],
    gradient: "from-[#00AEEF] to-[#808080]",
  },
  {
    slug: "seo-services",
    n: "04",
    name: "SEO Services",
    blurb: "Technical + content SEO that actually moves rankings.",
    long: "Technical audits, content strategy and link building that move rankings, and more importantly, move revenue.",
    deliverables: [
      "Technical SEO audit & fixes",
      "Content & keyword strategy",
      "On-page & schema implementation",
      "Ongoing rank & traffic tracking",
    ],
    tags: ["Technical SEO", "Content", "Local", "Link building"],
    gradient: "from-[#808080] to-[#00AEEF]",
  },
  {
    slug: "video-editing",
    n: "05",
    name: "Video Editing",
    blurb: "Motion design and edits that stop the scroll.",
    long: "Motion design, post-production and social-native edits built to stop the scroll and hold attention long enough to convert.",
    deliverables: [
      "Edit & motion design",
      "Sound design & color grading",
      "Platform-native cutdowns",
      "Source & project file handoff",
    ],
    tags: ["Motion design", "Reels", "Post-production", "VFX"],
    gradient: "from-[#0033A0] to-[#808080]",
  },
] as const;

export const PROJECTS = [
  {
    id: "orbit",
    name: "Orbit Finance",
    category: "Web App / Fintech",
    service: "Web Development",
    gradient: "linear-gradient(135deg,#00AEEF,#0033A0)",
    result: "+64% conversion after redesign",
    summary:
      "A ground-up redesign of Orbit's investing dashboard, rebuilt for speed, clarity and trust, cutting onboarding drop-off in half.",
    featured: true,
  },
  {
    id: "haven",
    name: "Haven Living",
    category: "Web Development / Real Estate",
    service: "Web Development",
    gradient: "linear-gradient(135deg,#0D1117,#0033A0)",
    result: "3.2x organic traffic in 6 months",
    summary:
      "A new site architecture and content system for Haven, paired with technical SEO that tripled organic traffic in under two quarters.",
    featured: true,
  },
  {
    id: "lumen",
    name: "Lumen Health",
    category: "Web Platform / Healthcare",
    service: "Web Development",
    gradient: "linear-gradient(135deg,#0033A0,#808080)",
    result: "2.1x patient sign-ups after launch",
    summary:
      "A HIPAA-conscious patient portal rebuilt from the ground up: clearer booking flows, faster load times, more than double the sign-ups.",
    featured: false,
  },
  {
    id: "pulse",
    name: "Pulse Fit",
    category: "App Development / Health",
    service: "App Development",
    gradient: "linear-gradient(135deg,#808080,#1A1D23)",
    result: "120K downloads in first quarter",
    summary:
      "A cross-platform fitness app built from scratch, shipped two weeks early and hit 120K downloads within its first quarter live.",
    featured: true,
  },
  {
    id: "transit",
    name: "Transit Go",
    category: "Mobile App / Mobility",
    service: "App Development",
    gradient: "linear-gradient(135deg,#00AEEF,#1A1D23)",
    result: "4.6★ rating, 80K monthly active users",
    summary:
      "A city transit companion app rebuilt for reliability under real-world network conditions, now the top-rated app in its category.",
    featured: false,
  },
  {
    id: "nomad",
    name: "Nomad Wallet",
    category: "App Development / Fintech",
    service: "App Development",
    gradient: "linear-gradient(135deg,#0033A0,#00AEEF)",
    result: "45K installs in the first 60 days",
    summary:
      "A cross-border payments app taken from prototype to App Store launch in ten weeks, with security reviews built into every sprint.",
    featured: false,
  },
  {
    id: "north",
    name: "North & Co.",
    category: "Digital Marketing / Retail",
    service: "Digital Marketing",
    gradient: "linear-gradient(135deg,#00AEEF,#808080)",
    result: "ROAS up 3.8x across paid channels",
    summary:
      "A full-funnel paid and social overhaul for North & Co., nearly quadrupling return on ad spend across every active channel.",
    featured: true,
  },
  {
    id: "roast",
    name: "Bright Roast",
    category: "Digital Marketing / Food & Beverage",
    service: "Digital Marketing",
    gradient: "linear-gradient(135deg,#1A1D23,#0033A0)",
    result: "2.4x email revenue in 90 days",
    summary:
      "A lifecycle marketing rebuild for Bright Roast's subscription program: smarter segmentation, sharper copy, more than double the email revenue.",
    featured: false,
  },
  {
    id: "fieldnote",
    name: "Fieldnote Gear",
    category: "Digital Marketing / Outdoor Retail",
    service: "Digital Marketing",
    gradient: "linear-gradient(135deg,#0D1117,#808080)",
    result: "Customer acquisition cost down 38%",
    summary:
      "A paid social and creative testing overhaul for Fieldnote Gear that cut acquisition costs by over a third heading into peak season.",
    featured: false,
  },
  {
    id: "kiln",
    name: "Kiln Studio",
    category: "SEO / Hospitality",
    service: "SEO Services",
    gradient: "linear-gradient(135deg,#0033A0,#0D1117)",
    result: "#1 rankings across 40 local terms",
    summary:
      "A local SEO campaign that took Kiln Studio from page three to the top of local search across forty target terms.",
    featured: true,
  },
  {
    id: "anchor",
    name: "Anchor Legal",
    category: "SEO / Legal Services",
    service: "SEO Services",
    gradient: "linear-gradient(135deg,#808080,#0033A0)",
    result: "5x organic leads in 8 months",
    summary:
      "A technical SEO and content overhaul for Anchor Legal's practice pages, quintupling qualified organic leads within two quarters.",
    featured: false,
  },
  {
    id: "verdant",
    name: "Verdant Supply",
    category: "SEO / B2B Wholesale",
    service: "SEO Services",
    gradient: "linear-gradient(135deg,#00AEEF,#0D1117)",
    result: "Organic traffic up 210% year over year",
    summary:
      "A product-catalog SEO strategy for Verdant Supply's 3,000+ SKUs, more than tripling organic traffic across the fiscal year.",
    featured: false,
  },
  {
    id: "voxel",
    name: "Voxel Media",
    category: "Video Editing / Entertainment",
    service: "Video Editing",
    gradient: "linear-gradient(135deg,#1A1D23,#00AEEF)",
    result: "9M organic views across launch films",
    summary:
      "A suite of launch films and social cutdowns for Voxel Media's biggest release yet, crossing 9M organic views.",
    featured: true,
  },
  {
    id: "solace",
    name: "Solace Skincare",
    category: "Video Editing / Beauty",
    service: "Video Editing",
    gradient: "linear-gradient(135deg,#0033A0,#1A1D23)",
    result: "6.8M views, 3x landing page conversion",
    summary:
      "A social-native video series for Solace's product launch, cut for the first three seconds first, tripling landing page conversion.",
    featured: false,
  },
] as const;

export const PROJECT_CATEGORIES = [
  "All work",
  "Web Development",
  "App Development",
  "Digital Marketing",
  "SEO Services",
  "Video Editing",
] as const;

export const TEAM = [
  { name: "Tasir", role: "Founder", image: "/tasir.jpeg" },
  { name: "Abujar", role: "Video Editor", image: "/abujar.jpeg" },
  { name: "Adnan", role: "Digital Marketing Lead", image: "/adnan.jpeg" },
  { name: "Khalid", role: "Developer", image: "/khalid.jpeg" },
] as const;

export const BLOG_POSTS = [
  {
    slug: "designing-for-speed",
    title: "Designing for speed: why fast feels premium",
    excerpt:
      "Performance isn't just an engineering metric. It's a design decision users feel in the first 200ms.",
    category: "Design",
    date: "2026-06-02",
    gradient: "linear-gradient(135deg,#00AEEF,#0033A0)",
  },
  {
    slug: "seo-in-the-age-of-ai-search",
    title: "SEO in the age of AI search",
    excerpt:
      "Search is changing shape. Here's how we're adapting technical and content SEO for an AI-first results page.",
    category: "SEO",
    date: "2026-05-14",
    gradient: "linear-gradient(135deg,#808080,#1A1D23)",
  },
  {
    slug: "the-30-second-rule-for-launch-films",
    title: "The 30-second rule for launch films",
    excerpt:
      "Attention is the scarcest resource in marketing. Our editors on cutting for the first three seconds first.",
    category: "Video",
    date: "2026-04-22",
    gradient: "linear-gradient(135deg,#0033A0,#00AEEF)",
  },
] as const;
