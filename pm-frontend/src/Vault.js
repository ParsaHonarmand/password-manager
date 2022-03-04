import "./Vault.css";
import TopBar from "./components/TopBar";
import LoginList from "./components/vault/LoginList";

function Vault() {
  return (
    <div className="Vault">
      <TopBar />
      <LoginList />
    </div>
  );
}

export default Vault;
