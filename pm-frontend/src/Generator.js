import "./Generator.css";
import TopBar from "./components/TopBar";
import PassGenerator from "./components/generator/PassGenerator";

function Generator() {
  return (
    <div className="Generator">
      <TopBar />
      <PassGenerator />
    </div>
  );
}

export default Generator;
