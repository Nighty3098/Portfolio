import { useRef, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    id: 1,
    name: "Telegram",
    handle: "@Night3098",
    link: "https://t.me/Night3098",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.5 2.5L2.5 10.5L10.5 13.5" />
        <path d="M10.5 13.5L14.5 21.5L21.5 2.5" />
        <path d="M10.5 13.5L16 8" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "GMail",
    handle: "night3098games@gmail.com",
    link: "mailto:night3098games@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 4l10 8 10-8" />
      </svg>
    ),
  },
];

function MyContacts() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);

  useSectionReveal(ref, [locale]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".contacts-item");
    if (cards.length === 0) return;

    gsap.set(cards, {
      clipPath: "inset(0 50% 0 50%)",
      y: 40,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(cards, {
      clipPath: "inset(0 0% 0 0%)",
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: { amount: 0.3, from: "start" },
    });

    return () => {
      tl.kill();
    };
  }, [locale]);

  return (
    <div
      id="my-contacts"
      ref={ref}
      key={locale}
      className="content contacts-page-wrapper"
    >
      <h2 className="contacts-title" data-reveal="letters">
        {t("contacts.title_prefix")} {t("contacts.title_suffix")}
      </h2>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="contacts-item"
          >
            <span className="contacts-item-name">{contact.name}</span>
            <span className="contacts-item-handle">{contact.handle}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MyContacts;
