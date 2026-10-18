// The address box's first filter (18 Oct). Same file in THREE places: bugradar-dashboard web/src/lib/storeAddress.ts,
// supabase/functions/scan_request/storeAddress.ts and bugrader-site lib/storeAddress.ts — change all three. This is only
// the instant, no-network layer. The real gate is the scan_request function: it queues a check only when the site proves it is Shopify.

// Clearly not online stores. Matched against the host without "www.": the name must be the registered label
// (gmail.com, mail.google.com, hdfcbank.co.in all match; "gmailstore.in" does not).
const NOT_STORE_NAMES = [
  // webmail, chat, social
  "gmail", "googlemail", "outlook", "hotmail", "yahoo", "ymail", "protonmail", "proton", "zoho", "rediffmail", "rediff",
  "aol", "icloud", "mail", "whatsapp", "telegram", "discord", "slack", "zoom", "skype", "messenger",
  "facebook", "fb", "instagram", "twitter", "x", "linkedin", "reddit", "quora", "pinterest", "tumblr", "snapchat",
  "tiktok", "youtube", "vimeo", "twitch", "substack", "wordpress", "blogspot", "blogger",
  // search, tech, OS, app stores
  "google", "bing", "duckduckgo", "yandex", "baidu", "apple", "microsoft", "android",   "amazonaws", "cloudflare", "akamai", "fastly", "vercel", "netlify", "github", "gitlab", "bitbucket", "stackoverflow",
  "openai", "chatgpt", "anthropic", "claude", "adobe", "dropbox", "notion", "figma", "canva", "wix", "squarespace", "godaddy",
  "shopify", "wordpress", "woocommerce", "magento", "bigcommerce",
  // marketplaces (they are stores, but not Shopify stores and not the owner's)
  "amazon", "flipkart", "myntra", "ajio", "nykaa", "meesho", "snapdeal", "tatacliq", "jiomart", "bigbasket", "blinkit",
  "zepto", "swiggy", "zomato", "ebay", "etsy", "aliexpress", "alibaba", "walmart", "indiamart", "olx", "quikr",
  // money: banks, cards, UPI, wallets, brokers, insurers
  "sbi", "onlinesbi", "hdfcbank", "icicibank", "axisbank", "kotak", "yesbank", "idfcfirstbank", "indusind", "pnbindia",
  "bankofbaroda", "canarabank", "unionbankofindia", "bankofindia", "federalbank", "rblbank", "aubank", "paytm",
  "phonepe", "gpay", "bhimupi", "npci", "razorpay", "payu", "cashfree", "ccavenue", "billdesk", "instamojo", "stripe",
  "paypal", "visa", "mastercard", "rupay", "americanexpress", "amex", "zerodha", "groww", "upstox", "angelone",
  "icicidirect", "hdfcsec", "coindcx", "wazirx", "binance", "coinbase", "policybazaar", "licindia", "lic",
  "bajajfinserv", "bajajfinance", "cred", "moneycontrol", "nseindia", "bseindia", "rbi",
  "sebi", "incometax", "incometaxindia", "gst", "uidai", "epfindia", "irctc", "digilocker", "mygov", "india", "nic",
  // news, reference
  "wikipedia", "wikimedia", "ndtv", "timesofindia", "indiatimes", "hindustantimes", "thehindu", "indianexpress",
  "livemint", "economictimes", "news18", "aajtak", "zeenews", "bbc", "cnn", "reuters", "nytimes", "theguardian",
  "bloomberg", "forbes", "theprint", "thewire", "republicworld", "indiatoday", "firstpost", "dainikbhaskar",
  "jagran", "amarujala", "lokmat",
  // travel, food delivery, cabs, telecom, utilities, streaming
  "makemytrip", "goibibo", "cleartrip", "yatra", "booking", "airbnb", "agoda", "oyorooms", "redbus", "uber", "ola",
  "rapido", "airtel", "jio", "bsnl", "tatasky", "tataplay", "netflix", "primevideo", "hotstar", "jiocinema",
  "sonyliv", "zee5", "spotify", "gaana", "wynk", "jiosaavn",
  // schools, jobs, government words
  "naukri", "indeed", "glassdoor", "coursera", "udemy", "byjus", "unacademy", "vedantu", "gov", "edu",
  "ac", "res", "mil",
];
const NOT_STORE_RE = new RegExp(`(^|\\.)(${NOT_STORE_NAMES.join("|")})\\.[a-z.]+$|\\.(gov|edu|mil|ac|res|nic)(\\.[a-z]{2})?$`, "i");

// Restricted goods and content: never checked from the free page.
const RESTRICTED =
  /(porn|xxx|(^|[.-])sex|adult|escort|hookup|casino|betting|bet365|gambl|rummy|poker|lottery|satta|matka|cannabis|(^|[.-])weed|ganja|(^|[.-])drugs?([.-]|$)|vape|(^|[.-])guns?([.-]|$)|firearm|ammo|weapon|crypto|forex|(^|[.-])loans?([.-]|$)|lending|onlyfans)/i;

// Addresses that are not public websites: our server must never be asked to open these.
const NOT_PUBLIC =
  /^(localhost|.*\.(local|localhost|internal|lan|home|test|example|invalid|onion))$|^(\d+)\.(\d+)\.(\d+)\.(\d+)$|^\[?[0-9a-f:]*:[0-9a-f:]*\]?$/i;

export type AddressCheck = { host?: string; error?: string };

export const ADDRESS_ERRORS = {
  empty: "Type your store's address, like yourstore.com",
  shape: "That doesn't look like a web address. Try yourstore.com",
  restricted: "We can't check this site.",
  notStore: "This isn't a Shopify store. BugRadar checks Shopify stores — try your store's own address, like yourstore.com",
  notPublic: "That address isn't a public website.",
};

export function checkAddress(raw: string): AddressCheck {
  const s = raw.trim().toLowerCase();
  if (!s) return { error: ADDRESS_ERRORS.empty };
  let host = "";
  try {
    // any scheme someone pastes (ftp://, HTTPS://, app://) is dropped: we only ever open https://host/
    host = new URL(`https://${s.replace(/^[a-z][a-z0-9+.-]*:\/\//, "")}`).hostname.replace(/^www\./, "");
  } catch {
    /* below */
  }
  if (!host || !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host)) return { error: ADDRESS_ERRORS.shape };
  if (NOT_PUBLIC.test(host) || /^\d+(\.\d+){3}$/.test(host)) return { error: ADDRESS_ERRORS.notPublic };
  if (RESTRICTED.test(host)) return { error: ADDRESS_ERRORS.restricted };
  // a store's own yourstore.myshopify.com address is a Shopify store; shopify.com itself is not
  if (NOT_STORE_RE.test(host) && !/\.myshopify\.com$/.test(host)) return { error: ADDRESS_ERRORS.notStore };
  return { host };
}
