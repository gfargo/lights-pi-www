export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lights Pi",
    "url": "https://lightspi.dev",
    "logo": "https://lightspi.dev/logo.png",
    "description": "Open source Raspberry Pi lighting controller for DMX fixtures",
    "sameAs": [
      "https://github.com/yourusername/lights-pi",
      "https://discord.gg/yourserver"
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
