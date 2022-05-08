import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import "./app.css";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <SideBar />
        <Home />
      </div>
    </div>
  );
}

export default App;
