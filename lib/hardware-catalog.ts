/**
 * Hardware catalog for the Lights Pi shopping list.
 *
 * All product links, prices, and metadata live here. Amazon links carry
 * the Associates tag through `amazon()`, so the tag lives in one place.
 *
 * Prices were last verified on Amazon: November 2026
 */

/** Amazon Associates tracking ID (SiteStripe → Tracking ID). */
export const AMAZON_TAG = "griffencodes-20";

/** A product page link with the Associates tag. */
export function amazon(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

/** True when a link earns an affiliate commission (rendered rel="sponsored"). */
export function isAffiliate(link: string): boolean {
  return link.includes(`tag=${AMAZON_TAG}`);
}

export type Priority = "Required" | "Recommended" | "Alternative" | "Optional";

export interface Product {
  /** Display name shown in the shopping list */
  item: string;
  /** Short description of what it's for */
  purpose: string;
  /** Price string shown to users (e.g. "$40" or "$60–150") */
  price: string;
  priority: Priority;
  /** Buy link: amazon(asin) for affiliate links, or a plain URL */
  link: string;
}

export interface SetupTier {
  name: string;
  price: string;
  items: string[];
  color: string;
}

// ─── Shopping List ───────────────────────────────────────────────
export const shoppingList: Product[] = [
  {
    item: "Raspberry Pi 4 (4 GB), official resellers",
    purpose: "Main controller",
    price: "$65",
    priority: "Required",
    link: "https://www.raspberrypi.com/products/raspberry-pi-4-model-b/",
  },
  {
    item: "Raspberry Pi 4 (4 GB), on Amazon",
    purpose: "Same board, often faster delivery",
    price: "$137",
    priority: "Alternative",
    link: amazon("B09TTNF8BT"),
  },
  {
    item: "Raspberry Pi 3B+, official resellers",
    purpose: "Budget alternative",
    price: "$40",
    priority: "Alternative",
    link: "https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/",
  },
  {
    item: "Raspberry Pi 3B+, on Amazon",
    purpose: "Budget alternative",
    price: "$53",
    priority: "Alternative",
    link: amazon("B07P4LSDYV"),
  },
  {
    item: "SanDisk High Endurance microSD (32 GB)",
    purpose: "OS storage, built for constant writes",
    price: "$22",
    priority: "Required",
    link: amazon("B07P14QHB7"),
  },
  {
    item: "ENTTEC Open DMX USB",
    purpose: "DMX interface (entry-level)",
    price: "$72",
    priority: "Alternative",
    link: amazon("B00O9RY664"),
  },
  {
    item: "ENTTEC DMX USB Pro",
    purpose: "DMX interface (recommended)",
    price: "$176",
    priority: "Required",
    link: amazon("B077VW1DJH"),
  },
  {
    item: "CanaKit 3.5A USB-C Power Supply",
    purpose: "Pi 4 power (a Pi 3B+ takes micro-USB)",
    price: "$10",
    priority: "Required",
    link: amazon("B07TYQRXTK"),
  },
  {
    item: "DMX Cable, 3-pin, 25 ft (2-pack)",
    purpose: "Fixture connection",
    price: "$23",
    priority: "Required",
    link: amazon("B0H26B96R9"),
  },
  {
    item: "Chauvet D-Fi Hub 2 (wireless DMX)",
    purpose: "Cable-free setup, transmit or receive",
    price: "$152",
    priority: "Optional",
    link: amazon("B0FXGXG8C1"),
  },
  {
    item: "Official Raspberry Pi 4 Case",
    purpose: "Protection",
    price: "$10",
    priority: "Recommended",
    link: amazon("B07WQ5G6YY"),
  },
];

// ─── Cost Summary ────────────────────────────────────────────────
export const costSummary = {
  minimum: { label: "Minimum Setup", price: "~$145", note: "Pi 3B+ + Open DMX USB" },
  recommended: { label: "Recommended Setup", price: "~$285", note: "Pi 4 + DMX USB Pro + case" },
  wireless: { label: "With Wireless DMX", price: "~$435", note: "Recommended + D-Fi Hub 2" },
} as const;

// ─── Example Setups ──────────────────────────────────────────────
export const setups: SetupTier[] = [
  {
    name: "Budget Setup",
    price: "$145 + lights",
    items: [
      "Raspberry Pi 3B+",
      "ENTTEC Open DMX USB",
      "2× LED par cans",
      "Basic cables & power",
    ],
    color: "blue",
  },
  {
    name: "Creator Setup",
    price: "$400",
    items: [
      "Raspberry Pi 4 (4 GB)",
      "ENTTEC DMX USB Pro",
      "4× RGB LED panels",
      "Wireless DMX transmitter",
    ],
    color: "purple",
  },
  {
    name: "Professional Setup",
    price: "$1,200+",
    items: [
      "Raspberry Pi 4 (8 GB)",
      "ENTTEC DMX USB Pro",
      "8+ fixtures (moving heads, pars, strips)",
      "Wireless DMX system",
      "Backup Pi",
    ],
    color: "pink",
  },
];
