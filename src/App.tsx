import { useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import MyContacts from "./components/contacts";
import Projects from "./components/projects";
import Footer from "./components/footer";
import Header from "./components/Header";
import He4vyL0v3 from "./pages/He4vyL0v3";
import AllProjects from "./pages/AllProjects";
import ScrollProgress from "./components/ScrollProgress";
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
        <Route path="/pentesting" element={<He4vyL0v3 />} />
        <Route path="/all-projects" element={<AllProjects />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
