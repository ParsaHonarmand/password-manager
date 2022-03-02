import "./App.css";
import TopBar from "./components/TopBar";
import PasswordAdder from "./components/PasswordAdder";
import PasswordGetter from "./components/PasswordGetter";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App">
      <TopBar />
      <SignIn />
      <PasswordAdder />
      <PasswordGetter />
    </div>
  );
}

export default App;
