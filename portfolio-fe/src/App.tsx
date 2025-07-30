import { CPActivityHeatmap } from "./components/functional/CPActivityHeatmap";
import { Header } from "./components/styling/Header";

function App() {
  return (
    <div className="mx-10 my-10 flex flex-col">
      <Header>Stefan Chambov</Header>

      <CPActivityHeatmap type="leetcode" />
      <CPActivityHeatmap type="codeforces" color="red" />
    </div>
  );
}

export default App;
