// The BugRadar Shopify product in plain words (site home + pricing).
// Keep in step with what Radar actually checks: dashboard web/src/lib/testPlan.ts ("What we test" page).

export const checkAreas: { title: string; items: string[] }[] = [
  { title: "Store opens", items: ["The store answers and the homepage loads quickly", "Pictures load and no script errors show", "Down? Checked again 10 minutes later before we alert"] },
  { title: "Menus & links", items: ["Every main-menu page opens", "The phone menu opens and shows its links", "Announcement-bar, homepage and footer links aren't \"page not found\""] },
  { title: "Collections", items: ["Collections list products with names, prices and pictures", "Filters narrow the list", "Page 2 or \"load more\" shows more products"] },
  { title: "Product pages", items: ["Name, price, picture and buy button are there", "Switching size or colour updates the price", "Sold-out products say so and can't be added"] },
  { title: "Cart", items: ["Add to cart works, the quantity and total update", "The same price on the card, product page and cart", "The discount box refuses a made-up code"] },
  { title: "Checkout", items: ["The checkout button opens checkout", "\"Buy it now\" shows the right product", "Nothing is ever typed in or paid"] },
  { title: "Search", items: ["Searching finds real products", "Suggestions appear while typing", "No results says so, not a blank page"] },
  { title: "Trust & Google", items: ["Shipping, returns, privacy and contact pages open", "A missing page answers \"not found\" (404)", "Search-engine title, description and sharing picture are set"] },
];

export const indiaChecks: { title: string; body: string }[] = [
  { title: "Pincode checker", body: "Your delivery-pincode box answers for a real pincode, on a computer and a phone." },
  { title: "Cash on Delivery wording", body: "What the product page says about COD agrees with what the pincode checker answers." },
  { title: "WhatsApp chat button", body: "The button leads to a real phone number. BugRadar reads it and never opens WhatsApp or sends a message." },
  { title: "Payment providers", body: "Shopify, Razorpay, GoKwik, Shopflo and Juspay status pages read every 5 minutes, with an email when one you use has a problem." },
];

export const homeFaq: [string, string][] = [
  ["Does BugRadar place orders or pay for anything?", "No. It opens checkout to see that it works, and stops there. Nothing is typed into checkout and nothing is paid, so there are no test orders to cancel."],
  ["Will it slow down my store?", "No. Each check visits a few pages, one at a time, about as much as a single shopper browsing for a few minutes."],
  ["Do I need to write tests or set anything up?", "No. BugRadar finds your menu, collections, products and cart by itself from your store's address. It works on standard Shopify themes and most custom ones."],
  ["What happens when something breaks?", "You get an email with what broke, on which device and the page to open. When it's fixed, you get a 🟢 email. Every morning at 9:00 a short summary arrives."],
  ["My store is still behind a password. Can it be checked?", "Yes. Give BugRadar the storefront password once. It's stored encrypted and typed only into Shopify's own password page."],
  ["Is it only for Shopify?", "Yes, for now. BugRadar is built around how Shopify stores work. The free check works on any Shopify store's address."],
  ["Is the Shopify app in the App Store?", "Not yet. During the beta, ask for early access and we'll set up daily checks for your store right away, then move you to the app when it's listed."],
];
