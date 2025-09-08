import React from "react";
import { motion, useAnimation } from "framer-motion";

type Review = {
    id: number;
    name: string;
    text: string;
    source?: string;
};

const reviews: Review[] = [
    {
        id: 1,
        name: "Yuriy",
        text: "Everything was smooth from the very beginning, with specifics on every point. During implementation, fast communication and clear responses. The work was completed very quickly and exactly as needed. Minimal edits were required during the process, which were resolved extremely fast. Extremely satisfied.",
        source: "kwork",
    },
    {
        id: 2,
        name: "Alexey",
        text: "The main advantage is speed. If you want things done fast and well, turn to this specialist.",
        source: "kwork",
    },
    {
        id: 3,
        name: "Andrey Ponomarev",
        text: "Helped solve the task quickly, while also answering any questions that came up. Was available and responsive. Recommend!",
        source: "kwork",
    },
    {
        id: 4,
        name: "Andrey Andreevich",
        text: "Completed a second order for developing a Telegram bot. Everything is good, it works!",
        source: "kwork",
    },
    {
        id: 5,
        name: "Max Solonenko",
        text: "Excellent seller, completed the order quickly and with quality.",
        source: "kwork",
    },
    {
        id: 6,
        name: "Alik7107",
        text: "Ordered Qt framework configuration. The freelancer did everything professionally, I recommend!",
        source: "kwork",
    },
    {
        id: 7,
        name: "Andrey Andreevich",
        text: "We developed a Telegram bot fairly quickly and in constant contact with Artem. Artem developed the bot (obviously), while I assisted and supervised testing. Essentially, we started work around 8 AM and had everything finished by 12 PM, which is very, very good (the bot was tested and deployed on my server). I recommend Artem as a responsible professional who handles tasks promptly.",
        source: "kwork",
    },
];

function ReviewCard({ review }: { review: Review }) {
    return (
        <motion.div
            className="review-card"
        >
            <p style={{ fontWeight: "bold", letterSpacing: "2px" }}>{review.name}</p>
            <p style={{ opacity: "0.8" }}>{review.text}</p>
        </motion.div>
    );
}

function Reviews() {
    const duration = 40;

    return (
        <div
            id="my-reviews"
            className="content-block content reviews-block"
            style={{
                height: "100vh",
                width: "calc(100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                userSelect: "none",
                textWrap: "balance",
            }}
        >
            <h2 style={{ width: "calc(100% - var(--spacing-xl) - var(--spacing-xl))", paddingLeft: "var(--spacing-xl)", paddingRight: "var(--spacing-xl)" }}>// Reviews</h2>
            <div
                style={{
                    marginTop: "2rem",
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <motion.div
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                    }}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration,
                        ease: "linear",
                    }}
                >
                    {[...reviews, ...reviews].map((review, idx) => (
                        <ReviewCard key={idx} review={review} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Reviews;
