import { track } from '@vercel/analytics';

/**
 * Track conversion events with Vercel Analytics
 * These events will appear in your Vercel Analytics dashboard
 */

export const trackEvent = {
  // CTA Conversions
  clickGetStarted: (location: string) => {
    track('cta_get_started', { location });
  },
  
  clickViewGitHub: (location: string) => {
    track('cta_view_github', { location });
  },
  
  clickJoinCommunity: (location: string) => {
    track('cta_join_community', { location });
  },
  
  clickViewDocs: (location: string) => {
    track('cta_view_docs', { location });
  },
  
  clickHardwareGuide: (location: string) => {
    track('cta_hardware_guide', { location });
  },
  
  // Shopping List
  clickShoppingItem: (item: string, price: string) => {
    track('shopping_item_click', { item, price });
  },
  
  // Code Interactions
  copyCode: (location: string) => {
    track('code_copied', { location });
  },
  
  // Demo Interactions
  demoInteraction: (action: string) => {
    track('demo_interaction', { action });
  },
  
  // Navigation
  viewPage: (page: string) => {
    track('page_view', { page });
  },
  
  // External Links
  clickExternalLink: (url: string, location: string) => {
    track('external_link', { url, location });
  },
  
  // Blog
  viewBlogPost: (title: string, version?: string) => {
    track('blog_post_view', { title, version });
  },
  
  // Downloads/Installs
  startInstallation: () => {
    track('installation_started');
  },
};
