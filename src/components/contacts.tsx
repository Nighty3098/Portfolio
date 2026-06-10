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

type ContactCardProps = Readonly<{
  contact: Contact | Resource;
  t: (key: string, params?: Record<string, string | number>) => string;
}>;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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
      <a href={contact.link} target="_blank" className="contact-link" rel="noreferrer">
        <span className="contact-link-icon">◆</span>
        {displayName}
      </a>
    </motion.div>
  );
}

function MyContacts() {
  const { t } = useTranslate();
  return (
    <section id="my-contacts" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        {t("contacts.title")}
      </motion.h2>
      <motion.div
        className="contacts-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} t={t} />
        ))}
        {resources.map((resource) => (
          <ContactCard key={resource.id} contact={resource} t={t} />
        ))}
      </motion.div>
    </section>
  );
}

export default MyContacts;
