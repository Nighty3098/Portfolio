import React from "react";
import { motion, easeOut } from "framer-motion";

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
  readonly link: string;
};

const resources: Resource[] = [
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
    link: "https://t.me/W2N3098",
  },
];

type ContactCardProps = Readonly<{
  contact: Contact;
}>;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

function ContactCard({ contact }: ContactCardProps) {
  return (
    <motion.div
      style={{ width: "100%", padding: "0px", margin: "0px" }}
      variants={itemVariants}
    >
      <motion.a
        href={contact.link}
        target="_blank"
        className="contact-link"
      >
        | {contact.name}
      </motion.a>
    </motion.div>
  );
}

function MyContacts() {
  return (
    <div
      id="my-contacts"
      className="content-block content contacts-block"
      style={{
        height: "100vh",
        padding: "var(--spacing-xl)",
        width: "calc(100% - var(--spacing-xl) - var(--spacing-xl))",
        margin: "0px",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-2)",
      }}
    >
      {/* My contacts */}
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        My contacts
      </motion.h2>
      <motion.div
        className="contacts-tiling"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ width: "100%", display: "flex", gap: "var(--spacing-m)" }}
      >
        <motion.div
          className="contacts-list"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-s)",
          }}
        >
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </motion.div>
        <motion.div
          className="contacts-list"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-s)",
          }}
        >
          {resources.map((resource) => (
            <ContactCard key={resource.id} contact={resource} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MyContacts;
