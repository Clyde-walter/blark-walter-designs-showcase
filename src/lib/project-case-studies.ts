export type ProjectCaseStudy = {
  overview: string;
  highlights: { title: string; description: string }[];
  process: { title: string; description: string }[];
  deliverables: string[];
  outcome: string;
};

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  strideshoes: {
    overview:
      "StrideShoes was shaped as a product-first storefront where new releases are easy to discover, compare, and buy on any screen. The work connected visual design with the complete shopping journey, from browsing to checkout.",
    highlights: [
      { title: "Product discovery", description: "Clear collections and product details help shoppers find the right pair quickly." },
      { title: "Mobile-first shopping", description: "Navigation, product selection, and cart actions remain effortless on smaller screens." },
      { title: "Focused checkout", description: "A direct purchase flow reduces distractions between adding an item and completing an order." },
      { title: "Launch-ready build", description: "The responsive interface was implemented as a working, deployable storefront." },
    ],
    process: [
      { title: "Discover", description: "Mapped the audience, catalogue needs, and core purchase journey." },
      { title: "Structure", description: "Organized products, categories, details, cart, and checkout into a clear flow." },
      { title: "Design", description: "Created a bold visual system that keeps the footwear at the center." },
      { title: "Build", description: "Developed the responsive storefront and interactive shopping states." },
      { title: "Refine", description: "Tested key journeys and polished the experience across screen sizes." },
    ],
    deliverables: ["Responsive storefront", "Product catalogue", "Cart experience", "Checkout flow", "Reusable interface system"],
    outcome: "The finished site gives StrideShoes a credible digital shopfront and a straightforward path from product discovery to purchase.",
  },
  myphotographs: {
    overview:
      "MyPhotographs is an editorial portfolio designed to let each image command attention. The experience balances immersive viewing with simple navigation and a direct route for prospective clients to make contact.",
    highlights: [
      { title: "Image-led layout", description: "Generous space and restrained typography keep the photography in focus." },
      { title: "Flexible gallery", description: "A masonry presentation supports varied image proportions without feeling repetitive." },
      { title: "Immersive viewing", description: "The lightbox experience lets visitors study individual photographs in detail." },
      { title: "Client enquiries", description: "Clear contact pathways turn portfolio interest into booking conversations." },
    ],
    process: [
      { title: "Curate", description: "Reviewed the work and grouped images into coherent visual collections." },
      { title: "Frame", description: "Defined a quiet editorial system for type, spacing, and image rhythm." },
      { title: "Prototype", description: "Tested gallery density, navigation, and full-screen viewing behavior." },
      { title: "Build", description: "Implemented the responsive gallery, lightbox, and enquiry flow." },
      { title: "Polish", description: "Optimized presentation and transitions for a smooth viewing experience." },
    ],
    deliverables: ["Portfolio website", "Masonry gallery", "Lightbox viewer", "Collection navigation", "Contact flow"],
    outcome: "The final portfolio presents the photographer’s work as a cohesive body of work while making it easy for visitors to explore and enquire.",
  },
  "darlington-power-tech": {
    overview:
      "Darlington Power Tech needed its engineering capability to feel clear, dependable, and established online. The project paired a confident identity with a structured corporate website for services, completed work, and enquiries.",
    highlights: [
      { title: "Credible positioning", description: "A bold identity communicates technical confidence and reliability." },
      { title: "Clear services", description: "Complex engineering offerings are organized into concise, scannable information." },
      { title: "Project evidence", description: "Past work gives prospective clients practical proof of capability." },
      { title: "Responsive access", description: "The company story and contact paths work consistently across devices." },
    ],
    process: [
      { title: "Audit", description: "Reviewed the company’s services, audience, and existing brand materials." },
      { title: "Position", description: "Defined a visual direction centered on strength, safety, and expertise." },
      { title: "Structure", description: "Built a content hierarchy for services, projects, company information, and contact." },
      { title: "Design & Build", description: "Created and developed the responsive corporate experience." },
      { title: "Launch", description: "Checked content, interactions, and device behavior before release." },
    ],
    deliverables: ["Brand direction", "Corporate website", "Service pages", "Project showcase", "Lead enquiry flow"],
    outcome: "The company now has a professional digital presence that explains its expertise and supports conversations with larger prospective clients.",
  },
  "ted-power-engineering": {
    overview:
      "Ted Power Engineering’s website brings its services and track record together in one professional destination. The design prioritizes trust, quick scanning, and clear next steps for organizations evaluating an engineering partner.",
    highlights: [
      { title: "Service clarity", description: "Visitors can quickly understand the company’s engineering capabilities." },
      { title: "Trust signals", description: "Project experience and company information reinforce professional credibility." },
      { title: "Lead capture", description: "Prominent enquiry routes make it simple to begin a project conversation." },
      { title: "Multi-page system", description: "A consistent responsive system supports detailed corporate content." },
    ],
    process: [
      { title: "Discover", description: "Clarified company goals, buyer questions, and priority services." },
      { title: "Organize", description: "Mapped a multi-page structure around visitor decision-making." },
      { title: "Design", description: "Established a professional interface with clear hierarchy and calls to action." },
      { title: "Develop", description: "Built reusable pages and responsive interactions." },
      { title: "Validate", description: "Reviewed key journeys and refined content presentation before launch." },
    ],
    deliverables: ["Corporate website", "Responsive page system", "Service presentation", "Project showcase", "Contact experience"],
    outcome: "The completed website gives Ted Power Engineering a unified, credible platform for presenting its work and generating qualified enquiries.",
  },
  nexabank: {
    overview:
      "NexaBank reimagines everyday mobile banking around clarity, confidence, and speed. The product brings transactions, spending visibility, and account controls into a calm interface that makes complex financial tasks feel manageable.",
    highlights: [
      { title: "Fast transactions", description: "Send, receive, and transfer journeys use clear steps and immediate feedback." },
      { title: "Financial visibility", description: "Simple summaries help users understand spending and account activity." },
      { title: "Secure access", description: "Security patterns are integrated without making routine tasks feel difficult." },
      { title: "Accessible interface", description: "Readable hierarchy and familiar controls reduce cognitive load." },
    ],
    process: [
      { title: "Research", description: "Studied common banking frustrations, user expectations, and competitor patterns." },
      { title: "Define", description: "Mapped personas, critical tasks, and the information users need at each step." },
      { title: "Ideate", description: "Explored user flows and wireframes for core money-management journeys." },
      { title: "Design", description: "Created the visual system and high-fidelity mobile interface." },
      { title: "Test", description: "Reviewed usability, refined unclear moments, and improved task completion." },
    ],
    deliverables: ["Product strategy", "User flows", "Wireframes", "High-fidelity mobile UI", "Interactive prototype", "Design system"],
    outcome: "The concept demonstrates a simpler banking experience where users can understand their money and complete essential tasks with confidence.",
  },
  voicify: {
    overview:
      "Voicify turns voice-over production into a focused browser workflow. The experience helps creators move from script to generated audio quickly while retaining control over voice choice, pacing, and project organization.",
    highlights: [
      { title: "Guided creation", description: "A focused studio flow keeps script editing and voice controls close together." },
      { title: "Voice discovery", description: "Organized voice options make it easier to find the right tone for a project." },
      { title: "Rapid iteration", description: "Creators can adjust content and settings without restarting their workflow." },
      { title: "Project library", description: "Saved work remains easy to find, review, and continue." },
    ],
    process: [
      { title: "Research", description: "Mapped creator workflows and the friction in traditional voice production." },
      { title: "Define", description: "Prioritized script, voice, generation, and library tasks." },
      { title: "Flow", description: "Designed an end-to-end creation journey with clear progress and controls." },
      { title: "Interface", description: "Built a studio-inspired visual system for focused production work." },
      { title: "Validate", description: "Tested terminology, control placement, and repeated creation scenarios." },
    ],
    deliverables: ["Product UX", "Creation workflow", "Voice library", "Studio interface", "Interactive prototype", "UI system"],
    outcome: "Voicify’s design makes AI voice creation approachable for everyday creators while preserving the control expected from a production tool.",
  },
  palscheck: {
    overview:
      "PalsCheck is a video entertainment concept built around discovery, viewing, and creator participation. Its cinematic interface gives audiences a personalized way to browse while giving creators clearer tools to manage their presence.",
    highlights: [
      { title: "Personal discovery", description: "Content rails and recommendations help viewers find relevant videos quickly." },
      { title: "Immersive playback", description: "A cinematic viewing experience keeps content and interaction balanced." },
      { title: "Creator workspace", description: "Publishing and performance views support consistent creator activity." },
      { title: "Social engagement", description: "Familiar interaction patterns encourage connection around each video." },
    ],
    process: [
      { title: "Explore", description: "Studied viewer habits and creator needs across entertainment products." },
      { title: "Map", description: "Defined discovery, playback, profile, and publishing journeys." },
      { title: "Wireframe", description: "Tested hierarchy and navigation through low-fidelity concepts." },
      { title: "Design", description: "Created a cinematic interface and reusable mobile patterns." },
      { title: "Refine", description: "Improved discoverability and interaction details through review." },
    ],
    deliverables: ["Mobile product UX", "Content discovery", "Video player", "Creator dashboard", "Interactive prototype"],
    outcome: "The final concept unifies the viewer and creator sides of the product in an engaging, coherent mobile experience.",
  },
  "learn-with-blark": {
    overview:
      "Learn with Blark needed an approachable identity for practical design education. The system combines editorial warmth with flexible digital assets that can support lessons, community content, and social publishing.",
    highlights: [
      { title: "Distinct teaching voice", description: "The identity balances expertise with an accessible, encouraging personality." },
      { title: "Flexible content system", description: "Templates make educational ideas recognizable across formats." },
      { title: "Editorial clarity", description: "Typography and hierarchy keep learning content easy to follow." },
      { title: "Consistent presence", description: "A shared visual language connects web and social touchpoints." },
    ],
    process: [
      { title: "Discover", description: "Defined the teaching mission, audience, and personality of the platform." },
      { title: "Position", description: "Established an approachable editorial direction for the brand." },
      { title: "Explore", description: "Developed identity routes, typography, and graphic devices." },
      { title: "Systemize", description: "Turned the selected direction into reusable content templates." },
      { title: "Apply", description: "Tested the system across educational and social media examples." },
    ],
    deliverables: ["Brand identity", "Visual language", "Typography system", "Social templates", "Digital brand guidelines"],
    outcome: "The identity gives Learn with Blark a recognizable platform for teaching, sharing, and building a design-learning community.",
  },
  "demerit-homes": {
    overview:
      "DE’MERIT Homes required a visual identity capable of presenting property opportunities with confidence. The project created a polished brand system and practical sales materials for both digital and print communication.",
    highlights: [
      { title: "Premium positioning", description: "The identity communicates confidence without sacrificing approachability." },
      { title: "Property clarity", description: "Marketing layouts give listings, benefits, and contact details a clear hierarchy." },
      { title: "Sales consistency", description: "Reusable assets keep campaigns recognizable across channels." },
      { title: "Print and digital", description: "The system adapts cleanly to physical collateral and social content." },
    ],
    process: [
      { title: "Discover", description: "Clarified the developer’s audience, offer, and competitive context." },
      { title: "Position", description: "Defined a stately visual direction for trust and long-term value." },
      { title: "Design", description: "Created the identity, typography, palette, and supporting graphics." },
      { title: "Apply", description: "Extended the system into sales and campaign materials." },
      { title: "Deliver", description: "Prepared consistent assets for print and digital use." },
    ],
    deliverables: ["Brand identity", "Marketing collateral", "Property flyers", "Social graphics", "Sales presentation assets"],
    outcome: "DE’MERIT Homes gained a cohesive visual presence that supports clearer property marketing and a more credible sales conversation.",
  },
  "blark-walter-logo": {
    overview:
      "The Blark-walter Designs mark turns the studio initials into a compact geometric signature. It was designed to remain recognizable at small sizes while carrying enough character for prominent brand applications.",
    highlights: [
      { title: "Memorable geometry", description: "A distinct monogram gives the studio an ownable visual signature." },
      { title: "Scalable form", description: "The mark remains clear across small digital uses and large print applications." },
      { title: "Flexible lockups", description: "Symbol and wordmark configurations support different formats." },
      { title: "Confident contrast", description: "The palette creates immediate recognition across light and dark settings." },
    ],
    process: [
      { title: "Define", description: "Clarified the studio personality and practical requirements for the mark." },
      { title: "Sketch", description: "Explored letterforms, negative space, and geometric relationships." },
      { title: "Refine", description: "Reduced the strongest direction into a balanced, reproducible symbol." },
      { title: "Test", description: "Checked legibility across sizes, colors, and real-world placements." },
      { title: "Package", description: "Prepared the core logo configurations for consistent use." },
    ],
    deliverables: ["Primary logo", "Monogram", "Logo lockups", "Color variations", "Usage guidance"],
    outcome: "The completed mark gives Blark-walter Designs a compact and recognizable identity that works consistently across digital and print touchpoints.",
  },
};