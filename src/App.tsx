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
import { HashRouter, Routes, Route } from "react-router-dom";
import Marquee from "./components/marquee";
import NoiseOverlay from "./components/noiseOverlay";
import Anime from "./components/anime";
import LenisProvider from "./components/lenisProvider";

function App() {
  return (
    <HashRouter>
      <LenisProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Seo />
                <div className="App">
                  <ScrollProgress />
                  <Header />
                  <Anime />
                  <Hero />
                  <Marquee text="BACKEND DEVELOPER - FREELANCER - " />
                  <About />
                  <Projects />
                  <MyContacts />
                  <Footer />
                  <NoiseOverlay />
                </div>
              </>
            }
          />
          <Route
            path="/all-projects"
            element={
              <>
                <AllProjects />
                <NoiseOverlay />
              </>
            }
          />
        </Routes>
      </LenisProvider>
    </HashRouter>
  );
}

export default App;
