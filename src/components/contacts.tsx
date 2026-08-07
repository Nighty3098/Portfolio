import { useRef, useEffect, useState } from "react";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import SwapLabel from "./swapLabel";

const EMAIL = "night3098games@gmail.com";

const socials = [
  { name: "Telegram", link: "https://t.me/Night3098" },
  { name: "KWork", link: "https://kwork.ru/user/nighty_3098" },
  { name: "Reddit", link: "https://www.reddit.com/user/DEVELOPER0x31/" },
  { name: "Github", link: "https://github.com/Nighty3098" },
];

function MyContacts() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useSectionReveal(ref, [locale]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div id="my-contacts" ref={ref} className="contacts" key={locale}>
      <div className="section-head">
        <h2 className="section-title">
          {t("contacts.title_prefix")} {t("contacts.title_suffix")}
        </h2>
      </div>

      <div className="contacts-email-wrap">
        <button
          className="contacts-email-link"
          onClick={copyEmail}
          data-cursor-hover="copy"
        >
          <span className="contacts-email">{EMAIL}</span>
        </button>
        <div className={`contacts-copy-hint ${copied ? "copied" : ""}`}>
          <SwapLabel
            key={copied ? "copied" : "copy"}
            text={copied ? t("contacts.copied") : t("contacts.copy")}
          />
        </div>
      </div>

      <div className="contacts-socials">
        {socials.map((s) => (
          <a
            key={s.name}
            className="contacts-social"
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default MyContacts;