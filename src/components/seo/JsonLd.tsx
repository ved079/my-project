export function JsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "Newmi Care",
      description:
        "India's leading women's health platform offering expert care for PCOS, fertility, IVF, pregnancy, and menopause.",
      url: "https://newmi.in",
      telephone: "+91-8929343555",
      email: "care@newmi.in",
      logo: "https://newmi.in/images/newmi/newmi-logo.svg",
      image: "https://newmi.in/images/newmi/why-section.png",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Spaze Corporate Park, Sector 69",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          postalCode: "122001",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Bestech Central Square Mall, Sector 57",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          postalCode: "122002",
          addressCountry: "IN",
        },
      ],
      medicalSpecialty: [
        "Obstetrics",
        "Gynecology",
        "Fertility",
        "ReproductiveHealth",
      ],
      knowsAbout: [
        "PCOS Treatment",
        "IVF Treatment",
        "Fertility Care",
        "Pregnancy Care",
        "Menopause Management",
        "Post Pregnancy Care",
        "Mental Health Support",
      ],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
      ],
      sameAs: [
        "https://www.instagram.com/newmicare/",
        "https://www.facebook.com/newmicare",
        "https://www.linkedin.com/company/newmicare",
        "https://x.com/newmicare",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the cost of PCOS treatment at Newmi Care?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PCOS treatment consultation at Newmi Care starts from ₹800. The exact cost depends on the diagnostic tests and treatment plan recommended by our specialists.",
          },
        },
        {
          "@type": "Question",
          name: "Does Newmi Care offer IVF treatment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Newmi Care offers comprehensive fertility and IVF treatment with experienced specialists. IVF treatment costs range from ₹1.2L to ₹2.5L depending on the treatment protocol.",
          },
        },
        {
          "@type": "Question",
          name: "Where are Newmi Care clinics located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Newmi Care has clinics in Gurugram — at Spaze Corporate Park, Sector 69 and Bestech Central Square Mall, Sector 57. We also offer pan-India digital consultations.",
          },
        },
        {
          "@type": "Question",
          name: "Can I book an online consultation with a gynecologist?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Newmi Care offers secure video consultations with experienced gynecologists. You can book instantly through our platform and consult from the comfort of your home.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://newmi.in" },
        { "@type": "ListItem", position: 2, name: "Our Specialists", item: "https://newmi.in/#doctors" },
        { "@type": "ListItem", position: 3, name: "Care Plans", item: "https://newmi.in/#care-plans" },
        { "@type": "ListItem", position: 4, name: "FAQ", item: "https://newmi.in/#faq" },
      ],
    },
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
