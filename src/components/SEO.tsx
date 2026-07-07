import { Helmet } from "react-helmet-async";
import { useTranslate } from "../context/I18nContext";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

const SITE_URL = "https://nighty3098.vercel.app";
const DEFAULT_OG_IMAGE = "/og.png";

function SEO({ title, description, path = "/", ogImage = DEFAULT_OG_IMAGE }: SEOProps) {
  const { t, locale } = useTranslate();
  const pageTitle = title ?? t("html.title");
  const pageDesc = description ?? t("html.description");
  const fullTitle = pageTitle === t("html.title") ? pageTitle : `${pageTitle} | ${t("html.title")}`;
  const url = `${SITE_URL}${path}`;
  const image = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const lang = locale === "ru" ? "ru" : "en";

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Artem",
    givenName: "Artem",
    alternateName: "Nighty3098",
    jobTitle: "Developer & Security Researcher",
    url: SITE_URL,
    sameAs: [
      "https://github.com/Nighty3098",
      "https://t.me/nighty3098",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nighty3098",
    url: SITE_URL,
    description: pageDesc,
    inLanguage: lang,
    author: { "@id": `${SITE_URL}#person` },
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="author" content="Artem (Nighty3098)" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === "ru" ? "ru_RU" : "en_US"} />
      <meta property="og:site_name" content="Nighty3098" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify([personJsonLd, websiteJsonLd])}
      </script>
    </Helmet>
  );
}

export default SEO;
