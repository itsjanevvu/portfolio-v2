import Script from "next/script";

const GA_MEASUREMENT_ID = "G-VXPRRRPSQJ";

// Google tag (gtag.js). Rendered once in the root layout so it covers every
// page. GA4's enhanced measurement picks up client-side route changes, so
// navigating between pages still records a page view.
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
