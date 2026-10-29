// Help guides for store owners (30 Oct 2026): short, practical articles about problems BugRadar really finds, written
// from the verified checks (claude/VERIFIED-BUGS_25oct.md, re-checked 30 Oct). Never name a store. Shopify admin paths
// checked against Shopify's Help Center on 30 Oct 2026 (Content > Menus; Online Store > Edit theme > Theme settings).
// Proof numbers come from lib/launch.ts PROOF only.

export type Block = { p: string } | { ul: string[] } | { h: string } | { tip: string };
export interface Guide { slug: string; title: string; description: string; date: string; minutes: number; body: Block[] }

export const GUIDES: Guide[] = [
  {
    slug: "shopify-menu-links-page-not-found",
    title: "Why Shopify menu links break, and how to catch them before shoppers do",
    description: "A menu or footer link that opens \"Page not found\" is the most common store bug we find. Here's why it happens and how to check yours in five minutes.",
    date: "2026-10-30",
    minutes: 4,
    body: [
      { p: "Of the 800+ Shopify stores BugRadar has checked, about 1 in 15 had a link a shopper could click that opened a \"Page not found\" page. Many of them sat in the main menu or the footer, the two places every shopper sees." },
      { h: "Why it happens" },
      { ul: [
        "A collection or page was renamed, so its web address changed, but a menu item still points to the old address.",
        "A menu item was added by pasting a web address instead of picking the collection or page from the list. Shopify can't keep a pasted address up to date.",
        "A sale collection was switched off after a campaign, and the link to it stayed in the menu, the footer or the announcement bar.",
        "A new theme was installed and its footer came with sample links (\"About us\", \"Our story\") to pages the store never made.",
      ] },
      { p: "When a collection or page is deleted, Shopify removes the menu items that point to it. When its address changes, or the link was pasted by hand, the menu item stays and leads nowhere." },
      { h: "Check yours in five minutes" },
      { ul: [
        "In your Shopify admin, open Content > Menus.",
        "Open each menu (main menu, footer, any others) and click every item on your live store, on a computer and on a phone.",
        "For any item that opens \"Page not found\", click Edit beside it in the menu and pick the right collection or page from the list instead of typing an address.",
        "If the old address was shared or advertised, send it somewhere useful: Content > Menus > View URL Redirects > Create URL redirect.",
      ] },
      { tip: "Pick pages and collections from Shopify's list when you build a menu, rather than pasting web addresses. Shopify's help center warns that pasted or changed addresses are a common cause of 404 errors." },
      { h: "Let a robot do it every day" },
      { p: "Menus change all the time: new collections, ended sales, theme updates. BugRadar's Free plan opens every link in your Shopify menus, footer included, every day in desktop and mobile browsers, and emails you the moment one breaks." },
    ],
  },
  {
    slug: "shopify-social-links-missing-https",
    title: "The footer bug that sends shoppers to \"Page not found\" instead of Instagram",
    description: "If a social link in your footer was saved without https://, it opens a missing page on your own store. It takes one minute to fix.",
    date: "2026-10-30",
    minutes: 2,
    body: [
      { p: "Several stores we checked had Instagram, Facebook, TikTok or YouTube icons in the footer that didn't open the social page at all. Clicking them opened \"Page not found\" on the store itself." },
      { h: "Why it happens" },
      { p: "The link was saved as www.instagram.com/yourstore or @yourstore, without https:// at the front. A browser reads that as a page on your own store (yourstore.com/www.instagram.com/yourstore), which doesn't exist. Phone numbers saved as links have the same problem." },
      { h: "How to fix it" },
      { ul: [
        "In your Shopify admin, go to Online Store and click Edit theme.",
        "Click the Theme settings icon, then Social media.",
        "Enter each address in full, starting with https://, for example https://instagram.com/yourstore.",
        "Click Save, then click each icon on your live store to check it.",
      ] },
      { p: "For a phone number in the announcement bar or footer, use a tel: link (tel:+911234567890) instead of the bare number." },
      { tip: "Shopify's help center says the social media fields need full links, such as https://instagram.com/shopify." },
      { h: "Catch it automatically" },
      { p: "BugRadar's Pro plan checks the links beyond your menus every day: the announcement bar, homepage sections and footer icons. Pro comes with a 14-day free trial." },
    ],
  },
  {
    slug: "shopify-soft-404-missing-products",
    title: "When a missing product shows your homepage: Shopify soft 404s",
    description: "A deleted product should say \"Page not found\". If your store shows the homepage instead, shoppers get lost and Google flags it.",
    date: "2026-10-30",
    minutes: 3,
    body: [
      { p: "Open a product link on your store that doesn't exist, for example yourstore.com/products/this-does-not-exist. A healthy Shopify store answers with a \"Page not found\" page. Some stores we checked showed their homepage instead, as if nothing was wrong." },
      { h: "Why it matters" },
      { ul: [
        "A shopper arriving from an old ad, a shared link or a Google result lands on the homepage with no idea the product is gone, and usually leaves.",
        "Google calls a missing page that doesn't say it's missing a \"soft 404\" and lists these in Search Console's Page indexing report.",
      ] },
      { h: "Why it happens" },
      { p: "Shopify returns a proper \"not found\" for missing products by itself. When a store shows the homepage instead, it's usually an app or a piece of theme code that sends every missing page to the homepage." },
      { h: "How to fix it" },
      { ul: [
        "Look for an app that \"redirects 404s\" or \"fixes broken links\" and turn that setting off.",
        "If you can't find an app, ask your theme developer whether the theme sends missing pages to the homepage.",
        "For a product you replaced, add a specific redirect from its old address to the new one: Content > Menus > View URL Redirects > Create URL redirect. Shopify's redirects only take effect on addresses that are already broken.",
      ] },
      { tip: "A good \"Page not found\" page still helps the shopper: add a search box and a link to your best sellers to your theme's 404 template." },
      { h: "Watch it every day" },
      { p: "BugRadar's Pro plan checks that a missing page really says it's missing, along with the rest of its shopper checks (up to 35), every day in desktop and mobile browsers. Try it free for 14 days." },
    ],
  },
];

export const guide = (slug: string) => GUIDES.find((g) => g.slug === slug);
