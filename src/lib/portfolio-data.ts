export const site = {
  name: "Blark-Walter Designs",
  tagline: "UI/UX & Brand Designer",
  designer: "Clyde Walter",
  email: "blarkwalterdesigns@gmail.com",
  phone: "+234 901 941 1996",
  location: "Lagos, Nigeria",
  availability: "Available 24/7",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/subscriptions", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export const services = [
  { name: "UI/UX Design", desc: "Designing intuitive and engaging user experiences that solve real problems and drive results." },
  { name: "Mobile App Design", desc: "Crafting beautiful, user-friendly mobile apps for iOS and Android platforms." },
  { name: "Website Design", desc: "Building modern, responsive websites that inspire trust and deliver great experiences." },
  { name: "Frontend Development", desc: "Turning designs into fast, accessible, production-ready web experiences with React, TypeScript, and Tailwind." },
  { name: "Landing Page Design", desc: "High-converting landing pages that capture attention and turn visitors into customers." },
  { name: "Wireframing & Prototyping", desc: "Creating low to high-fidelity wireframes and prototypes to validate ideas early." },
  { name: "Brand Identity Design", desc: "Building strong brand identities that communicate purpose and create lasting impressions." },
  { name: "Logo Design", desc: "Designing unique, memorable logos that represent your brand's personality." },
  { name: "Social Media Design", desc: "Eye-catching social media graphics that grow engagement and build brand presence." },
  { name: "Design Systems", desc: "Creating scalable design systems that ensure consistency across digital products." },
  { name: "Print & Marketing Design", desc: "Designing flyers, brochures, banners, and other print materials that stand out." },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  client: string;
  industry: string;
  role: string;
  duration: string;
  year: string;
  platforms: string;
  summary: string;
  problem: string;
  solution: string;
  accent: string;
  liveUrl?: string;
  stack?: string[];
};

