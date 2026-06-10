import { useEffect, useState } from "react";
import "./App.css";
import WelcomePage from "./components/welcome";
import AboutMePage from "./components/aboutme";
import MyContacts from "./components/contacts";
import Projects from "./components/projects";
import Reviews from "./components/reviews";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import GitHubStats from "./components/github_stats";
import { HashRouter, Routes, Route } from "react-router-dom";
import He4vyL0v3 from "./pages/He4vyL0v3";
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
  const [githubStatsOpen, setGitHubStatsOpen] = useState(false);

  return (
    <HashRouter>
      <HtmlUpdater />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Navbar onGitHubStatsClick={() => setGitHubStatsOpen(true)} />
              <GitHubStats
                show={githubStatsOpen}
                onClose={() => setGitHubStatsOpen(false)}
              />
              <WelcomePage />
              <AboutMePage />
              <Reviews />
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
