<<<<<<< Updated upstream
import React from "react";
import { motion } from "framer-motion";
import { useTranslate } from "../context/I18nContext";
=======
import { useRef, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
>>>>>>> Stashed changes

type Contact = {
  readonly id: number;
  readonly name: string;
  readonly link: string;
};

const contacts: Contact[] = [
  {
    id: 1,
    name: "Telegram",
    link: "https://t.me/Night3098",
  },
  {
    id: 2,
    name: "GMail",
    link: "https://mailto:night3098games@gmail.com",
  },
  {
    id: 3,
    name: "Reddit",
    link: "https://www.reddit.com/user/DEVELOPER0x31/",
  },
  {
    id: 4,
    name: "Discord",
    link: "https://discord.gg/#9707/",
  },
];

type Resource = {
  readonly id: number;
  readonly name: string;
  readonly nameKey?: string;
  readonly link: string;
};

const resources: Resource[] = [
  {
    id: 0,
    name: "KWork",
    link: "https://kwork.ru/user/nighty_3098",
  },
  {
    id: 1,
    name: "GitHub",
    link: "https://github.com/Nighty3098",
  },
  {
    id: 2,
    name: "DevTo",
    link: "https://dev.to/nighty3098",
  },
  {
    id: 3,
    name: "Tg Channel",
    nameKey: "contacts.tg_channel",
    link: "https://t.me/W2N3098",
  },
];

<<<<<<< Updated upstream
type ContactCardProps = Readonly<{
  contact: Contact | Resource;
  t: (key: string, params?: Record<string, string | number>) => string;
}>;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function ContactCard({ contact, t }: ContactCardProps) {
  const displayName = "nameKey" in contact && contact.nameKey ? t(contact.nameKey) : contact.name;
  return (
    <motion.div
      className="contact-card-wrapper"
      variants={itemVariants}
    >
      <motion.a href={contact.link} target="_blank" className="contact-link">
        | {displayName}
      </motion.a>
    </motion.div>
  );
}

function MyContacts() {
  const { t } = useTranslate();
  return (
    <div
      id="my-contacts"
      className="content contacts-page-wrapper"
    >
      <div className="content-block contacts-block">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {t("contacts.title")}
        </motion.h2>
        <div className="spacer-h-100"></div>
        <motion.div
          className="contacts-tiling contacts-tiling-inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="contacts-list contacts-list-half">
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} t={t} />
            ))}
          </motion.div>
          <motion.div className="contacts-list contacts-list-half">
            {resources.map((resource) => (
              <ContactCard key={resource.id} contact={resource} t={t} />
            ))}
          </motion.div>
        </motion.div>
=======
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
    <div id="my-contacts" ref={ref} className="content contacts-page-wrapper">
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
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

export default MyContacts;
