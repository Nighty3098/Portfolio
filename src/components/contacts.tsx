import React from "react";
import { motion } from "framer-motion";

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

function ContactCard({ contact }: ContactCardProps) {
    return (
        <motion.div style={{ width: "100%", padding: "0px", margin: "0px" }}>
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
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--bg-2)",
            }}
        >
            {/* My contacts */}
            <h2>My contacts</h2>
            <div className="contacts-tiling">
                <div className="contacts-list" style={{ width: "100%" }}>
                    {contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </div>
                <div className="contacts-list" style={{ width: "100%" }}>
                    {resources.map((resource) => (
                        <ContactCard key={resource.id} contact={resource} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyContacts;
