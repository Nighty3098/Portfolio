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
import SEO from "./components/SEO";
import { HashRouter, Routes, Route } from "react-router-dom";
import { preloadImages, allProjectImages } from "./utils/preloadImages";

function App() {
  useEffect(() => {
    preloadImages(allProjectImages);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SEO />
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
        <Route path="/all-projects" element={<AllProjects />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
