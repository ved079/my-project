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
      geo: { "@type": "GeoCoordinates", latitude: 28.4595, longitude: 77.0266 },
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
      aggregateRating: { "@type": "AggregateRating", ratingValue: 4.9, reviewCount: 1200 },
      sameAs: [
        "https://www.instagram.com/newmicare/",
        "https://www.facebook.com/in.newmi",
        "https://www.linkedin.com/company/newmi/",
        "https://twitter.com/newmicare",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What conditions does Newmi Care treat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Newmi Care specializes in women's health across every life stage — from puberty to menopause. Our care plans cover PCOS/PCOD, fertility issues, pregnancy and postpartum care, mental health, weight management, menopause, cancer support, pediatric care, and sexual health.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a referral to book a consultation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No referral is needed. You can book a consultation directly through our website, app, or by calling +91-8929343555. Our team will match you with the right specialist based on your concern.",
          },
        },
        {
          "@type": "Question",
          name: "Are online consultations available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Newmi offers secure video consultations with qualified specialists across women's health. You can book a digital consultation through the Newmi app or website, available Monday to Saturday, 9 AM to 9 PM.",
          },
        },
        {
          "@type": "Question",
          name: "What are Newmi's clinic locations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Newmi currently operates clinics in Gurugram — at Sector 69 (Spaze Corporate Park) and Sector 57 (Bestech Central Square Mall). Both clinics offer consultation, pathology, radiology, medicines, vaccination, wellness, and physiotherapy services.",
          },
        },
        {
          "@type": "Question",
          name: "Is my health information kept private?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Newmi Care is HIPAA, GDPR, and ISO compliant. Your health data is encrypted, and we follow the highest standards of data privacy.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a consultation cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Consultation fees vary by specialist and condition. We offer both in-clinic and digital consultation options. Contact us at +91-8929343555 or care@newmi.in for specific pricing.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use Newmi for pregnancy care from the beginning?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Newmi provides end-to-end prenatal care from the first trimester through delivery and postpartum. Our pregnancy care plan includes regular check-ups, ultrasound scheduling, nutrition planning, high-risk monitoring, and emergency support.",
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
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dr. Priya Sharma",
      medicalSpecialty: "Pregnancy, Prenatal, Delivery, General Gynecology",
      hospitalAffiliation: { "@type": "Hospital", name: "Newmi Care" },
      address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dr. Anita Rao",
      medicalSpecialty: "IVF, IUI, Fertility, Egg Freezing, PCOS",
      hospitalAffiliation: { "@type": "Hospital", name: "Newmi Care" },
      address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dr. Kavitha Menon",
      medicalSpecialty: "PCOS, Hormonal Disorders, Thyroid, Menopause",
      hospitalAffiliation: { "@type": "Hospital", name: "Newmi Care" },
      address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dr. Sneha Agarwal",
      medicalSpecialty: "High-Risk Pregnancy, Fetal Anomaly, NIPT, Amniocentesis",
      hospitalAffiliation: { "@type": "Hospital", name: "Newmi Care" },
      address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dr. Ritu Nair",
      medicalSpecialty: "Cervical Cancer, Ovarian Cancer, Colposcopy, LEEP",
      hospitalAffiliation: { "@type": "Hospital", name: "Newmi Care" },
      address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "Haryana", addressCountry: "IN" },
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
