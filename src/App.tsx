import './App.css';
import WelcomePage from "./components/welcome"
import AboutMePage from "./components/aboutme"
import MyContacts from "./components/contacts"
import Projects from "./components/projects"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import He4vyL0v3 from './pages/He4vyL0v3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <WelcomePage />
            <AboutMePage />
            <Projects />
            <MyContacts />
          </div>
        } />
        <Route path="/pentesting" element={<He4vyL0v3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
