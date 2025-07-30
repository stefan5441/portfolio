import { CPActivityHeatmap } from "./components/functional/CPActivityHeatmap";
import { Header } from "./components/styling/Header";

function App() {
  return (
    <div className="mx-24 my-20">
      <Header>Stefan Chambov</Header>

      {/* to remove margin later */}
      <div className="mt-4">Check what I'm doing lately: </div>
      <div className="mt-2"></div>
      <CPActivityHeatmap />
    </div>
  );
}

export default App;
