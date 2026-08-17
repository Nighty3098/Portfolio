import { useEffect } from "react";
import "./App.css";
import Hero from "./components/hero";
import About from "./components/about";
import MyContacts from "./components/contacts";
import Projects from "./components/projects";
import Footer from "./components/footer";
import Header from "./components/header";
import AllProjects from "./pages/AllProjects";
import ScrollProgress from "./components/scrollProgress";
import Seo from "./components/SEO";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import LenisProvider from "./components/lenisProvider";
import NoiseOverlay from "./components/noiseOverlay";

function GotoSection() {
  const { search } = useLocation();

  useEffect(() => {
    if (!search) return;
    const params = new URLSearchParams(search);
    const section = params.get("goto");
    if (!section) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  }, [search]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <LenisProvider>
        <NoiseOverlay />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <GotoSection />
                <Seo />
                <div className="App">
                  <ScrollProgress />
                  <Header />
                  <Hero />
                  <About />
                  <Projects />
                  <MyContacts />
                  <Footer />
                </div>
              </>
            }
          />
          <Route
            path="/all-projects"
            element={
              <>
                <AllProjects />
              </>
            }
          />
        </Routes>
      </LenisProvider>
    </HashRouter>
  );
}

export default App;