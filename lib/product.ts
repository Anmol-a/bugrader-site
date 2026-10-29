// The BugRadar Shopify product in plain words (site home + pricing).
// Keep in step with what Radar actually checks: dashboard web/src/lib/testPlan.ts ("What we test" page).

export const checkAreas: { title: string; items: string[] }[] = [
  { title: "Store opens", items: ["The store answers and the homepage loads quickly", "Pictures load and no script errors show", "Down? Checked again 10 minutes later before we alert"] },
  { title: "Menus & links", items: ["Every main-menu page opens", "The mobile menu opens and shows its links", "Announcement-bar, homepage and footer links aren't \"page not found\""] },
  { title: "Collections", items: ["Collections list products with names, prices and pictures", "Filters narrow the list", "Page 2 or \"load more\" shows more products"] },
  { title: "Product pages", items: ["Name, price, picture and buy button are there", "Switching size or colour updates the price", "Sold-out products say so and can't be added"] },
  { title: "Cart", items: ["Add to cart works, the quantity and total update", "The same price on the card, product page and cart", "The discount box refuses a made-up code"] },
  { title: "Checkout", items: ["The checkout button opens checkout", "\"Buy it now\" shows the right product", "Nothing is ever typed in or paid"] },
  { title: "Search", items: ["Searching finds real products", "Suggestions appear while typing", "No results says so, not a blank page"] },
  { title: "Trust & Google", items: ["Shipping, returns, privacy and contact pages open", "A missing page answers \"not found\" (404)", "Search-engine title, description and sharing picture are set"] },
];

export const homeFaq: [string, string][] = [
  ["Does BugRadar place orders or pay for anything?", "No. It opens checkout to see that it works, and stops there. Nothing is typed into checkout and nothing is paid, so there are no test orders to cancel."],
  ["Will it slow down my store?", "No. Each check visits a few pages, one at a time, about as much as a single shopper browsing for a few minutes."],
  ["Do I need to write tests or set anything up?", "No. BugRadar finds your menu, collections, products and cart by itself from your store's address. It works on standard Shopify themes and most custom ones."],
  ["What happens when something breaks?", "The moment a check catches it, you get an email (or a Slack message on Pro) with what broke, in which browser and the page to open. When it's fixed, you get a 🟢 message. On Pro, a short summary also arrives every morning at 9:00."],
  ["What can the app see in my store?", "Only your menus, products and live theme, and only to read them. BugRadar never changes your store and never sees orders or customers. Our privacy page lists exactly what it reads and why."],
  ["My store is still behind a password. Can it be checked?", "Yes. Give BugRadar the storefront password once. It's stored encrypted and typed only into Shopify's own password page."],
  ["Is it only for Shopify?", "Yes, for now. BugRadar is built around how Shopify stores work. The free check works on any Shopify store's address."],
  ["Is the Shopify app in the App Store?", "Yes. Search for \"BugRadar: Daily Store Checks\" in the Shopify App Store, or use the Install on Shopify button on this site. Pick Free or Pro when you install, and the daily checks start on their own."],
  ["How much does it cost?", "Free is $0: the core checks once a day, with email alerts. Pro is $19/month after a 14-day free trial: every check every 4 hours, Slack, the morning summary and payment-provider alerts. Billed through Shopify."],
];
