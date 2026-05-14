/**
 * Hardware catalog for the Lights Pi shopping list.
 *
 * All product links, prices, and metadata live here so they can be
 * swapped to affiliate / referral links in one place later.
 *
 * Prices were last verified: March 2026
 */

export type Priority = "Required" | "Recommended" | "Alternative" | "Optional";

export interface Product {
  /** Display name shown in the shopping list */
  item: string;
  /** Short description of what it's for */
  purpose: string;
  /** Price string shown to users (e.g. "$40" or "$60–150") */
  price: string;
  priority: Priority;
  /** Buy link — swap these for affiliate URLs when ready */
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
    item: "Raspberry Pi 4 (4 GB)",
    purpose: "Main controller",
    price: "$65",
    priority: "Required",
    link: "https://www.raspberrypi.com/products/raspberry-pi-4-model-b/",
  },
  {
    item: "Raspberry Pi 3B+",
    purpose: "Budget alternative",
    price: "$40",
    priority: "Alternative",
    link: "https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/",
  },
  {
    item: "MicroSD Card (32 GB)",
    purpose: "OS storage",
    price: "$8",
    priority: "Required",
    link: "https://www.amazon.com/s?k=microsd+card+32gb",
  },
  {
    item: "ENTTEC Open DMX USB",
    purpose: "DMX interface (entry-level)",
    price: "$67",
    priority: "Alternative",
    link: "https://www.amazon.com/Open-DMX-USB-Interface-Controller/dp/B00O9RY664",
  },
  {
    item: "ENTTEC DMX USB Pro",
    purpose: "DMX interface (recommended)",
    price: "$130",
    priority: "Required",
    link: "https://www.amazon.com/ENTTEC-DMX-USB-512-Ch-Interface/dp/B077VW1DJH",
  },
  {
    item: "Power Supply (USB-C / Micro-USB)",
    purpose: "Pi power",
    price: "$10",
    priority: "Required",
    link: "https://www.raspberrypi.com/products/type-c-power-supply/",
  },
  {
    item: "DMX Cable (3-pin XLR)",
    purpose: "Fixture connection",
    price: "$10–15",
    priority: "Required",
    link: "https://www.amazon.com/s?k=dmx+cable+3+pin",
  },
  {
    item: "Wireless DMX System",
    purpose: "Cable-free setup",
    price: "$60–200",
    priority: "Optional",
    link: "https://www.amazon.com/s?k=wireless+dmx+transmitter+receiver",
  },
  {
    item: "Case for Raspberry Pi",
    purpose: "Protection",
    price: "$7–15",
    priority: "Recommended",
    link: "https://www.amazon.com/s?k=raspberry+pi+4+case",
  },
];

// ─── Cost Summary ────────────────────────────────────────────────
export const costSummary = {
  minimum: { label: "Minimum Setup", price: "~$125", note: "Pi 3B+ + Open DMX USB" },
  recommended: { label: "Recommended Setup", price: "~$230", note: "Pi 4 + DMX USB Pro + case" },
  wireless: { label: "With Wireless DMX", price: "~$300–430", note: "Full wireless setup" },
} as const;

// ─── Example Setups ──────────────────────────────────────────────
export const setups: SetupTier[] = [
  {
    name: "Budget Setup",
    price: "$125",
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
