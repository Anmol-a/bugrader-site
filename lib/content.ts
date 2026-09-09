export const scenarioSteps = [
  { time: "9:14 AM", event: "A backend price update quietly breaks a coupon code." },
  { time: "11:40 AM", event: "The first customer mentions it in a support DM." },
  { time: "2:00 PM", event: "Support finally loops engineering in to look at it." },
];

export const howItWorksSteps = [
  {
    n: "1",
    title: "Connect",
    body: "We get access to your site, app or API environments — nothing more than we need.",
  },
  {
    n: "2",
    title: "Automate",
    body: "Your critical journeys are mapped and scripted end to end, business rules included.",
  },
  {
    n: "3",
    title: "Monitor",
    body: "Every journey runs on a schedule, across real browsers and devices, continuously.",
  },
  {
    n: "4",
    title: "Alert",
    body: "A confirmed failure pages your team with the evidence, not just a status change.",
  },
];

export const monitoredJourneys = [
  {
    label: "Login & signup",
    desc: "Authentication across web and mobile — password resets, OTP delivery, and social login, tested the way a real user actually logs in.",
    icon: "login",
  },
  {
    label: "Cart & checkout",
    desc: "Every step from adding an item to completing an order — or your equivalent conversion flow, if you're not running a storefront.",
    icon: "cart",
  },
  {
    label: "Pricing & offers",
    desc: "Discount codes and dynamic pricing rules — confirming the price a customer is shown is the price they're actually charged.",
    icon: "tag",
  },
  {
    label: "Payment",
    desc: "Gateway hand-offs, retries and confirmation — across cards, wallets and whatever payment methods you support.",
    icon: "payment",
  },
  {
    label: "Search & discovery",
    desc: "Search, filters, and category or catalog pages — the paths people actually take to find what they're looking for.",
    icon: "search",
  },
  {
    label: "Account & subscription",
    desc: "Profile changes, usage or order history, and recurring billing — the parts of your product people come back to.",
    icon: "account",
  },
];

export const monitoredJourneysIntro =
  "These are the journeys we see most often. If a different flow in your product is where a failure would actually cost you a customer, that's what gets monitored — not a fixed list.";

// Team credibility copy — describes the team's composition and background
// without naming individuals or a current employer.
export const teamParagraphs = [
  "BugRadar is built and run by a team, not a single freelancer — spanning Automation Leads, QA Managers and Senior SDETs (Software Development Engineers in Test) with a combined 15+ years across production quality engineering and test automation.",
  "At the center of that team is a QA Automation Lead with 8 years of hands-on experience testing production consumer applications at scale — the same rigor now pointed at catching failures in your customer journeys before your customers do.",
  "The same network brings RPA, process automation and data automation expertise to the table — each built and used in real production environments, not studied in theory. That capability sits behind the core monitoring service, brought in as your needs grow rather than pitched upfront.",
];

// Cycles on the homepage to make the "continuous" part of continuous monitoring
// visible rather than just claimed. Illustrative sequence, not a live feed.
export const tickerEvents = [
  { journey: "Homepage", status: "pass", detail: "Full page load — 1.4s" },
  { journey: "Login", status: "pass", detail: "OTP flow verified" },
  { journey: "Cart", status: "pass", detail: "Add to cart — 3 SKUs" },
  { journey: "Checkout", status: "retry", detail: "Coupon mismatch — retrying" },
  { journey: "Checkout", status: "fail", detail: "Confirmed after 2nd failure" },
  { journey: "Payment", status: "pass", detail: "Gateway callback verified" },
  { journey: "Search", status: "pass", detail: "Filters returned results" },
  { journey: "Account", status: "pass", detail: "Profile update saved" },
];

export const alertSteps = [
  { title: "Confirmed", body: "Two consecutive failed runs turn a suspicion into an incident." },
  { title: "Delivered", body: "Sent straight to Slack or email, with the evidence attached." },
  { title: "Escalated", body: "If nobody acknowledges it, it moves up until someone does." },
];

export const impactStatements = [
  "Sales don't pause while nobody's watching — a broken checkout keeps costing you for every hour it stays broken.",
  "Customers rarely complain before they leave. Most just go to a competitor and don't come back.",
  "Every unmonitored bug is eventually found by your support team, then handed to engineering to reproduce from scratch.",
];

export const fitItems = [
  { title: "You sell online", body: "Checkout, cart or payment failures translate directly into lost revenue." },
  { title: "You ship often", body: "Frequent releases mean frequent chances for something to quietly break." },
  { title: "No in-house QA", body: "Your team is marketing- or sales-led, without dedicated testing coverage." },
  { title: "Third parties in the loop", body: "Payment gateways, coupon engines and pricing feeds that can change without warning." },
];

export const fitTags = ["D2C & e-commerce", "Wellness & nutrition", "Subscription commerce", "Marketplaces"];

// Illustrative dashboard data — not live telemetry. Swap once a real dashboard exists.
export const dashboardRings = [
  { name: "Checkout", pct: 96 },
  { name: "Cart", pct: 100 },
  { name: "Login", pct: 91 },
  { name: "Payment", pct: 98 },
];

export const compareRows = [
  { label: "When it runs", traditional: "Before a release", bugradar: "Continuously, after release" },
  { label: "What it catches", traditional: "What testers think to check", bugradar: "What actually breaks for real users" },
  { label: "Who finds it first", traditional: "Your team, if they look", bugradar: "BugRadar, before your customer does" },
  { label: "How long it lasts", traditional: "Ends at launch", bugradar: "Runs for as long as you're live" },
];

