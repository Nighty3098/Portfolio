import './App.css';
import WelcomePage from "./components/welcome" 
import AboutMePage from "./components/aboutme"
import MyContacts from "./components/contacts"
import Reviews from "./components/reviews"

function App() {
  return (
    <div className="App">
      <WelcomePage />
      <AboutMePage />
      <Reviews />
      <MyContacts />
    </div>
  );
}

export default App;
