import './App.css';
import WelcomePage from "./components/welcome" 
import AboutMePage from "./components/aboutme"
import MyContacts from "./components/contacts"

function App() {
  return (
    <div className="App">
      <WelcomePage />
      <AboutMePage />
      <MyContacts />
    </div>
  );
}

export default App;
