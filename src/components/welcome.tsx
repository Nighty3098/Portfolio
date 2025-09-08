import { motion } from "framer-motion";

const Navigation = () => {
    return (
      <motion.div
        className="navigation"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {["PROJECTS", "CONTACTS"].map((text, index) => (
          <motion.a
            key={text}
            href={index === 0 ? "#projects" : "#my-contacts"}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ letterSpacing: "10px" }}
            style={{ margin: "0 10px" }}
          >
            {text}
          </motion.a>
        ))}
      </motion.div>
    );
  };
  

function WelcomePage() {
    return (
        <motion.div 
            className="welcome-block content"
            initial="hidden"
            animate="visible"
            style={{ backgroundColor: "var(--bg-2)" }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
        >
            <Navigation />
            <motion.div 
                className="welcome-tiling"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.div 
                    className="welcome-content"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        S.Artem
                    </motion.h1>
                    <motion.div 
                        className="underline"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    />
                    <motion.div 
                        style={{ width: "100%", gap: "0px" }}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 1.2 }}
                        >
                            Backend / ML Developer
                        </motion.p>
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 1.4 }}
                        >
                            Freelancer
                        </motion.p>
                    </motion.div>
                </motion.div>
                <motion.img 
                    src="me.png" 
                    className="avatar-image"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                />
            </motion.div>
        </motion.div>
    );
}

export default WelcomePage;