export const projects: Project[] = [
  { slug: "strideshoes", title: "StrideShoes", subtitle: "E-commerce Website", category: "Website", tags: ["Full-Stack", "Web App"], client: "StrideShoes", industry: "E-commerce / Fashion", role: "Full-Stack Developer", duration: "6 Weeks", year: "2024", platforms: "Web", summary: "A modern e-commerce experience for a sneaker brand — product catalogue, cart, and checkout designed and built end-to-end.", problem: "The client needed a fast, mobile-first storefront that could showcase drops and convert first-time visitors.", solution: "Designed a clean product-forward UI, built a responsive React frontend, and wired a lightweight cart/checkout flow with smooth animations.", accent: "from-emerald-500 to-teal-600", liveUrl: "https://strideshoes.netlify.app/", stack: ["React", "TypeScript", "Tailwind", "Netlify"] },
  { slug: "myphotographs", title: "MyPhotographs", subtitle: "Photography Portfolio", category: "Website", tags: ["Full-Stack", "Portfolio"], client: "MyPhotographs", industry: "Photography", role: "Full-Stack Developer", duration: "3 Weeks", year: "2024", platforms: "Web", summary: "A minimalist portfolio site built to let a photographer's images do the talking with immersive galleries and smooth navigation.", problem: "The photographer needed an elegant, distraction-free space to showcase collections and attract client bookings.", solution: "Built a masonry gallery, lightbox viewer and contact flow with an editorial layout that puts the photography first.", accent: "from-slate-700 to-neutral-900", liveUrl: "https://myphotographs.netlify.app/", stack: ["React", "Tailwind", "Netlify"] },
  { slug: "darlington-power-tech", title: "Darlington Power Tech", subtitle: "Corporate Website & Branding", category: "Website", tags: ["Full-Stack", "Branding"], client: "Darlington Power Tech", industry: "Energy", role: "Full-Stack Developer & Brand Designer", duration: "6 Weeks", year: "2023", platforms: "Web", summary: "Complete brand identity and corporate website for an engineering and power solutions company.", problem: "A technical company needed a professional web presence that communicated trust and expertise.", solution: "A bold red-and-black identity system paired with a responsive corporate website covering services, projects and contact flows.", accent: "from-red-600 to-neutral-800", liveUrl: "https://darlingtonpowertech.com", stack: ["React", "TypeScript", "Tailwind"] },
  { slug: "ted-power-engineering", title: "Ted Power Engineering", subtitle: "Engineering Company Website", category: "Website", tags: ["Full-Stack", "Corporate"], client: "Ted Power Engineering Limited", industry: "Engineering", role: "Full-Stack Developer", duration: "5 Weeks", year: "2024", platforms: "Web", summary: "A professional corporate website for an engineering firm — services, past projects, and lead-capture built end-to-end.", problem: "The company needed a credible online presence to win larger contracts and consolidate their services in one place.", solution: "Designed and built a responsive multi-page site with clear service breakdowns, project showcases and a streamlined contact flow.", accent: "from-sky-600 to-indigo-700", liveUrl: "https://tedpowerengineeringlimited.com", stack: ["React", "TypeScript", "Tailwind"] },
  { slug: "nexabank", title: "NexaBank", subtitle: "Mobile Banking App", category: "UI/UX Design", tags: ["UI/UX Design", "Mobile App"], client: "NexaBank Limited", industry: "Banking & Finance", role: "UI/UX Designer", duration: "8 Weeks", year: "2024", platforms: "iOS & Android", summary: "A modern banking app that simplifies money management with smart features and a seamless user experience.", problem: "Users faced complicated banking processes, cluttered interfaces, and lack of clarity in tracking their finances.", solution: "We designed a clean, intuitive, and user-centered app that simplifies banking tasks, provides smart insights, and ensures top-notch security.", accent: "from-violet-600 to-fuchsia-600" },
  { slug: "voicify", title: "Voicify", subtitle: "AI Voice-over Platform", category: "UI/UX Design", tags: ["UI/UX Design", "Web App"], client: "Voicify Inc.", industry: "AI / Media", role: "Product Designer", duration: "10 Weeks", year: "2024", platforms: "Web", summary: "An AI-powered voice platform for creating high-quality voiceovers in minutes.", problem: "Content creators struggled with expensive voice actors and slow turnaround.", solution: "A studio-grade web app with instant AI voices, script editing, and a library of tuned characters.", accent: "from-indigo-600 to-blue-500" },
  { slug: "palscheck", title: "PalsCheck", subtitle: "Video Entertainment App", category: "UI/UX Design", tags: ["UI/UX Design", "Mobile App"], client: "PalsCheck", industry: "Entertainment", role: "Lead Designer", duration: "6 Weeks", year: "2023", platforms: "iOS & Android", summary: "A video platform that connects creators and viewers through engaging content.", problem: "Fragmented discovery and weak creator tools were pushing audiences away.", solution: "A cinematic dark UI, personalized rails, and creator dashboards.", accent: "from-rose-600 to-red-500" },
  { slug: "learn-with-blark", title: "Learn with Blark", subtitle: "Educational Brand Identity", category: "Graphics Design", tags: ["Branding", "Graphics"], client: "Learn with Blark", industry: "Education", role: "Brand Designer", duration: "4 Weeks", year: "2023", platforms: "Web & Social", summary: "Brand identity and digital presence for my platform where I teach UI/UX and design.", problem: "The teaching brand needed a distinct voice and visual language.", solution: "A warm, editorial identity with a flexible design system.", accent: "from-amber-500 to-orange-600" },
  { slug: "demerit-homes", title: "DE'MERIT HOMES LIMITED", subtitle: "Real Estate Brand", category: "Graphics Design", tags: ["Branding", "Marketing"], client: "DE'MERIT Homes", industry: "Real Estate", role: "Brand Designer", duration: "5 Weeks", year: "2023", platforms: "Print & Digital", summary: "Complete brand identity and marketing designs for a real estate developer.", problem: "A promising developer with no cohesive story.", solution: "A stately gold-and-black identity and sales collateral.", accent: "from-yellow-500 to-amber-700" },
  { slug: "blark-walter-logo", title: "Blark-walter Designs", subtitle: "Studio Logo Mark", category: "Logo", tags: ["Logo", "Branding"], client: "Blark-walter Designs", industry: "Design Studio", role: "Logo Designer", duration: "1 Week", year: "2023", platforms: "Print & Digital", summary: "A monogram logo built around the initials of the studio — bold, geometric and instantly recognisable.", problem: "The studio needed a distinctive mark that could work at any size and across print and digital.", solution: "A geometric monogram in a confident yellow-and-black palette with a clean type lockup.", accent: "from-yellow-400 to-amber-600" },
];

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: { heading: string; content: string }[];
  tags: string[];
};

