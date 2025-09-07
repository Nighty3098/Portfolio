import './App.css';
import WelcomePage from "./components/welcome" 
import AboutMePage from "./components/aboutme"
import WorkExp from "./components/workexp"

function App() {
  return (
    <div className="App">
      <WelcomePage />
      <AboutMePage />
      <WorkExp />
    </div>
  );
}

export default App;
