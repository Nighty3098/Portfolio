import './App.css';
import WelcomePage from "./components/welcome" 
import AboutMePage from "./components/aboutme"
import MyContacts from "./components/contacts"
import Projects from "./components/projects"

function App() {
  return (
    <div className="App">
      <WelcomePage />
      <AboutMePage />
      <Projects />
      <MyContacts />
    </div>
  );
}

export default App;