export const techGroups = [
  { title: "Automation", items: ["Java", "Selenium", "Appium", "REST Assured"] },
  { title: "Execution", items: ["Jenkins", "Selenium Grid"] },
  { title: "Infrastructure", items: ["AWS", "Docker"] },
  { title: "Device coverage", items: ["BrowserStack", "LambdaTest"] },
];

export const serviceModules = [
  {
    slug: "test-automation",
    title: "Test Automation",
    icon: "TestTube2",
    tagline: "Web, app and API coverage, plus manual QA where automation alone isn't enough.",
    summary: "End-to-end automated coverage across every layer your customers touch — backed by manual QA for what scripts can't judge.",
    capabilities: [
      { title: "Web automation", body: "Selenium-driven coverage across real browsers, for every critical flow on your site." },
      { title: "App automation", body: "Appium-driven coverage across real Android and iOS devices, not just emulators." },
      { title: "API automation", body: "REST Assured-driven contract and integration checks, catching breaks before they reach the UI." },
      { title: "Manual QA", body: "Exploratory testing for the judgment calls automation can't make — new features, edge cases, visual review." },
    ],
    tools: ["Java", "Selenium", "Appium", "REST Assured", "Jenkins", "Selenium Grid", "BrowserStack", "LambdaTest"],
  },
  {
    slug: "rpa",
    title: "RPA",
    icon: "Bot",
    tagline: "Software robots for the repetitive digital work behind the scenes.",
    summary: "Automating the manual, rule-based tasks your team repeats every day — order reconciliation, data entry, report generation.",
    capabilities: [
      { title: "Order & inventory reconciliation", body: "Matching records across systems that don't talk to each other natively." },
      { title: "Repetitive data entry", body: "Moving structured data between tools without a person copy-pasting it." },
      { title: "Scheduled report generation", body: "Pulling and formatting recurring reports on a schedule, unattended." },
      { title: "Rule-based approvals", body: "Routing routine approvals that follow a fixed set of rules." },
    ],
  },
  {
    slug: "data-automation",
    title: "Data & Web Automation",
    icon: "Database",
    tagline: "Structured tracking of information that lives outside your own systems.",
    summary: "Scheduled collection of competitor pricing, stock and review data — the market intelligence most teams check manually, if at all.",
    capabilities: [
      { title: "Competitor price tracking", body: "Scheduled checks against competitor pricing, so changes don't go unnoticed." },
      { title: "Stock & MRP monitoring", body: "Tracking availability and listed price across marketplaces and competitor sites." },
      { title: "Review monitoring", body: "Watching public reviews for new complaints or patterns worth acting on." },
      { title: "Structured delivery", body: "Data lands in a sheet, dashboard or feed your team already uses — not a raw dump." },
    ],
  },
  {
    slug: "process-automation",
    title: "Process Automation",
    icon: "Workflow",
    tagline: "Connecting the steps between your tools, not just automating one of them.",
    summary: "Where RPA automates a single task, this automates the handoff between systems — so a process runs end to end without a person in the loop.",
    capabilities: [
      { title: "Cross-system workflows", body: "Triggering the next step automatically when one system finishes its part." },
      { title: "Notification & escalation chains", body: "Routing an event to the right person automatically, not by someone remembering to forward it." },
      { title: "Scheduled batch jobs", body: "Recurring operational tasks that run on a timer instead of a checklist." },
    ],
  },
  {
    slug: "alerting",
    title: "Alerting & Escalation",
    icon: "BellRing",
    tagline: "A confirmed failure reaches your team wherever they already work.",
    summary: "Retry-then-confirm logic means alerts are rare enough to trust, and an escalation path means a real incident never sits unread.",
    capabilities: [
      { title: "Confirmed, not raw", body: "Two consecutive failed runs turn a suspicion into an incident — single blips stay quiet." },
      { title: "Delivered where you work", body: "Sent straight to Slack or email, with the evidence attached, not just a link to dig through." },
      { title: "Escalation on silence", body: "If nobody acknowledges it, it moves up the chain until someone does." },
    ],
  },
  {
    slug: "continuous-monitoring",
    title: "Continuous Monitoring",
    icon: "Radar",
    tagline: "The core of BugRadar — every critical journey, watched on a schedule, forever.",
    summary: "Not a one-time test pass. Every journey we automate keeps running in production, on a schedule, for as long as you're live.",
    capabilities: [
      { title: "Scheduled execution", body: "Every journey runs on a fixed schedule across real browsers and devices." },
      { title: "Production, not staging", body: "Checks run against what your customers actually see, not a pre-release environment." },
      { title: "Always on", body: "Monitoring doesn't end at launch — it runs for as long as you're a client." },
    ],
  },
];

export const secondaryCapabilities = [
  { title: "AI-assisted QA", body: "Test generation, failure analysis and triage summaries layered on top of the core monitoring." },
];

export const demoIncident = [
  { k: "Journey", v: "Checkout" },
  { k: "Step", v: "Apply coupon" },
  { k: "Expected", v: "₹899" },
  { k: "Actual", v: "₹999", bad: true },
  { k: "Confirmation", v: "2 of 2 runs failed" },
  { k: "Status", v: "Incident raised", bad: true },
  { k: "Alert", v: "Sent to on-call", good: true },
];

// Placeholder contact address — replace once the bugradar.in domain and inbox are live.
export const contactEmail = "hello@bugradar.in";