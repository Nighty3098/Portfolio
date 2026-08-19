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
import type Lenis from "lenis";

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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

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
                <ScrollToTop />
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
                <ScrollToTop />
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