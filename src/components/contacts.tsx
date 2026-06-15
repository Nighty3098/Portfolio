import React from "react";
import { motion } from "framer-motion";
import { useTranslate } from "../context/I18nContext";

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
  const displayName =
    "nameKey" in contact && contact.nameKey ? t(contact.nameKey) : contact.name;
  return (
    <motion.div className="contact-card-wrapper" variants={itemVariants}>
      <motion.a href={contact.link} target="_blank" className="contact-link">
        {displayName}
      </motion.a>
    </motion.div>
  );
}

function MyContacts() {
  const { t } = useTranslate();
  return (
    <div id="my-contacts" className="content contacts-page-wrapper">
      <div className="content-block contacts-block">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {t("contacts.title_prefix")} {t("contacts.title_suffix")}
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
        </motion.div>
      </div>
    </div>
  );
}

export default MyContacts;
