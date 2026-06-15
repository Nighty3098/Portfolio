import { useRef } from "react";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

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
  {
    id: 3,
    name: "Reddit",
    handle: "u/DEVELOPER0x31",
    link: "https://www.reddit.com/user/DEVELOPER0x31/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1.5" fill="currentColor" stroke="none" />
        <path d="M8 15c0 0 1.5 2 4 2s4-2 4-2" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Discord",
    handle: "#9707",
    link: "https://discord.gg/#9707/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 5C5.5 5 4 6.5 4 9v6c0 2.5 1.5 4 4 4l1-2" />
        <path d="M16 5c2.5 0 4 1.5 4 4v6c0 2.5-1.5 4-4 4l-1-2" />
        <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
        <path d="M9 17c1.5 1 4.5 1 6 0" />
      </svg>
    ),
  },
];

function MyContacts() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);

  useSectionReveal(ref, [locale]);

  return (
    <div id="my-contacts" ref={ref} className="content contacts-page-wrapper">
      <div className="content-block contacts-block">
        <h2 data-reveal="letters">
          {t("contacts.title_prefix")} {t("contacts.title_suffix")}
        </h2>
      </div>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <div className="contact-item-icon">{contact.icon}</div>
            <div className="contact-item-info">
              <span className="contact-item-name">{contact.name}</span>
              <span className="contact-item-handle">{contact.handle}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MyContacts;
