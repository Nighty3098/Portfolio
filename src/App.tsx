import { useEffect } from "react";
import "./App.css";
import WelcomePage from "./components/welcome";
import AboutMePage from "./components/aboutme";
import MyContacts from "./components/contacts";
import Projects from "./components/projects";
import Reviews from "./components/reviews";
import Footer from "./components/footer";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTranslate } from "./context/I18nContext";

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
  return (
    <HashRouter>
      <HtmlUpdater />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <WelcomePage />
              <AboutMePage />
              <Reviews />
              <Projects />
              <MyContacts />
              <Footer />
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
