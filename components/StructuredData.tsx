export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lights Pi",
    "url": "https://lights.griffen.codes",
    "logo": "https://lights.griffen.codes/og-image.svg",
    "description": "Open source Raspberry Pi lighting controller for DMX fixtures",
    "sameAs": [
      "https://github.com/gfargo/lights-pi",
      "https://discord.com/invite/KGu9nE9Ejx"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lights Pi",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Linux",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
