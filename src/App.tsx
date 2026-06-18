import { useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import MyContacts from "./components/contacts";
import Projects from "./components/projects";
import Footer from "./components/footer";
import Header from "./components/Header";
import Marquee from "./components/marquee";
import He4vyL0v3 from "./pages/He4vyL0v3";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTranslate } from "./context/I18nContext";
import { preloadImages, allProjectImages } from "./utils/preloadImages";

function HtmlUpdater() {
  const { t } = useTranslate();

  useEffect(() => {
    document.title = t("html.title");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("html.description"));
  }, [t]);

  return null;
}

function App() {
  useEffect(() => {
    preloadImages(allProjectImages);
  }, []);

  return (
    <HashRouter>
      <HtmlUpdater />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Header />
              <Hero />
              <Marquee text="software engineer // FREELANCER // " />
              <About />
                <Projects />
                <MyContacts />
                <Footer />
              </div>
            }
          />
          <Route path="/pentesting" element={<He4vyL0v3 />} />
        </Routes>
    </HashRouter>
  );
}

export default App;