export const posts: Post[] = [
  { slug: "art-behind-the-interface", title: "The Art Behind the Interface: Secrets of UI/UX Magic", category: "UI/UX Design", date: "May 12, 2024", readTime: "5 min read", excerpt: "Exploring the principles that turn complex interfaces into simple, intuitive, and delightful user experiences.", tags: ["UI/UX", "Design Process", "User Research", "Interaction Design"], body: [
    { heading: "1. Understand Before You Design", content: "Every great design starts with understanding the user." },
    { heading: "2. Simplicity is the Ultimate Sophistication", content: "A clean, intuitive interface reduces cognitive load." },
    { heading: "3. Details Create Delight", content: "Micro-interactions leave a lasting impression." },
    { heading: "4. Test, Iterate, Improve", content: "Design is never perfect on the first try." },
    { heading: "Final Thoughts", content: "When we design with empathy, we create real impact." },
  ] },
  { slug: "mvp-to-scalable-product", title: "From MVP to Scalable Product: My Design Journey", category: "Product Design", date: "Apr 28, 2024", readTime: "6 min read", excerpt: "How thoughtful design decisions helped transform ideas into scalable digital products.", tags: ["Product Design", "MVP", "Scale"], body: [
    { heading: "Start with the smallest sharp thing", content: "Ship the sharpest slice of value you can defend." },
    { heading: "Design for the second version", content: "Systems and tokens save you months later." },
    { heading: "Measure what changes behavior", content: "Track the two or three metrics that predict retention." },
  ] },
  { slug: "designing-mobile-apps-users-love", title: "Designing Mobile Apps Users Actually Love", category: "Mobile Design", date: "Apr 15, 2024", readTime: "4 min read", excerpt: "Key UX patterns and micro-interactions that keep users coming back.", tags: ["Mobile", "UX"], body: [
    { heading: "Thumb-first thinking", content: "Design primary actions where the thumb naturally lands." },
    { heading: "Motion as feedback", content: "Every tap should confirm itself with motion." },
  ] },
  { slug: "brand-identity-more-than-logo", title: "Brand Identity: More Than Just a Logo", category: "Branding", date: "Mar 30, 2024", readTime: "5 min read", excerpt: "Building a visual identity that communicates your brand values.", tags: ["Branding", "Identity"], body: [
    { heading: "A logo is a signature, not a brand", content: "The logo is just the shortest way to remember your brand." },
    { heading: "Systems beat marks", content: "A consistent system will out-work a beautiful logo every time." },
  ] },
];

export const testimonials = [
  { name: "Michael Johnson", role: "CEO, NexaBank Limited", project: "NexaBank Mobile App", quote: "Blark-Walter Designs delivered an outstanding mobile banking app that exceeded our expectations." },
  { name: "Sarah Williams", role: "Product Manager, Voicify", project: "Voicify AI Platform", quote: "The Voicify platform wouldn't be what it is without Blark-Walter Designs. Highly professional!" },
  { name: "David Okoro", role: "Founder, Learn with Blark", project: "Learn with Blark", quote: "From branding to UI/UX design, the entire experience was smooth and impactful." },
  { name: "Paula Reynolds", role: "CEO, PalsCheck", project: "PalsCheck", quote: "Blark-Walter Designs transformed our idea into a powerful digital product that our users love." },
  { name: "Robert Fox", role: "Founder, DE'MERIT Homes", project: "DE'MERIT Homes", quote: "Professional, creative, and reliable. They truly care about your success." },
];

export const tools = [
  { name: "Figma", mastery: 98 },
  { name: "Photoshop", mastery: 95 },
  { name: "Illustrator", mastery: 95 },
  { name: "React", mastery: 92 },
  { name: "TypeScript", mastery: 90 },
  { name: "Tailwind", mastery: 94 },
];

export const frontendSkills = [
  { name: "React & Next.js", level: "Expert" },
  { name: "TypeScript", level: "Expert" },
  { name: "Tailwind CSS", level: "Expert" },
  { name: "HTML5 & CSS3", level: "Expert" },
  { name: "Framer Motion", level: "Advanced" },
  { name: "Accessibility (a11y)", level: "Advanced" },
  { name: "REST & GraphQL APIs", level: "Advanced" },
  { name: "Git & CI/CD", level: "Advanced" },
];

export const education = [
  { title: "B.Sc in Computer Science", org: "University of Nigeria", when: "2016 - 2020" },
  { title: "UI/UX Design Professional Certificate", org: "Google Career Certificates", when: "2021" },
  { title: "Brand Design Masterclass", org: "Udemy", when: "2022" },
];

export const experience = [
  { title: "UI/UX Designer", org: "Freelance (Remote)", when: "2020 - Present" },
  { title: "Product Designer", org: "TechNova Solutions", when: "2022 - 2023" },
  { title: "Frontend Developer", org: "Freelance", when: "2023 - Present" },
];
